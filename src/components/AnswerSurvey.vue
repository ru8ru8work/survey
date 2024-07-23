<script>
export default {
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
                            questionTiTle:"text的題目",
                            order:2, //順位
                            questionOption:"",

                        },
                        {
                            questionType:2, //radio
                            questionTiTle:"在室內會不會穿拖鞋",
                            order:1,
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
                            questionTiTle:"checkbox的題目",
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
                            questionTiTle:"radio的題目",
                            order:4,
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

        //區塊拖曳
        const sortable1El = document.querySelector("#sortable1")
        const sortable1 = Sortable.create(sortable1El, {
            animation: 150
        })

    }

};
</script>

<template>
    <form class="background">
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
                            id="endDate"
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
                        />
                    </div>
                </div>

            </div>
        </div>

        <!-- 自訂義選項開始 -->
        <div class="question" id="sortable1">

            <div v-for="item in surveyData[0].question" :key="item.order">

                <!-- text -->
                <div v-if="item.questionType == 1 ">
                    <div class="input-group input-group-lg">
                        <span class="input-group-text" id="inputGroup-sizing-lg">{{ item.order }}.{{ item.questionTiTle }}</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                    </div>
                </div>

                <!-- radio -->
                <div v-if="item.questionType == 2 ">
                    <h1>{{ item.order }}.{{ item.questionTiTle }}:</h1>
                    <div v-for="Options in item.questionOption" class="form-check">
                      <input class="form-check-input" type="radio" name="exampleRadios" :id="'Radios-'+item.order+'-'+Options.value" :value="item.order+'-'+Options.value">
                      <label class="form-check-label" :for="'Radios-'+item.order+'-'+Options.value">
                        {{Options.show}}
                      </label>
                    </div>
                </div>

                <!-- checkbox -->
                <div v-if="item.questionType == 3 ">
                    <h1>{{ item.order }}.{{ item.questionTiTle }}:</h1>

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
                <button class="btn btn-primary me-md-2" type="button">搜尋</button>
                <button class="btn btn-primary" type="reset">清除</button>
            </div>
        </div>
    </form>
</template>

<style scoped lang="scss">
.background {
    width: 100dvw;
    //height: 100dvh;
    background-color: #96C9F4;
    display: flex;
    //justify-content: center;
    flex-direction: column;
    align-items: center;
    //border: 1px solid black;

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
            height: auto;
        }
    }

    .secondArea {
        // border: 1px solid black;
        width: 80%;
        height: 20%;
    }

    .question{
        border: 1px solid black;
        width: 80%;
        height: 200%;
    }

    .button{
        width: 80%;
    }
}
</style>
