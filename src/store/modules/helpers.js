const state = {
    layout: '',
    bottomNavbar: false,
    alert: null
}

const mutations = {
    setTheLayout(state, payload){
        state.layout = payload
    }, 
    bottomNavbarState(state){
        state.bottomNavbar = !state.bottomNavbar
    }, 
    setAlert(state, alert){
        state.alert = null
        state.alert = alert
    }
}

const getters = {
    getTheLayout: state => state.feedTwoots,
    getBottomNavbar: state => state.bottomNavbar,
    getAlert: state => state.alert
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}