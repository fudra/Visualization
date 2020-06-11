<template>
  <div class="overflow-hidden bg-white rounded-md shadow">
    <header class="px-4 py-3 bg-gray-100">
      <h2 class="text-lg font-semibold text-gray-800">Filter</h2>
    </header>
    <main class="px-4 py-3">
      <div class="mt-4">
        <span class="text-gray-700">Achsenbeschreibung</span>

        <div class="flex space-x-4">
          <label class="block">
            <span class="text-gray-700">X-Achse</span>
            <select class="block w-full mt-1 form-select" v-model="axis.x">
              <option
                v-for="(item, idx) in filterbleItems"
                :key="idx"
                :value="item"
                :disabled="isOnAxis(item, 'y')"
              >{{item}}</option>
            </select>
          </label>

          <label class="block">
            <span class="text-gray-700">Y-Achse</span>
            <select class="block w-full mt-1 form-select" v-model="axis.y">
              <option
                v-for="(item, idx) in filterbleItems"
                :key="idx"
                :value="item"
                :disabled="isOnAxis(item, 'x')"
              >{{item}}</option>
            </select>
          </label>
        </div>
      </div>

      <div class="mt-4">
        <span class="text-gray-700">Herkunfsländer</span>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              value="Japanese"
              v-model="selectedCountryDataSet"
            />
            <span class="ml-2">Japanese</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              value="European"
              v-model="selectedCountryDataSet"
            />
            <span class="ml-2">European</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              value="American"
              v-model="selectedCountryDataSet"
            />
            <span class="ml-2">American</span>
          </label>
        </div>
      </div>

        <div class="mt-4">
        <span class="text-gray-700">Einheit</span>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input
              type="radio"
              class="form-radio"
              value="metric"
              v-model="selectUnitConversion"
            />
            <span class="ml-2">Metrisch</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              class="form-radio"
              value="imperial"
              v-model="selectUnitConversion"
            />
            <span class="ml-2">Imperial</span>
          </label>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { selectableItems } from "../helper";

export default {
  name: "VCChartFilter",
  data() {
    return {
      filterbleItems: selectableItems,
      axis: {
        y: "Beschleunigung",
        x: "Hubraum"
      },
      selectedCountryDataSet: ["Japanese", "European"],
      selectUnitConversion: "metric",
    };
  },
  methods: {
    ...mapActions({
      setAxis: "cars/setAxis",
      selectCountries: "cars/selectCountries",
      setUnitConversion: "cars/setUnitConversion",
    }),
    isOnAxis(value, byAxis) {
      return value === this.axis[byAxis];
    }
  },
  watch: {
    axis: {
      handler(axis) {
        this.setAxis(axis);
      },
      deep: true,
      immediate: true
    },
    selectedCountryDataSet: {
      handler(axis) {
        this.selectCountries(axis);
      },
      deep: true,
      immediate: true
    },
    selectUnitConversion: {
        handler(unit) {
            this.setUnitConversion(unit);
        },
        immediate: true,
    }
  }
};
</script>