import Api from './Api'

export default {
    post(credentials) {
        return Api().post('twoots/', credentials)
    },
    reply(credentials) {
        return Api().post(`twoots/reply`, credentials)
    },
    twootReplies(username, userID) {
        return Api().get(`twoots/reply/${username}/${userID}`)
    },
    update(twootID, credentials) {
        return Api().patch(`twoots/${twootID}`, credentials)
    },
    get(twootID) {
        return Api().get(`twoots/${twootID}`)
    },
    delete(twootID) {
        return Api().delete(`twoots/${twootID}`)
    },
    getAll() {
        return Api().get(`twoots/`)
    },
    likeTwoot(like) {
        return Api().post(`twoots/likes`, like)
    },
    retwootTwoot(retwoot) {
        return Api().post(`twoots/retwoot`, retwoot)
    },

}