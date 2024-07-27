import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('color',{
    state(){
        return{ //data
            sidebarColor: "#324157",
            buttonColor:"#409eff",
            buttonTextColor:"#ffffff",
            mainColor: "#eef0fc",
            secondColor: "#ffffff",
            borderColor: "#e4e7ed",
            fontColor : "#000000"
        }
    },
    getters:{ //computed

    },
    actions:{ //methods
        changecolor(params){
            
            this.mainColor = params;
         
            
        }
    }


})