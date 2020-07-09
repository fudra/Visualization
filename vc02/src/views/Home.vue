<template>
  <div class="bg-white rounded-lg p-6 shadow-md flex flex-col items-center ">
    <header class="">
      <div class="px-4">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Übung 2
        </h1>
      </div>
    </header>
    <main>
      <div class="inline-flex rounded-md w-full shadow mt-6">
        <a
          href="#"
          @click.prevent="start()"
          class="inline-flex items-center justify-center w-full px-8 uppercase py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Starten
        </a>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    start() {
      this.$router.push({ name: "viz01" });
    }
  }
};
</script>
