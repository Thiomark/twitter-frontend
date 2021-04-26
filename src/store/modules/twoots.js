import TwootService from '../../services/TwootService'

const state = {
    twoots: [],
    twootReplies: [],
    loading: false,
    createTwootLoading: false,
    twootReply: null
}

const mutations = {
    FeedTwoots(state, payload){
        state.twoots = payload
    }, 
    addTwoot(state, twoot){
        state.twoots.unshift(twoot);
    }, 
    addReplyTwoot(state, twoot){
        state.twootReplies.unshift(twoot);
    }, 
    setLoading(state, loading){
        state.loading = loading
    },
    setCreateTwootLoading(state, loading){
        state.createTwootLoading = loading
    },
    removeTwoot(state, id){
        state.twoots = state.twoots.filter(twoot => twoot.twootID !== id)
    },
    setTwootReply(state, reply){
        state.twootReply = reply
    },
    buttonChangeStatus(state, status){
        if(status.status){
            if(status.type === 'like'){
                state.twoots = state.twoots.map(twoot => {
                    if(twoot.twootID === status.twootID){
                        if(twoot.likes.includes(status.userID)){
                            twoot.likes.pop(status.userID)
                        }else {
                            twoot.likes = [...twoot.likes, status.userID]         
                        }
                        return twoot
                    }
                    else{
                        return twoot
                    } 
                })
            }else{
                state.twoots = state.twoots.map(twoot => {
                    if(twoot.twootID === status.twootID){
                        if(twoot.retwoots.includes(status.userID)){
                            twoot.retwoots.pop(status.userID)
                        }else {
                            twoot.retwoots = [...twoot.retwoots, status.userID]         
                        }
                        return twoot
                    }
                    else{
                        return twoot
                    } 
                })
            }
            
        }
    },
}

const actions = {
    async fetchFeedTwoots({commit}){
        try {
            commit('setLoading', true)
            const { data } = await TwootService.getAll()
            commit('setLoading', false)
            commit('FeedTwoots', data.rows)
        } catch (error) {
            //! do something with the error 
            commit('setLoading', false)
        }
    },
    async fetchUserTwoots({commit}, query){
        try {
            commit('setLoading', true)
            const { data } = await TwootService.get(query)
            commit('setLoading', false)
            commit('FeedTwoots', data.twoots)
        } catch (error) {
            //! do something with the error 
            commit('setLoading', false)
        }
    },
    async createTwoot({ commit }, twoot){
        try {
            commit('setCreateTwootLoading', true)
            const {data} = await TwootService.post(twoot)
            commit('addTwoot', data.rows)
            commit('setCreateTwootLoading', false)
        } catch (error) {
            //! do something with the error 
            commit('setCreateTwootLoading', false)
        }
    },
    async replyToTwoot({ commit },twoot){
        try {
            commit('setCreateTwootLoading', true)
            const {data} = await TwootService.reply(twoot)
            //! Attention
            commit('addReplyTwoot', data.rows)
            commit('setTwootReply', null)
            commit('setCreateTwootLoading', false)
        } catch (error) {
            console.log(error.response.data)
            //! do something with the error 
            commit('setCreateTwootLoading', false)
        }
    },
    async deleteTwoot({ commit }, id){
        try {
            commit('setCreateTwootLoading', true)
            await TwootService.delete(id)
            commit('removeTwoot', id)
            commit('setCreateTwootLoading', false)
        } catch (error) {
            //! do something with the error 
            commit('setCreateTwootLoading', false)
        }
    },
    async likeTwoot({ commit }, like){
        try {
            await TwootService.likeTwoot(like);
            commit('buttonChangeStatus', {status: true, type: 'like', twootID: like.twoot_id, userID: like.username_id}) 
        } catch (error) {
            commit('buttonChangeStatus', {status: false}) 
            console.log(error)
        }
    },
    async retwootTwoot({ commit }, retwoot){
        try {
            await TwootService.retwootTwoot(retwoot);
            commit('buttonChangeStatus', {status: true, type: 'retwoot', twootID: retwoot.twoot_id, userID: retwoot.username_id}) 
        } catch (error) {
            commit('buttonChangeStatus', {status: false}) 
            console.log(error)
        }
    }
}

const getters = {
    getFeedTwoots: state => state.twoots,
    isTwootsLoading: state => state.loading,
    getCreateTwootLoading: state => state.createTwootLoading,
    getTwootReply: state => state.twootReply
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}