<script >
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import CreateSurvey from "../components/CreateSurvey.vue";

import backgroundcolor from '../stores/backgroundcolor'


export default {
    data(){
        return {
            colorTest:"",
        }
    },
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    components: {
        Header,
        Sidebar,
        CreateSurvey,
        
    },
    computed: {

    }
};
</script>

<template>
    
    <div>

    </div>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <CreateSurvey />
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
}
#page-content-wrapper{
        background-color: v-bind('color.mainColor');
    }
</style>
