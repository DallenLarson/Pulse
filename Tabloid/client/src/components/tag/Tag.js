import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteTag } from "../../modules/tagManager"

const Tag = ({ tag, resetTags }) => {
  const [modal, setModal] = useState(false),
      navigate = useNavigate()

  useEffect(() => {
      resetTags()
  }, [])

  const confirmDelete = () => {
      deleteTag(tag.id)
          .then(res => {
              if(res.ok) {
                  setModal(false)
                  window.location.reload()
              }
          })
  }


    return (
        <tr>
            <td className="col-2">{tag.id}</td>
            <td>{tag.name}</td>
            <td>
                <ButtonGroup>
                    <Button color="primary" onClick={() => navigate(`edit/${tag.name}`)} className="mr-4">Edit</Button>
                    <Button color="danger" onClick={() => setModal(!modal)}>Delete</Button>
                </ButtonGroup>
                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Modal Title</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete {tag.name}?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => confirmDelete()} color="primary">Confirm</Button>
                        <Button onClick={() => setModal(!modal)} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </td>
        </tr>
    )
}

export default Tag
