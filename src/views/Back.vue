<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import BackShow from "../components/BackShow.vue";

export default {
    components: {
        Header,
        Sidebar,
        BackShow,
        
    },
};
</script>

<template>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
            <Header />
            <BackShow />
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
    background-color: #47f0e8;
}
</style>
