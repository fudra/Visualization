<template>
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">{{ item.quiz }}</div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">{{ item.time }}</div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">{{ item.answer }}</div>
    </td>

    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">{{ item.hasTarget }}</div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "QuizSummeryItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
