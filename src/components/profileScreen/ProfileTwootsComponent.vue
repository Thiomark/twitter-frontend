<template>
    <div>
        <TwootTab @currentTab="selectedTab"/>
        <div class="twoots" v-if="isTwootsLoading">
            <div class="q-gutter-md row justify-center q-pa-lg">
                <q-spinner-dots
                    color="primary"
                    size="4em"
                />
                <q-tooltip :offset="[0, 8]">QSpinnerDots</q-tooltip>
            </div>
        </div>
        <div class="twoots" v-if="!isTwootsLoading">
            <TwootComponent :twootOwner="true" v-for="(twoot, index) in getFeedTwoots" :key="index" :twoot="twoot"/>
            <h5 v-if="getFeedTwoots.length === 0"  class="q-ma-auto text-center">No Twoots</h5>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import TwootComponent from '../TwootComponent'
    import TwootTab from './TwootTab'

    export default {
        name: 'ProfileTwootsComponent',
        data() {
            return {
                currentTab: 'userTwoots'
            }
        },
        components: {
            TwootComponent,
            TwootTab
        },
        methods: {
            ...mapActions('twoots', ['fetchUserTwoots']),
            ...mapMutations('helpers', ['setAlert']),
            selectedTab(tab){
                if(tab === 'userTwoots'){
                    this.fetchUserTwoots(`${this.$route.params.id}?type=twoots`)
                }else if(tab === 'likedTwoots'){
                    this.fetchUserTwoots(`${this.$route.params.id}?type=likes`)
                }else if (tab === 'twootsWithMedia'){
                    this.fetchUserTwoots(`${this.$route.params.id}?type=media`)
                }else{
                    this.setAlert({
                        lightMessage: `I'm handling both the front-end and the backend by myself, and I got school`, 
                        strongMessage: "I'm still working on it, hopefully I'll be done soon", 
                        icon: 'system_security_update_warning',
                        color: 'black',
                        hideButtons: true
                    })
                }
            }
        },
        computed: {
            ...mapGetters('twoots', ['getFeedTwoots', 'isTwootsLoading']),
        },
    }
</script>

<style lang="scss" scoped>

</style>