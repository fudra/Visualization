<template>
  <div id="app">
    <VHChart :data="chartData"/>
  </div>
</template>

<script>
import VHChart from './components/VHChart.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    VHChart
  },
  data () {
    return {
      chartData: {}
    }
  },
  methods: {
    async loadData () {
      const { data } = await axios.get('./data.json')
      this.chartData = data
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
