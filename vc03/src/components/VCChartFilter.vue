<template>
  <div class="overflow-hidden bg-white rounded-md shadow">
    <header class="px-4 py-3 bg-gray-100">
      <h2 class="text-lg font-semibold text-gray-800">Filter</h2>
    </header>
    <main class="px-4 py-3">
      <div class>
        <span class="text-gray-700">Hersteller</span>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          :autocomplete-items="filteredItems"
          @tags-changed="newTags => tags = newTags"
        />
      </div>

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
            <input type="radio" class="form-radio" value="metric" v-model="selectUnitConversion" />
            <span class="ml-2">Metrisch</span>
          </label>
          <label class="flex items-center">
            <input type="radio" class="form-radio" value="imperial" v-model="selectUnitConversion" />
            <span class="ml-2">Imperial</span>
          </label>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { selectableItems } from "../helper";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "VCChartFilter",
  components: {
    VueTagsInput
  },
  data() {
    return {
      filterbleItems: selectableItems,
      axis: {
        y: "Beschleunigung",
        x: "Hubraum"
      },
      selectedCountryDataSet: ["Japanese", "European"],
      selectUnitConversion: "metric",
      tag: "",
      tags: [],
      autocompleteItems: []
    };
  },
  computed: {
    ...mapGetters({
      countable: "cars/countable"
    }),
    supplier() {
      return this.countable.Hersteller;
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    ...mapActions({
      setAxis: "cars/setAxis",
      selectCountries: "cars/selectCountries",
      setUnitConversion: "cars/setUnitConversion",
      setSupplier: "cars/setSupplier"
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
      immediate: true
    },
    // map for tags
    countable: {
      handler(value) {
        this.autocompleteItems = value.Hersteller.map(item => ({
          text: `${item.item} (${item.count})`
        }));

        this.tags = value.Hersteller.map(item => ({
          text: `${item.item} (${item.count})`
        }));
      },
      immediate: true
    },
    tags: {
        handler(value) {
            this.setSupplier(value)
        },
        immediate: true
    }
  },

};
</script>