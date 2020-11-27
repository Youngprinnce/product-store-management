import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const NewModal = ({onSubmit, buttons, size , show, handleClose, modalTitle, children}) => {
    return (
        <Modal size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {
                    buttons ? buttons.map((btn,index) => 
                        <Button key={index} variant={btn.color} onClick={btn.onClick} className={btn.primary}>
                            {btn.label}
                        </Button>
                    ) :
                        <Button
                            variant="primary"
                            style={{ backgroundColor: "#333" }} className="btn-sm"
                            onClick={onSubmit}>
                        Save
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal
