<template>
  <div class="bg-white rounded-md shadow">
    <header class="flex justify-between px-4 py-3 bg-gray-100">
      <h2 class="text-lg font-semibold text-gray-800">Model(e)</h2>
       <div class="text-sm text-gray-500">({{selectedCars.length}}) </div>
    </header>
    <main class="px-4 py-3">
      <flickity ref="flickity" :options="flickityOptions" v-if="isVisible">
        <VCCarSelector
          class="carousel-cell"
          :item="item"
          v-for="(item, idx) in selectedCars"
          :key="idx"
        />
      </flickity>
    </main>
  </div>
</template>

<script>
import Flickity from "vue-flickity";
import VCCarSelector from "@/components/VCCarSelector";
import { mapGetters } from "vuex";

export default {
  name: "VCSelecedCar",
  components: {
    VCCarSelector,
    Flickity
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        draggable: true

        // any options from Flickity can be used
      },
      isVisible: true,
    };
  },
  computed: {
    ...mapGetters({
      selectedCars: "cars/selected"
    })
  },
  watch: {
    selectedCars: {
      handler() {
        this.isVisible = false;
        this.$nextTick( () => {
            this.isVisible = true;
        })
      }
    }
  }
};
</script>

