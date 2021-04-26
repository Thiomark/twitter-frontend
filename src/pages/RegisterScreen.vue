<template>
    <FormComonent 
        page="Create your account" 
        buttonText="Log in"
        :buttonState="name && password && username && email && day && year && month"
        width="700px"
        goTo="/login"
        goToPage="Log in instead"
        @onsubmit="submitForm"
    >
        <q-input 
            style="width: 100%" type="text" label="Name"  
            outlined v-model="name" :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input 
            style="width: 100%" type="email" label="Email"  
            outlined v-model="email" :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input 
            style="width: 100%" type="text" label="Username"  
            outlined v-model="username" :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input 
            style="width: 100%" type="password" label="Password"  
            outlined v-model="password" :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <div><span class="text-weight-bold text-h6">Date of birth</span> <p class="text-subtitle1" style="display: block">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p></div>
        
        <div class="row" style="width: 100%">
            <q-select class="col-6 q-gutter-md" outlined v-model="month" :options="theMonths" label="Month" />
            <q-space></q-space>
            <q-select class="col-3" outlined v-model="day" :options="generateArrayOfDays(getIndexOf(month), year)" label="Day" /> 
            <q-space></q-space>
            <q-select class="col-3" outlined v-model="year" :options="generateArrayOfYears()" label="Year" />
        </div>
    </FormComonent>
</template>

<script>

    import FormComonent from '../components/helpers/FormComonent'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: "RegisterScreen",
        components: {
            FormComonent
        },
        data() {
            return {
                name: '',
                password: '',
                username: '',
                email: '',
                year: '',
                day: '',
                month: '',
                theMonths: ["January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October", "November", "December"]
                }
        },
        computed: {
            ...mapGetters('user', ['getUser']),
        },
        methods: {
            ...mapActions('user', ['registerUser']),
            ...mapMutations('user', ['setError']),
            submitForm(){

                const birth_date = `${this.year}-${this.getIndexOf(this.month)}-${this.day}`

                if(this.name && this.username && this.password && birth_date && this.email){
                    this.registerUser({ 
                        username: this.username, 
                        password: this.password, 
                        birth_date: birth_date, 
                        email: this.email, 
                        name: this.name
                    })
                }
            },
            generateArrayOfYears() {
                let max = new Date().getFullYear()
                let min = max - 150
                let years = []
            
                for (let i = max; i >= min; i--) {
                    years.push(i)
                }
                return years
            },
            generateArrayOfDays(month = 1, year = 2021) {
                const monthDays = new Date(year, month, 0).getDate();
                let days = []
                for(let i = 1; i <= monthDays; i++){
                        days.push(i)
                }
                if(this.day > days.length){
                    this.day = ''
                }
                return days
            },
            getIndexOf(month){
                if(!month){
                    return null
                }
                return this.theMonths.indexOf(month) + 1
            }
        },
        created() {
            this.setError(null)
        },
    }
</script>

