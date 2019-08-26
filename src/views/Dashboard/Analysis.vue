<template>
    <div class="ans">
        <Chart :option="chartOption" style="height: 400px" />
    </div>
</template>

<script>
// import { get } from '../../utils/fetch.js'
import Chart from "../../components/Chart";
import request from "../../utils/request";
export default {
    data() {
        return {
            chartOption: {}
        };
    },
    components: { Chart },
    mounted() {
        this.getChartData();
    },
    methods: {
        getChartData() {
            request({
                url: "/api/dashboard/chart",
                methods: "GET",
                params: { ID: 12345 }
            }).then(res => {
                this.chartOption = res.data;
            });
        }
    }
};
</script>

<style>
</style>
