<template>
  <div class="">
    <main class="">
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

