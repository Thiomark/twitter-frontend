<template>
    <q-item class="twoot q-py-md" clickable >
        <q-item-section :class="twoot.is_a_retweet ? 'retweet' : ''" avatar top>
            <q-avatar>
                <img :src="twoot.image" :alt="`${twoot.name}'s profile picture`">
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <router-link class="text-grey-7 text-weight-bold" :to='`/${twoot.username}`' v-if="twoot.is_a_retweet && $route.path !== 'home'">
                <q-icon name="fas fa-retweet" class="q-mr-sm"/>
                {{retweeted(twoot.retweeted_by)}}
            </router-link>
            <q-item-label :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}" class="text-subtitle1">
                <div @click="navigateTo(twoot.username)">
                    <strong>{{twoot.name}}</strong> 
                    <span class="handle">@{{twoot.username}} &bull; {{twoot.date | relativeDate}}</span>
                </div>
                <q-btn size="md" round flat icon="more_horiz">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item @click="removeTwoot(twoot.twootID)" v-if="$store.state.user.user && $store.state.user.user.id === twoot.userID" clickable v-close-popup>
                                <q-item-section>Delete</q-item-section>
                            </q-item>
                            <q-item @click="blockedPath" v-if="$store.state.user.user && $store.state.user.user.id !== twoot.userID" clickable v-close-popup>
                                <q-item-section>{{embeded}}</q-item-section>
                            </q-item>
                            <q-item @click="blockedPath" v-if="$store.state.user.user && $store.state.user.user.id === twoot.userID" clickable v-close-popup>
                                <q-item-section>Edit</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item @click="blockedPath" v-if="$store.state.user.user && $store.state.user.user.id === twoot.userID" clickable v-close-popup>
                                <q-item-section>Archive</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn> 
            </q-item-label>
            <q-img
                v-if="twoot.twootImage"
                :src="twoot.twootImage"
            >
            </q-img>
            <div class="remove-padding q-py-sm" @click="twootReplies(twoot.username, twoot.twootID)">
                <q-item-label v-if="twoot.twoot">
                    {{twoot.twoot}}
                </q-item-label>
            </div>
            
            <div class="row q-mt-md the-icons justify-between q-pr-lg">
                <div style="width: 5em;">
                    <q-btn :label="buttonLabel(twoot.replies)" size="sm" @click="AddComment(twoot.username, twoot.twootID)" color="grey" flat icon="far fa-comment"/>
                </div>
                <div style="width: 5em;">
                    <q-btn :label="buttonLabel(twoot.retwoots)" size="sm" @click="retwootUserTwoot(twoot.username, twoot.twootID)"  :color="buttonColor(twoot.retwoots, 'retwoot')" flat icon="fas fa-retweet"/>
                </div>
                <div style="width: 5em;">
                    <q-btn :label="buttonLabel(twoot.likes)" size="sm" @click="likeUserTwoot(twoot.username, twoot.twootID)" :color="buttonColor(twoot.likes, 'like')" flat icon="far fa-heart"/>
                </div>
                <q-btn @click="blockedPath" size="sm" color="grey" flat icon="ios_share"/>
            </div>
        </q-item-section>
    </q-item>
</template>

<script>

    import { formatDistance } from 'date-fns'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'TwootComponent',
        data() {
            return {
                embeded: '</> Embed Tweet'
            }
        },
        props: {
            twoot: {
                type: Object
            },
            twootOwner: {
                type: Boolean
            }
        },
        methods: {
            ...mapActions('twoots', ['deleteTwoot', 'likeTwoot', 'retwootTwoot']),
            ...mapMutations('twoots', ['setTwootReply']),
            ...mapMutations('helpers', ['setAlert']),
            removeTwoot(id){
                this.deleteTwoot(id)
            },
            AddComment(username, id){
                if(this.$store.state.user.user){
                    this.setTwootReply({reply_to: username, origin_id: id})
                    this.$router.push({ name: 'Reply'})
                }else{
                    this.setAlert({
                        lightMessage: `Once you join Twitter, you can respond to ${username}’s Tweet.`, 
                        strongMessage: 'Reply to join the conversation.', 
                        icon: 'far fa-comment',
                        color: 'primary'
                    })
                }
            },
            twootReplies(userID, twootID){
                this.$router.push({
                    path: `/${userID}/status/${twootID}`
                })
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
                return number.length > 0 ? number.length : ''
            },
            likeUserTwoot(username, id){
                if(this.$store.state.user.user){
                    this.likeTwoot({username_id: this.$store.state.user.user.id, twoot_id: id})
                }else{
                    this.setAlert({
                        lightMessage: `Join Twitter now to let ${username} know you like their Tweet.`, 
                        strongMessage: 'Like a Tweet to share the love.', 
                        icon: 'far fa-heart',
                        color: 'pink-6'
                    })
                }
            },
            retwootUserTwoot(username, id){
                
                if(this.$store.state.user.user){
                    this.retwootTwoot({username_id: this.$store.state.user.user.id, twoot_id: id})
                }else{
                    this.setAlert({
                        lightMessage: `When you join Twitter, you can share ${username}’s Tweet with your followers.`, 
                        strongMessage: 'Retweet to spread the word.', 
                        icon: 'fas fa-retweet',
                        color: 'green-14'
                    })
                }
            },
            navigateTo(username) {
                this.$router.push({
                    path: `/${username}`
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
            blockedPath(){
                this.setAlert({
                    lightMessage: `I'm handling both the front-end and the backend by myself, and I got school`, 
                    strongMessage: "I'm still working on it, hopefully I'll be done soon", 
                    icon: 'system_security_update_warning',
                    color: 'black',
                    hideButtons: true
                })
            },
        },
        filters: {
            relativeDate(value){
                const dateDiffrence = Math.abs(new Date() - new Date(value));
                if(dateDiffrence > 86400000){
                    const time = new Date(value);
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    return `${monthNames[time.getMonth()].slice(0, 3)} ${time.getMonth()}`
                }else{
                    let theDate = formatDistance(new Date(value), new Date())
                    theDate = theDate.includes('about') ? theDate.replace("about ", "") : theDate
                    let arrayOfWord = theDate.split(' ')
                    return `${arrayOfWord[0]} ${arrayOfWord[1].substr(0, 1)}`
                } 
            }
        },
        computed: {
            ...mapGetters('twoots', ['getTwootReply'])
        }
    }
</script>

<style lang="scss" scoped>

    .retweet {
        margin-top: 2.5em;
    }

    a {
        text-decoration: none;
    }

    .handle {
        margin-left: .6em;
        color: gray;
    }

    .the-icons {
        margin-left: -17px;
    }

    .twoot:not(:first-child) {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

</style>