<template>
  <div class="about">
    <div class="flex mb-5 space-x-4">
      <VCChartFilter  class="w-4/6"/> 
      <VCSelecedCar  class="w-2/6"/> 
    </div>

    <VCChart />
  </div>
</template>

<script>
import VCChart from "@/components/VCChart";
import VCChartFilter from "@/components/VCChartFilter";
import VCSelecedCar from "@/components/VCSelectedCar";


export default {
  name: "About",
  components: {
    VCChart,
    VCChartFilter,
    VCSelecedCar
  },

};
</script>
