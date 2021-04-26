<template>
    <q-page>
        <main class="row">
            <div class="col-12 col-md-6 left q-pa-xl bg-primary">   
                <i class="fab middle fa-twitter"></i>
            </div>
            <div class="col-12 col-md-6 bg-white right q-pa-xl"> 
                <div class="second-inside">
                    <i class="fab fa-twitter"></i>
                    <div class="text text-weight-bolder"> See whats happening in<br> the world right now <span class="text-weight-bold">Join Twitter Today.</span></div>
                    <q-btn style="width: 80%" :to="{name: 'Register'}" class="q-py-sm q-my-md" unelevated rounded color="primary" label="Sign up" />
                    <q-btn style="width: 80%" :to="{name: 'Login'}" class="q-py-sm" outline rounded color="primary" label="Log in" />
                </div>
            </div>
        </main>
    </q-page>
</template>

<script>
    export default {
        name: "AuthScreen"
    }
</script>

<style lang="scss" scoped>

    @mixin centerItems() {
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 1023px) {
            height: 100vh;
        }
        @media (max-width: 1022px) {
            height: 48vh;
        }
        
    }

    main {
        .left {
            @include centerItems();
            .fa-twitter {
                color: white;
                font-size: 10rem;
            }
        }

        .right {
            @include centerItems();
            .fa-twitter {
                font-size: 2.5rem;
                color: #027BE3;
                margin-bottom: .2em;
            }

            .text {
                font-size: 2.5rem;
                line-height: 1;

                span {
                    padding-top: .6em;
                    font-size: 1.3rem;
                    display: block;
                }
            }
        }

    }
</style>