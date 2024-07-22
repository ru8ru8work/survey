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
            totalPages: 0,   // 總頁數
            paginationOptions: {
            perPage: 10,   // 每頁顯示的項目數
            perPageDropdown: [10, 20, 30, 40],  // 每頁顯示選項
            dropdownAllowAll: true,  // 是否允許選擇顯示所有項目
            }
        };
    },
    components: {

    },
};



</script>

<template>
    <div class="containers">
        <div class="search">
            <div class="searchName">
                <div class="input-group mb-3">
                    <span class="input-group-text">問卷名稱: </span>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入搜尋內容"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <!-- <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button> -->
                </div>
            </div>

            <div class="searchDate">
                <div class="input-group">
                    <span class="input-group-text">統計時間:</span>
                    <input
                        type="date"
                        aria-label="First name"
                        class="form-control"
                    />
                    <span class="input-group-text">到</span>
                    <input
                        type="date"
                        aria-label="Last name"
                        class="form-control"
                    />
                    <!-- <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button> -->
                </div>
            </div>

            <div class="searchButton">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary me-md-2" type="button">
                        搜尋
                    </button>
                    <button class="btn btn-primary" type="button">清除</button>
                </div>
            </div>
        </div>

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
                    <tr v-for="item in this.fakeData">
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

        <div>
            

              <vue-awesome-pagination
            v-if="totalPages > 0"
            :total-visible="5"  <!-- 可見頁碼數量 -->
            :page-count="totalPages"  <!-- 總頁數 -->
            v-model="currentPage"  <!-- 雙向綁定當前頁碼 -->
            :options="paginationOptions"  <!-- 自定義選項 -->
            @page-changed="handlePageChange"  <!-- 分頁更改事件 -->
            ></vue-awesome-pagination>



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
