import {Comunication} from "@/red/comunicationMethods";

export function saveToken(token) {
    localStorage.setItem("Token", token)
}

export function loadToken() {
    return localStorage.getItem("Token")
}

export function isLogin() {
    const token = loadToken()

    if (token != "")
        return true

    return false
}

export function logOut() {
    saveToken("")
}

export async function isAdmin() {
    const comunication = new Comunication('http://localhost:3001/')
    if (!isLogin()) {
        return false
    }
    comunication.setToken(loadToken())
    const admin = await comunication.post('check-admin')
    if (admin.status != 200) {
        return false
    }
    return true
}
