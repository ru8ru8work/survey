<script>
import VueAwesomePagination from 'vue-awesome-paginate';
import backgroundcolor from '../stores/backgroundcolor'

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    data() {
        return {
            testdata: "test123",
            fakeData: [
                {
                    id : "1",
                    name : "1name",
                    status : "開始",
                    startTime: "2024-01-10",
                    endTime: "2024-06-17",
                    result: "前往"
                },
                {
                    id : "2",
                    name : "2name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "3",
                    name : "3name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "4",
                    name : "4name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "5",
                    name : "5name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "6",
                    name : "6name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "7",
                    name : "7name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "8",
                    name : "8name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "9",
                    name : "9name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "10",
                    name : "10name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "11",
                    name : "11name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "12",
                    name : "12name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "13",
                    name : "13name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "14",
                    name : "14name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "15",
                    name : "15name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "97",
                    name : "97name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "98",
                    name : "98name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                {
                    id : "99",
                    name : "99name",
                    status : "結束",
                    startTime: "2024-01-15",
                    endTime: "2024-06-19",
                    result: "前往"
                },
                
                
            ],
            currentPage: 1,  // 目前頁碼
            itemsPerPage: 10,  // 每頁顯示幾筆資料
            searchKeyword: "",  // 搜尋的關鍵字

        };
    },
    components: {
        VueAwesomePagination
    },
    mounted() {
        // 設定選擇開始日期的話 結束日期不可以小於開始日期
        // 設定結束日期的話 開始日期不可以大於結束日期
        const startDate = document.querySelector("#startDate");
        const endDate   = document.querySelector("#endDate");

        startDate.addEventListener("change", function(){
            endDate.min = startDate.value;
        })

        endDate.addEventListener("change", function(){
            startDate.max = endDate.value;
        })
        
        const savePage = sessionStorage.getItem("currentPage");
        if (savePage){
            this.currentPage = parseInt(savePage)
        }
    },
    computed: {
        filteredData() {
            //模糊搜尋方式
            const keyword = this.searchKeyword; 
            return this.fakeData.filter(item =>
            String(item.id).includes(keyword) || // 轉成字串查id
            item.name.includes(keyword) // 查name
            );
        },
        paginatedData() { 
            //顯示的資料計算
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const currentPageData = this.filteredData.slice(start, end);

            var itemsToAdd = this.itemsPerPage - currentPageData.length;

            // 插入空白數據
            while (itemsToAdd != 0) {
              currentPageData.push({ id: '', name: '', status: '', startTime: '', endTime: '' });
              itemsToAdd--;
            }

            return currentPageData;
        },

    },methods: {
        onPageChange(page) {
            this.currentPage = page;
        },
        goAnswer(){
            this.$router.push("/Front/Answer");
            sessionStorage.setItem("currentPage", this.currentPage);
        },
        goCreate(){
            this.$router.push("/Back/Create");
        }
    },
    watch: {
        //模糊搜尋的話 都要重置到第一頁
        searchKeyword() {
            this.currentPage = 1; 
        }
    },


};


</script>

<template>
    <div class="containers">
        
        <!-- 表單名稱搜尋 -->
        <form class="search">
            <div class="searchName">
                <div class="input-group mb-3">
                    <span class="input-group-text">問卷名稱: </span>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入搜尋內容"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        v-model="searchKeyword" 
                    />
                </div>
            </div>

            <!-- 表單日期搜尋 -->
            <div class="searchDate">
                <div class="row  my-2" id="sortable1">

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">開始時間:</span>
                        <input type="date" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" id="startDate" >
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">結束時間:</span>
                        <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" id="endDate" >
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="searchButton">
                <div class="gap-2 d-md-flex justify-content-md-end" id="searchBtn">
                    <button class="btn " type="reset">清除</button>
                    <button class="btn  me-md-2" type="sumbit">搜尋</button>
                </div>
            </div>
        </form>

        <div class="addButtonArea">
            <button class="addButton" @click="goCreate()"><i class="fa-solid fa-plus"></i></button>
        </div>

        <!-- 資料結果顯示 -->
        <div class="dataShow table-responsive">
            <table class="table table-hover " >
                <thead class="table-light">
                    <tr>
                        <th scope="col"><i class="fa-solid fa-trash-can"></i></th>
                        <th scope="col">編號</th>
                        <th scope="col">名稱</th>
                        <th scope="col">狀態</th>
                        <th scope="col">開始時間</th>
                        <th scope="col">結束時間</th>
                        <th scope="col">結果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedData" :key="item.id">
                        <td><input type="checkbox"></td>
                        <th scope="row">{{ item.id }}</th>
                        <td >{{ item.name }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.startTime }}</td>
                        <td>{{ item.endTime }}</td>
                        <td @click="goAnswer" id="goAnswer">前往</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 頁碼 -->
        <div class="backPage">
            <vue-awesome-paginate
            :total-items="filteredData.length"
            :items-per-page="itemsPerPage"
            v-model="currentPage"
            @page-change="onPageChange"
            />
        </div>
    </div>

    
    
</template>

<style scoped lang="scss">
.containers {
    width: 100%;
    height: 90dvh;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: v-bind('color.mainColor');
    position: relative;

    .search {
        width: 80%;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
        border: 1px solid v-bind('color.borderColor');
        background-color: v-bind('color.secondColor');
        border-radius: 5px;


        .searchName {
            width: 80%;
            height: 50%;
        }
        .searchDate {
            width: 80%;
            height: 50%;
        }
        .searchButton {
            width: 80%;
            height: 50%;
            .btn{
                color: v-bind('color.secondColor');
                background-color: v-bind('color.buttonColor');
            }
            
        }
    }

    .search:hover{
        box-shadow: 0px 0px 12px rgba(0,0,0,.12);
    }

    .addButtonArea{

        position: fixed;
        top: 80%;
        left: 94%;
        .addButton {
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #004dff;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 3px #999;
            z-index: 100;
            border: #004dff;
            transition: 0.5s;
        }

        button:hover {
            transform: scale(1.1);
        }

        button:active {
            background-color: #020cd1;
        }
    }


    .dataShow {
        width: 80%;
        //height: 55%;
        //height: auto;
        margin-top: 2%;
        border: 1px solid v-bind('color.borderColor');
        background-color: v-bind('color.secondColor');
        border-radius: 5px;

        max-height: 50dvh; // 根據需要設置最大高度
        // overflow-y: hidden; // 使容器顯示滾輪
    

        table {
            width: 100%;
            // height: 100%;
            background-color: black;
            margin: 0px;
            thead{
                background-color: black;
            }
            #goAnswer{
                color: blue;
            }
        }
    }

    .dataShow:hover{
        box-shadow: 0px 0px 12px rgba(0,0,0,.12);
    }

    @media (max-width: 768px) {
    .search {
        // background-color: black;
        padding: 10px;

        #searchBtn{
            display: flex;
            justify-content: flex-end;
            // background-color: black;
            // height: 50%;

        }
    }
}


}



</style>


<style lang="scss">
// 以下是頁碼
.backPage{
    margin-top: 2%;
    .pagination-container {
        display: flex;
        column-gap: 10px;
    }
    .paginate-buttons {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
        //background-color: rgb(242, 242, 242);
        background-color: v-bind('color.secondColor');
        border: 1px solid rgb(217, 217, 217);
        color: black;
    }
    .paginate-buttons:hover {
        background-color: #d8d8d8;
    }   
    .active-page {
        background-color: #3498db;
        border: 1px solid #3498db;
        color: white;
    }
    .active-page:hover {
        background-color: #2988c8;
    }


}

</style>
