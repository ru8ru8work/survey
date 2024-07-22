<script>
import Header from "../components/Header.vue";
import Siderbar from "../components/Siderbar.vue";
import FrontShow from "../components/FrontShow.vue";

export default {
    components: {
        Header,
        Siderbar,
        FrontShow,
        
    },
};
</script>

<template>
    <div class="d-flex" id="wrapper">
        <Siderbar />
        <div id="page-content-wrapper">
            <Header />
            <FrontShow />
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    overflow-x: hidden;
    background-color: #47f0e8;
}
</style>
