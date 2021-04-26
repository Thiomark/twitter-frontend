import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import router from '../../router/index'

const state = {
    avatorDefault: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    user: null,
    profile: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: false,
    loading: false,
    errorMessage: null,
    userLoading: true,
    userTwoots: [],
    userTwoostLoading: true,
    followers: [],
    chatTo: null
}

const mutations = {
    authUser(state, token){
        localStorage.setItem('token', token)
        state.token = token
        router.go({
            path: '/home'
        })
    }, 
    removeLoggedInUser(state){
        localStorage.removeItem("token");
        state.user = null
        state.isUserAuthenticated = false
        router.go({
            path: '/'
        })
    }, 
    isUserAuthenticated(state, isLoggedIn){
        state.isLoggedIn = isLoggedIn
    },
    setRequestLoading(state, loading){
        state.loading = loading
    },
    setError(state, error){
        state.errorMessage = error
    },
    setUser(state, user){
        state.user = user
    },
    setProfile(state, profile){
        state.profile = profile
    },
    setUserLoading(state, loading){
        state.userLoading = loading
    },
    setTwoots(state, profile){
        state.profile = profile
    },
    setUserTwoostLoading(state, loading){
        state.userLoading = loading
    },
    setChatTo(state, person){
        state.chatTo = person
    },
    setFollowers(state, followers){
        state.followers = followers
    },
    buttonChangeStatus(state, status){
        if(status.status){
            state.followers = state.followers.map(user => (
                user.follower === status.username ? {...user, iFollowThem: !user.iFollowThem} : user
            ))
        }
    },
    buttonProfileChangeStatus(state, status){
        if(status.status){
            const oldFollowers = state.profile.followers.map(account => account.username)
            if(oldFollowers.includes(status.myusername)){
                const newFollowers = state.profile.followers.filter(user => user.username !== status.myusername)
                state.profile.followers = newFollowers
            }
            else{
                const newFollowers = [...state.profile.followers, {username: status.myusername}]
                state.profile.followers = newFollowers
            }
        }
    },
}

const actions = {
    async authUser({commit}, Credentials){
        try {
            commit('setRequestLoading', true)
            const { data } =  await AuthService.login(Credentials);
            commit('authUser', data.token)
            commit('isUserAuthenticated', true)
            commit('setRequestLoading', false)
        } catch (error) {
            commit('setRequestLoading', false)
            commit('setError', error.response.data.message)
        }
    },
    async registerUser({commit}, Credentials){
        try {
            commit('setRequestLoading', true)
            const { data } =  await AuthService.register(Credentials);
            commit('authUser', data.token)
            commit('isUserAuthenticated', true)
            commit('setRequestLoading', false)
            router.push({
                path: '/home'
            })
        } catch (error) {
            commit('setRequestLoading', false)
            commit('setError', error.response.data.message)
        }
    },
    async getUser({commit}){
        if(localStorage.getItem("token")){
            try {
                commit('setRequestLoading', true)
                const { data } = await AuthService.get();
                commit('setRequestLoading', false)
                commit('setUser', data)
                commit('isUserAuthenticated', true)
            } catch (error) {
                localStorage.removeItem("token");
                commit('setRequestLoading', false)
                commit('isUserAuthenticated', false)
                commit('setUser', null)
            }
        }
    },
    async fetchProfile({commit}, username){
        try {
            commit('setUserLoading', true)
            const { data } = await UserService.get(username);
            commit('setProfile', data.user)
            commit('setUserLoading', false) 
        } catch (error) {
            console.log(error.response.data)
            //commit('setRequestLoading', false)
            //commit('setProfile', null)
        }
    },
    async fetchTwoots({commit}, username){
        try {
            commit('setUserTwoostLoading', true)
            const data = await UserService.getTwoots(username);
            console.log( data )
            //commit('setTwoots', data)
            commit('setUserTwoostLoading', false) 
        } catch (error) {
            console.log(error.response.data)
            //commit('setUserTwoostLoading', false)
            //commit('setTwoots', null)
        }
    },
    async fetchFollowers({commit}, query){

        try {
            commit('setUserTwoostLoading', true)
            const { data } = await UserService.getFollowers(query.username, query.search);
            commit('setFollowers',  data.data)
            commit('setUserTwoostLoading', false) 
        } catch (error) {
            console.log(error.response.data)
            //commit('setUserTwoostLoading', false)
            //commit('setFollowers', null)
        }
    },
    async followUser({commit}, follow){
        try {
            await UserService.followUser(follow);
            commit('buttonChangeStatus', {status: true, username: follow.username}) 
        } catch (error) {
            commit('buttonChangeStatus', {status: false}) 
            console.log(error)
        }
    },
    async followUserProfile({commit}, follow){
        try {
            await UserService.followUser(follow);
            commit('buttonProfileChangeStatus', {status: true, username: follow.username, myusername: follow.myusername}) 
        } catch (error) {
            commit('buttonProfileChangeStatus', {status: false}) 
            console.log(error)
        }
    },
}

const getters = {
    getUser: state => state.user,
    getLoading: state => state.loading,
    getError: state => state.errorMessage,
    getProfile: state => state.profile,
    getUserLoading: state => state.userLoading,
    getTwoots: state => state.userTwoots,
    getUserTwoostLoading: state => state.userTwoostLoading,
    getFollowers: state => state.followers,
    getSetChatTo : state => state.chatTo
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}