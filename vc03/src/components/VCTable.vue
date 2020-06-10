<template>
  <div class="flex flex-col">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                v-for="(item, idx) in headings"
                :key="idx"
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >{{item}}</th>
            </tr> 
          </thead>
          <tbody class="bg-white">
            <tr v-for="(item, idx) in cars" :key="idx">
              <td
                v-for="(header, idx) in headings"
                :key="idx"
                class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
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