<template>
  <div class="home">
    <VCTable :headings="heading" :cars="cars" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VCTable from "@/components/VCTable";

export default {
  name: "Home",
  components: {
    VCTable
  },
  methods: {
    ...mapActions({
      fetchCars: "cars/fetch"
    })
  },
  computed: {
    ...mapGetters({
      cars: "cars/cars",
      heading: "cars/heading"
    })
  },
  mounted() {
    this.fetchCars();
  }
};
</script>
