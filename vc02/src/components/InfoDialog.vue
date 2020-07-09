<template>
  <v-dialog />
</template>

<script>
export default {
  name: "InfoModal",
  props: {
    title: {
      required: false,
      type: String,
      default: "Frage"
    },
    text: {
      required: false,
      type: String,
      default: "Im folgenden ist zu erkennen..."
    }
  },
  mounted() {
    this.$modal.show("dialog", {
      title: this.title,
      text: this.text,
      buttons: [
        {
          title: "Bereit",
          default: true,
          handler: () => {
            this.$emit("startQuiz");
            this.$modal.hide("dialog");
          }
        }
      ]
    });
  }
};
</script>
