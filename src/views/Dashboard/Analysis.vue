<template>
    <div class="ans">
        analysis
        <a-button @click="handleClick">请求</a-button>
    </div>
</template>

<script>
import { get } from '../../utils/fetch.js'
export default {
    methods: {
        handleClick() {
            get('/banner').then(async res => {
                console.log(res)
            })
        }
    }
}
</script>

<style>
</style>
