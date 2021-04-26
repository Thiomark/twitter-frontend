<template>
    <q-page >
        <FixedHeaderComponent :visible="visible" :hideOnScroll="true" :backgroundColour="visible ? '' : 'bg-yellow-9'" class="lt-md"/>
        <div class="notification add-border-bottom" >
            <q-pull-to-refresh @refresh="refresh">
                <q-skeleton v-if="getUserLoading" height="200px" />
                <q-img
                    v-if="!getUserLoading"
                    :src="getProfile.profile.background_image ? getProfile.profile.background_image : 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=750&w=500'"
                    style=" height: 200px;"
                >
                </q-img>
                <q-skeleton v-intersection="onIntersection" v-if="getUserLoading" bordered type="circle" size="6em" class="bg-grey-4 skeleton-profile-avator" />
                <q-avatar v-intersection="onIntersection" v-if="!getUserLoading" class="profile-avator" size="6em">
                    <img :src="getProfile.profile.avator ? getProfile.profile.avator : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'">
                </q-avatar>
                <div class="button-area">
                    <q-btn outline round color="primary" @click="blockedPath"  v-if="!getUserLoading && checkIfIsOwner(getProfile.profile.username)" class="q-mr-md" icon="more_horiz" />
                    <q-btn outline rounded color="primary" @click="blockedPath"  v-if="!getUserLoading && checkIfIsOwner(getProfile.profile.username)" label="Edit profile" />
                    <q-btn outline round color="primary" @click="navigateToMessages(getProfile.profile.id, getProfile.profile.name)" v-if="!getUserLoading && $store.state.user.user && !checkIfIsOwner(getProfile.profile.username)" class="q-mr-md" icon="mail_outline" />
                    <q-btn outline rounded color="primary" @click="unFollowUser(getProfile.profile.username)" v-if="!getUserLoading && !checkIfIsOwner(getProfile.profile.username) && checkIfIFollowAccount(getProfile.followers)" label="Following" />
                    <q-btn outline rounded color="primary" @click="followUser(getProfile.profile.username)"  v-if="!getUserLoading && !checkIfIsOwner(getProfile.profile.username) && !checkIfIFollowAccount(getProfile.followers)" label="Follow" />
                </div>
                <div class="content">
                    <q-skeleton v-if="getUserLoading" width="9em" />
                    <q-skeleton v-if="getUserLoading" class="q-mt-md" height="9em" />
                    <h2 class="text-black" v-if="!getUserLoading">{{getProfile.profile.name}}</h2>
                    <h1 class="text-grey-6" v-if="!getUserLoading">@{{getProfile.profile.username}}<q-icon color="primary" :name="getProfile.profile.is_verfied ? 'verified' : ''"/></h1>
                    <p class="text-grey-10" v-if="!getUserLoading">{{getProfile.profile.bio}} 
                        <span style="display: block" class="text-grey-5 q-mt-md">
                            <div class="acount-info-wrapper">
                                <div class="date acount-info q-pr-md" v-if="!getUserLoading && checkIfIsOwner(getProfile.profile.username)">
                                    <q-icon class="q-mr-xs" name="insert_invitation" />Born {{joinDate('birth', $store.state.user.user.birth_date)}}
                                </div>
                                <div class="joined acount-info">
                                    <q-icon class="q-mr-xs" name="insert_invitation" />Joined {{joinDate('joined', getProfile.profile.date)}}
                                </div>
                            </div>
                        </span>
                    </p>
                    <div class="following">
                        <q-skeleton v-if="getUserLoading" class="q-my-md q-mr-md" width="6em" />
                        <q-skeleton v-if="getUserLoading" class="q-my-md" width="6em" />
                        <router-link class="text-grey-6" v-if="!getUserLoading" :to='`${$route.params.id}/following`' ><strong class="text-grey-9">{{getProfile.following.length}}</strong>Following</router-link>
                        <router-link class="text-grey-6" v-if="!getUserLoading" :to='`${$route.params.id}/followers`' ><strong class="text-grey-9">{{getProfile.followers.length}}</strong>Followers</router-link>
                    </div>
                </div> 
                <ProfileTwootsComponent />
            </q-pull-to-refresh>
        </div>
    </q-page>
</template>

<script>

import FixedHeaderComponent from '../components/headers/FixedHeaderComponent'
import ProfileTwootsComponent from '../components/profileScreen/ProfileTwootsComponent'
import TwootTab from '../components/profileScreen/TwootTab'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'ProfileScreen',
    components: {
        ProfileTwootsComponent,
        FixedHeaderComponent,
        TwootTab
    },
    data() {
        return {
            tab: 'twoots',
            currentTab: 'userTwoots',
            visible: false
        }
    },
    methods: {
        ...mapActions('user', ['getLoggedUser', 'fetchProfile', 'setTwoots']),
        ...mapActions('twoots', ['fetchUserTwoots']),
        ...mapMutations('user', ['setChatTo']),
        ...mapMutations('helpers', ['setAlert']),
        onIntersection (entry) {
            this.visible = entry.isIntersecting
        },
        refresh (done) {
            //this.fetchProfile(this.$route.params.id)
            setTimeout(() => {
                done()
            }, 1000)
        },
        navigateTo(tab) {
            this.$router.push({
                name: `${this.$route.params.id}/${tab}`
            })
        },
        navigateToMessages(url, username) {
            if(this.$store.state.user.user){
                this.setChatTo(username)
                this.$router.push({
                    path: `messages/${this.$store.state.user.user.id}&${url}`
                })
            }
        },
        joinDate(type, date){
            const time = new Date(date);
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
            
            if(type === 'birth'){
                return `${monthNames[time.getMonth()]} ${time.getDay()}, ${time.getFullYear()}`
            }
            return `${monthNames[time.getMonth()].slice(0, 3)} ${time.getFullYear()}`
        },
        checkIfIsOwner(username){
            if(this.$store.state.user.user){
                if(this.$store.state.user.user.username === username){
                    return true
                }
                return false
            }
            return false
        },
        checkIfIFollowAccount(followers){
            if(this.$store.state.user.user){
                followers = followers.map(account => account.username)
                if(followers.includes(this.$store.state.user.user.username)){
                    return true
                }
                return false
            }
            return false
        },
        blockedPath(){
            this.setAlert({
                lightMessage: `I'm handling both the front-end and the backend by myself, and I got school`, 
                strongMessage: "I'm still working on it, hopefully I'll be done soon", 
                icon: 'system_security_update_warning',
                color: 'black',
                hideButtons: true
            })
        },
        async unFollowUser(username){            
            if(this.$store.state.user.user){
                this.$store.dispatch('user/followUserProfile', {type: 'unfollow', username: username, myusername: this.$store.state.user.user.username})
            }
        },
        async followUser(username){
            if(this.$store.state.user.user){
                this.$store.dispatch('user/followUserProfile', {type: 'follow', username: username, myusername: this.$store.state.user.user.username})
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
    computed: {
        ...mapGetters('user', ['getUserLoading', 'getProfile']),
    },
    created(){
        this.fetchProfile(this.$route.params.id)
        this.fetchUserTwoots(`${this.$route.params.id}?type=twoots`)
    }
}
</script>

<style scoped lang="scss">

    .add-border-bottom {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .notification {

        margin-bottom: .2em;
        min-height: 98vh;

        .button-area {
            display: flex;
            position: absolute;
            right: 1em;
            margin-top: -2em;
        }

        .acount-info-wrapper {
            display: flex;
            align-items: center;
        }

        .move-to-front {
            z-index: 10;
        }

        .skeleton-profile-avator {
            margin-top: -3em;
            margin-left: 1em;
            border: 4px solid rgb(255, 255, 255);
        }

        .profile-avator {
            margin-top: -.5em;
            padding-left: .2em;
            img {
                border: 4px solid rgb(255, 255, 255);
            }
        }

        .content {
            padding: .4em 1.2em;
        
            h1, h2 {
                margin: 0;
                padding: 0;
                line-height: 1;
            }
            h1 {
                font-size: .9rem;
                font-weight: 400;
            }
            h2 {
                font-size: 1.2rem;
                padding-bottom: .3em;
                font-weight: bolder;
            }

            p {
                padding: .8em 0;
                margin: 0;
            }

            a {
                font-size: .875rem;
                text-decoration: none;
                strong {
                    padding-right: .4em;
                }
            }

            a {
                margin-right: 1em;
            }

            .following {
                display: flex;
            }
        }
    }


</style>
