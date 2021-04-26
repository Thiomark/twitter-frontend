<template>
    <q-dialog v-model="alert">
        <q-card >
            <q-card-section class="row items-center q-pb-none">
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                 <slot></slot>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "DialogComponent",
        props: {
            alert: {
                type: Boolean,
                required: true
            }
        }
    }
</script>