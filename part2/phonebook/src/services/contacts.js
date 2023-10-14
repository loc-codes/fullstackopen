import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const updateContact = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, deleteContact, addContact, updateContact}