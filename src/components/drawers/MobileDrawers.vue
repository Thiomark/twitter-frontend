<template>
    <section>
        <div class="content q-ma-md" v-if="$store.state.user.user">
            <q-skeleton v-if="!$store.state.user.user" bordered type="circle" size="5em" class="bg-grey-4 q-mb-md" />
            
            <q-avatar v-if="$store.state.user.user" class="profile-avator q-mb-md" size="5em">
                <img :src="$store.state.user.user.avator ? $store.state.user.user.avator : $store.state.user.avatorDefault">
            </q-avatar>
            <q-skeleton v-if="!$store.state.user.user" width="9em" />
            <h1 class="text-grey-10 text-weight-bolder" v-if="$store.state.user.user">{{$store.state.user.user.username}}</h1>
            <h1 class="text-grey-6" v-if="$store.state.user.user">@{{this.$store.state.user.user.username}}<q-icon color="primary" :name="this.$store.state.user.user.is_verfied ? 'verified' : ''" /></h1>        
            <div class="following q-py-md">
                <q-skeleton v-if="!$store.state.user.user.following" class="q-my-md q-mr-md" width="6em" />
                <q-skeleton v-if="!$store.state.user.user.followers" class="q-my-md" width="6em" />
                <router-link class="text-grey-6" v-if="$store.state.user.user.following" :to='`/${this.$store.state.user.user.username}/following`' ><strong class="text-grey-9">{{$store.state.user.user.following}}</strong>Following</router-link>
                <router-link class="text-grey-6" v-if="$store.state.user.user.followers" :to='`/${this.$store.state.user.user.username}/followers`' ><strong class="text-grey-9">{{$store.state.user.user.followers}}</strong>Followers</router-link>
            </div>
        </div>
        <q-list >
            <LayoutButton pageName="Settings" iconName="settings" routeTo="/settings"/>
            <LayoutButton pageName="Profile" v-if="$store.state.user.user" iconName="perm_identity" :routeTo="`/${this.$store.state.user.user.username}`"/>
        </q-list>
    </section>
</template>

<script>

    import LayoutButton from '../helpers/LayoutButton'

    export default {
        name: 'MobileDrawer',
        components: {
            LayoutButton
        },
        data() {
            return {
                userLoading: false,
            }
        },
    }
</script>

<style lang="scss" scoped>

    .add-border-bottom {
        
    }

    .content {

        h1 {
            margin: 0;
            padding: 0;
            line-height: 1.5;
            font-size: 1.1em;
        }

        a {
            font-size: .975rem;
            text-decoration: none;
            strong {
                padding-right: .4em;
            }
        }

        a {
            margin-right: 1em;
        }

        .following {
            display: flex;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
    }

</style>