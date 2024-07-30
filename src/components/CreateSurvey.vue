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

        // 以下測試選取增加區塊用
        const selectType = document.querySelector("#selectType");
        const optionTextArea = document.querySelector(".optionTextArea");
        const optionRadio = document.querySelector(".optionRadio");
        const optionCheckbox = document.querySelector(".optionCheckbox");
        optionTextArea.style.display = "block";
        optionRadio.style.display = "none";
        optionCheckbox.style.display = "none";

        selectType.addEventListener("change",  function(){

            if (selectType.value == "text"){
                optionTextArea.style.display = "block";
                optionRadio.style.display = "none";
                optionCheckbox.style.display = "none";
            }

            if (selectType.value == "radio"){
                optionTextArea.style.display = "none";
                optionRadio.style.display = "block";
                optionCheckbox.style.display = "none";
            }

            if (selectType.value == "checkbox"){
                optionTextArea.style.display = "none";
                optionRadio.style.display = "none";
                optionCheckbox.style.display = "block";
            }
            
        })
        
        // 測試Radio新增選項用
        const addRadio = document.querySelector("#addRadio");
        addRadio.addEventListener("click", function(){

            const addRadioArea = document.querySelector(".addRadioArea");
            const optionRadioDiv = document.createElement("div");
            optionRadioDiv.setAttribute("class","form-check");

            const optionRadioInput = document.createElement("input");
            optionRadioInput.setAttribute("class","form-check-input");
            optionRadioInput.setAttribute("type","radio");
            optionRadioInput.setAttribute("name","");
            optionRadioInput.setAttribute("id","");
            optionRadioInput.setAttribute("disabled","true");

            const optionRadioLabel = document.createElement("label");
            optionRadioLabel.setAttribute("class","form-check-label");
            optionRadioLabel.setAttribute("for","");

            const optionRadioLabelInput = document.createElement("input");
            optionRadioLabelInput.setAttribute("type","text");
            optionRadioLabelInput.setAttribute("class","form-control radioInput");
            optionRadioLabelInput.setAttribute("placeholder","請填寫選項");
            optionRadioLabelInput.setAttribute("aria-label","Sizing example input");
            optionRadioLabelInput.setAttribute("aria-describedby","inputGroup-sizing-default");


            optionRadioLabel.appendChild(optionRadioLabelInput);
            optionRadioDiv.appendChild(optionRadioInput);
            optionRadioDiv.appendChild(optionRadioLabel);
            addRadioArea.appendChild(optionRadioDiv);
        })

        // 測試Checkbox新增選項用
        const addCheckbox = document.querySelector("#addCheckbox");
        addCheckbox.addEventListener("click", function(){


            const addCheckboxArea = document.querySelector(".addCheckboxArea");
            const optionCheckboxDiv = document.createElement("div");
            optionCheckboxDiv.setAttribute("class","form-check");

            const optionCheckboxInput = document.createElement("input");
            optionCheckboxInput.setAttribute("class","form-check-input");
            optionCheckboxInput.setAttribute("type","checkbox");
            optionCheckboxInput.setAttribute("name","");
            optionCheckboxInput.setAttribute("id","");
            optionCheckboxInput.setAttribute("disabled","true");

            const optionCheckboxLabel = document.createElement("label");
            optionCheckboxLabel.setAttribute("class","form-check-label");
            optionCheckboxLabel.setAttribute("for","");

            const optionCheckboxLabelInput = document.createElement("input");
            optionCheckboxLabelInput.setAttribute("type","text");
            optionCheckboxLabelInput.setAttribute("class","form-control checkboxinput");
            optionCheckboxLabelInput.setAttribute("placeholder","請填寫選項");
            optionCheckboxLabelInput.setAttribute("aria-label","Sizing example input");
            optionCheckboxLabelInput.setAttribute("aria-describedby","inputGroup-sizing-default");


            optionCheckboxLabel.appendChild(optionCheckboxLabelInput);
            optionCheckboxDiv.appendChild(optionCheckboxInput);
            optionCheckboxDiv.appendChild(optionCheckboxLabel);
            addCheckboxArea.appendChild(optionCheckboxDiv);
        })


    },
    props:{
       
    },
    methods:{
        addArea(){

            const questionItem = document.querySelector(".questionCreate");

            // 先創question-item的div
            const question = document.createElement("div");
            question.setAttribute("class","question-item")
            question.setAttribute("id","question"+this.idCount)


            // 拖曳icon
            const dragicon = document.createElement("div");
            dragicon.setAttribute("class","dragicon handle");
            const gripLines = document.createElement("i");
            gripLines.setAttribute("class","fa-solid fa-grip-lines");
            dragicon.appendChild(gripLines);
            question.appendChild(dragicon);

            //題目 

            const questionInputDiv = document.createElement("div");
            questionInputDiv.setAttribute("class", "col-md-9 item-box question-item-title");
            
            const questionInputDiv2 = document.createElement("div");
            questionInputDiv2.setAttribute("class", "input-group");

            const questionInputSpan = document.createElement("span");
            questionInputSpan.setAttribute("class", "input-group-text");
            questionInputSpan.setAttribute("id", "inputGroup-sizing-default");
            questionInputSpan.textContent = '輸入題目:';

            const questionInput = document.createElement("input");
            questionInput.setAttribute("type", "text");
            questionInput.setAttribute("class", "form-control");
            questionInput.setAttribute("placeholder", "請填寫題目");
            questionInput.setAttribute("aria-label", "Sizing example input");
            questionInput.setAttribute("aria-describedby", "inputGroup-sizing-default");

            questionInputDiv.appendChild(questionInputDiv2);
            questionInputDiv2.appendChild(questionInputSpan);
            questionInputDiv2.appendChild(questionInput);
            

            // 創建選擇類型的select元素

            const typeSelectDiv = document.createElement("div");
            typeSelectDiv.setAttribute("class","col-md-3 item-box question-item-title")

            const typeSelect = document.createElement("select");
            typeSelect.setAttribute("class","form-select");
            typeSelect.setAttribute("aria-label",".form-select-lg example")

            const optionNone = document.createElement("option");
            optionNone.setAttribute("value", "");
            optionNone.textContent = "";

            const optionText = document.createElement("option");
            optionText.setAttribute("value", "text");
            optionText.textContent = "Text";

            const optionRadio = document.createElement("option");
            optionRadio.setAttribute("value", "radio");
            optionRadio.textContent = "Radio";

            const optionCheckbox = document.createElement("option");
            optionCheckbox.setAttribute("value", "checkbox");
            optionCheckbox.textContent = "Checkbox";

            typeSelectDiv.appendChild(typeSelect);
            typeSelect.appendChild(optionNone);
            typeSelect.appendChild(optionText);
            typeSelect.appendChild(optionRadio);
            typeSelect.appendChild(optionCheckbox);

            // 將題目輸入框和select元素添加到問題區域
    
            
            // 創建選項區域
            const optionArea = document.createElement("div");
            optionArea.setAttribute("class", "optionArea");

            // Text區塊
            const optionTextArea = document.createElement("div");
            optionTextArea.setAttribute("class", "optionTextArea");
            optionTextArea.style.display = "none"; // 預設隱藏

            const textArea = document.createElement("div");
            textArea.setAttribute("class", "form-floating");
            const textarea = document.createElement("textarea");
            textarea.setAttribute("class", "form-control");
            textarea.setAttribute("placeholder", "");
            textarea.setAttribute("id", "floatingTextarea");
            textarea.setAttribute("readonly", "readonly");
            const labelText = document.createElement("label");
            labelText.setAttribute("for", "floatingTextarea");

            textArea.appendChild(textarea);
            textArea.appendChild(labelText);
            optionTextArea.appendChild(textArea);

            // radio區塊
            const optionRadioDiv = document.createElement("div");
            optionRadioDiv.setAttribute("class", "optionRadio");
            optionRadioDiv.style.display = "none"; // 預設隱藏

            const addRadioArea = document.createElement("div");
            addRadioArea.setAttribute("class", "addRadioArea");

            const addRadioDiv = document.createElement("div");
            addRadioDiv.setAttribute("class", "form-check");
            const radioInput = document.createElement("input");
            radioInput.setAttribute("class", "form-check-input");
            radioInput.setAttribute("type", "radio");
            radioInput.setAttribute("name", "radioGroup" + this.idCount);
            radioInput.setAttribute("disabled", "true");
            const radioLabel = document.createElement("label");
            radioLabel.setAttribute("class", "form-check-label");
            const radioTextInput = document.createElement("input");
            radioTextInput.setAttribute("type", "text");
            radioTextInput.setAttribute("class", "form-control radioInput");
            radioTextInput.setAttribute("placeholder", "請填寫選項");
            radioTextInput.setAttribute("aria-label", "Sizing example input");
            radioTextInput.setAttribute("aria-describedby", "inputGroup-sizing-default");

            radioLabel.appendChild(radioTextInput);
            addRadioDiv.appendChild(radioInput);
            addRadioDiv.appendChild(radioLabel);
            addRadioArea.appendChild(addRadioDiv);

            const addRadioDiv2 = document.createElement("div");
            addRadioDiv2.setAttribute("class", "form-check");

            const radioLabel2 = document.createElement("label");
            radioLabel2.setAttribute("class", "form-check-label");

            const addRadioInput2 = document.createElement("input");
            addRadioInput2.setAttribute("class","form-check-input");
            addRadioInput2.setAttribute("type","radio");
            addRadioInput2.setAttribute("disabled","true");
            addRadioInput2.setAttribute("name","");
            addRadioInput2.setAttribute("id","");

            const addRadioInput = document.createElement("input");
            addRadioInput.setAttribute("type", "text");
            addRadioInput.setAttribute("class", "form-control radioInput");
            addRadioInput.setAttribute("id", "addRadio" + this.idCount); 
            addRadioInput.setAttribute("placeholder", "增加選項");
            addRadioInput.setAttribute("aria-label", "Sizing example input");
            addRadioInput.setAttribute("aria-describedby", "inputGroup-sizing-default");

            radioLabel2.appendChild(addRadioInput);
            addRadioDiv2.appendChild(addRadioInput2);
            addRadioDiv2.appendChild(radioLabel2);


            optionRadioDiv.appendChild(addRadioArea);
            optionRadioDiv.appendChild(addRadioDiv2);


            // checkbox區塊
            const optionCheckboxDiv = document.createElement("div");
            optionCheckboxDiv.setAttribute("class", "optionCheckbox");
            optionCheckboxDiv.style.display = "none"; // 預設隱藏

            const addCheckboxArea = document.createElement("div");
            addCheckboxArea.setAttribute("class", "addCheckboxArea");

            const addCheckboxDiv = document.createElement("div");
            addCheckboxDiv.setAttribute("class", "form-check");
            const checkboxInput = document.createElement("input");
            checkboxInput.setAttribute("class", "form-check-input");
            checkboxInput.setAttribute("type", "checkbox");
            checkboxInput.setAttribute("value", "");
            checkboxInput.setAttribute("id", "flexCheckDefault");
            checkboxInput.setAttribute("disabled", "true");
            const checkboxLabel = document.createElement("label");
            checkboxLabel.setAttribute("class", "form-check-label");

            const checkboxTextInput = document.createElement("input");
            checkboxTextInput.setAttribute("type", "text");
            checkboxTextInput.setAttribute("class", "form-control checkboxinput");
            checkboxTextInput.setAttribute("placeholder", "請填寫選項");
            checkboxTextInput.setAttribute("aria-label", "Sizing example input");
            checkboxTextInput.setAttribute("aria-describedby", "inputGroup-sizing-default");

            checkboxLabel.appendChild(checkboxTextInput);
            addCheckboxDiv.appendChild(checkboxInput);
            addCheckboxDiv.appendChild(checkboxLabel);
            addCheckboxArea.appendChild(addCheckboxDiv);



            const addCheckboxDiv2 = document.createElement("div");
            addCheckboxDiv2.setAttribute("class", "form-check");
            const checkboxInput2 = document.createElement("input");
            checkboxInput2.setAttribute("class", "form-check-input");
            checkboxInput2.setAttribute("type", "checkbox");
            checkboxInput2.setAttribute("value", "");
            checkboxInput2.setAttribute("id", "flexCheckDefault");
            checkboxInput2.setAttribute("disabled", "true");
            const checkboxLabel2 = document.createElement("label");
            checkboxLabel2.setAttribute("class", "form-check-label");

            const addCheckboxInput = document.createElement("input");
            addCheckboxInput.setAttribute("type", "text");
            addCheckboxInput.setAttribute("class", "form-control checkboxinput");
            addCheckboxInput.setAttribute("id", "addCheckbox" + this.idCount);
            addCheckboxInput.setAttribute("placeholder", "增加選項");
            addCheckboxInput.setAttribute("aria-label", "Sizing example input");
            addCheckboxInput.setAttribute("aria-describedby", "inputGroup-sizing-default");


            checkboxLabel2.appendChild(addCheckboxInput);
            addCheckboxDiv2.appendChild(checkboxInput2);
            addCheckboxDiv2.appendChild(checkboxLabel2);

            optionCheckboxDiv.appendChild(addCheckboxArea);
            optionCheckboxDiv.appendChild(addCheckboxDiv2);


            // 將選項區域加到問題區域
            optionArea.appendChild(optionTextArea);
            optionArea.appendChild(optionRadioDiv);
            optionArea.appendChild(optionCheckboxDiv);


            // 將題目輸入框、select元素和選項區域添加到問題區域
            question.appendChild(questionInputDiv);
            question.appendChild(typeSelectDiv);
            question.appendChild(optionArea);

            // 顯示跟隱藏欄位
            typeSelect.addEventListener('change', function() {
                const type = typeSelect.value;
                optionTextArea.style.display = (type == 'text') ? 'block' : 'none';
                optionRadioDiv.style.display = (type == 'radio') ? 'block' : 'none';
                optionCheckboxDiv.style.display = (type == 'checkbox') ? 'block' : 'none';
            });


            const addRadioInputElement = question.querySelector("#addRadio" + this.idCount);
                addRadioInputElement.addEventListener("click", function() {
                    const addRadioArea = question.querySelector(".addRadioArea");
                    const optionRadioDiv = document.createElement("div");
                    optionRadioDiv.setAttribute("class", "form-check");
                
                    const optionRadioInput = document.createElement("input");
                    optionRadioInput.setAttribute("class", "form-check-input");
                    optionRadioInput.setAttribute("type", "radio");
                    optionRadioInput.setAttribute("name", "radioGroup" + this.idCount);
                    optionRadioInput.setAttribute("disabled", "true");
                
                    const optionRadioLabel = document.createElement("label");
                    optionRadioLabel.setAttribute("class", "form-check-label");
                    optionRadioLabel.setAttribute("for","");

                    const optionRadioLabelInput = document.createElement("input");
                    optionRadioLabelInput.setAttribute("type", "text");
                    optionRadioLabelInput.setAttribute("class", "form-control radioInput");
                    optionRadioLabelInput.setAttribute("placeholder", "請填寫選項");
                    optionRadioLabelInput.setAttribute("aria-label", "Sizing example input");
                    optionRadioLabelInput.setAttribute("aria-describedby", "inputGroup-sizing-default");
                
                    optionRadioLabel.appendChild(optionRadioLabelInput);
                    optionRadioDiv.appendChild(optionRadioInput);
                    optionRadioDiv.appendChild(optionRadioLabel);
                    addRadioArea.appendChild(optionRadioDiv);
                }.bind(this));
            
            const addCheckboxInputElement = question.querySelector("#addCheckbox" + this.idCount);
                addCheckboxInputElement.addEventListener("click", function() {
                    const addCheckboxArea = question.querySelector(".addCheckboxArea");
                    const optionCheckboxDiv = document.createElement("div");
                    optionCheckboxDiv.setAttribute("class", "form-check");
                        
                    const optionCheckboxInput = document.createElement("input");
                    optionCheckboxInput.setAttribute("class", "form-check-input");
                    optionCheckboxInput.setAttribute("type", "checkbox");
                    optionCheckboxInput.setAttribute("name", "");
                    optionCheckboxInput.setAttribute("id", "");
                    optionCheckboxInput.setAttribute("disabled", "true");
                
                    const optionCheckboxLabel = document.createElement("label");
                    optionCheckboxLabel.setAttribute("class", "form-check-label");
                
                    const optionCheckboxLabelInput = document.createElement("input");
                    optionCheckboxLabelInput.setAttribute("type", "text");
                    optionCheckboxLabelInput.setAttribute("class", "form-control checkboxinput");
                    optionCheckboxLabelInput.setAttribute("placeholder", "請填寫選項");
                    optionCheckboxLabelInput.setAttribute("aria-label", "Sizing example input");
                    optionCheckboxLabelInput.setAttribute("aria-describedby", "inputGroup-sizing-default");
                
                    optionCheckboxLabel.appendChild(optionCheckboxLabelInput);
                    optionCheckboxDiv.appendChild(optionCheckboxInput);
                    optionCheckboxDiv.appendChild(optionCheckboxLabel);
                    addCheckboxArea.appendChild(optionCheckboxDiv);
                }.bind(this));
            
            questionItem.appendChild(question);
            
            this.idCount++;
        },
        addBold(){
            alert("加粗囉");
            alert("好粗好粗");


            const boldtest = document.querySelector(".boldtest");
            const selectedText = document.querySelector("#selectedText");

            boldtest.addEventListener('mouseup', () => {
                const start = boldtest.selectionStart;
                const end = boldtest.selectionEnd;
                const selected = boldtest.value.substring(start, end);
                console.log(123);
                // console.log("這裡顯示選取:"+selected);
                selectedText.textContent = selected;
            });
        


        }
    }

};
</script>

<template>
    <form class="background" >
        <div class="content">
            <!-- 表單名稱和敘述 -->
            <div class="title">
                <div class="titleWord">
                    <h1><input type="text" placeholder="請填入表單名稱" class="titleUnderLine"></h1>
                </div>
                
                <div class="description">
                    <span><textarea name="" id="" autocomplete="off" placeholder="請填入表單敘述" ></textarea></span>
                    <!-- <h2><input type="text" placeholder="請填入表單敘述" class="titleUnderLine"></h2> -->
                </div>
            </div>

            <!-- <textarea name="" id="" class="boldtest"></textarea>
            <input type="text" name="" id="" class="boldtest">
            <h1> 選取的文字 : <span id="selectedText"></span></h1> -->

            <!-- 自定義問題 -->
            <div class="questionCreate" id="questionCreate">
                
                <!-- 用來規劃版面 -->
                
                <div class="question-item "> 
                    <div class="dragicon handle">
                        <i class="fa-solid fa-grip-lines "></i>
                    </div>

                    <div class="col-md-9 item-box question-item-title">
                        <div class="input-group">
                            <span class="input-group-text" id="inputGroup-sizing-default">輸入題目:</span>
                            <input type="text" class="form-control" placeholder="請填寫題目" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-3 item-box question-item-title">
                        <select class="form-select" aria-label=".form-select-lg example" id="selectType">
                            <option value="text">text</option>
                            <option value="radio">radio</option>
                            <option value="checkbox">checkbox</option>
                        </select>
                    </div>

                    <!-- 建立回答選項 -->
                    <div class="optionArea">

                        <div class="optionTextArea">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" readonly></textarea>
                                <label for="floatingTextarea"></label>
                            </div>
                        </div>
                        
                        <div class="optionRadio">
                            <div class="addRadioArea">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="" id="" disabled>
                                    <label class="form-check-label" for="">
                                        <input type="text" class="form-control radioInput" placeholder="請填寫選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <!-- <input type="text" class="form-control radioInput" id="addRadio" placeholder="增加選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
                                    </label>
                                </div>
                            </div>
                            

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="" id="" disabled>
                                <label class="form-check-label" for="">
                                    <!-- <input type="text" class="form-control radioInput" placeholder="請填寫選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
                                    <input type="text" class="form-control radioInput" id="addRadio" placeholder="增加選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                </label>
                            </div>



                        </div>

                        <div class="optionCheckbox">

                            <div class="addCheckboxArea">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <input type="text" class="form-control checkboxinput" placeholder="請填寫選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                    </label>
                                </div>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                                <label class="form-check-label" for="flexCheckDefault">
                                    <input type="text" class="form-control checkboxinput" id="addCheckbox" placeholder="請填寫選項" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                </label>
                            </div>

                        </div>

                    </div>
                    


                </div>
                
                
            </div>

            <div class="addButton">
                <button type="button" class="btn btn-primary me-md-2" @click="addBold()">加粗體</button>
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

    //justify-content: center;
    //height: 100vh;
    //border: 1px solid black;

    .content{
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

        

        // .question{
        //     //border: 1px solid black;
        //     width: 80%;
        //     // padding: 1rem 0; // 上下內邊距
        //     .question-item {

        //         border: 1px solid v-bind('color.borderColor');
        //         background-color: v-bind('color.secondColor');
        //         border-radius: 10px;
        //         padding: 2%;

        //         margin-bottom: 3.75%; // 每個問題的底部間距
        //         display: flex;
        //         flex-direction: column; // 讓問題和答案在垂直方向排列
        //         align-items: flex-start; // 使問題和答案左對齊
        //         span {
        //             display: block; // 問題和答案顯示為塊元素，分行顯示
        //         }
        //         .question-title {
        //             margin-bottom: 0.5rem; // 問題標題和答案之間的間距
        //         }

        //     }

        // }
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