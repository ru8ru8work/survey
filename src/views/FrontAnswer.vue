<script>
import AnswerSurvey from "../components/AnswerSurvey.vue";
import CheckSurvey from "../components/CheckSurvey.vue";
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import backgroundcolor from '../stores/backgroundcolor';

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    data(){
        return{
            checkData:false,
            formData: {
              
            },
        }
    },
    components: {
        AnswerSurvey,
        CheckSurvey,
        Header,
        Sidebar
    },
    methods: {
        handleFormSubmit(data) {
            this.formData = data;
            this.checkData = true;
        }
    }
};
</script>

<template>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <div class="answer" v-if="checkData == false">
                <AnswerSurvey :childCheckData = "checkData" v-model:childCheckData="this.checkData" @form-submit="handleFormSubmit" :childFormData="formData"/>
            </div>

            <div v-if="checkData == true">
                <CheckSurvey :childCheckData="this.checkData" v-model:childCheckData="this.checkData"  :formData="formData"/>
            </div>
        </div>
    </div>


  
   
</template>

<style scoped lang="scss">
    #wrapper {
        overflow-x: hidden;
        overflow-y: hidden;
    }

    #page-content-wrapper{
        background-color: v-bind('color.mainColor');
    }

</style>
