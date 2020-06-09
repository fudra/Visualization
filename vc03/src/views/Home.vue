<template>
  <div class="home">
      home
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex' 

export default {
  name: 'Home',
  components: {

  },
  methods: {
    ...mapActions({
      fetchCars: 'cars/fetch'
    })
  },
  computed: {
    ...mapGetters({
      cars: 'cars/cars'
    })
  },
  mounted() {
    this.fetchCars();
  }
}
</script>
