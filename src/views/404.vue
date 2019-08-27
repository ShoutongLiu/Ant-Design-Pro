<template>
    <div class="notfound">
        <IconFont type="icon-icon-404" class="icon" />
        <Wechat />
    </div>
</template>

<script>
import Wechat from "../assets/wechat.svg";
export default {
    components: { Wechat }
};
</script>

<style scoped>
    .notfound {
        text-align: center;
    }

    .notfound .icon {
        font-size: 100px;
    }
</style>
