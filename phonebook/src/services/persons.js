import axios from "axios";

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (personObject) => axios.post(baseUrl, personObject).then(res => res.data)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const update = (personObject) => axios.put(`${baseUrl}/${personObject.id}`, personObject).then(res => res.data)

export default { getAll, create, deletePerson, update }