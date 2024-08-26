<script>
import backgroundcolor from "../stores/backgroundcolor";
import axios from "axios";

export default {
    props: {
        surveyData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    data() {
        return {
            survey: {
                name: "id123123123123123123123試",
                description: "BB12311111111111",
                startDate: "2024-08-26",
                endDate: "2024-08-27",
                published: true,
                quesList: [
                    {
                        id: 1,
                        qu: "question",
                        type: "text",
                        necessary: true,
                        option: [
                            {
                                value: "",
                            },
                            {
                                value: "",
                            }
                        ],
                        options: "aaa",
                    },
                ],
            },
        };
    },
    methods: {
        goBack() {
            this.$emit("back", this.surveyData); // 傳遞 surveyData 到父層
        },
        async createSurvey() {
            // alert("123123");
            console.log(this.surveyData);

            this.surveyData.quesList.forEach((question) => {
                question.options = question.option
                    .map((option) => option.value)
                    .join(";");
            });
            try {
                // 發送 POST 請求
                const response = await axios.post(
                    "http://localhost:8080/quiz/create",
                    this.surveyData
                );
                // 請求成功後的操作
                console.log(this.surveyData);
                console.log("Survey created:", response.data);
            } catch (error) {
                // 請求失敗後的操作
                console.log(this.surveyData);
                console.error("There was an error!", error);
            }
        },
    },
};
</script>

<template>
    {{ surveyData }}

    <form class="background">
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1>
                        <span class="titleUnderLine">{{
                            surveyData.name
                        }}</span>
                    </h1>
                </div>
                <div class="description">
                    <span>
                        <p>{{ surveyData.description }}</p>
                    </span>
                </div>
            </div>

            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text">開始時間:</span>
                            <span class="form-control">{{
                                surveyData.startDate
                            }}</span>
                        </div>
                    </div>
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text">結束時間:</span>
                            <span class="form-control">{{
                                surveyData.endDate
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="questionCreate" id="questionCreate">
                <div
                    v-for="(question, questionIndex) in surveyData.quesList"
                    :key="questionIndex"
                    class="question-item"
                >
                    <div class="col-md-9 item-box question-item-title">
                        <div class="input-group">
                            <span class="input-group-text">題目:</span>
                            <span class="form-control">{{ question.qu }}</span>
                        </div>
                    </div>
                    <div class="col-md-3 item-box question-item-title">
                        <span class="form-control">
                            {{
                                question.type === "1"
                                    ? "text"
                                    : question.type === "2"
                                    ? "radio"
                                    : "checkbox"
                            }}
                        </span>
                    </div>
                    <!-- 顯示選項 -->
                    <div class="optionArea">
                        <div
                            class="optionTextArea"
                            v-if="question.type === '1'"
                        >
                            <div class="form-floating">
                                <p class="form-control">文字回答區域</p>
                            </div>
                        </div>
                        <div
                            class="optionRadio"
                            v-if="question.type === '2'"
                        >
                            <div
                                v-for="(
                                    option, optionIndex
                                ) in question.option"
                                :key="optionIndex"
                                class="form-check"
                            >
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    disabled
                                />
                                <label class="form-check-label">
                                    {{ option.show }}
                                </label>
                            </div>
                        </div>
                        <div
                            class="optionCheckbox"
                            v-if="question.type === '3'"
                        >
                            <div
                                v-for="(
                                    option, optionIndex
                                ) in question.option"
                                :key="optionIndex"
                                class="form-check"
                            >
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    disabled
                                />
                                <label class="form-check-label">
                                    {{ option.show }}
                                </label>
                            </div>
                        </div>
                        <div class="delDiv">
                            <div class="form-check form-switch">
                                <label class="form-check-label">必填</label>
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :checked="question.required"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="button">
                <div class="d-grid gap-2 d-md-flex justify-content-md-between">
                    <button
                        class="btn btn-primary me-md-2"
                        type="button"
                        @click="goBack"
                    >
                        返回編輯
                    </button>
                    <button
                        class="btn btn-primary me-md-2"
                        type="button"
                        @click="createSurvey"
                    >
                        送出表單
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.background {
    width: 100dvw;
    background-color: v-bind("color.mainColor");
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100dvw - 15rem);
    transition: width 0.25s ease-out;

    .content {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;

        .title {
            width: 80%;
            height: 20%;
            margin: 3%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Noto Sans TC", sans-serif;
            border: 1px solid v-bind("color.borderColor");
            background-color: v-bind("color.secondColor");
            border-radius: 10px;
            padding: 2%;

            .titleUnderLine {
                border: 0px;
                border-bottom: 1px solid black;
                text-align: center;
                background-color: v-bind("color.sidebarColor");
                color: white;
                border-radius: 5px;
                width: 100%;
                letter-spacing: 4px;
                display: inline-block;
                padding: 5px;
            }

            .description {
                width: 100%;
                font-size: 21px;

                p {
                    width: 100%;
                    min-height: 10dvh;
                    margin-top: 10px;
                }
            }
        }

        .secondArea {
            width: 80%;
            // height: 20%;
            // border: 1px solid black;
            border: 1px solid v-bind("color.borderColor");
            background-color: v-bind("color.secondColor");
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3.75%;
        }

        .questionCreate {
            width: 80%;
        }

        .button {
            width: 80%;
        }
    }
}

.question-item {
    border: 1px solid v-bind("color.borderColor");
    background-color: v-bind("color.secondColor");
    border-radius: 10px;
    padding: 2%;
    margin-bottom: 3.75%;
    display: flex;
    flex-wrap: wrap;

    .question-item-title {
        padding: 2%;

        .input-group-text {
            background-color: v-bind("color.sidebarColor");
            color: white;
        }
    }

    .optionArea {
        width: 100%;
        padding: 2%;

        .optionTextArea,
        .optionRadio,
        .optionCheckbox {
            margin-bottom: 10px;
        }

        .delDiv {
            border-top: 1px solid black;
            padding: 2%;
            margin: 2% 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 20px;
        }
    }
}

@media (max-width: 768px) {
    .background {
        width: 100%;
    }
}
</style>
