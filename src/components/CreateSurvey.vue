<script>
import { defineComponent } from "vue";
import backgroundcolor from "../stores/backgroundcolor";
import draggable from "vuedraggable";

export default defineComponent({
    components: {
        draggable,
    },
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    props: {
        surveyData: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // 在 created 钩子中将 surveyData 赋值给 createFormData
        this.createFormData = this.surveyData;
    },
    data() {
        return {
            idCount: 1,
            createFormData: {
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
        };
    },
    methods: {
        handleSelectTypeChange(event, item) {
            const selectValue = event.target.value;
            item.questionType = selectValue;

            this.$nextTick(() => {
                const optionTextArea = event.target
                    .closest(".question-item")
                    .querySelector(".optionTextArea");
                const optionRadio = event.target
                    .closest(".question-item")
                    .querySelector(".optionRadio");
                const optionCheckbox = event.target
                    .closest(".question-item")
                    .querySelector(".optionCheckbox");

                optionTextArea.style.display = selectValue == "1" ? "block" : "none";
                optionRadio.style.display = selectValue == "2" ? "block" : "none";
                optionCheckbox.style.display = selectValue == "3" ? "block" : "none";

                if (selectValue == "2" || selectValue == "3") {
                    if (item.questionOption.length === 0) {
                        this.addOption(item);
                    }
                }
            });
        },
        addArea() {
            const question = this.createFormData.question;
            question.push({
                questionType: "1",
                questionTitle: "",
                order: question.length + 1,
                required: false,
                questionOption: [],
            });
        },
        addOption(item) {
            item.questionOption.push({
                value: item.questionOption.length + 1,
                show: "",
            });
        },
        removeOption(item, index) {
            item.questionOption.splice(index, 1);
        },
        removeQuestion(index) {
            this.createFormData.question.splice(index, 1);
            this.updateOrder();
        },
        updateOrder() {
            this.createFormData.question.forEach((item, index) => {
                item.order = index + 1;
            });
        },
        onDragEnd() {
            this.updateOrder();
        },
        submitSurvey() {
            // 在這裡可以添加表單驗證邏輯
            this.$emit('submit-survey', this.createFormData);
        }
    },

});
</script>

<template>
    <!-- <h1>{{ createFormData }}</h1> -->
    <form class="background">
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1>
                        <input type="text" placeholder="請填入表單名稱" class="titleUnderLine"
                            v-model="createFormData.title" />
                    </h1>
                </div>

                <div class="description">
                    <span>
                        <textarea name="" id="" autocomplete="off" placeholder="請填入表單敘述"
                            v-model="createFormData.description"></textarea>
                    </span>
                </div>
            </div>

            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">開始時間:</span>
                            <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" id="startDate" autocomplete="off"
                                v-model="createFormData.startDate" />
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">結束時間:</span>
                            <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" id="endDate" autocomplete="off"
                                v-model="createFormData.endDate" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- {{ createFormData.question }} -->

            <draggable v-model="createFormData.question" class="questionCreate" id="questionCreate" item-key="order"
                handle=".handle" @end="onDragEnd">
                <template #item="{ element }">
                    <div class="question-item">
                        <div class="dragicon handle">
                            <i class="fa-solid fa-grip-lines"></i>
                        </div>

                        <div class="col-md-9 item-box question-item-title">
                            <div class="input-group">
                                <span class="input-group-text" id="inputGroup-sizing-default">輸入題目:</span>
                                <input type="text" class="form-control" placeholder="請填寫題目"
                                    v-model="element.questionTitle" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </div>

                        <div class="col-md-3 item-box question-item-title">
                            <select class="form-select selectType" aria-label=".form-select-lg example"
                                v-model="element.questionType" @change="handleSelectTypeChange($event, element)">
                                <option value="1">text</option>
                                <option value="2">radio</option>
                                <option value="3">checkbox</option>
                            </select>
                        </div>

                        <!-- 建立回答選項 -->
                        <div class="optionArea">
                            <div class="optionTextArea" v-show="element.questionType == '1' || !element.questionType">
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="" id="floatingTextarea"
                                        readonly></textarea>
                                    <label for="floatingTextarea"></label>
                                </div>
                            </div>

                            <div class="optionRadio" v-show="element.questionType == '2'">
                                <div class="addRadioArea" v-for="(questionOption, index) in element.questionOption"
                                    :key="index">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="" id="" disabled />
                                        <label class="form-check-label" for="">
                                            <input type="text" class="form-control radioInput"
                                                v-model="questionOption.show" placeholder="請填寫選項"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />
                                        </label>
                                        <i class="fa-solid fa-xmark" @click="removeOption(element, index)"></i>
                                    </div>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="" id="" disabled />
                                    <label class="form-check-label" for="">
                                        <input type="text" class="form-control checkboxinput" id="addCheckbox"
                                            placeholder="增加選項" @click="addOption(element)"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" />
                                    </label>
                                </div>
                            </div>

                            <div class="optionCheckbox" v-show="element.questionType == '3'">
                                <div class="addCheckboxArea" v-for="(questionOption, index) in element.questionOption"
                                    :key="index">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                            disabled />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            <input type="text" class="form-control checkboxinput" placeholder="請填寫選項"
                                                v-model="questionOption.show" aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />
                                        </label>
                                        <i class="fa-solid fa-xmark" @click="removeOption(element, index)"></i>
                                    </div>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                        disabled />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <input type="text" class="form-control checkboxinput" id="addCheckbox"
                                            placeholder="增加選項" @click="addOption(element)"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" />
                                    </label>
                                </div>
                            </div>

                            <div class="delDiv">
                                <i class="fa-solid fa-trash-can" id="delQuestion" @click="
                                    removeQuestion(createFormData.question.indexOf(element))
                                    "></i>
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">必填</label>
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                        v-model="element.required" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>

            <div class="addButton">
                <button type="button" class="btn btn-primary me-md-2" @click="addArea()">
                    新增問題
                </button>
            </div>

            <!-- 按鈕 -->
            <div class="button">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary me-md-2" type="button" @click="submitSurvey">送出</button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.background {
    //min-height: 100dvh;
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
        // margin: 2%;

        .title {
            //border: 1px solid black;
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
            }

            ::placeholder {
                color: v-bind("color.secondColor");
            }

            .description {
                // border: 1px solid black;
                width: 100%;
                font-size: 21px;

                textarea {
                    width: 100%;
                    height: 10dvh;
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

        .addButton {
            width: 80%;
            border: 1px solid v-bind("color.borderColor");
            background-color: v-bind("color.secondColor");
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3.75%;
        }

        .button {
            width: 80%;
        }
    }
}

textarea {
    height: 100px;
    width: 200px;
}

#wrapper.toggled {
    .background {
        width: 100dvw;
    }
}

@media (max-width: 768px) {
    .background {
        width: 100%;
    }
}
</style>

<!-- 動態產生的區塊會吃不到scoped所以要創一個新的 -->
<style lang="scss">
.questionCreate {
    // ::placeholder{
    //     color: black;
    // }

    //border: 1px solid black;
    width: 80%;

    // padding: 1rem 0; // 上下內邊距
    .question-item {
        border: 1px solid v-bind("color.borderColor");
        background-color: v-bind("color.secondColor");
        border-radius: 10px;
        padding: 2%;
        margin-bottom: 3.75%; // 每個問題的底部間距
        display: flex;
        flex-wrap: wrap;

        // align-items: center; /* 垂直居中 */
        // justify-content: center; /* 水平居中 */
        .dragicon {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

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

            // height: 20dvh;
            // background-color: black;
            // border: 1px solid black;
            .optionTextArea {
                .form-control {
                    width: 50%;
                    height: 10dvh;
                }
            }

            .optionRadio {
                .radioInput {
                    // border: 0px;
                    // border-bottom: 1px solid black;
                }
            }

            .optionCheckbox {
                .checkboxinput {}
            }

            .fa-xmark {
                font-size: 25px;
                margin-left: 10px;
                cursor: pointer;
            }

            .delDiv {
                border: 0px;
                border-top: 1px solid black;
                // border: 1px solid black;
                padding: 2%;
                margin: 2%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 20px;
                margin-bottom: 0%;

                // background-color: black;
                .fa-trash-can {
                    cursor: pointer;
                    margin-right: 2%;
                }


            }
        }

  
    }
}
</style>

