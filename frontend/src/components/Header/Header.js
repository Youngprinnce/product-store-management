import React, { useState } from 'react';
import './Header.css';
import {IoIosPower} from 'react-icons/io';
import Modal from "../UI/Modal/Modal"
import Input from "../UI/Input/Input"
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../actions/productActions';
import { signOut } from '../../actions/signupActions';

const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const [newPrductModal, setNewProductModal] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("")
    const [productImage, setProductImage] = useState("")
    const dispatch = useDispatch()

    const addNewProduct = () => {
        setNewProductModal(true)
    }

    const logout = () => {
        dispatch(signOut())
    }

    const handleProductImage = (e) => {
        setProductImage(e.target.files[0]);
    }

    const handleNewProduct = () => {
        if (name === "" || description === "" || price === "") {
            alert("Product details is required")
            setNewProductModal(false);
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('description', description);
        form.append('image', productImage);

        dispatch(addProduct(form));
        setName("")
        setPrice("")
        setDescription("")
        setNewProductModal(false)
    }

    const button = [{
        label: "Save",
        color: "primary",
        onClick: handleNewProduct
    }]

    const renderNewProductModal = () => {
        return (
            <Modal
                show={newPrductModal}
                modalTitle="Add New Product"
                onSubmit={handleNewProduct}
                handleClose={() => setNewProductModal(false)}
                buttons={button}
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

    return (
        <>
        <div className="header">
            <div className="subHeader">
                <div className="logo">
                    <a href=""><span>Product Store API </span></a>
                </div>
                <div className="center">
                    <h3>Welcome<span>{auth.user.username}</span></h3>
                    </div>
                <div>
                    <button
                        className="materialButton"
                        onClick={addNewProduct}
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#2874f0",
                            marginLeft:"10px"
                        }}
                    >
                    Add New Product
                    </button>
                        <IoIosPower onClick={logout} style={{ marginLeft: "20px", fontSize: "25px", color: "white", cursor: "pointer", marginRight: "20px"}} />
                </div>
            </div>
        </div>
        {renderNewProductModal()}
        </>
    )
}

export default Header
