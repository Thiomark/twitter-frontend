import Api from './Api'

export default {
    post(credentials) {
        return Api().post('user/', credentials)
    },
    followUser(username) {
        return Api().post(`user/follow`, username)
    },
    update(twootID, credentials) {
        return Api().patch(`user/${twootID}`, credentials)
    },
    get(twootID) {
        return Api().get(`user/${twootID}`)
    },
    getFollowers(username, search) {
        return Api().get(`user/followers/${username}?search=${search}`)
    },
    delete(twootID) {
        return Api().delete(`user/${twootID}`)
    },
    getAll() {
        return Api().get(`user/`)
    }

}