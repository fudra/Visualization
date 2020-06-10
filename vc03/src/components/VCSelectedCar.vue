<template>
  <div class="overflow-hidden bg-white rounded-md shadow">
    <header class="px-4 py-3 bg-gray-100">
      <h2 class="text-lg font-semibold text-gray-800">Selected</h2>
    </header>
    <main class="px-4 py-3">{{selectedCars.length}}</main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VCSelecedCar",
  computed: {
    ...mapGetters({
      selectedCars: "cars/selected"
    })
  },
  methods: {}
};
</script>