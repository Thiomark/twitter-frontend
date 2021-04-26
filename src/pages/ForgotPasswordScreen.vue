<template>
    <FormComonent 
        page="Find your Twitter account" 
        buttonText="Search"
        :buttonState="username"
        width="500px"
        goTo="/login"
        goToPage="Log in instead"
        @onsubmit="submitForm"
    >
        <p class="text-subtitle1" style="display: block">Enter your email, phone number, or username.</p>
        <q-input 
            style="width: 100%" type="text" label="Name"  
            outlined v-model="username"
        />
    </FormComonent>
</template>

<script>

    import FormComonent from '../components/helpers/FormComonent'
    import { mapActions} from 'vuex'
    export default {
        name: "ForgotPasswordScreen",
        components: {
            FormComonent
        },
        data() {
            return {
                username: ''
            }
        },
        methods: {
            ...mapActions('user', ['authUser']),
            submitForm(){
                if(this.username){
                    this.authUser({username: this.username, password: this.password})
                }
            },
        },
    }
</script>
