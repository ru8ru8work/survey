<script>
import { defineComponent } from "vue";
import backgroundcolor from "../stores/backgroundcolor";
import draggable from "vuedraggable";
import axios from "axios";

export default defineComponent({
    components: {
        draggable,
    },
    data() {
        return {
            searchId: {
                id: "",
            },
        };
    },
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    props: {
        surveyData: {
            type: Object,
            required: true,
        },
    },
    async created() {
        // this.searchId.id = sessionStorage.getItem("searchId") || "No ID found";
        // try {
        //     // console.log("這裡有進來" + this.searchId);
        //     // 發送 POST 請求
        //     const response = await axios.post(
        //         "http://localhost:8080/quiz/search",
        //         this.searchId
        //     );
        //     // 請求成功後的操作
        //     // console.log(response.data.quizResList);
        //     this.surveyData[0].title = response.data.quizResList[0].name;
        //     this.surveyData[0].description =
        //         response.data.quizResList[0].description;
        //     const quesListArr = response.data.quizResList[0].quesList;
        //     for (let i = 0; i < quesListArr.length; i++) {
        //         if (!this.surveyData[0].question[i]) {
        //             this.surveyData[0].question[i] = {
        //                 questionType: "",
        //                 questionTitle: "",
        //                 order: "",
        //                 required: "",
        //                 questionOption: "",
        //             };
        //         }
        //         this.surveyData[0].question[i].order = quesListArr[i].id;
        //         this.surveyData[0].question[i].required = quesListArr[i].necessary;
        //         this.surveyData[0].question[i].questionTitle = quesListArr[i].qu;
        //         this.surveyData[0].question[i].questionType = quesListArr[i].type;
        //         if (quesListArr[i].options != "") {
        //             // console.log(" 這裡是 " + i + quesListArr[i].options);
        //             const optionArr = quesListArr[i].options.split(";");
        //             if (!Array.isArray(this.surveyData[0].question[i].questionOption)) {
        //                 this.surveyData[0].question[i].questionOption = [];
        //             }
        //             for (let j = 0; j < optionArr.length; j++) {
        //                 // console.log("Item at index", j, ":", optionArr[j]);
        //                 if (!this.surveyData[0].question[i].questionOption[j]) {
        //                     this.surveyData[0].question[i].questionOption[j] =
        //                     {
        //                         value: "",
        //                         show: ""
        //                     }
        //                 };
        //                 this.surveyData[0].question[i].questionOption[j].value = j + 1;
        //                 this.surveyData[0].question[i].questionOption[j].show = optionArr[j];
        //                 if (quesListArr[i].type == 3) {
        //                     if (!Array.isArray(this.formData.checkbox[quesListArr[i].id])) {
        //                         this.formData.checkbox[quesListArr[i].id] = [];
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // } catch (error) {
        //     console.error("There was an error!", error);
        // }
    },
    mounted() {
        // this.createFormData = this.surveyData;

        const startDate = document.querySelector("#startDate");
        const endDate = document.querySelector("#endDate");

        const updateEndDateMin = () => {
            const startDateValue = startDate.value;
            if (startDateValue) {
                endDate.min = startDateValue;
            } else {
                endDate.min = "";
            }
        };

        startDate.addEventListener("change", updateEndDateMin);
        updateEndDateMin();

        const updateStartDateMax = () => {
            const endDateValue = endDate.value;
            if (endDateValue) {
                startDate.max = endDateValue;
            } else {
                startDate.max = "";
            }
        };

        endDate.addEventListener("change", updateStartDateMax);
    },
    data() {
        return {
            idCount: 1,
            createFormData: {
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                published: "",
                quesList: [
                    {
                        id: 1,
                        qu: "",
                        type: "1",
                        order: 1,
                        necessary: false,
                        option: [],
                        options: "",
                    },
                ],
            },
            searchId: {
                id: "",
            },
        };
    },
    async created() {
        this.searchId.id = sessionStorage.getItem("searchId");

        console.log("這裡有searchId" + this.searchId.id);

        if (this.searchId.id != null) {
            try {
                // console.log("這裡有進來" + this.searchId);

                // 發送 POST 請求
                const response = await axios.post(
                    "http://localhost:8080/quiz/search",
                    this.searchId
                );
                // 請求成功後的操作

                this.createFormData.name = response.data.quizResList[0].name;
                this.createFormData.description =
                    response.data.quizResList[0].description;

                this.createFormData.startDate =
                    response.data.quizResList[0].startDate;
                this.createFormData.endDate =
                    response.data.quizResList[0].endDate;
                this.createFormData.published =
                    response.data.quizResList[0].published;

                const quesListArr = response.data.quizResList[0].quesList;

                for (let i = 0; i < quesListArr.length; i++) {
                    if (!this.createFormData.quesList[i]) {
                        this.createFormData.quesList[i] = {
                            id: "",
                            qu: "",
                            type: "1",
                            order: "",
                            necessary: "",
                            option: [],
                            options: "",
                        };
                    }

                    this.createFormData.quesList[i].id = quesListArr[i].id;
                    this.createFormData.quesList[i].qu = quesListArr[i].qu;
                    this.createFormData.quesList[i].order = quesListArr[i].id;
                    this.createFormData.quesList[i].necessary =
                        quesListArr[i].necessary;
                    this.createFormData.quesList[i].type = quesListArr[i].type;

                    if (quesListArr[i].options != "") {
                        const optionArr = quesListArr[i].options.split(";");
                        for (let j = 0; j < optionArr.length; j++) {
                            this.createFormData.quesList[i].option[j] = {
                                value: "",
                                show: "",
                            };

                            this.createFormData.quesList[i].option[j].value =
                                j + 1;
                            this.createFormData.quesList[i].option[j].show =
                                optionArr[j];
                        }
                    }

                    //     console.log(quesListArr[i]);
                }
            } catch (error) {
                console.error("There was an error!", error);
            }
        }
    },
    methods: {
        handleSelectTypeChange(event, item) {
            const selectValue = event.target.value;
            item.type = selectValue;

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

                optionTextArea.style.display =
                    selectValue == "1" ? "block" : "none";
                optionRadio.style.display =
                    selectValue == "2" ? "block" : "none";
                optionCheckbox.style.display =
                    selectValue == "3" ? "block" : "none";

                if (selectValue == "2" || selectValue == "3") {
                    if (item.option.length === 0) {
                        this.addOption(item);
                    }
                }
            });
        },
        addArea() {
            const question = this.createFormData.quesList;
            question.push({
                id: question.length + 1,
                type: "1",
                qu: "",
                order: question.length + 1,
                necessary: false,
                option: [],
            });
        },
        addOption(item) {
            item.option.push({
                value: item.option.length + 1,
                show: "",
            });
        },
        removeOption(item, index) {
            item.option.splice(index, 1);
        },
        removeQuestion(index) {
            this.createFormData.quesList.splice(index, 1);
            this.updateOrder();
        },
        updateOrder() {
            this.createFormData.quesList.forEach((item, index) => {
                item.order = index + 1;
            });
        },
        onDragEnd() {
            this.updateOrder();
        },
        submitSurvey() {
            sessionStorage.setItem("updateSession", this.searchId.id);
            this.$emit("submit-survey", this.createFormData);
        },
    },
});
</script>

<template>
    <!-- {{ createFormData }} -->
    <form class="background">
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1>
                        <input
                            type="text"
                            placeholder="請填入表單名稱"
                            class="titleUnderLine"
                            v-model="createFormData.name"
                        />
                    </h1>
                </div>

                <div class="description">
                    <span>
                        <textarea
                            name=""
                            id=""
                            autocomplete="off"
                            placeholder="請填入表單敘述"
                            v-model="createFormData.description"
                        ></textarea>
                    </span>
                </div>
            </div>

            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >開始時間:</span
                            >
                            <input
                                type="date"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="startDate"
                                autocomplete="off"
                                v-model="createFormData.startDate"
                            />
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >結束時間:</span
                            >
                            <input
                                type="date"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="endDate"
                                autocomplete="off"
                                v-model="createFormData.endDate"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- {{ createFormData.question }} -->

            <draggable
                v-model="createFormData.quesList"
                class="questionCreate"
                id="questionCreate"
                item-key="order"
                handle=".handle"
                @end="onDragEnd"
            >
                <template #item="{ element }">
                    <div class="question-item">
                        <div class="dragicon handle">
                            <i class="fa-solid fa-grip-lines"></i>
                        </div>

                        <div class="col-md-9 item-box question-item-title">
                            <div class="input-group">
                                <span
                                    class="input-group-text"
                                    id="inputGroup-sizing-default"
                                    >輸入題目:</span
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="請填寫題目"
                                    v-model="element.qu"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </div>
                        </div>

                        <div class="col-md-3 item-box question-item-title">
                            <select
                                class="form-select selectType"
                                aria-label=".form-select-lg example"
                                v-model="element.type"
                                @change="
                                    handleSelectTypeChange($event, element)
                                "
                            >
                                <option value="1">text</option>
                                <option value="2">radio</option>
                                <option value="3">checkbox</option>
                            </select>
                        </div>

                        <!-- 建立回答選項 -->
                        <div class="optionArea">
                            <div
                                class="optionTextArea"
                                v-show="element.type == '1' || !element.type"
                            >
                                <div class="form-floating">
                                    <textarea
                                        class="form-control"
                                        placeholder=""
                                        id="floatingTextarea"
                                        readonly
                                    ></textarea>
                                    <label for="floatingTextarea"></label>
                                </div>
                            </div>

                            <div
                                class="optionRadio"
                                v-show="element.type == '2'"
                            >
                                <div
                                    class="addRadioArea"
                                    v-for="(
                                        questionOption, index
                                    ) in element.option"
                                    :key="index"
                                >
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name=""
                                            id=""
                                            disabled
                                        />
                                        <label class="form-check-label" for="">
                                            <input
                                                type="text"
                                                class="form-control radioInput"
                                                v-model="questionOption.show"
                                                placeholder="請填寫選項"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default"
                                            />
                                        </label>
                                        <i
                                            class="fa-solid fa-xmark"
                                            @click="
                                                removeOption(element, index)
                                            "
                                        ></i>
                                    </div>
                                </div>

                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name=""
                                        id=""
                                        disabled
                                    />
                                    <label class="form-check-label" for="">
                                        <input
                                            type="text"
                                            class="form-control checkboxinput"
                                            id="addCheckbox"
                                            placeholder="增加選項"
                                            @click="addOption(element)"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div
                                class="optionCheckbox"
                                v-show="element.type == '3'"
                            >
                                <div
                                    class="addCheckboxArea"
                                    v-for="(
                                        questionOption, index
                                    ) in element.option"
                                    :key="index"
                                >
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                            disabled
                                        />
                                        <label
                                            class="form-check-label"
                                            for="flexCheckDefault"
                                        >
                                            <input
                                                type="text"
                                                class="form-control checkboxinput"
                                                placeholder="請填寫選項"
                                                v-model="questionOption.show"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default"
                                            />
                                        </label>
                                        <i
                                            class="fa-solid fa-xmark"
                                            @click="
                                                removeOption(element, index)
                                            "
                                        ></i>
                                    </div>
                                </div>

                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        disabled
                                    />
                                    <label
                                        class="form-check-label"
                                        for="flexCheckDefault"
                                    >
                                        <input
                                            type="text"
                                            class="form-control checkboxinput"
                                            id="addCheckbox"
                                            placeholder="增加選項"
                                            @click="addOption(element)"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div class="delDiv">
                                <i
                                    class="fa-solid fa-trash-can"
                                    id="delQuestion"
                                    @click="
                                        removeQuestion(
                                            createFormData.question.indexOf(
                                                element
                                            )
                                        )
                                    "
                                ></i>
                                <div class="form-check form-switch">
                                    <label
                                        class="form-check-label"
                                        for="flexSwitchCheckDefault"
                                        >必填</label
                                    >
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckDefault"
                                        v-model="element.necessary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>

            <div class="addButton">
                <button
                    type="button"
                    class="btn btn-primary me-md-2"
                    @click="addArea()"
                >
                    新增問題
                </button>
            </div>

            <!-- 按鈕 -->
            <div class="button">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        class="btn btn-primary me-md-2"
                        type="button"
                        @click="submitSurvey"
                    >
                        送出
                    </button>
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
                .checkboxinput {
                }
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
