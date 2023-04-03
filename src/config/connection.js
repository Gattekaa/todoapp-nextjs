import axios from 'axios'
import { parseCookies } from 'nookies'
const { token } = parseCookies()
console.log(process.env.API_HOST)
const connection = axios.create({
    
    baseURL: '/api'
})



if(token) {
    connection.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default connection
