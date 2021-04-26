<template>
    <q-layout view="lhr LpR lFr">
        <Header  v-if="navConditions() && authenticated()" @click="left = !left"/>
        <!-- <Header class="lt-md" v-if="navConditions() && authenticated()" @click="left = !left"/> -->
        <q-drawer v-if="notLoggedIn() && authenticated()" show-if-above v-model="left" side="left" bordered>
            <DesktopDrawers class="gt-sm"/>
            <MobileDrawers class="lt-md"/>
        </q-drawer>

        <q-drawer v-if="notLoggedIn() && authenticated()" :width="checkIfIsMessages()" show-if-above v-model="right" side="right" bordered>
            <SearchTwooter />
            <q-list separator padding>
                <TrendMessage />
                <TrendMessage />
                <TrendMessage />
            </q-list>
        </q-drawer>

        <q-page-container>
            <q-dialog v-model="alert">
                <q-card >
                    <q-card-section class="row items-center q-pb-none">
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section>
                        <div class="alert-message text-h5 text-weight-bold">
                            <q-avatar v-if="getAlert" :text-color="getAlert.color" size="5em" :icon="getAlert.icon" />
                            <div v-if="getAlert" class="message-section">
                                {{getAlert.strongMessage}}    
                                <p v-if="getAlert" class="text-subtitle1">{{getAlert.lightMessage}}</p>
                            </div>
                            <div v-if="getAlert && !getAlert.hideButtons" class="button-section">
                                <q-btn class="buttons"  @click="navigateTo('login')" unelevated rounded color="primary" label="Log in" />
                                <q-btn class="buttons"  @click="navigateTo('register')" outline rounded color="primary" label="Sign up" />
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <router-view />
        </q-page-container>

        <q-footer v-if="navConditions() && !getBottomNavbar && authenticated()" bordered class="bg-white lt-md">
            <q-toolbar>
                <TabNavbar />
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>

    import DesktopDrawers from './components/drawers/DesktopDrawers'
    import MobileDrawers from './components/drawers/MobileDrawers'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import TabNavbar from './components/TabNavbar'
    import TrendMessage from './components/helpers/TrendMessage'
    import SearchTwooter from './components/helpers/SearchTwooter'
    import Header from './components/helpers/Header'

    export default {
        components: {
            TabNavbar,
            TrendMessage,
            SearchTwooter,
            Header,
            DesktopDrawers,
            MobileDrawers
        },
        data () {
            return {
                left: false,
                right: false,
                alert: false,
            }
        },
        methods: {
            ...mapActions('user', ['getUser']),
            ...mapMutations('user', ['setError']),
            ...mapMutations('helpers', ['setAlert']),
            navConditions(){
                if(this.$route.path === '/find' || this.$route.path === '/notifications' || this.$route.path === '/messages' || this.$route.path === '/home'){
                    return true
                }
                return false
            },
            notLoggedIn(){
                if(this.$route.path === '/register' || this.$route.path === '/login' || this.$route.path === '/account/begin_password_reset'){
                    return false
                }
                return true
            },
            authenticated(){
                if(this.$route.path === '/' && !localStorage.getItem("token")){
                    return false
                }
                return true
            },
            checkIfIsMessages(){
                if(this.$route.path === '/messages'){
                    return 1100
                }
                return 400
            },
            navigateTo(page){
                this.setAlert(null)
                this.$router.push({
                    path: `/${page}`
                })
            }
        },
        created() {
            this.getUser(null);
                // console.log(this.$router.history.current)
                // console.log(this.$router.history)
            if(this.$router.history.current.name === 'chats'){
                // console.log(this.$router.history.current.fullPath)
                // console.log(this.$router.history.current.name)
            }
            
             
        },
        computed: {
            ...mapGetters('helpers', ['getBottomNavbar', 'getAlert']),
        },
        watch: {
            '$store.state.helpers.alert': function() {
                if(this.$store.state.helpers.alert){
                    this.alert = true
                }
            },
            'alert': function() {
                if(this.alert === false){
                    this.setAlert(null)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alert-message {
        // height: 15em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0 2em;

        .message-section {
            width: 80%;
            margin: auto;
            text-align: center;
            margin-bottom: 1em;
        }

        .button-section {
            width: 100%;
            margin-bottom: 2em;
            .buttons {
                width: 100%;
                padding: .4em 0;
                margin: .6em 0;
            }
        }

        // .buttons {
        //     width: 100%;
        // }
    }
</style>
