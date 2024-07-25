<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import HomeShow from "../components/HomeShow.vue";

export default {
    components: {
        Sidebar,
        Header,
        HomeShow,
        
    },
};
</script>

<template>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <HomeShow />
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
    background-color: #47f0e8;
}


</style>
