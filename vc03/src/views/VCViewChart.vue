<template>
  <div class="chart">
    <div class="flex space-x-4">
      <div class="w-1/3">
      <div class="h-56">
        <VCSelecedCar />
      </div>
        <VCChartFilter  class="mt-5"/>
      </div>

      <div class="w-2/3">
        <VCChart />
      </div>
    </div>
  </div>
</template>

<script>
import VCChart from "@/components/VCChart";
import VCChartFilter from "@/components/VCChartFilter";
import VCSelecedCar from "@/components/VCSelectedCar";

export default {
  name: "VCViewChart",
  components: {
    VCChart,
    VCChartFilter,
    VCSelecedCar
  }
};
</script>
