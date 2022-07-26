import formData from 'form-data'
import axios from "axios";

export class Comunication {
    base_path = ""
    headers = {}

    constructor(base_path) {
        this.base_path = base_path
        this.headers = {'Content-Type': 'application/json'}
    }

    async post(route, body) {
        const complete_route = this.base_path + route
        console.log(complete_route)
        const data = await axios.post(complete_route, body, {
            headers: this.headers
        })
        return data
    }

    addFormData(_data) {
        let data = new formData();
        for (const key in _data) {
            console.log(key, _data[key])
            data.append(key.toString(), _data[key]);
            if (key == 'file') {
                const reader = new FileReader()
                reader.readAsDataURL(_data[key])
                data.append('file', reader)
            }
        }
        return data
    }

    async get(route, paramName, param) {
        const data = await fetch(this.base_path + route + `/${paramName}:${param}`, {
            method: 'GET',
            headers: this.headers
        })

        return data
    }

    setHeaders(headers) {
        this.headers = {}
        for (const headersKey in headers) {
            this.headers[headersKey] = headers[headersKey]
        }
    }

    setToken(token) {
        this.headers.Authorization = `Bearer ${token}`
    }
}

