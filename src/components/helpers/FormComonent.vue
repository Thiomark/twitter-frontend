<template>
    <q-page>
        <q-form
            :style="{maxWidth: width}"
            @submit="onSubmit"
            class="q-gutter-md form-screen"
        >
            <i class="fab middle fa-twitter"></i>
            <div class="text-h4 text-weight-bolder">{{page}}</div>
            <div class="alert bg-grey-3 q-pa-md" v-if="getError">
                <div v-for="(error, index) of getError" :key="index">{{error.msg}}
            </div>
            </div>
                <slot></slot>
            <q-btn 
                type="submit" style="width: 100%" class="q-py-sm" color="primary"
                :loading="getLoading" :disable="buttonState ? false : true" unelevated rounded  :label="buttonText" 
            />
            <div style="display: flex; justify-content: center; width: 100%">
                <router-link v-if="$route.path === '/login'" to="/account/begin_password_reset">Forgot password?</router-link>
                    <div v-if="$route.path === '/login'">&middot;</div>
                <router-link :to="goTo">{{goToPage}}</router-link>
            </div>
        </q-form>
    </q-page>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Formcomponent",
        props: {
            page: {
                type: String,
                required: true
            },
            buttonText: {
                type: String,
                required: true
            },
            buttonState: {
                type: String,
                required: true
            },
            width: {
                type: String,
                required: true
            },
            goTo: {
                type: String,
                required: true
            },
            goToPage: {
                type: String,
                required: true
            },
        },
        computed: {
            ...mapGetters('user', ['getLoading', 'getError'])
        },
        methods: {
            onSubmit(){
                this.$emit('onsubmit')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .q-form {
        margin: auto;

        a {
            color: #79cafc;
            margin: 0 .4em;
        }
    }

    .fa-twitter {
        font-size: 2rem;
        color: #027BE3;
    }

    .alert {
        border-radius: .4em;
        width: 100%;
    }

</style>