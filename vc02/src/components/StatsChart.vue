<template>
  <div class="hello my-3">
    <h4 class="text-xl font-bold leading-tight text-gray-900">
      {{ data.quiz }} <span class="text-gray-500 text-sm hidden">({{ data.rounds }})</span>
    </h4>
    <p class="py-2">{{ data.text }}</p>

    <bar-chart :chart-data="datacollection"></bar-chart>
  </div>
</template>

<script>
/* eslint-disable */
import BarChart from "./charts/BarChart.js";

export default {
  name: "StatsChart",
  components: {
    BarChart
  },
  data() {
    return {
      datacollection: {}
    };
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    getPercentage(value) {
      let a = this.data.correct[value];

      if (a == 0) {
        return 0;
      }
      return (this.data.correct[value] / this.data.rounds[value]) * 100;
    },
    fillData() {
      if (this.data === undefined) return;

      /*
      this.datacollection = {
        labels: ["Answer YES", "Answer NO", "Target YES", "Target NO"],
        datasets: [
          {
            label: "Answers",
            backgroundColor: "#F56565",
            data: [
              this.data.answer.yes,
              this.data.answer.no,
              0, //this.data.target.yes,
              0 //this.data.target.no
            ]
          },

          {
            label: "Target",
            backgroundColor: "#4299E1",
            data: [
              0, //this.data.answer.yes,
              0, //this.data.answer.no,
              this.data.target.yes,
              this.data.target.no
            ]
          }
        ]
      };
      */

      /*
"1000": 0,
            "750": 0,
            "500": 0,
            "250": 0,
            "100": 0

            */

      this.datacollection = {
        labels: [1000, 750, 500, 250, 100],
        datasets: [
          {
            label: "",
            backgroundColor: "#F56565",
            data: [
              this.getPercentage("1000"),
              this.getPercentage("750"),
              this.getPercentage("500"),
              this.getPercentage("250"),
              this.getPercentage("100")
            ]
          }
        ]
      };
    }
  }
};
</script>
