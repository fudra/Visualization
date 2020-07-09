<template>
  <div id="app">
    <h1 class="hidden my-6 text-3xl font-semibold text-center">
      Visualisierung
    </h1>
    <div class="flex my-10">
      <div class="max-w-4xl mx-auto">
        <vis01
          itemKey="a1"
          question="Wie würden Sie den Entwicklung der Förderung der Sprache prozentual einschätzen?"
          label="Förderschwerpunkt Sprache"
          class="m-2"
          @calc-x="calcAvgX"
        />
      </div>
    </div>

    <div class="flex my-10">
      <div class="max-w-4xl mx-auto">
        <vis01
          itemKey="a2"
          :esimanteValue="-15"
          label="Personenbezogenen Wassergebrauch"
          question="Wie würden Sie die Entwicklung den Personenbezogenen Wassergebrauch prozentual einschätzen?"
          :datalabels="getRangeYearsA2()"
          :dataSet="getValuesA2()"
          class="m-2"
          @calc-x="calcAvgX"
        />
      </div>
    </div>

    <div class="flex my-10">
      <div class="max-w-4xl mx-auto">
        <vis01
          itemKey="a3"
          :esimanteValue="20"
          label="Immer mehr Deutsche haben Abitur"
          question="Wie würden Sie die Entwicklung des Abiturs prozentual einschätzen?"
          :datalabels="getRangeYearsA3()"
          :dataSet="getValuesA3()"
          class="m-2"
          @calc-x="calcAvgX"
        />
      </div>
    </div>

    <p class="mt-10 mb-20 text-sm text-center text-gray-600 ">
      Durchschnittliches X: {{ avgX }}
    </p>
  </div>
</template>

<script>
import Vis01 from './components/Vis01.vue';

export default {
  name: 'App',
  data() {
    return {
      x: {},
      avgX: 0,
    };
  },
  components: {
    Vis01,
  },
  methods: {
    /** Range and Values for chart 2 */
    getRangeYearsA2() {
      return [...Array(28).keys()].map((x) => x + 1990);
    },
    getValuesA2() {
      return [
        147,
        144,
        140,
        134,
        133,
        132,
        130,
        130,
        129,
        130,
        129,
        127,
        128,
        131,
        126,
        125,
        126,
        123,
        123,
        122,
        121,
        121,
        122,
        121,
        122,
        123,
        123,
        123,
      ];
    },

    /** Range and Values for chart 3 */
    getRangeYearsA3() {
      return [...Array(10).keys()].map((x) => x + 2008);
    },
    getValuesA3() {
      return [24.4, 25.3, 25.8, 26.6, 27.3, 27.9, 28.8, 29.5, 30.8, 31.9];
    },
    calcAvgX(val) {
      this.x[val.key] = val.value;

      let key = Object.keys(this.x);
      let sum = 0;
      key.forEach((item) => (sum += this.x[item]));
      this.avgX = sum / key.length;
    },
  },
};
</script>

<style></style>
