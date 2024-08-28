<script>
import backgroundcolor from "../stores/backgroundcolor";
import axios from "axios";

export default {
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    data() {
        return {
            surveyData: [
                {
                    id: "1",
                    title: "",
                    description: "",
                    question: [
                        {
                            questionType: "", //text
                            questionTitle: "",
                            order: "", //順位
                            required: "",
                            questionOption: [
                                {
                                    value : "",
                                    show : ""
                                }
                            ],
                        },
                        // {
                        //     questionType: 1, //text
                        //     questionTitle: "text的題目",
                        //     order: 2, //順位
                        //     required: false,
                        //     questionOption: "",
                        // },
                        // {
                        //     questionType: 2, //radio
                        //     questionTitle: "在室內會不會穿拖鞋",
                        //     order: 4,
                        //     required: true,
                        //     questionOption: [
                        //         {
                        //             value: 1,
                        //             show: "會",
                        //         },
                        //         {
                        //             value: 2,
                        //             show: "不會",
                        //         },
                        //     ],
                        // },
                        // {
                        //     questionType: 3, //checkbox
                        //     questionTitle: "checkbox的題目",
                        //     order: 3,
                        //     required: false,
                        //     questionOption: [
                        //         {
                        //             value: 1,
                        //             show: "checkbox選項1",
                        //         },
                        //         {
                        //             value: 2,
                        //             show: "checkbox選項2",
                        //         },
                        //         {
                        //             value: 3,
                        //             show: "checkbox選項3",
                        //         },
                        //         {
                        //             value: 4,
                        //             show: "checkbox選項4",
                        //         },
                        //     ],
                        // },
                        // {
                        //     questionType: 2, //radio
                        //     questionTitle: "radio的題目",
                        //     order: 1,
                        //     required: true,
                        //     questionOption: [
                        //         {
                        //             value: 1,
                        //             show: "radio選項1",
                        //         },
                        //         {
                        //             value: 2,
                        //             show: "radio選項2",
                        //         },
                        //         {
                        //             value: 3,
                        //             show: "radio選項3",
                        //         },
                        //         {
                        //             value: 4,
                        //             show: "radio選項4",
                        //         },
                        //     ],
                        // },
                        // {
                        //     questionType: 3, //checkbox
                        //     questionTitle: "我是男生還是女生",
                        //     order: 5,
                        //     required: true,
                        //     questionOption: [
                        //         {
                        //             value: 1,
                        //             show: "男生",
                        //         },
                        //         {
                        //             value: 2,
                        //             show: "女生",
                        //         },
                        //     ],
                        // },
                        // {
                        //     questionType: 1, //text
                        //     questionTitle: "測試必填",
                        //     order: 6,
                        //     required: true,
                        //     questionOption: "",
                        // },
                    ],
                },
            ],
            formData: {
                name: this.childFormData.name || "",
                phone: this.childFormData.phone || "",
                email: this.childFormData.email || "",
                age: this.childFormData.age || "",
                text: this.childFormData.text || {},
                radio: this.childFormData.radio || {},
                checkbox: {},
            },
            searchId: {
                id: "",
            },
        };
    },
    async created() {
        this.searchId.id = sessionStorage.getItem("searchId") || "No ID found";

        try {
            // console.log("這裡有進來" + this.searchId);

            // 發送 POST 請求
            const response = await axios.post(
                "http://localhost:8080/quiz/search",
                this.searchId
            );
            // 請求成功後的操作

            console.log(response.data.quizResList);

            // question: [
            //  {
            //      questionType: 1, //text
            //      questionTitle: "text的題目",
            //      order: 2, //順位
            //      required: false,
            //      questionOption: "",
            //  },
            //  {
            //      questionType: 2, //radio
            //      questionTitle: "在室內會不會穿拖鞋",
            //      order: 4,
            //      required: true,
            //      questionOption: [
            //          {
            //              value: 1,
            //              show: "會",
            //          },
            //          {
            //              value: 2,
            //              show: "不會",
            //          },
            //      ],
            //  },

            this.surveyData[0].title = response.data.quizResList[0].name;
            this.surveyData[0].description =response.data.quizResList[0].description;

            const quesListArr = response.data.quizResList[0].quesList;
            for (let i = 0; i < quesListArr.length; i++) {
                if (!this.surveyData[0].question[i]) {
                    this.surveyData[0].question[i] = {
                        questionType: "",
                        questionTitle: "",
                        order: "",
                        required: "",
                        questionOption: "",
                    };
                }

                // this.surveyData[0].question[i].id = questionArr[i].id;

                this.surveyData[0].question[i].order = quesListArr[i].id;
                this.surveyData[0].question[i].required =quesListArr[i].necessary;
                this.surveyData[0].question[i].questionTitle =quesListArr[i].qu;
                this.surveyData[0].question[i].questionType =quesListArr[i].type;

                console.log(" 這裡是 " + i + quesListArr[i].options);
                

                // const questionArr = response.data.quizResList[0].quesList;
                //這個等等處理
                // this.surveyData[0].question[i].questionOption =questionArr[i].options;
                if ( quesListArr[i].options != ""){
                    const optionArr = quesListArr[i].options.split(";");
                }
                
                // optionArr.foreach((item, index) => {
                //     console.log("Item at index", index, ":", item);
                // });

                console.log(quesListArr[i]);

                // id: 1;
                // necessary: true;
                // options: "1RRRRRR;2RRRRRRRRR";
                // qu: "第一題R";
                // quizId: 14;
                // type: "2";

                // question: [
                //  {
                //      questionType: 1, //text
                //      questionTitle: "text的題目",
                //      order: 2, //順位
                //      required: false,
                //      questionOption: "",
                //  },
            }

            // for (let i = 0; i < response.data.quizResList.length; i++) {

            //     // 整理 quizItem 成 fakeData 需要的格式
            //     let formattedItem = {
            //         id: response.data.quizResList[i].id, // 假設 id 是數字，轉成字串
            //         name: response.data.quizResList[i].name,
            //         status: response.data.quizResList[i].published ? "開始" : "未開始", // 根據 published 判斷 status
            //         startTime: response.data.quizResList[i].startDate, // 假設 startDate 是一個字串
            //         endTime: response.data.quizResList[i].endDate, // 假設 endDate 是一個字串
            //         result: "前往" // 固定的結果字串
            //     };

            //     this.fakeData.push(formattedItem);
            // }
        } catch (error) {
            console.error("There was an error!", error);
        }
    },
    mounted() {
        // 排序自訂義
        this.surveyData[0].question.sort((a, b) => a.order - b.order);

        this.surveyData[0].question.forEach((item) => {
            if (item.questionType == 3) {
                //不知道要怎麼初始化childFormData比較好用簡單寫法
                if (this.childFormData.checkbox) {
                    this.formData.checkbox[item.order] =
                        this.childFormData.checkbox[item.order] || [];
                } else {
                    this.formData.checkbox[item.order] = [];
                }
            }
        });
    },
    props: {
        childCheckData: {
            type: Boolean,
            required: true,
        },
        childFormData: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateCheckdata() {
            this.$emit("update:childCheckData", true);
        },
        submitForm() {
            let focusElement = null;
            // 跑資料的陣列
            this.surveyData[0]["question"].forEach((item) => {
                // 如果必填
                if (item.required == true) {
                    const questionAnswer = document.querySelector(
                        "#question" + item.order
                    );
                    if (questionAnswer) {
                        const existingExclamation =
                            questionAnswer.querySelector(".questionRequired");
                        // console.log(existingExclamation);
                        if (existingExclamation) {
                            existingExclamation.remove();
                        }

                        const exclamationDiv = document.createElement("div");
                        exclamationDiv.setAttribute(
                            "class",
                            "questionRequired"
                        );
                        const exclamation = document.createElement("i");
                        exclamation.setAttribute(
                            "class",
                            "fa-solid fa-circle-exclamation fa-lg"
                        );
                        exclamation.setAttribute("style", "color: #e82c17;");
                        exclamation.textContent = "這是必填問題";
                        exclamationDiv.appendChild(exclamation);

                        let isEmpty = false;
                        if (item.questionType == 1) {
                            //text
                            if (
                                this.formData.text[item.order] == undefined ||
                                this.formData.text[item.order] == ""
                            ) {
                                questionAnswer.appendChild(exclamationDiv);
                                isEmpty = true;
                            }
                        }

                        if (item.questionType == 2) {
                            //radio
                            if (
                                this.formData.radio[item.order] == undefined ||
                                this.formData.radio[item.order] == ""
                            ) {
                                questionAnswer.appendChild(exclamationDiv);
                                isEmpty = true;
                            }
                        }

                        if (item.questionType == 3) {
                            //checkbox
                            if (
                                this.formData.checkbox[item.order] ==
                                    undefined ||
                                this.formData.checkbox[item.order] == ""
                            ) {
                                questionAnswer.appendChild(exclamationDiv);
                                isEmpty = true;
                            }
                        }

                        if (isEmpty) {
                            questionAnswer.appendChild(exclamationDiv);
                            if (!focusElement) focusElement = questionAnswer;
                        }
                    }
                }
            });

            if (focusElement) {
                focusElement.focus();
                focusElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            } else {
                this.$emit("form-submit", this.formData);
            }
        },
        reset() {
            this.formData.name = "";
            this.formData.phone = "";
            this.formData.email = "";
            this.formData.age = "";
            this.formData.text = {};
            this.formData.radio = {};
            this.formData.checkbox = {};

            //重新幫裡面宣告空陣列
            this.surveyData[0].question.forEach((item) => {
                if (item.questionType == 3) {
                    // console.log(this.childFormData);
                    this.formData.checkbox[item.order] = [];
                }
            });

            // 暫時作廢
            // this.surveyData[0]["question"].forEach(item => {

            //     const questionAnswer = document.querySelector("#question" + item.order);
            //     const existingExclamation = questionAnswer.querySelector(".questionRequired");
            //     // console.log(existingExclamation);
            //     if (existingExclamation) {
            //         existingExclamation.remove();
            //     }

            // });
        },
        backPage() {
            //取消紐
            this.$router.push("/Front");
        },
    },
    watch: {
        formData: {
            handler(newValue, oldValue) {
                let focusElement = null;
                // 跑資料的陣列
                this.surveyData[0]["question"].forEach((item) => {
                    // 如果必填
                    if (item.required == true) {
                        const questionAnswer = document.querySelector(
                            "#question" + item.order
                        );
                        if (questionAnswer) {
                            const existingExclamation =
                                questionAnswer.querySelector(
                                    ".questionRequired"
                                );
                            // console.log(existingExclamation);
                            if (existingExclamation) {
                                existingExclamation.remove();
                            }

                            const exclamationDiv =
                                document.createElement("div");
                            exclamationDiv.setAttribute(
                                "class",
                                "questionRequired"
                            );
                            const exclamation = document.createElement("i");
                            exclamation.setAttribute(
                                "class",
                                "fa-solid fa-circle-exclamation fa-lg"
                            );
                            exclamation.setAttribute(
                                "style",
                                "color: #e82c17;"
                            );
                            exclamation.textContent = "這是必填問題";
                            exclamationDiv.appendChild(exclamation);

                            let isEmpty = false;
                            if (item.questionType == 1) {
                                //text
                                if (
                                    this.formData.text[item.order] ==
                                        undefined ||
                                    this.formData.text[item.order] == ""
                                ) {
                                    questionAnswer.appendChild(exclamationDiv);
                                    isEmpty = true;
                                }
                            }

                            if (item.questionType == 2) {
                                //radio
                                if (
                                    this.formData.radio[item.order] ==
                                        undefined ||
                                    this.formData.radio[item.order] == ""
                                ) {
                                    questionAnswer.appendChild(exclamationDiv);
                                    isEmpty = true;
                                }
                            }

                            if (item.questionType == 3) {
                                //checkbox
                                if (
                                    this.formData.checkbox[item.order] ==
                                        undefined ||
                                    this.formData.checkbox[item.order] == ""
                                ) {
                                    questionAnswer.appendChild(exclamationDiv);
                                    isEmpty = true;
                                }
                            }

                            if (isEmpty) {
                                questionAnswer.appendChild(exclamationDiv);
                                if (!focusElement)
                                    focusElement = questionAnswer;
                            }
                        }
                    }
                });
            },
            deep: true, // 深度監聽
        },
    },
};
</script>

<template>
    {{ this.surveyData[0].question }}
    <!-- <h1>這是child:{{ childFormData }}</h1> -->
    <form class="background" @submit.prevent="submitForm">
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1>{{ surveyData[0].title }}</h1>
                </div>
                <div class="description">
                    <span>{{ surveyData[0].description }}</span>
                    <!-- <h2></h2> -->
                </div>
            </div>

            <!-- 第二區為固定欄位 -->
            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >姓名:</span
                            >
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="name"
                                autocomplete="off"
                                v-model="formData.name"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >手機:</span
                            >
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="phone"
                                autocomplete="off"
                                v-model="formData.phone"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >E-mail:</span
                            >
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="email"
                                autocomplete="off"
                                v-model="formData.email"
                                required
                            />
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                                >年齡:</span
                            >
                            <input
                                type="text"
                                class="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                id="age"
                                autocomplete="off"
                                v-model="formData.age"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 自訂義選項開始 -->
            <div class="question">
                <div
                    v-for="item in surveyData[0].question"
                    :key="item.order"
                    class="question-item"
                    :id="'question' + item.order"
                    :tabindex="item.required ? '0' : null"
                >
                    <!-- text -->
                    <div
                        v-if="item.questionType == 1"
                        class="showCheckQuestion"
                    >
                        <!-- <div class=""> -->
                        <!-- <h1>{{ item.order }}. {{ item.questionTitle }}:</h1> -->
                        <span class="question-title"
                            >{{ item.order }}. {{ item.questionTitle }}:
                            <span
                                v-if="item.required == true"
                                style="color: red"
                                >*</span
                            >
                        </span>
                        <!-- <textarea v-if="item.required == true" :name="'textarea-' + item.order" :id="'textarea-' + item.order" autocomplete="off" v-model="formData.text[item.order]" required></textarea> -->
                        <textarea
                            :name="'textarea-' + item.order"
                            :id="'textarea-' + item.order"
                            autocomplete="off"
                            v-model="formData.text[item.order]"
                        ></textarea>
                        <!-- <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"> -->
                        <!-- </div> -->
                    </div>

                    <!-- radio -->
                    <div
                        v-if="item.questionType == 2"
                        class="showCheckQuestion"
                    >
                        <!-- <h1>{{ item.order }}.{{ item.questionTitle }}:</h1> -->
                        <span class="question-title"
                            >{{ item.order }}. {{ item.questionTitle }}:
                            <span
                                v-if="item.required == true"
                                style="color: red"
                                >*</span
                            >
                        </span>
                        <div
                            v-for="Options in item.questionOption"
                            class="form-check"
                        >
                            <!-- <input v-if="item.required == true"  class="form-check-input" type="radio" :name="'radio-' + item.order" :id="'Radios-'+item.order+'-'+Options.value" :value="Options.value" v-model="formData.radio[item.order]" required > -->
                            <input
                                class="form-check-input"
                                type="radio"
                                :name="'radio-' + item.order"
                                :id="
                                    'Radios-' + item.order + '-' + Options.value
                                "
                                :value="Options.value"
                                v-model="formData.radio[item.order]"
                            />
                            <label
                                class="form-check-label"
                                :for="
                                    'Radios-' + item.order + '-' + Options.value
                                "
                            >
                                {{ Options.show }}
                            </label>
                        </div>
                    </div>

                    <!-- checkbox -->
                    <div
                        v-if="item.questionType == 3"
                        class="showCheckQuestion"
                    >
                        <!-- <h1>{{ item.order }}.{{ item.questionTitle }}:</h1> -->
                        <span class="question-title"
                            >{{ item.order }}. {{ item.questionTitle }}:
                            <span
                                v-if="item.required == true"
                                style="color: red"
                                >*</span
                            >
                        </span>
                        <div
                            v-for="Options in item.questionOption"
                            class="form-check"
                            required
                        >
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :value="Options.value"
                                :id="
                                    'checkbox-' +
                                    item.order +
                                    '-' +
                                    Options.value
                                "
                                :name="'checkbox-' + item.order"
                                v-model="formData.checkbox[item.order]"
                            />
                            <label
                                class="form-check-label"
                                :for="
                                    'checkbox-' +
                                    item.order +
                                    '-' +
                                    Options.value
                                "
                            >
                                {{ Options.show }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 按鈕 -->
            <div class="button">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        class="btn btn-primary"
                        type="reset"
                        @click="backPage"
                    >
                        取消
                    </button>
                    <button
                        class="btn btn-primary"
                        type="reset"
                        @click="reset()"
                    >
                        清除
                    </button>
                    <button class="btn btn-primary me-md-2" type="submit">
                        送出
                    </button>
                    <!-- <input type="text" @input="$emit('update:childCheckData',$event.target.value)" :value="this.childCheckData"> -->
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

    //justify-content: center;
    //height: 100vh;
    //border: 1px solid black;

    .content {
        width: 80%;
        // max-height: 90%;
        // padding: 2%;
        // border: 1px solid v-bind('color.borderColor');
        // background-color: v-bind('color.secondColor');
        // border-radius: 5px;
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

            .titleWord {
                h1 {
                    background-color: v-bind("color.sidebarColor");
                    color: white;
                    border-radius: 5px;
                    width: 100%;
                    letter-spacing: 4px;
                    padding: 10px;
                }
            }

            .description {
                // border: 1px solid black;
                width: 100%;
                font-size: 21px;
            }
        }

        .secondArea {
            // border: 1px solid black;
            width: 80%;
            border: 1px solid v-bind("color.borderColor");
            background-color: v-bind("color.secondColor");
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3%;

            .input-group-text {
                background-color: v-bind("color.sidebarColor");
                color: white;
            }
        }

        .question {
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
                flex-direction: column; // 讓問題和答案在垂直方向排列
                align-items: flex-start; // 使問題和答案左對齊
                width: 100%;

                // span {
                // display: block; // 問題和答案顯示為塊元素，分行顯示
                // }
                .question-title {
                    margin-bottom: 0.5rem; // 問題標題和答案之間的間距
                }

                .showCheckQuestion {
                    width: 100%;

                    textarea {
                        width: 100%; // 確保 textarea 寬度為 100%
                        height: 100px;
                    }
                }

                :focus {
                    // background-color: black;
                    border: 2px solid red;
                }
            }

            .question-item:focus {
                border: 2px solid red;
                /* 聚焦時邊框變紅色 */
                outline: none;
                /* 取消預設的焦點輪廓 */
            }

            .questionRequired {
                color: #e82c17;
                /* 错误提示颜色 */
                margin-top: 0.5rem;
                /* 错误提示与问题之间的间距 */
            }
        }

        .button {
            width: 80%;
        }
    }
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
