<template>
  <div>
    <scatter-chart :chart-data="chartData" :options="chartOptions"></scatter-chart>
  </div>
</template>

<script>
import ScatterChart from "@/components/chars/ScatterChart";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "VCChart",
  components: {
    ScatterChart
  },
  computed: {
    ...mapGetters({
      cars: "cars/cars",
      heading: "cars/heading",
      axis: "cars/axis",
      countries: "cars/countries"
    }),
    chartData() {
      let data = [
        {
          label: "Japanese",
          backgroundColor: "rgba(	229, 62, 62, 0.5)",
          data: this.trasformData("Japanese")
        },
        {
          label: "European",
          backgroundColor: "rgba(	66, 153, 225, 0.5)",
          data: this.trasformData("European")
        },
        {
          label: "American",
          backgroundColor: "rgba(	72, 187, 120, 0.5)",
          data: this.trasformData("American")
        }
      ];

      let datasets = data.filter(item => this.countries.includes(item.label));

      return {
        datasets
      };
    },
    chartOptions() {
      return {
        tooltips: {
          callbacks: {
            beforeBody: () => {
              this.clearCurrentSelected();
            },
            label: (tooltipItem, data) => {
              const car =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                  .data;

              this.setCurrentSelected(car);

              return `Model: ${car.Model}`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.axis.x
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.axis.y
              }
            }
          ]
        }
      };
    }
  },
  methods: {
    ...mapActions({
      setCurrentSelected: "cars/setCurrentSelected",
      clearCurrentSelected: "cars/clearCurrentSelected"
    }),
    trasformData(type) {
      let a = this.filerBy(this.cars, "Herkunft", type);

      return a.map(item => ({
        x: item[this.axis.x],
        y: item[this.axis.y],
        data: item
      }));
    },

    filerBy(data, attribute, value) {
      return data.filter(item => item[attribute] === value);
    }
  }
};
</script>