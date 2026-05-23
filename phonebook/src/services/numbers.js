import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)


const deleteNum = (id) => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const update = (id, personObject) => axios.put(`${baseUrl}/${id}`, personObject).then(res => res.data)

export default { getAll, deleteNum, update }