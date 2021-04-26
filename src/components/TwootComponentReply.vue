<template>
    <q-item class="twoot q-py-md" clickable >
        <q-item-section avatar top>
            <q-avatar>
                <img :src="twoot.image" :alt="`${twoot.name}'s profile picture`">
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}" class="text-subtitle1">
                <div @click="navigateTo(twoot.username)">
                    <strong>{{twoot.name}}</strong> 
                    <span class="handle">@{{twoot.username}} &bull; {{twoot.date | relativeDate}}</span>
                </div>
                <q-btn size="md" round flat icon="more_horiz">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item @click="blockedPath"  v-if="$store.state.user.user && $store.state.user.user.id === twoot.userID" clickable v-close-popup>
                                <q-item-section>Delete</q-item-section>
                            </q-item>
                            <q-item @click="blockedPath" v-if="$store.state.user.user && $store.state.user.user.id !== twoot.userID" clickable v-close-popup>
                                <q-item-section>Report</q-item-section>
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
            <div class="remove-padding q-py-sm">
                <q-item-label v-if="twoot.twoot">
                    {{twoot.twoot}}
                </q-item-label>
            </div>
            
            <div class="row q-mt-md the-icons justify-between q-pr-lg">
                <q-btn size="sm" color="grey" @click="blockedPath" flat icon="far fa-comment"/>
                <q-btn size="sm" color="grey" @click="blockedPath" flat icon="fas fa-retweet"/>
                <q-btn size="sm" color="grey" @click="blockedPath" flat icon="far fa-heart"/>
                <q-btn size="sm" color="grey" @click="blockedPath" flat icon="ios_share"/>
            </div>
        </q-item-section>
    </q-item>
</template>

<script>

    import { formatDistance } from 'date-fns'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'TwootComponentReply',
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
            removeTwoot(twootID){

            },
            navigateTo(username){

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
                return formatDistance(new Date(value), new Date())
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