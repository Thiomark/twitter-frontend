import Api from './Api'

export default {
    login(credentials) {
        return Api().post('auth', credentials)
    },
    get() {
        return Api().get('auth')
    },
    register(credentials) {
        return Api().post('auth/register', credentials)
    }
}
