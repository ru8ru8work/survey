<script>
import backgroundcolor from '../stores/backgroundcolor';

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    data(){
        return{
            surveyData: [
                {
                    id: "1",
                    title: "測試表單名稱",
                    description:"這邊都是文字敘述這邊都是文字敘述這邊都是文字敘述這邊都是文字敘述這邊都是文字敘述這邊都是文字敘述這邊都是文字敘述",
                    question:[
                        {
                            questionType:1, //text
                            questionTitle:"text的題目",
                            order:2, //順位
                            questionOption:"",

                        },
                        {
                            questionType:2, //radio
                            questionTitle:"在室內會不會穿拖鞋",
                            order:4,
                            questionOption:[
                                {
                                    value:1,
                                    show:"會",
                                },
                                {
                                    value:2,
                                    show:"不會",
                                }
                            ],
                        },
                        {
                            questionType:3, //checkbox
                            questionTitle:"checkbox的題目",
                            order:3,
                            questionOption:[
                                {
                                    value:1,
                                    show:"checkbox選項1",
                                },
                                {
                                    value:2,
                                    show:"checkbox選項2",
                                },
                                {
                                    value:3,
                                    show:"checkbox選項3",
                                },
                                {
                                    value:4,
                                    show:"checkbox選項4",
                                }
                            ],
                        },
                        {
                            questionType:2, //radio
                            questionTitle:"radio的題目",
                            order:1,
                            questionOption:[
                                {
                                    value:1,
                                    show:"radio選項1",
                                },
                                {
                                    value:2,
                                    show:"radio選項2",
                                },
                                {
                                    value:3,
                                    show:"radio選項3",
                                },
                                {
                                    value:4,
                                    show:"radio選項4",
                                }
                            ],
                        },
                        {
                            questionType:3, //checkbox
                            questionTitle:"我是男生還是女生",
                            order:5,
                            questionOption:[
                                {
                                    value:1,
                                    show:"男生",
                                },
                                {
                                    value:2,
                                    show:"女生",
                                }
                            ],
                        },
                    ]
                },
            ],
        }
    },
    mounted(){
        // 排序自訂義
        this.surveyData[0].question.sort((a, b) => a.order - b.order);
    },
    methods:{
        updateCheckData(){
            this.$emit("update:childCheckData",false);
        },
        showRadio(order,checkValue){ //顯示radio內容

            const survey = this.surveyData[0];
            const result = [];
            survey.question.forEach( item => {
                if( item.questionType == 2){ //如果是radio的話

                    if (!result[item.order]) { //先宣告空陣列 不然會報錯
                        result[item.order] = [];
                    }

                    item.questionOption.forEach( index => { //value當索引 放入show的內容
                        result[item.order][index.value] = index.show;
                    })
                }
                
            })

            return result[order][checkValue];
        },
        showCheckbox(order,checkValue){ //顯示checkbox內容

            const survey = this.surveyData[0];
            const result = [];
            survey.question.forEach( item => {
                if( item.questionType == 3){

                    if (!result[item.order]) {
                        result[item.order] = [];
                    }

                    item.questionOption.forEach( index => {
                        result[item.order][index.value] = index.show;
                    })
                }
                
            })

            // 勾選複數的會出現陣列
            var msgCheck = "";
            //排列順序
            checkValue = checkValue.sort();
            checkValue.forEach( value =>{

                //重新整理要顯示的內容
                msgCheck = msgCheck+result[order][value]+"<br>";
            })


            return msgCheck;
        },
        
    },
    props:{
        childCheckData:{
            type: Boolean,
            required: true
        },
        formData: {
            type: Object,
            required: true
        },
        
    },

};
</script>

<template>


<!-- <h1>這邊放資料:{{ formData }}</h1> -->

<form class="background">
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <h1>{{ surveyData[0].title }}</h1>
                <div class="description">
                    <h2>{{ surveyData[0].description }}</h2>
                </div>
            </div>

            <!-- 第二區為固定欄位 -->
            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">姓名:</span
                            >
                            <span class="input-group-text">{{ formData.name }}</span>
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">手機:</span>
                            <span class="input-group-text">{{ formData.phone }}</span>
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">E-mail:</span>
                            <span class="input-group-text">{{ formData.email }}</span>
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">年齡:</span>
                            <span class="input-group-text">{{ formData.age }}</span>
                    </div>
                </div>

                </div>
            </div>

            <!-- 自訂義選項開始 -->
            <div class="question">

            <div v-for="item in surveyData[0].question" :key="item.order" class="question-item">

                <!-- text -->
                <div v-if="item.questionType == 1" class="showCheckQuestion">
                    <div class="">
                        <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                        <span class="showCheckAnswer">{{ formData.text }}</span>
                    </div>
                </div>

                <!-- radio -->
                <div v-if="item.questionType == 2 ">
                    <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                    <!-- <span class="showCheckAnswer" >{{ formData.radio[item.order] }}</span> -->
                    <span class="showCheckAnswer" >{{ showRadio( item.order,formData.radio[item.order]) }}</span>
                </div>

                <!-- checkbox -->
                <div v-if="item.questionType == 3 ">
                    <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                    <!-- <span class="showCheckAnswer">{{ formData.checkbox[item.order] }}</span> -->
                    <span class="showCheckAnswer" v-html=" showCheckbox(item.order,formData.checkbox[item.order]) "></span>
                </div>

            </div>


            </div>

            <!-- 按鈕 -->
            <div class="button">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="reset" @click="updateCheckData()">修改</button>
                    <button class="btn btn-primary me-md-2" type="button" >送出</button>
                </div>
            </div>
        </div>
</form>







    
</template>

<style scoped lang="scss">
.background {
    // height: 100dvh;
    width: 100dvw;
    background-color: v-bind('color.mainColor');
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100dvw - 15rem);
    transition: width 0.25s ease-out;
    overflow-y: hidden;

    //justify-content: center;
    //height: 100vh;
    //border: 1px solid black;

    .content{
        width: 80%;
        // max-height: 90%; 
        // padding: 2%;
        border: 1px solid v-bind('color.borderColor');
        background-color: v-bind('color.secondColor');
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
        margin: 2%;
        .title {
            //border: 1px solid black;
            width: 80%;
            height: 20%;
            margin: 3%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

        .description {
            // border: 1px solid black;
            width: 100%;
        }
        }

        .secondArea {
        // border: 1px solid black;
            width: 80%;
            .input-group-text{
                border: 0px;
                background-color: v-bind('color.secondColor');
                padding: 0.375rem 0.75rem;
            }
        }

        // .question{
        //     //border: 1px solid black;
        //     width: 80%;
        //     .showCheckAnswer{
        //         margin-left: 15px;
        //     }
        // }


        .question {
            width: 80%;
            // margin: 0 auto; // 居中
            padding: 1rem 0; // 上下內邊距

            .question-item {
                margin-bottom: 2rem; // 每個問題的底部間距
                display: flex;
                flex-direction: column; // 讓問題和答案在垂直方向排列
                align-items: flex-start; // 使問題和答案左對齊
                span {
                    display: block; // 問題和答案顯示為塊元素，分行顯示
                }
                .question-title {
                    margin-bottom: 0.5rem; // 問題標題和答案之間的間距
                }
                .showCheckAnswer {
                    margin-left: 1rem; // 移除答案的左邊距
                }
            }
        }





        .button{
            width: 80%;
        }
    }   
}

textarea{
    height: 100px;
    width: 200px;
}
#wrapper.toggled  {
    .background{
        width: 100dvw;

    }
}

@media (max-width: 768px) {
    .background {
        width: 100%;
    }
}


</style>
