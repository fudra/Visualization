<template>
  <div class="home">
    <VCTable :headings="heading" :cars="cars" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VCTable from "@/components/VCTable";

export default {
  name: "Home",
  components: {
    VCTable
  },

  computed: {
    ...mapGetters({
      cars: "cars/cars",
      heading: "cars/heading"
    })
  },

};
</script>
