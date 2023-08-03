import { getToken } from "./authManager"

const _apiUrl = "/api/tag"

export const getAllTags = (usePagination, increment, offset) => {
    return getToken().then(token => {
        // The query parameters are only added if an argument is provided for them
        return fetch(`${_apiUrl}?usePagination=${usePagination}${(increment ? `&increment=${increment}` : "")}${(offset ? `&offset=${offset}` : "")}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addTag = (tagName) => {
    return getToken().then(token => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: tagName })
        })
    })
}

export const deleteTag = (tagId) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${tagId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export const editTag = (oldName, tagName) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}?oldName=${oldName}&newName=${tagName}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    })
}