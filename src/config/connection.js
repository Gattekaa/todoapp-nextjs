import axios from 'axios'
import { parseCookies } from 'nookies'
const { token } = parseCookies()

const connection = axios.create({
    baseURL: process.env.API_HOST,
})



if(token) {
    connection.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default connection
