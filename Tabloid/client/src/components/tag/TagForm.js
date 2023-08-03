import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap"
import { addTag, editTag } from "../../modules/tagManager"

const TagForm = () => {
    const { tagName } = useParams(),
        [name, setName] = useState(tagName ?? ""),
        navigate = useNavigate()


    useEffect(() => {
        document.getElementById("tag-save-btn").disabled = true
    }, [])

    const changeState = (e) => {
        if (e.target.value.trim() === "" || e.target.value === null) {
            // Disable the save button if input is empty
            document.getElementById("tag-save-btn").disabled = true
        } else {
            document.getElementById("tag-save-btn").disabled = e.target.value === tagName
        }
        setName(e.target.value)
    }

    const createTag = (e) => {
        e.preventDefault()

        if (tagName) {
            editTag(tagName, name)
                .then(res => {
                    if (res.ok) {
                        navigate("/tags")
                    } else {
                        const nameErr = document.getElementById("tag-name-validation")
                        const saveBtn = document.getElementById("tag-save-btn")

                        nameErr.style.display = "block"
                        saveBtn.disabled = true

                        setTimeout(() => {
                            nameErr.style.display = "none"
                            saveBtn.disabled = false
                        }, 3000)
                    }
                })
        } else {
            addTag(name)
                .then(res => {
                    if (res.ok) {
                        navigate("/tags")
                    } else {
                        const nameErr = document.getElementById("tag-name-validation")
                        const saveBtn = document.getElementById("tag-save-btn")

                        nameErr.style.display = "block"
                        saveBtn.disabled = true

                        setTimeout(() => {
                            nameErr.style.display = "none"
                            saveBtn.disabled = false
                        }, 3000)
                    }
                })
        }
    }

    return (
        <Form onSubmit={createTag}>
            <h2>{!tagName ? 'Create' : 'Edit'} Tag</h2>
            <hr className="clear" />
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input name="name" className="w-auto" value={name} onChange={changeState} />
                <FormText className="hidden" id="tag-name-validation" color="danger">An error occured.</FormText>
            </FormGroup>
            <Button id="tag-save-btn" color="success">Save {tagName && 'Changes'}</Button>
        </Form>
    )
}

export default TagForm