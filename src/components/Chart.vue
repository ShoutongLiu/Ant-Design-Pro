<template>
    <div ref="echarDom"></div>
</template>
<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
    props: {
        option: {
            type: Object,
            dufault: () => {}
        }
    },
    watch: {
        option(val) {
            this.chart.setOption(val);
        }
    },
    created() {
        this.resize = debounce(this.resize, 300);
    },
    mounted() {
        this.renderChart();
        addListener(this.$refs.echarDom, this.resize);
    },
    beforeDestroy() {
        removeListener(this.$refs.echarDom, this.resize);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        resize() {
            this.chart.resize();
        },
        renderChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(this.$refs.echarDom);
            this.chart.setOption(this.option);
        }
    }
};
</script>