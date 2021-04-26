<template>
    <q-page>
        <TabsComponent />
        <q-separator />
        <q-list separator v-if="getUserTwoostLoading">
            <q-item v-for="user in getFollowers" :key="user.id" class="q-py-md" clickable v-ripple>
                <q-item-section avatar class="relative-position" @click="navigateTo(user.follower)">
                    <q-avatar size="3.4em" class="absolute-top" >
                        <img :src="`https://cdn.quasar.dev/img/${user.avatar}`">
                    </q-avatar>
                </q-item-section>

                <q-item-section @click="navigateTo(user.follower)">
                    <q-item-label>{{ user.name }}</q-item-label>
                    <q-item-label  caption lines="1">@{{ user.follower }}</q-item-label>
                    <q-item-label class="text-black" caption lines="2">{{ user.bio }}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="checkForFollowers(user.follower)">
                    <q-btn class="z-top" v-if="!user.iFollowThem" @click="followOrUnfollowUser('follow', user.follower)" unelevated rounded color="primary" label="Follow" />
                    <q-btn class="z-top" v-if="user.iFollowThem" @click="followOrUnfollowUser('unfollow', user.follower)" outline rounded color="primary" label="Following" />
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>

<script>
    
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import TabsComponent from '../components/TabsComponent'

    export default {
        name: "FollowersScreen",
        components: {
            TabsComponent
        },
        computed: {
            ...mapGetters('user', ['getUserTwoostLoading', 'getFollowers']),
        },
        methods: {
            ...mapActions('user', ['followUser']),
            ...mapMutations('helpers', ['setAlert']),
            navigateTo(username) {
                this.$router.push({
                    path: `/${username}`
                })
            },
            checkForFollowers(username){
                if(!this.$store.state.user.user){
                    return true
                }
                if(username === this.$store.state.user.user.username){
                    return false
                }
                return true
            },
            followOrUnfollowUser(type, username){
                if(this.$store.state.user.user){
                    if(type === 'follow'){
                        this.followUser({type: 'follow', username: username})
                    }else{
                        this.followUser({type: 'unfollow', username: username})
                    }
                }else{
                    this.setAlert({
                        lightMessage: `Follow ${username} to see what they share on Twitter.`, 
                        strongMessage: 'Sign up so you never miss their Tweets.', 
                        icon: 'person_add',
                        color: 'primary'
                    })
                }
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>