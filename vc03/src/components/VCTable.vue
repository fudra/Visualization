<template>
  <div class="flex flex-col">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                v-for="(item, idx) in headings"
                :key="idx"
                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
              {{item}}</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(item, idx) in cars" :key="idx">
              <td
                v-for="(header, idx) in headings"
                :key="idx"
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900"
              >{{ item[header] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VCTable",
  props: {
    headings: {
      type: Array,
      require: true
    },
    cars: {
      type: Array,
      require: true
    }
  }
};
</script>