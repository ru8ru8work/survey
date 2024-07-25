<script>
import AnswerSurvey from "../components/AnswerSurvey.vue";
import CheckSurvey from "../components/CheckSurvey.vue";
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    data(){
        return{
            checkData:false,
        }
    },
    components: {
        AnswerSurvey,
        CheckSurvey,
        Header,
        Sidebar
    },
};
</script>

<template>

    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <div class="answer" v-if="this.checkData == false">
                <AnswerSurvey :childCheckData = "checkData" v-model:childCheckData="this.checkData"/>
            </div>

            <div v-if="this.checkData == true">
                <CheckSurvey :childCheckData="this.checkData" v-model:childCheckData="this.checkData"/>
            </div>
        </div>
    </div>


  
   
</template>

<style scoped lang="scss">
    #wrapper {
        overflow-x: hidden;
    }
</style>
