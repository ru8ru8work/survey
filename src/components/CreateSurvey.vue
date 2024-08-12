<script>
import backgroundcolor from '../stores/backgroundcolor';

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    data() {
        return {
            idCount:1,
            createFormData :{
                title:"",
                description:"",
                startDate:"",
                endDate:"",
                question:[
                {

                }

                ],


            }
        };
    },
    mounted(){
        //拖曳用
        const questionCreate = document.querySelector("#questionCreate")
        const sortable1 = Sortable.create(questionCreate, {
            handle: ".handle", //  限制能拖曳的class區塊
            filter: ".lock", //  有此class表示不能被拖曳
            animation: 150
        })

        // // 以下測試選取增加區塊用
        const selectType = document.querySelector(".selectType");
        const optionTextArea = document.querySelector(".optionTextArea");
        const optionRadio = document.querySelector(".optionRadio");
        const optionCheckbox = document.querySelector(".optionCheckbox");
        optionTextArea.style.display = "block";
        optionRadio.style.display = "none";
        optionCheckbox.style.display = "none";

        selectType.addEventListener("change",  function(){

            if (selectType.value == "1"){
                optionTextArea.style.display = "block";
                optionRadio.style.display = "none";
                optionCheckbox.style.display = "none";
            }

            if (selectType.value == "2"){
                optionTextArea.style.display = "none";
                optionRadio.style.display = "block";
                optionCheckbox.style.display = "none";
            }

            if (selectType.value == "3"){
                optionTextArea.style.display = "none";
                optionRadio.style.display = "none";
                optionCheckbox.style.display = "block";
            }
            
        })
        
        // // 測試Radio新增選項用
        // var radioValue = 1;
        // const addRadio = document.querySelector("#addRadio");
        // addRadio.addEventListener("click", function(){

        //     const addRadioArea = document.querySelector(".addRadioArea");
        //     const optionRadioDiv = document.createElement("div");
        //     optionRadioDiv.setAttribute("class","form-check");

        //     const optionRadioInput = document.createElement("input");
        //     optionRadioInput.setAttribute("class","form-check-input");
        //     optionRadioInput.setAttribute("type","radio");
        //     optionRadioInput.setAttribute("name","");
        //     optionRadioInput.setAttribute("id","");
        //     optionRadioInput.setAttribute("disabled","true");

        //     const optionRadioLabel = document.createElement("label");
        //     optionRadioLabel.setAttribute("class","form-check-label");
        //     optionRadioLabel.setAttribute("for","");

        //     const optionRadioLabelInput = document.createElement("input");
        //     optionRadioLabelInput.setAttribute("type","text");
        //     // optionRadioLabelInput.setAttribute("id","Radio" + radioValue);
        //     optionRadioLabelInput.setAttribute("class","form-control radioInput");
        //     optionRadioLabelInput.setAttribute("placeholder","請填寫選項");
        //     optionRadioLabelInput.setAttribute("aria-label","Sizing example input");
        //     optionRadioLabelInput.setAttribute("aria-describedby","inputGroup-sizing-default");

        //     // X符號 
        //     const xmark = document.createElement("i");
        //     xmark.setAttribute("class","fa-solid fa-xmark");

        //     optionRadioLabel.appendChild(optionRadioLabelInput);
        //     optionRadioDiv.appendChild(optionRadioInput);
        //     optionRadioDiv.appendChild(optionRadioLabel);
        //     optionRadioDiv.appendChild(xmark);
        //     addRadioArea.appendChild(optionRadioDiv);

        //     radioValue++;
        // })

        // // 測試Checkbox新增選項用
        // const addCheckbox = document.querySelector("#addCheckbox");
        // addCheckbox.addEventListener("click", function(){


        //     const addCheckboxArea = document.querySelector(".addCheckboxArea");
        //     const optionCheckboxDiv = document.createElement("div");
        //     optionCheckboxDiv.setAttribute("class","form-check");

        //     const optionCheckboxInput = document.createElement("input");
        //     optionCheckboxInput.setAttribute("class","form-check-input");
        //     optionCheckboxInput.setAttribute("type","checkbox");
        //     optionCheckboxInput.setAttribute("name","");
        //     optionCheckboxInput.setAttribute("id","");
        //     optionCheckboxInput.setAttribute("disabled","true");

        //     const optionCheckboxLabel = document.createElement("label");
        //     optionCheckboxLabel.setAttribute("class","form-check-label");
        //     optionCheckboxLabel.setAttribute("for","");

        //     const optionCheckboxLabelInput = document.createElement("input");
        //     optionCheckboxLabelInput.setAttribute("type","text");
        //     optionCheckboxLabelInput.setAttribute("class","form-control checkboxinput");
        //     optionCheckboxLabelInput.setAttribute("placeholder","請填寫選項");
        //     optionCheckboxLabelInput.setAttribute("aria-label","Sizing example input");
        //     optionCheckboxLabelInput.setAttribute("aria-describedby","inputGroup-sizing-default");


        //     optionCheckboxLabel.appendChild(optionCheckboxLabelInput);
        //     optionCheckboxDiv.appendChild(optionCheckboxInput);
        //     optionCheckboxDiv.appendChild(optionCheckboxLabel);
        //     addCheckboxArea.appendChild(optionCheckboxDiv);
        // })

    },
    props:{
       
    },
    methods:{
        addArea(){ //新增問題
            const question = this.createFormData.question;

            question.push(
                { 
                    questionType: "" ,
                    questionTitle: "" ,
                    order:"",
                    required:"",
                    questionOption:{}
                }

            );


        },
        addOption(){
            //這邊還沒改
            const questionOption = this.question.questionOption;
            console.log(questionOption);
            questionOption.push(
                {

                }
            );
        }

    }

};
</script>

<template>

    <h1>{{ this.createFormData }}</h1>

    <form class="background" >
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1><input type="text" placeholder="請填入表單名稱" class="titleUnderLine"  v-model="createFormData.title"></h1>
                </div>
                
                <div class="description">
                    <span><textarea name="" id="" autocomplete="off" placeholder="請填入表單敘述" v-model="createFormData.description"></textarea></span>
                    <!-- <h2><input type="text" placeholder="請填入表單敘述" class="titleUnderLine"></h2> -->
                </div>
            </div>

            <div class="secondArea">
                <div class="row g-3 my-2" id="sortable1">
                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">開始時間:</span
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
                            <span class="input-group-text" id="inputGroup-sizing-default">結束時間:</span
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

            <!-- <textarea name="" id="" class="boldtest"></textarea>
            <input type="text" name="" id="" class="boldtest">
            <h1> 選取的文字 : <span id="selectedText"></span></h1> -->

            {{ createFormData.question }}
            <!-- 自定義問題 -->
            <!-- <div class="questionCreate" id="questionCreate" > -->

                <!-- // questionType:2, //radio
                    // questionTitle:"在室內會不會穿拖鞋",
                    // order:4,
                    // required :true,
                    // questionOption:[
                    //     {
                    //         value:1,
                    //         show:"會",
                    //     },
                    //     {
                    //         value:2,
                    //         show:"不會",
                    //     }
                    // ], -->

            <div class="questionCreate" id="questionCreate" v-for="item in createFormData.question" :key="item.order">
                
                <!-- 用來規劃版面 -->
                
                <div class="question-item "> 
                    <div class="dragicon handle">
                        <i class="fa-solid fa-grip-lines "></i>
                    </div>

                    <div class="col-md-9 item-box question-item-title">
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-default">輸入題目:</span>
                            <input type="text" class="form-control" placeholder="請填寫題目" v-model="item.questionTitle" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" >
                        </div>
                    </div>

                    <div class="col-md-3 item-box question-item-title">
                        <select class="form-select selectType" aria-label=".form-select-lg example" v-model="item.questionType">
                            <option value="1">text</option>
                            <option value="2">radio</option>
                            <option value="3">checkbox</option>
                        </select>
                    </div>

                    <!-- 建立回答選項 -->
                    <div class="optionArea" >

                        <div class="optionTextArea">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="" id="floatingTextarea" readonly></textarea>
                                <label for="floatingTextarea"></label>
                            </div>
                        </div>
                        
                        <div class="optionRadio"  >
                            <div class="addRadioArea" v-for="questionOption in item.questionOption" >
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="" id="" disabled>
                                    <label class="form-check-label" for="">
                                        <input type="text" class="form-control radioInput" v-model="questionOption.show"  placeholder="請填寫選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                    </label>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                            

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="" id="" disabled>
                                <label class="form-check-label" for="">
                                    <input type="text" class="form-control radioInput" id="addRadio" placeholder="增加選項" @click="addOption()" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                </label>
                            </div>



                        </div>

                        <div class="optionCheckbox">

                            <div class="addCheckboxArea" v-for="questionOption in item.questionOption">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <input type="text" class="form-control checkboxinput" placeholder="請填寫選項" v-model="questionOption.show" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                    </label>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                                <label class="form-check-label" for="flexCheckDefault">
                                    <input type="text" class="form-control checkboxinput" id="addCheckbox" placeholder="增加選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                </label>
                            </div>

                        </div>

                        <div class="delDiv">
                            <i class="fa-solid fa-trash-can" id="delQuestion"></i>
                            <div class="form-check form-switch ">
                                <label class="form-check-label" for="flexSwitchCheckDefault">必填</label>
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="item.required">
                            </div>
                        </div>


                    </div>
                    


                </div>
                
                
            </div>

            <div class="addButton">
                <!-- <button type="button" class="btn btn-primary me-md-2" @click="addBold()">加粗體</button> -->
                <button type="button" class="btn btn-primary me-md-2" @click="addArea()">新增問題</button>
            </div>
            

            <!-- 自訂義選項開始 -->
      
            <!-- 按鈕 -->
            <div class="button">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">

                <button class="btn btn-primary me-md-2" type="button" >送出</button>
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


    .content{
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

            border: 1px solid v-bind('color.borderColor');
            background-color: v-bind('color.secondColor');
            border-radius: 10px;
            padding: 2%;

            .titleUnderLine{
                border: 0px;
                border-bottom: 1px solid black;
                text-align: center;
                background-color: v-bind('color.sidebarColor');
                color: white;
                border-radius: 5px;
                width: 100%;
                letter-spacing:4px;
                
            }

            ::placeholder{
                color: v-bind('color.secondColor')
            }

            .description {
                // border: 1px solid black;
                width: 100%;
                font-size: 21px;
                textarea{
                    width: 100%;
                    height: 10dvh;
                }
            }
        }

        .secondArea{
            width: 80%;
            // height: 20%;
            // border: 1px solid black;
            border: 1px solid v-bind('color.borderColor');
            background-color: v-bind('color.secondColor');
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3.75%;
        }

    
        .addButton{
            width: 80%;
            border: 1px solid v-bind('color.borderColor');
            background-color: v-bind('color.secondColor');
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3.75%;
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

<!-- 動態產生的區塊會吃不到scoped所以要創一個新的 -->
<style lang="scss">
    .questionCreate{

        // ::placeholder{
        //     color: black;
        // }

        //border: 1px solid black;
        width: 80%;
        // padding: 1rem 0; // 上下內邊距
        .question-item {
            border: 1px solid v-bind('color.borderColor');
            background-color: v-bind('color.secondColor');
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 3.75%; // 每個問題的底部間距
            display: flex;
            flex-wrap:wrap;
            // align-items: center; /* 垂直居中 */
            // justify-content: center; /* 水平居中 */
            .dragicon{
                width: 100%;
                display: flex; 
                align-items: center; 
                justify-content: center;
            }

            .question-item-title{
                padding: 2%;
                .input-group-text{
                    background-color: v-bind('color.sidebarColor');
                    color: white;
                }
            }

            .optionArea{
                width: 100%;
                padding: 2%;
                
                // height: 20dvh;
                // background-color: black;
                // border: 1px solid black;
                .optionTextArea{
                    .form-control{
                        width: 50%;
                        height: 10dvh
                    }
                }

                .optionRadio{
                    .radioInput{
                        // border: 0px;
                        // border-bottom: 1px solid black;
                    }
                    
                }
                
                .optionCheckbox{
                    .checkboxinput{

                    }
                }

                .fa-xmark{
                    font-size: 25px;
                    margin-left: 10px;
                    cursor: pointer;
                }

                .delDiv{
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
                    .fa-trash-can{
                        cursor: pointer;
                        margin-right: 2%;
                    }


                    // .questionRequired{
                    //     border: 0;
                    //     border-left: 1px solid black;
                    //     padding: 2%;
                    //     margin-top: 2%;
                    // }

                    
                }

            }
          
            // border: 0px;
            // flex-direction: column; // 讓問題和答案在垂直方向排列
            // align-items: flex-start; // 使問題和答案左對齊
            // span {
            //     display: block; // 問題和答案顯示為塊元素，分行顯示
            // }
            // .question-title {
            //     margin-bottom: 0.5rem; // 問題標題和答案之間的間距
            // }
        }

    }
</style>

<!-- 動態產生的區塊會吃不到scoped所以要創一個新的 -->
<!-- <style lang="scss">
.secondArea {
    border: 1px solid black;
    width: 80%;
    height: auto;
    padding: 2%;
    
    .questionCreate{
        width: 100%;
        height: 20dvh;
        // background-color: black;
        border: 1px solid black;
    }
}
    
</style> -->