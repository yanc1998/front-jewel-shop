import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {isLogin, logOut} from "@/red/authMethods";

import {saveToken, loadToken} from "@/red/authMethods";

export default new Vuex.Store({
    state: {token: ''},
    getters: {
        IsLogin(state) {
            return isLogin(state)
        }
    },
    mutations: {
        _setToken(state, token) {
            state.token = token
            saveToken(token)
        },
        _logOut(state) {
            state.token = ''
            saveToken('')
        }
    },
    actions: {
        setToken: ({commit}, token) => commit('_setToken', token),
        logOut: ({commit}) => commit('_logOut'),
    },
    modules: {}
})
