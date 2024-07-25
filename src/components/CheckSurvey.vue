<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        updateCheckData(){
            this.$emit("update:childCheckData",false);
        }
    },
    props:[
        "childCheckData"
    ]
};
</script>

<template>
    <div class="button">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="reset" @click="updateCheckData()">修改</button>
                <button class="btn btn-primary me-md-2" type="button" >送出</button>
            </div>
        </div>
</template>

<style scoped lang="scss">



</style>
