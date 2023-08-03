import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Label, Table } from "reactstrap"
import { getAllTags } from "../../modules/tagManager"
import Pagination from "../Helpers/Pagination"
import Tag from "./Tag"

const ListTags = () => {
    const [tags, setTags] = useState([]),
        [offset, setOffset] = useState(0),
        [total, setTotal] = useState(0),
        [increment, setIncrement] = useState(10),
        [usePagination, setUsePagination] = useState(true),
        navigate = useNavigate()


    const getTags = useCallback(() => {
        getAllTags(usePagination, increment, offset)
            .then(data => {
                setTags(data.tags)
                setTotal(data.total)
            })
    }, [increment, offset, usePagination])

    const resetTags = () => {
        setOffset(0)
    }

    useEffect(() => {
        // If it is a number, use pagination
        if (!isNaN(increment) && !usePagination) {
            setUsePagination(true)
        }
        if (isNaN(increment) && usePagination) {
            setUsePagination(false)
        }

        getTags()
    }, [increment, usePagination, getTags])

    return (
        <>
            <h2>Tags</h2>
            <Button color="primary" onClick={() => navigate("new")}>Create</Button>
            <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); setIncrement(parseInt(document.querySelector(`input[name="increment"]`).value)) }}>
                <Label className="align-self-center" for="increment">Amount per page</Label>
                <Input className="w-auto mx-2" type="number" name="increment" min="1" />
                <Button>Update</Button>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tags?.map(c => <Tag key={`tag--${c.id}`} tag={c} resetTags={resetTags} />)}
                </tbody>
            </Table>
            <Pagination total={total} increment={increment} offset={offset} setOffset={setOffset} />
            {
                usePagination
                    ? <div>{offset + 1} - {offset + increment > total ? total : offset + increment} of {total}</div>
                    : <div>{offset + 1} - {total} of {total}</div>
            }
        </>
    )
}

export default ListTags