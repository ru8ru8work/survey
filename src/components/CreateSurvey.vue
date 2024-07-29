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
       

    },
    props:{
       
    },
    methods:{
        // addArea(){

        //     const secondArea = document.querySelector(".secondArea");

        //     // 先創question的div
        //     const question = document.createElement("div");
        //     question.setAttribute("class","questionCreate")
        //     question.setAttribute("id","question"+this.idCount)
        //     //題目 
        //     const questionInput = document.createElement("input");
        //     questionInput.setAttribute("type", "text");
        //     questionInput.setAttribute("placeholder", "請填寫題目");

        //     // 創建選擇類型的select元素
        //     const typeSelect = document.createElement("select");

        //     const optionText = document.createElement("option");
        //     optionText.setAttribute("value", "text");
        //     optionText.textContent = "Text";

        //     const optionRadio = document.createElement("option");
        //     optionRadio.setAttribute("value", "radio");
        //     optionRadio.textContent = "Radio";

        //     const optionCheckbox = document.createElement("option");
        //     optionCheckbox.setAttribute("value", "checkbox");
        //     optionCheckbox.textContent = "Checkbox";


        //     typeSelect.appendChild(optionText);
        //     typeSelect.appendChild(optionRadio);
        //     typeSelect.appendChild(optionCheckbox);

        //     // 將題目輸入框和select元素添加到問題區域
        //     question.appendChild(questionInput);
        //     question.appendChild(typeSelect);



        //     const textArea = document.createElement("textarea");
        //     textArea.setAttribute("placeholder", "填寫文本答案");

        //     const radioDiv = document.createElement("div");
        //     const radioInput = document.createElement("input");
        //     radioInput.setAttribute("type", "radio");
        //     radioInput.setAttribute("name", "radio" + this.idCount);
        //     const radioOption = document.createElement("input");
        //     radioOption.setAttribute("type", "text");
        //     radioOption.setAttribute("placeholder", "選項");
        //     radioDiv.appendChild(radioInput);
        //     radioDiv.appendChild(radioOption);

        //     const checkboxDiv = document.createElement("div");
        //     const checkboxInput = document.createElement("input");
        //     checkboxInput.setAttribute("type", "checkbox");
        //     checkboxInput.setAttribute("name", "checkbox" + this.idCount);
        //     const checkboxOption = document.createElement("input");
        //     checkboxOption.setAttribute("type", "text");
        //     checkboxOption.setAttribute("placeholder", "選項");
        //     checkboxDiv.appendChild(checkboxInput);
        //     checkboxDiv.appendChild(checkboxOption);



        //     textArea.style.display = "none";
        //     textArea.disabled = true;
        //     radioDiv.style.display = "none";
        //     radioDiv.querySelectorAll("input").forEach(input => input.disabled = true);
        //     checkboxDiv.style.display = "none";
        //     checkboxDiv.querySelectorAll("input").forEach(input => input.disabled = true);

        //     question.appendChild(textArea);
        //     question.appendChild(radioDiv);
        //     question.appendChild(checkboxDiv);

        //     typeSelect.addEventListener("change", function () {
        //         textArea.style.display = "none";
        //         textArea.disabled = true;
        //         radioDiv.style.display = "none";
        //         radioDiv.querySelectorAll("input").forEach(input => input.disabled = true);
        //         checkboxDiv.style.display = "none";
        //         checkboxDiv.querySelectorAll("input").forEach(input => input.disabled = true);
            
        //         if (this.value === "text") {
        //             textArea.style.display = "block";
        //             textArea.disabled = false;
        //         } else if (this.value === "radio") {
        //             radioDiv.style.display = "block";
        //             radioDiv.querySelectorAll("input").forEach(input => input.disabled = false);
        //         } else if (this.value === "checkbox") {
        //             checkboxDiv.style.display = "block";
        //             checkboxDiv.querySelectorAll("input").forEach(input => input.disabled = false);
        //         }
        //     });


















        //     secondArea.appendChild(question);

        //     this.idCount++;
        // }
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
                    <h2><textarea name="" id="" autocomplete="off" placeholder="請填入表單敘述" ></textarea></h2>
                    <!-- <h2><input type="text" placeholder="請填入表單敘述" class="titleUnderLine"></h2> -->
                </div>
            </div>

            <!-- 自定義問題 -->
            <div class="secondArea">
                <button type="button" class="btn btn-primary me-md-2" @click="addArea()">測試新增區塊</button>
                <div class="questionCreate">
                    
                </div>
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
        border: 1px solid v-bind('color.borderColor');
        background-color: v-bind('color.secondColor');
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
        margin: 2%;
        .title {
            // border: 1px solid black;
            width: 80%;
            height: 20%;
            margin: 3%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 0px;
            font-family: "Noto Sans TC", sans-serif;
            .titleUnderLine{
                border: 0px;
                border-bottom: 1px solid black;
                text-align: center;
            }


            .description {
                // border: 1px solid black;
                width: 100%;
                textarea{
                    width: 100%;
                    height: 10dvh;
                }
            }
        }

        

        .question{
            //border: 1px solid black;
            width: 80%;
            padding: 1rem 0; // 上下內邊距
            // .question-item {
            //     margin-bottom: 2rem; // 每個問題的底部間距
            //     display: flex;
            //     flex-direction: column; // 讓問題和答案在垂直方向排列
            //     align-items: flex-start; // 使問題和答案左對齊
            //     span {
            //         display: block; // 問題和答案顯示為塊元素，分行顯示
            //     }
            //     .question-title {
            //         margin-bottom: 0.5rem; // 問題標題和答案之間的間距
            //     }

            // }

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
    
</style>