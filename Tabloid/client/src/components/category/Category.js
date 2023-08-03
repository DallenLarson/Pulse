import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteCategory } from "../../modules/categoryManager"

const Category = ({ cat, resetCategories }) => {
    const [modal, setModal] = useState(false),
        navigate = useNavigate()

        useEffect(() => {
            resetCategories()
        }, [])
      

    const confirmDelete = () => {
        deleteCategory(cat.id)
        .then(res => {
            if(res.ok) {
                setModal(false)
                window.location.reload()
            }
        })
}

    return (
        <tr>
            <td className="col-2">{cat.id}</td>
            <td>{cat.name}</td>
            <td>
                <ButtonGroup>
                    <Button color="primary" onClick={() => navigate(`edit/${cat.name}`)} className="mr-4">Edit</Button>
                    <Button color="danger" onClick={() => setModal(!modal)}>Delete</Button>
                </ButtonGroup>
                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}>Modal Title</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete {cat.name}?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => confirmDelete(setModal(!modal))} color="primary">Confirm</Button>
                        <Button onClick={() => setModal(!modal)} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </td>
        </tr>
    )
}

export default Category