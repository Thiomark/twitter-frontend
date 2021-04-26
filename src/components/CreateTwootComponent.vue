<template>
    <div class="q-pa-md create-twoot-container">
        <q-input 
            bottom-slots    
            placeholder="What's happening"
            v-model="twoot" 
            borderless
            maxlength="255" 
            autogrow
        >
            <template v-slot:before>
                <q-avatar>
                    <img :src="$store.state.user.user ? $store.state.user.user.avator : $store.state.user.avatorDefault">
                </q-avatar>
            </template>
        </q-input>
        <div class="q-pt-sm q-pb-sm bottom-container">
            <div>
                <q-icon @click="blockedPath" clickable v-ripple color="primary" class="q-mr-sm" size="2em" name="insert_photo" />
                <q-icon @click="blockedPath" clickable v-ripple color="primary" class="q-mr-sm" size="3em" name="gif" />
                <q-icon @click="blockedPath" clickable v-ripple color="primary" class="q-mr-sm" size="2em" name="sentiment_satisfied_alt" />
            </div>
            <q-btn unelevated rounded color="primary" @click="addTwoots" :disable="!twoot" class="q-mr-md" label="Twoot" />
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: "CreateTwootComponent",
        data() {
            return {
                twoot: ''
            }
        },
        methods: {
            ...mapActions('twoots',['createTwoot']),
            ...mapGetters('twoots',['getCreateTwootLoading']),
            ...mapMutations('helpers', ['setAlert']),
            addTwoots(){
                if(this.twoot){
                    this.createTwoot({twoot: this.twoot})
                }
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
    }
</script>

<style lang="scss" scoped>

    .bottom-container {
        margin-left: 4em;
        border-top: 1px solid rgba(224, 224, 224, 0.76);
        display: flex;      
        justify-content: space-between;
        align-items: center;
    }

</style>