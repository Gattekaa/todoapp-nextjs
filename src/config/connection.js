import axios from 'axios'
import { parseCookies } from 'nookies'
const { token } = parseCookies()

const connection = axios.create({
    baseURL: 'https://gattekatodo.vercel.app//api',
})



if(token) {
    connection.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default connection
