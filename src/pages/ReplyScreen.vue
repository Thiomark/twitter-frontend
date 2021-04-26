<template>
     <q-page >
        <FixedHeaderComponent backButtonIcon='close' border reply @submitreply="submitTheTweet" :replyText='twoot ? true : false' backgroundColour="bg-white"/>
        <div class="reply-wrapper">
            <q-input    
                v-model="twoot" 
                maxlength="255" 
                autogrow 
                bg-color="white" 
                placeholder="Comment your reply"
            >
                <template v-slot:before>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png" alt="profile picture">
                    </q-avatar>
                </template>
            </q-input>
        </div>
    </q-page>
</template>

<script>
    import FixedHeaderComponent from '../components/headers/FixedHeaderComponent'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'ReplyScreen',
        components: {
            FixedHeaderComponent
        },
        data() {
            return {
                twoot: '',
                image: '',
            }
        },
        methods: {
            ...mapActions('twoots', ['replyToTwoot']),
            submitTheTweet(){
                this.replyToTwoot({twoot: this.twoot, image: this.image, origin_id: this.$store.state.twoots.twootReply.origin_id, reply_to: this.$store.state.twoots.twootReply.reply_to})
                this.twoot = ''
                this.image = ''
            }
        },
        computed: {
            ...mapGetters('twoots', ['getTwootReply'])
        }
    }
</script>

<style lang="scss" scoped>

    .reply-wrapper {
        padding: 6em 1em;

    }

</style>