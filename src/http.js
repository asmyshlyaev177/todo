import axios from 'axios'

let http = axios
http.defaults.baseURL = 'http://127.0.0.1:3000/api/todo'
http.defaults.timeout = 3000

export default http
