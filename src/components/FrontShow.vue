<script>
import VueAwesomePagination from 'vue-awesome-paginate';

export default {
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
                
                
            ],
            currentPage: 1,  // 目前頁碼
            itemsPerPage: 5,  // 每頁顯示的項目數
            searchKeyword: "",  // 新增搜尋關鍵字變數

        };
    },
    components: {
        VueAwesomePagination
    },
    mounted() {
        // const onClickHandler = (page: number) => {
        // console.log(page);
        // };
    },computed: {
        filteredData() {
            const keyword = this.searchKeyword.toLowerCase();
            return this.fakeData.filter(item => item.name.toLowerCase().includes(keyword));
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        }
    },methods: {
        onPageChange(page) {
            this.currentPage = page;
        }
    }

    

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
                    <!-- <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button> -->
                </div>
            </div>

            <!-- 表單日期搜尋 -->
            <div class="searchDate">
                <div class="row g-3 my-2" id="sortable1">

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">開始時間:</span>
                        <input type="date" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" >
                        </div>
                    </div>

                    <div class="col-md-6 item-box">
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">結束時間:</span>
                        <input type="date" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" >
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="searchButton">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary me-md-2" type="button">
                        搜尋
                    </button>
                    <button class="btn btn-primary" type="reset">清除</button>
                </div>
            </div>
        </form>

        <!-- 資料結果顯示 -->
        <div class="dataShow table-responsive">
            <table class="table table-hover" table-color:black>
                <thead>
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
                        <td >{{ item.name }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.startTime }}</td>
                        <td>{{ item.endTime }}</td>
                        <td>{{ item.result }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="page">
            

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
    height: 88%;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;

    .search {
        width: 80%;
        height: 40%;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5%;

        //background-color: black;
        // justify-content: center;
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
        }
    }

    .dataShow {
        width: 80%;
        height: 55%;
        margin-top: 2%;
        border: 1px solid black;
        table {
            width: 100%;
            
        }
    }
}



</style>


<style lang="scss">
// 以下是頁數 
.page{
    .pagination-container {
        display: flex;
        column-gap: 10px;
    }
    .paginate-buttons {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
        background-color: rgb(242, 242, 242);
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
