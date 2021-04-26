<template>
    <section class="desktop-drawers">
        <div>
            <q-icon class="q-pa-md" @click="navigateTo('Home')" size="2rem" color="primary" name="fab fa-twitter" />
            <q-list >
                <LayoutButton 
                    v-if="$store.state.user.user"
                    :pageName="pages[0].pageName" :iconName="pages[0].iconName" :routeTo="pages[0].routeTo"
                    iconSize='md' textSize='text-h6'
                />
                <LayoutButton 
                    v-if="$store.state.user.user"
                    :pageName="pages[1].pageName" :iconName="pages[1].iconName" :routeTo="$store.state.user.user ? $store.state.user.user.username : ''"
                    iconSize='md' textSize='text-h6'
                />
                <LayoutButton 
                    v-if="$store.state.user.user"
                    :pageName="pages[2].pageName" :iconName="pages[2].iconName" :routeTo="pages[2].routeTo"
                    iconSize='md' textSize='text-h6'
                />
                <LayoutButton 
                    v-if="$store.state.user.user"
                    :pageName="pages[3].pageName" :iconName="pages[3].iconName" :routeTo="pages[3].routeTo"
                    iconSize='md' textSize='text-h6'
                />
                <LayoutButton 
                    :pageName="pages[4].pageName" :iconName="pages[4].iconName" 
                    iconSize='md' textSize='text-h6'
                    @click="blockedPath"
                />

            </q-list>
        </div>
        <q-item v-if="$store.state.user.user" class="q-mb-sm absolute-bottom" clickable v-ripple>
            <q-menu class="menu-section" fit>
                <q-list style="min-width: 100px">
                    <div class="profile-area">
                        <q-avatar>
                            <img :src="$store.state.user.user.avator">
                        </q-avatar>
                        <div>
                            <q-item-label>{{ $store.state.user.user.username }}</q-item-label>
                            <q-item-label caption lines="1">{{ $store.state.user.user.name  }}</q-item-label>
                        </div>
                    </div>
                    <q-separator />
                    <q-item @click="removeLoggedInUser" clickable>
                        <q-item-section>Log out @{{$store.state.user.user.username}}</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
            <q-item-section avatar>
                <q-avatar>
                    <img :src="$store.state.user.user.avator">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ $store.state.user.user.username }}</q-item-label>
                <q-item-label caption lines="1">{{ $store.state.user.user.name  }}</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-icon name="more_horiz" color="grey" />
            </q-item-section>
        </q-item>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
    import LayoutButton from '../helpers/LayoutButton'
    export default {
        name: 'DesktopDrawers',
        components: {
            LayoutButton
        },
        data() {
            return {
                userLoading: true,
                pages: [
                    {pageName: 'Home', iconName: 'home', routeTo: '/home'},
                    {pageName: 'Profile', iconName: 'perm_identity', routeTo: ``},
                    {pageName: 'Notifications', iconName: 'far fa-bell', routeTo: '/notifications'},
                    {pageName: 'Messages', iconName: 'mail_outline', routeTo: '/messages'},
                    {pageName: 'Settings', iconName: 'settings', routeTo: '/settings'}
                ]
            }
        },
        methods: {
            ...mapMutations('helpers', ['setAlert']),
            ...mapMutations('user', ['removeLoggedInUser']),
            navigateTo(page){
                this.$router.push({
                    name: page
                })
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
            logUserOut(){

            }
        },
        computed: {
            ...mapGetters('user', ['getUser'])
        }
    }
</script>

<style lang="scss" scoped>

    .menu-section {
        border-radius: 1em;
    }
    .profile-area {
        padding: 1em 0 .6em 0;
        display: flex;
        align-items: center;

        div {
            margin-left: .6em;
        }
    }

</style>