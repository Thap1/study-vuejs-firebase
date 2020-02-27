<template>
    <div>
        <v-container>
            <AppToolbarHome></AppToolbarHome>
        </v-container>
        <v-container>
            <AppContentHome></AppContentHome>
        </v-container>
        <v-container>
            <AppFooterHome></AppFooterHome>
        </v-container>
    </div>
</template>

<script>
    // import firebase from "firebase";
    import AppToolbarHome from "../layout/AppToolbarHome";
    import AppFooterHome from "../layout/AppFooterHome";
    import AppContentHome from "../layout/AppContentHome";

    export default {
        name: "Home",
        components: {AppContentHome, AppFooterHome, AppToolbarHome},
        data() {
            return {
                data: []
            };
        },
        created() {


            // console.log(firebase.auth().currentUser);
        },

        methods: {}
    };
</script>

<style scoped></style>
