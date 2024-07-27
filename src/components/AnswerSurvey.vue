<script>
import backgroundcolor from '../stores/backgroundcolor';

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    data() {
        return {
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
            formData:{
                name: this.childFormData.name || "",
                phone: this.childFormData.phone || "",
                email: this.childFormData.email || "",
                age: this.childFormData.age || "",
                text: this.childFormData.text || "",
                radio: this.childFormData.radio||{},
                checkbox: {}
            },
        };
    },
    mounted(){
        // 排序自訂義
        this.surveyData[0].question.sort((a, b) => a.order - b.order);

        this.surveyData[0].question.forEach(item => {
            if (item.questionType == 3) {
                // console.log(this.childFormData);

                //不知道要怎麼初始化childFormData比較好用簡單寫法
                if ( this.childFormData.checkbox) {
                  this.formData.checkbox[item.order] = this.childFormData.checkbox[item.order] || [];
                } else {
                  this.formData.checkbox[item.order] = [];
                }
            }
        });
    },
    props:{
        childCheckData:{
            type: Boolean,
            required: true
        },
        childFormData: {
            type: Object,
            required: true
        },
        
    },
    methods:{
        updateCheckdata(){
            this.$emit('update:childCheckData',true);
        },
        submitForm() {
            this.$emit('form-submit', this.formData);
        },
        reset(){
            this.formData.name = "";
            this.formData.phone = "";
            this.formData.email = "";
            this.formData.age = "";
            this.formData.text =  "";
            this.formData.radio = {};
            this.formData.checkbox = {};
            
            //重新幫裡面宣告空陣列
            this.surveyData[0].question.forEach(item => {
                if (item.questionType == 3) {
                    // console.log(this.childFormData);
                    this.formData.checkbox[item.order] = [];
                }
            });


        }
    }

};
</script>

<template>
    <!-- <h1>這是child:{{ childFormData }}</h1> -->
    <form class="background" @submit.prevent="submitForm">
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
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="startDate"
                            autocomplete="off"
                            v-model="formData.name"
                        />
                    </div>
                </div>

                <div class="col-md-6 item-box">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">手機:</span>
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="endDate"
                            autocomplete="off"
                            v-model="formData.phone"
                        />
                    </div>
                </div>

                <div class="col-md-6 item-box">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">E-mail:</span>
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="e-mail"
                            autocomplete="off"
                            v-model="formData.email"
                        />
                    </div>
                </div>

                <div class="col-md-6 item-box">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">年齡:</span>
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="endDate"
                            autocomplete="off"
                            v-model="formData.age"
                        />
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
                        <!-- <h1>{{ item.order }}. {{ item.questionTitle }}:</h1> -->
                        <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                        <textarea name="" id="" autocomplete="off" v-model="formData.text"></textarea>
                        <!-- <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"> -->
                    </div>
                </div>

                <!-- radio -->
                <div v-if="item.questionType == 2 " class="showCheckQuestion">
                    <!-- <h1>{{ item.order }}.{{ item.questionTitle }}:</h1> -->
                    <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                    <div v-for="Options in item.questionOption" class="form-check">
                        <input class="form-check-input" type="radio" :name="'radio-' + item.order" :id="'Radios-'+item.order+'-'+Options.value" :value="Options.value" v-model="formData.radio[item.order]" >
                      <label class="form-check-label" :for="'Radios-'+item.order+'-'+Options.value">
                        {{Options.show}}
                      </label>
                    </div>
                </div>

                <!-- checkbox -->
                <div v-if="item.questionType == 3 " class="showCheckQuestion">
                    <!-- <h1>{{ item.order }}.{{ item.questionTitle }}:</h1> -->
                    <span class="question-title">{{ item.order }}. {{ item.questionTitle }}:</span>
                    <div v-for="Options in item.questionOption" class="form-check">
                        <input class="form-check-input" type="checkbox" :value="Options.value" :id="'checkbox-'+item.order+'-'+Options.value" :name="'checkbox-' + item.order" v-model="formData.checkbox[item.order]"  >
                        <label class="form-check-label" :for="'checkbox-'+item.order+'-'+Options.value">
                          {{Options.show}}
                        </label>
                    </div>

                </div>

            </div>


            </div>

            <!-- 按鈕 -->
            <div class="button">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="reset" @click="reset()">清除</button>
                <button class="btn btn-primary me-md-2" type="submit" >送出</button>
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
    background-color: v-bind('color.mainColor');
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100dvw - 15rem);
    transition: width 0.25s ease-out;

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



        // font-family: "Noto Serif TC", serif;
        font-family: "Noto Sans TC", sans-serif;
        // font-optical-sizing: auto;
        // font-weight: <weight>;
        // font-style: normal;
        

        .description {
            // border: 1px solid black;
            width: 100%;
        }
        }

        .secondArea {
        // border: 1px solid black;
        width: 80%;
        }

        .question{
            //border: 1px solid black;
            width: 80%;
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
