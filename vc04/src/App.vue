<template>
  <div id="app">
    <div class="absolute top-0 left-0 w-64 bg-white rounded-md shadow-md">
      <div class="px-5 py-3">
        <label for="search" class="block text-sm font-medium leading-5 text-gray-700">
          <div class="relative mt-1 rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 text-gray-600">
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="search"
              id="search"
              class="block w-full pl-10 pr-12 form-input sm:text-sm sm:leading-5"
              placeholder="Search a name..."
            />
          </div>
        </label>
      </div>

      <div class="px-5 py-2 bg-gray-200">
        <div class="text-gray-800">
          <div class="flex justify-between ">
            <span class="font-semibold">Move</span>
            <span class="italic text-gray-600">mouse drag</span>
          </div>
          <div class="flex justify-between ">
            <span class="font-semibold">Zoom</span>
            <span class="italic text-gray-600">scroll</span>
          </div>
        </div>
      </div>
    </div>
    <VHChart :data="chartData" :search="search" />
  </div>
</template>

<script>
import VHChart from "./components/VHChart.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    VHChart
  },
  data() {
    return {
      search: "",
      chartData: {}
    };
  },
  methods: {
    async loadData() {
      const { data } = await axios.get("./data.json");
      this.chartData = this.countWeightNodes(data);
    },
    countWeightNodes(graph) {
      // https://stackoverflow.com/questions/30675428/summing-up-the-weight-of-all-edges-to-a-node-in-d3-js
      graph.nodes = graph.nodes.map((node, index) => {
        node.score = graph.links.filter(
          d => +d.source === +index || +d.target === +index
        ).length;

        return node;
      });

      return graph;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
