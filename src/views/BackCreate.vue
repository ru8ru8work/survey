<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import CreateSurvey from "../components/CreateSurvey.vue";
import SurveyResult from "../components/SurveyResult.vue";
import backgroundcolor from "../stores/backgroundcolor";

export default {
    data() {
        return {
            color: backgroundcolor(), // 直接在 data 中初始化 color
            surveyData: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                question: [
                    {
                        questionType: "1",
                        questionTitle: "",
                        order: 1,
                        required: false,
                        questionOption: [],
                    },
                ],
            },
            showResult: false, // 控制顯示結果頁面
        };
    },
    components: {
        Header,
        Sidebar,
        CreateSurvey,
        SurveyResult,
    },
    methods: {
        handleSurveySubmit(data) {
            this.surveyData = data;
            this.showResult = true;
        },
        backToCreate() {
            this.showResult = false;
        },

    },
};
</script>

<template>
    <div>
        <div class="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <Header />
                <CreateSurvey v-if="!showResult" :surveyData="surveyData" @submit-survey="handleSurveySubmit" />
                <SurveyResult v-else :surveyData="surveyData" @back="backToCreate" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
}

#page-content-wrapper {
    background-color: v-bind("color.mainColor");
}
</style>
