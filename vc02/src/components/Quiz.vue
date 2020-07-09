<template>
  <div class="h-40 flex items-center justify-center text-center uppercase my-24">
    <vue-p5 @setup="setup" @draw="draw" v-if="debugging"> </vue-p5>
    <template v-else>
      <div class="text-6xl" v-if="showCountdown">
        {{ countdown }}
      </div>

      <div v-if="start">
        <vue-p5 @setup="setup" @draw="draw"> </vue-p5>
      </div>

      <div v-if="!start && !showCountdown">
        <p class="text-5xl text-gray-700 ">Vorbei</p>
      </div>
    </template>
  </div>
</template>

<script>
import VueP5 from "vue-p5";

export default {
  name: "Quiz",

  data() {
    return {
      start: false,
      countdown: 4,
      showCountdown: true,
      debugging: false
    };
  },
  components: {
    VueP5
  },
  props: {
    timeout: {
      required: false,
      type: Number,
      default: 250
    },
    startQuiz: {
      required: false,
      type: Boolean,
      default: false
    },
    draw: {
      required: false,
      type: Function,
      default: () => ({})
    }
  },
  methods: {
    setup(sketch) {
      sketch.createCanvas(370, 370);
      sketch.background(0, 0, 0);

      if (this.debugging) {
        sketch.frameRate(1);
      } else {
        sketch.noLoop();
      }
      //
    },
    /*

    draw(sketch) {
      // help functions
      let getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
      };

      let createDotElement = (sketch, target = false) => {
        let randomX = getRandomInt(sketch.width);
        let randomY = getRandomInt(sketch.height);

        if (target) {
          sketch.fill(72, 187, 120);
        } else {
          sketch.fill(245, 101, 101);
        }

        sketch.circle(randomX, randomY, 20);
      };

      // vars
      let distractors = 30;

      let hasTarget = getRandomInt(2);

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


    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    createDotElement(sketch, target = false) {
      let randomX = this.getRandomInt(sketch.width);
      let randomY = this.getRandomInt(sketch.height);

      if (target) {
        sketch.fill(72, 187, 120);
      } else {
        sketch.fill(245, 101, 101);
      }

      sketch.circle(randomX, randomY, 20);
    },
    */

    startCountdown() {
      let interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          console.log("clear");
          clearInterval(interval);
          this.showCanvas();
        }
      }, 1000);
    },
    showCanvas() {
      console.log("showCanvas");
      this.showCountdown = false;

      this.start = true;
      setInterval(() => {
        this.start = false;
      }, this.timeout);
    }
  },
  watch: {
    startQuiz: {
      handler(newvalue) {
        console.log("newvalue", newvalue);
        if (newvalue) {
          this.startCountdown();
        }
      }
    }
  }
};
</script>
