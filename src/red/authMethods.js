import {Comunication} from "@/red/comunicationMethods";
import endpoints from "@/red/endpoints";

export function saveToken(token) {
    localStorage.setItem("Token", token)
}

export function loadToken() {
    return localStorage.getItem("Token")
}

export function isLogin(state) {

    const token = loadToken()
    state.token = token

    if (token != "")
        return true

    return false
}

export function logOut() {
    saveToken("")
}

export async function isAdmin() {

    const comunication = new Comunication(endpoints.base_url)
    comunication.setToken(loadToken())
    try {
        const admin = await comunication.post('auth/check-admin')
        if (admin.status != 200 && admin.status != 201) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}
