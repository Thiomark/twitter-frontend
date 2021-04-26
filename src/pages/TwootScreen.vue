<template>
    <q-page>
        <q-item class="twoot q-py-md" >
            <q-item-section>
                <div class="top-section">    
                    <q-item-section avatar>
                        <q-avatar v-if="!loading">
                            <img  
                                :src="twoot.avator" 
                                :alt="`thio's profile picture`                                
                            ">
                        </q-avatar>
                        <q-skeleton v-if="loading" height="200px" />
                    </q-item-section>
                    <q-item-section class="q-ml-sm">
                        <q-skeleton v-if="loading" class="q-my-md q-mr-md" width="8em" />
                        <q-skeleton v-if="loading" class=" q-mr-md" width="8em" />
                        <strong v-if="!loading" class="text-h6 text-black">{{twoot.name}}</strong>
                        <div v-if="!loading" class="text-subtitle1">@{{twoot.username}}</div>
                    </q-item-section>
                    <q-btn size="md" round flat icon="more_horiz">
                        <q-menu>
                            <q-list style="min-width: 100px">
                                <q-item @click="blockedPath" clickable v-close-popup>
                                    <q-item-section>Delete</q-item-section>
                                </q-item>
                                <q-item @click="blockedPath" clickable v-close-popup>
                                    <q-item-section>Report</q-item-section>
                                </q-item>
                                <q-item @click="blockedPath" clickable v-close-popup>
                                    <q-item-section>Edit</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item @click="blockedPath" clickable v-close-popup>
                                    <q-item-section>Archive</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn> 
                </div>
                <div class="remove-padding q-py-sm" @click="twootReplies()">
                    <q-skeleton v-if="loading" class="q-my-md q-mr-md" height="6em" />
                    <div v-if="!loading" class="text-h6 text-black text-weight-regular">
                        {{twoot.twoot}}
                    </div>
                </div>
                <div>
                    <router-link v-if="!loading" class="text-grey-8" to="/">{{twootDate(twoot.date)}}</router-link>
                    ·
                    <router-link class="text-grey-8" to="/">Twitter Web App</router-link>
                </div>
                <div class="row q-mt-md the-icons q-pr-lg retwoots">
                    <router-link class="text-grey-6" :to='`${$route.params.id}/following`' ><strong v-if="!loading" class="text-grey-9 q-mr-sm">{{twoot.retwoots.length}}</strong>Retweets</router-link>
                    <router-link class="text-grey-6 q-ml-lg" :to='`${$route.params.id}/followers`' ><strong v-if="!loading" class="text-grey-9 q-mr-sm">{{twoot.likes.length}}</strong>Likes</router-link>
                </div>
                <div class="row q-mt-md the-icons justify-between q-pr-lg">
                    <q-btn size="sm" @click="blockedPath" color="grey" flat icon="far fa-comment"/>  
                    <q-btn size="sm" @click="blockedPath"  color="grey" flat icon="fas fa-retweet"/>
                    <q-btn size="sm" @click="blockedPath" color="grey" flat icon="far fa-heart"/>
                    <q-btn size="sm" @click="blockedPath" color="grey" flat icon="ios_share"/>
                </div>
            </q-item-section>
        </q-item>
        <q-list separator v-if="replies.length > 0">
            <!-- <transition-group
                appear
                enter-active-class="animated fadeIn slow"
                leave-active-class="animated fadeOut slow"
            > -->
                <TwootComponentReply v-for="twoot in replies" :key="twoot.twootID" :twoot="twoot"/>
            <!-- </transition-group> -->
        </q-list>
    </q-page>
</template>

<script>

    import TwootComponentReply from '../components/TwootComponentReply'
    import TwootService from '../services/TwootService'
    import { mapMutations } from 'vuex'

    export default {
        name: "TwootScreen",
        components: {
            TwootComponentReply
        },
        data() {
            return {
                replies: [],
                loading: true,
                twoot: null
            }
        },
        methods: {
            ...mapMutations('helpers', ['setAlert']),
            removeTwoot(id){
                this.deleteTwoot(id)
            },
            AddComment(username, id){
                this.setTwootReply({reply_to: username, origin_id: id})
                this.$router.push({ name: 'Reply'})
            },
            buttonColor(array, button){
                if(this.$store.state.user.user){
                    if(array.includes(this.$store.state.user.user.id)){
                        if(button === 'like'){
                            return 'pink-6'
                        }
                        return 'green-14'
                    }       
                }
                return 'grey'
            },
            buttonLabel(number){
                //return number.length > 0 ? number.length : ''
            },
            likeUserTwoot(id){
               // this.likeTwoot({username_id: this.$store.state.user.user.id, twoot_id: id})
            },
            retwootUserTwoot(id){
                // this.retwootTwoot({username_id: this.$store.state.user.user.id, twoot_id: id})
            },
            navigateTo(username) {
                this.$router.push({
                    path: `/${username}`
                })
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
            retweeted(name){
                if(this.$store.state.user.user){
                    if(this.$store.state.user.user.name === name){
                        return 'You Retweeted'
                    }
                    return `${name} Retweeted`
                }
                return `${name} Retweeted`
            },
            twootDate(twootDate){
                var date = new Date(twootDate);
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return `${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} · ${monthNames[date.getMonth()].slice(0, 3)} ${date.getMonth()}, ${date.getFullYear()}`
            }
        },
        async created() {
            try {
                const { data }  = await TwootService.twootReplies(this.$route.params.username,this.$route.params.id)
                this.replies = data.twoots[0].replies
                this.twoot = data.twoots[0]
                this.loading = false
            } catch (error) {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

    a {
        text-decoration: none;
        &:hover{
            text-decoration: chartreuse;
        }
    }

    .twoot {
        border-bottom: 1px solid rgba(224, 224, 224, 0.404);
    }

    .top-section {
        display: flex;
        align-items: center;
        // position: relative;
    }

    .retwoots {
        padding: 1em .1em;
        border-bottom: 1px solid rgba(224, 224, 224, 0.404);
        border-top: 1px solid rgba(224, 224, 224, 0.404);
    }

</style>