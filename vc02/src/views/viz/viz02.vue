<template>
  <div class="bg-white rounded-lg p-6 shadow-md flex flex-col items-center ">
    <InfoDialog :text="dialogText" :title="dialogTitle" @startQuiz="startQuiz" />
    <header class="">
      <div class="px-4">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ quiz }}
        </h1>
      </div>
    </header>
    <main>
      <div class="py-4">
        <Quiz :startQuiz="showQuiz" :timeout="timeout" :draw="draw" />
      </div>
    </main>
    <footer>
      <div class="px-4 flex w-full">
        <QuizAnswer @answer="quizAnswer" :text="quizAnswerText" />
      </div>
    </footer>
  </div>
</template>

<script>
import Quiz from "./../../components/Quiz.vue";
import InfoDialog from "./../../components/InfoDialog";
import QuizAnswer from "./../../components/QuizAnswer";

export default {
  name: "viz02",
  components: {
    Quiz,
    InfoDialog,
    QuizAnswer
  },
  data() {
    return {
      showQuiz: false,
      quiz: "Quiz #02"
    };
  },

  methods: {
    draw(sketch) {
      // clear
      sketch.background(0, 0, 0);
      // help functions
      let getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
      };

      let createDotElement = (sketch, target = false) => {
        let randomX = getRandomInt(sketch.width);
        let randomY = getRandomInt(sketch.height);

        if (target) {
          sketch.fill(66, 153, 225);
          sketch.circle(randomX, randomY, 20);
        } else {
          sketch.fill(245, 101, 101);
          sketch.rect(randomX, randomY, 20, 20);
        }
      };

      // vars
      let distractors = 30;

      let hasTarget = getRandomInt(2);

      // inform state
      this.$store.dispatch("setTarget", { target: !!hasTarget });

      for (let i = 0; i < distractors / 2; i++) {
        createDotElement(sketch, false);
      }

      if (hasTarget) {
        createDotElement(sketch, true);
      }

      for (let i = 0; i < distractors / 2; i++) {
        createDotElement(sketch, false);
      }
    },

    startQuiz() {
      console.log("starting...");
      this.showQuiz = true;
    },

    quizAnswer(answer) {
      this.$store.dispatch("setNewAnswer", {
        quiz: this.quiz,
        text: this.dialogText,
        answer: answer.text,
        hasTarget: this.hasTarget,
        time: this.timeout
      });

      this.$router.push({ name: "viz03" });
    }
  },
  computed: {
    hasTarget() {
      return this.$store.state.target;
    },
    timeout() {
      return this.$store.getters.getTimeout;
    },
    dialogText() {
      return "Bei der folgende Aufgaben ist es zu erkennen, ob sich auf dem  gezeigten Bild ein blauer Kreis befindet";
    },
    dialogTitle() {
      return this.quiz;
    },
    quizAnswerText() {
      return "War auf dem oben gezeigtem Bild ein blauer Kreis zu sehen?";
    }
  }
};
</script>
