<script>
import VueAwesomePagination from 'vue-awesome-paginate';
import backgroundcolor from '../stores/backgroundcolor'
import axios from "axios";

export default {
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    data() {
        return {
            testdata: "test123",
            fakeData: [],
            currentPage: 1,  // 目前頁碼
            itemsPerPage: 5,  // 每頁顯示幾筆資料
            searchKeyword: "",  // 搜尋的關鍵字
            searchAll:
            {
                "quizName": "",
                "startDate": "",
                "endDate": ""
            }


        };
    },
    components: {
        VueAwesomePagination
    },
    mounted() {
        // 設定選擇開始日期的話 結束日期不可以小於開始日期
        // 設定結束日期的話 開始日期不可以大於結束日期
        const startDate = document.querySelector("#startDate");
        const endDate = document.querySelector("#endDate");

        startDate.addEventListener("change", function () {
            endDate.min = startDate.value;
        })

        endDate.addEventListener("change", function () {
            startDate.max = endDate.value;
        })

        const savePage = sessionStorage.getItem("currentPage");
        if (savePage) {
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

    },
    methods: {
        onPageChange(page) {
            this.currentPage = page;
        },
        goAnswer(id) {
            this.$router.push("/Front/Answer");
            sessionStorage.setItem("currentPage", this.currentPage);
            sessionStorage.setItem("searchId", id);
        },
        async search() {

            this.fakeData = [];

            try {

                // 發送 POST 請求
                const response = await axios.post(
                    "http://localhost:8080/quiz/search",
                    this.searchAll
                );
                // 請求成功後的操作

                console.log(response.data.quizResList);
                for (let i = 0; i < response.data.quizResList.length; i++) {

                    // 整理 quizItem 成 fakeData 需要的格式
                    let formattedItem = {
                        id: response.data.quizResList[i].id, // 假設 id 是數字，轉成字串
                        name: response.data.quizResList[i].name,
                        status: response.data.quizResList[i].published ? "開始" : "未開始", // 根據 published 判斷 status
                        startTime: response.data.quizResList[i].startDate, // 假設 startDate 是一個字串
                        endTime: response.data.quizResList[i].endDate, // 假設 endDate 是一個字串
                        result: "前往" // 固定的結果字串
                    };

                    this.fakeData.push(formattedItem);
                }

            } catch (error) {
                console.error("There was an error!", error);
            }

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
                    <input type="text" class="form-control" placeholder="請輸入搜尋內容" aria-label="Recipient's username"
                        aria-describedby="button-addon2" v-model="searchKeyword" />
                </div>
            </div>

            <!-- 表單日期搜尋 -->
            <div class="searchDate">
                <div class="row  my-2" id="sortable1">

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">開始時間:</span>
                            <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" id="startDate">
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">結束時間:</span>
                            <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" id="endDate">
                        </div>
                    </div>
                </div>

            </div>

            <div class="searchButton">
                <div class="gap-2 d-md-flex justify-content-md-end" id="searchBtn">
                    <button class="btn " type="reset">清除</button>
                    <button class="btn  me-md-2" type="button" @click="search">搜尋</button>
                </div>
            </div>
        </form>

        <!-- 資料結果顯示 -->
        <div class="dataShow table-responsive">
            <table class="table table-hover ">
                <thead class="table-light">
                    <tr>
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
                        <th scope="row">{{ item.id }}</th>
                        <td @click="goAnswer(item.id)" id="goAnswer">{{ item.name }} </td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.startTime }}</td>
                        <td>{{ item.endTime }}</td>
                        <td >test</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 頁碼 -->
        <div class="page">
            <vue-awesome-paginate :total-items="filteredData.length" :items-per-page="itemsPerPage"
                v-model="currentPage" @page-change="onPageChange" />
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

            .btn {
                color: v-bind('color.secondColor');
                background-color: v-bind('color.buttonColor');
            }

        }
    }

    .search:hover {
        box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
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

            thead {
                background-color: black;
            }

            #goAnswer {
                color: blue;
            }

        }
    }

    .dataShow:hover {
        box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    }

    @media (max-width: 768px) {
        .search {
            // background-color: black;
            padding: 10px;
            height: 40%;

            #searchBtn {
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
.page {

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
