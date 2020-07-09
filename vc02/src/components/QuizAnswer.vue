<template>
  <div class="flex flex-col">
    <p class="text-xl font-bold leading-tight text-gray-900 mb-3">{{ text }}</p>

    <div class="mt-8 flex lg:mt-0">
      <div class="inline-flex rounded-md w-full shadow">
        <a
          href="#"
          @click.prevent="answer('yes')"
          class="inline-flex items-center justify-center w-full px-8 uppercase py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          JA
        </a>
      </div>
      <div class="ml-3 inline-flex rounded-md w-full  shadow">
        <a
          href="#"
          @click.prevent="answer('no')"
          class="inline-flex items-center justify-center  w-full  px-8 uppercase py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Nein
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizAnswer",
  props: {
    text: {
      type: String,
      default: "Ist auf dem Bild ... zu sehen?"
    }
  },
  methods: {
    answer(text) {
      this.$emit("answer", { text });
    }
  }
};
</script>
