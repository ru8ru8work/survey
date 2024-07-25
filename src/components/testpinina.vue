<script>
import { useCounterStore } from '../stores/counter.js';


export default {
    setup(){
        const store = useCounterStore();
        return { store };
    }

};
</script>

<template>
    
    <h1>{{ store.count }}</h1>
    <button @click="store.increment">Increment</button>


<style scoped lang="scss">

</style>
