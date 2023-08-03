import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap"
import { addCategory, editCategory } from "../../modules/categoryManager"

const CategoryForm = () => {
    const { catName } = useParams(),
        [name, setName] = useState(catName ?? ""),
        navigate = useNavigate()


    useEffect(() => {
        document.getElementById("category-save-btn").disabled = true
    }, [])

    const changeState = (e) => {
        if (e.target.value.trim() === "" || e.target.value === null) {
            // Disable the save button if input is empty
            document.getElementById("category-save-btn").disabled = true
        } else {
            document.getElementById("category-save-btn").disabled = e.target.value === catName
        }
        setName(e.target.value)
    }

    const createCategory = (e) => {
        e.preventDefault()

        if (catName) {
            editCategory(catName, name)
                .then(res => {
                    if (res.ok) {
                        navigate("/categories")
                    } else {
                        const nameErr = document.getElementById("category-name-validation")
                        const saveBtn = document.getElementById("category-save-btn")

                        nameErr.style.display = "block"
                        saveBtn.disabled = true

                        setTimeout(() => {
                            nameErr.style.display = "none"
                            saveBtn.disabled = false
                        }, 3000)
                    }
                })
        } else {
            addCategory(name)
                .then(res => {
                    if (res.ok) {
                        navigate("/categories")
                    } else {
                        const nameErr = document.getElementById("category-name-validation")
                        const saveBtn = document.getElementById("category-save-btn")

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
        <Form onSubmit={createCategory}>
            <h2>{!catName ? 'Create' : 'Edit'} Category</h2>
            <hr className="clear" />
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input name="name" className="w-auto" value={name} onChange={changeState} />
                <FormText className="hidden" id="category-name-validation" color="danger">An error occured.</FormText>
            </FormGroup>
            <Button id="category-save-btn" color="success">Save {catName && 'Changes'}</Button>
        </Form>
    )
}

export default CategoryForm