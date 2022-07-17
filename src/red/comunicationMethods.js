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
        const data = await fetch(complete_route, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
        })
        return data
    }

    async get(route, paramName, param) {
        const data = await fetch(this.base_path + route + `/${paramName}:${param}`, {
            method: 'GET',
            headers: this.headers
        })

        return data
    }

    setToken(token) {
        this.headers.Authorization = `<Bearer> ${token}`
    }
}

