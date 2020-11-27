import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {Button, Container, Image, Row,} from "react-bootstrap"
import "./Home.css"
import {useDispatch, useSelector} from "react-redux"
import { getProducts, deleteProduct, updateProduct } from '../../actions/productActions'
import { generatePublicUrl } from '../../helpers/urlConfig'
import Input from '../../components/UI/Input/Input'
import Modal from '../../components/UI/Modal/Modal'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

const Home = () => {
    const auth = useSelector(state => state.auth)
    const products = useSelector(state => state.product)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("")
    const [productImage, setProductImage] = useState("")
    const [updateProductId, setUpdateProductId] = useState("")
    const [updateProductModal, setUpdateProductModal] = useState(false)

    const deleteProducts = (id) => {
        dispatch(deleteProduct(id))
    }

    const updateProducts = (id) => {
        setUpdateProductModal(true)
        getProductDetails(id)
    }

    const handleProductImage = (e) => {
        setProductImage(e.target.files[0])
    }

    const handleUpdateProduct = () => {
        if (name === "" || description === "" || price === "") {
            alert("Product details is required")
            setUpdateProductModal(false);
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('description', description);
        if(productImage > 0){
            form.append("image", productImage)
        }

        dispatch(updateProduct(form, updateProductId))
        setUpdateProductModal(false)
    }

    const getProductDetails = (id) => {
        const product = products.products.find(product => product._id == id)
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setUpdateProductId(product._id)
    }

    const renderUpdateProductModal = () => {
        return (
            <Modal
                show={updateProductModal}
                modalTitle="Edit Product"
                onSubmit={handleUpdateProduct}
                handleClose={() => setUpdateProductModal(false)}
            >
                <Input
                    label="Name"
                    placeholder="Product Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <Input
                    label="Price"
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={`Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input type="file" name="image" onChange={handleProductImage} />
            </Modal>
        )
    }

    useEffect(() => {
        dispatch(getProducts())
    },[])

    return (
        <Layout>
            <div className="card">
                {products && products.products.length > 0 ? (
                    products.products.map((product, index) =>
                        <div key={index} className="card__body">
                            <div className="card__body--imgContainer">
                                <Image src={generatePublicUrl(product.image)} alt="" />
                                <div className="card__desc">{product.description}</div>
                            </div>
                            <div className="card__body--productInfo">
                                <div style={{ margin: "5px 0", fontWeight: "bold", fontSize: "large" }}>{product.name}</div>
                                <div className="productPrice">{`$${product.price}`}</div>
                                {auth.user.role && auth.user.role == "admin" ?
                                    (<div className="card__button">
                                        <Button onClick={() => updateProducts(product._id)} variant="primary"><FaEdit/> Edit</Button>
                                        <Button onClick={() => deleteProducts(product._id)} variant="danger"><MdDelete/> Delete</Button>
                                    </div>
                                    ) : null}
                            </div>
                        </div>
                    )
                ) : (<Jumbotron >
                        <Container>
                            <h1>No product here</h1>
                            <p>
                                Click top right button above to add new product
                            </p>
                        </Container>
                    </Jumbotron>)}
            </div>
   
            {renderUpdateProductModal()}
        </Layout>
    )
}

export default Home
