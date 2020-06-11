<template>
  <div id="app">
    <div id="nav">
      <div>
        <nav class="bg-gray-800">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center w-12 h-12 text-white">
                    <font-awesome-icon icon="car" size="lg" />
                  </div>
                </div>
                <div class="block">
                  <div class="flex items-baseline ml-10 space-x-4">
                    <router-link
                      to="/"
                      exact
                      active-class="text-white bg-gray-900 "
                      class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Table</router-link>
                    <router-link
                      to="/chart"
                      exact
                      active-class="text-white bg-gray-900 "
                      class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Chart</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <header class="bg-white shadow">
          <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <router-view />
            <!-- /End replace -->
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions({
      fetchCars: "cars/fetch"
    })
  },
  mounted() {
    this.fetchCars();
  }
};
</script>
