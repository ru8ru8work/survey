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
                        
                    ]
                },
            ],
        };
    },
    mounted(){
        // 排序自訂義
        this.surveyData[0].question.sort((a, b) => a.order - b.order);
    },
    props:[
        'childCheckData',
    ],
    methods:{
        updateCheckdata(){
            this.$emit('update:childCheckData',true);

        }
    }

};
</script>

<template>
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
                        <input
                            type="text"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="startDate"
                            autocomplete="off"
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
                        />
                    </div>
                </div>

            </div>
            </div>

            <!-- 自訂義選項開始 -->
            <div class="question">

            <div v-for="item in surveyData[0].question" :key="item.order">

                <!-- text -->
                <div v-if="item.questionType == 1">
                    <div class="">
                        <h1>{{ item.order }}. {{ item.questionTitle }}:</h1>
                        <textarea name="" id="" autocomplete="off"></textarea>
                        <!-- <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"> -->
                    </div>
                </div>

                <!-- radio -->
                <div v-if="item.questionType == 2 ">
                    <h1>{{ item.order }}.{{ item.questionTitle }}:</h1>
                    <div v-for="Options in item.questionOption" class="form-check">
                      <input class="form-check-input" type="radio" name="exampleRadios" :id="'Radios-'+item.order+'-'+Options.value" :value="item.order+'-'+Options.value">
                      <label class="form-check-label" :for="'Radios-'+item.order+'-'+Options.value">
                        {{Options.show}}
                      </label>
                    </div>
                </div>

                <!-- checkbox -->
                <div v-if="item.questionType == 3 ">
                    <h1>{{ item.order }}.{{ item.questionTitle }}:</h1>

                    <div v-for="Options in item.questionOption" class="form-check">
                        <input class="form-check-input" type="checkbox" :value="item.order+'-'+Options.value" :id="'checkbox-'+item.order+'-'+Options.value">
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
                <button class="btn btn-primary" type="reset">清除</button>
                <button class="btn btn-primary me-md-2" type="button" @click="updateCheckdata()">送出</button>
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
