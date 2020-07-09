<template>
  <div class="bg-white rounded-lg p-6 shadow-md flex flex-col items-center ">
    <header class="">
      <div class="px-4">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Summery
        </h1>
      </div>
    </header>
    <main>
      <div class="mt-8 flex lg:mt-0  pt-5">
        <div class="inline-flex rounded-md w-full shadow">
          <a
            href="#"
            @click.prevent="repeat()"
            class="inline-flex items-center justify-center w-full px-8 uppercase py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Wiederholen
          </a>
        </div>
        <div class="ml-3 inline-flex rounded-md w-full  shadow">
          <a
            href="#"
            @click.prevent="chart = !chart"
            class="inline-flex items-center justify-center  w-full  px-8 uppercase py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Zeige {{ chart ? "Table" : "Chart" }}
          </a>
        </div>
      </div>

      <div class="py-4">
        <div
          class="align-middle inline-block min-w-full overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <div v-if="chart" class="min-w-full">
            <template v-for="(item, idx) in getStats()">
              <StatsChart :data="item" :key="idx" />
            </template>
          </div>

          <table v-if="!chart" class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quiz #
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Antwort
                </th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Target
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <quiz-summery-item :item="item" v-for="(item, idx) in getAllQuizAnswers" :key="idx" />
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuizSummeryItem from "./../components/QuizSummeryItem";
import StatsChart from "./../components/StatsChart";

export default {
  name: "Summery",
  data() {
    return {
      chart: false
    };
  },
  computed: {
    ...mapGetters(["getAllQuizAnswers"])
  },
  components: {
    QuizSummeryItem,
    StatsChart
  },
  methods: {
    orderForStats() {
      let items = [];

      // order for quiz data
      this.getAllQuizAnswers.forEach(i => {
        if (!items[i.quiz]) {
          items[i.quiz] = [i];
        } else {
          items[i.quiz] = [i, ...items[i.quiz]];
        }
      });

      return items;
    },
    getStatsMock() {
      return [
        {
          quiz: "Quiz #01",
          text:
            "Bei der folgende Aufgaben ist es zu erkennen, ob sich im gezeigten Bild ein grüner Kreis befindet",
          answer: {
            yes: 7,
            no: 3
          },
          target: {
            yes: 7,
            no: 3
          }
        },
        {
          quiz: "Quiz #02",
          text:
            "Bei der folgende Aufgaben ist es zu erkennen, ob sich auf dem gezeigten Bild ein blauer Kreis befindet",
          answer: {
            yes: 5,
            no: 5
          },
          target: {
            yes: 6,
            no: 4
          }
        },
        {
          quiz: "Quiz #03",
          text:
            "Bei der folgende Aufgaben ist es zu erkennen, ob sich im gezeigten Bild ein weißes Quadrat befindet",
          answer: {
            yes: 3,
            no: 7
          },
          target: {
            yes: 5,
            no: 5
          }
        },
        {
          quiz: "Quiz #04",
          text:
            "Bei der folgenden Aufgabe ist es zu erkennen, ob sich in der Menge der Kreise ein roter Kreis befindet",
          answer: {
            yes: 9,
            no: 1
          },
          target: {
            yes: 9,
            no: 1
          }
        },
        {
          quiz: "Quiz #05",
          text:
            "Bei der folgenden Aufgabe ist es zu erkennen, ob sich in der Menge der Objekte ein roter Kreis befindet",
          answer: {
            yes: 7,
            no: 3
          },
          target: {
            yes: 6,
            no: 4
          }
        }
      ];
    },

    getStats() {
      let data = this.orderForStats();
      let tmp = [];

      Object.keys(data).map(quiz => {
        const a = {
          quiz,
          text: "",
          answer: {
            yes: 0,
            no: 0
          },
          target: {
            yes: 0,
            no: 0
          },
          correct: {
            "1000": 0,
            "750": 0,
            "500": 0,
            "250": 0,
            "100": 0
          },
          rounds: {
            "1000": 0,
            "750": 0,
            "500": 0,
            "250": 0,
            "100": 0
          }
        };

        data[quiz].forEach(item => {
          a.text = item.text;
          a.answer[item.answer]++;
          a.target[item.hasTarget ? "yes" : "no"]++;
          a.rounds[item.time]++;
          a.correct[item.time] +=
            (item.hasTarget && item.answer == "yes") || (!item.hasTarget && item.answer == "no")
              ? 1
              : 0;
        });

        tmp.push(a);
      });

      return tmp;
    },
    repeat() {
      this.$store.dispatch("updateTimeout"); //
      this.$router.push({ name: "viz01" });
    }
  }
};
</script>
