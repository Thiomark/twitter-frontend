<template>
    <q-tabs
        v-model="tab"
        inline-label
        :breakpoint="0"
        align="justify"
        class="text-black "
    >
        <q-tab ripple @click="selectedTab('followers_you_follow')" no-caps name="followers_you_follow" label="Followers you know" />
        <q-tab ripple @click="selectedTab('followers')" no-caps name="followers" label="Followers" />
        <q-tab ripple @click="selectedTab('following')" no-caps name="following" label="Following" />
    </q-tabs> 
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'TabsComponent',
        data() {
            return {
                tab: `${this.$route.params.tab}`,
            }
        },
        methods: {
            ...mapActions('user', ['fetchFollowers']),
            selectedTab(tab){
                this.$router.push({
                    path: `/${this.$route.params.id}/${tab}`
                })
                this.fetchFollowers({username: `${this.$route.params.id}`,search: `${this.$route.params.tab}`})
            },
        },
        created() {
            this.fetchFollowers({username: `${this.$route.params.id}`,search: `${this.$route.params.tab}`})
        },
    }
</script>

<style lang="scss" scoped>

</style>