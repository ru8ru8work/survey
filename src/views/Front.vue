<script >
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import FrontShow from "../components/FrontShow.vue";

import backgroundcolor from '../stores/backgroundcolor'
// import { mapState } from 'pinia'


export default {
    data(){
        return {
            colorTest:"",
            searchId:""
        }
    },
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    components: {
        Header,
        Sidebar,
        FrontShow,
        
    },
    methods:{

    },
    computed: {
        // ...mapState(backgroundcolor,["maincolor"]),

    }
};
</script>

<template>
    <div>
        <!-- <button @click="color.changecolor(colorTest)">click</button>
        <input type="color" v-model=this.colorTest>
        <h1>{{ colorTest }}</h1> -->
    </div>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <FrontShow />
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
}
</style>
