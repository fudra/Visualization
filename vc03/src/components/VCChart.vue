<template>
  <div>
    {{axis}}

    <scatter-chart :chart-data="chartData"></scatter-chart>
  </div>
</template>

<script>
import ScatterChart from "@/components/chars/ScatterChart";
import { mapGetters } from "vuex";

export default {
  name: "VCChart",
  components: {
    ScatterChart
  },
  data() {
    return {
      axis: {
        x: "Hubraum",
        y: "Beschleunigung"
      },
    };
  },
  computed: {
    ...mapGetters({
      cars: "cars/cars",
      heading: "cars/heading"
    }),
    chartData() {
      return  {
        datasets: [
          {
            label: "European",
            pointBackgroundColor: "rgba(	229, 62, 62, 0.3)",
            pointBorderColor: "#E53E3E",
            data: this.trasformData(),
          }
        ]
      }
    },
  },
  methods: {
    trasformData() {
      let a = this.filerBy(this.cars, "Herkunft", "European");

      return a.map(item => ({ x: item[this.axis.x], y: item[this.axis.y], data: item }));
    },

    filerBy(data, attribute, value) {
      return data.filter(item => item[attribute] === value);
    }
  }
};
</script>