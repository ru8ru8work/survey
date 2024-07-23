<script>
import AnswerSurvey from "../components/AnswerSurvey.vue";
import CheckSurvey from "../components/CheckSurvey.vue";

export default {
    data(){
        return{
            check:false,
        }
    },
    components: {
        AnswerSurvey,
        CheckSurvey
    },
};
</script>

<template>
    <div class="answer" v-if="this.check == false">
        <AnswerSurvey />
    </div>
    
    <div v-if="this.check == true">
        <CheckSurvey />
    </div>
    
</template>

<style scoped lang="scss">
    
</style>
