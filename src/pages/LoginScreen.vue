<template>
    <FormComonent 
        page="Log in to Twooter" 
        buttonText="Log in"
        :buttonState="username && password"
        width="400px"
        goTo="/register"
        goToPage="Sign up for Twitter"
        @onsubmit="submitForm"
    >
        <q-input style="width: 100%" outlined v-model="username" type="text" label="Email or username" />
        <q-input style="width: 100%" outlined v-model="password" type="Password" label="Password" />
    </FormComonent>
</template>

<script>

    import FormComonent from '../components/helpers/FormComonent'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: "LoginScreen",
        components: {
            FormComonent
        },
        data() {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters('user', ['getUser'])
        },
        created() {
            this.setError(null)
        },
        methods: {
            ...mapMutations('user', ['setError']),
            ...mapActions('user', ['authUser']),
            submitForm(){
                if(this.username && this.password){
                    this.authUser({username: this.username, password: this.password})
                }
            },
            
        },
    }
</script>