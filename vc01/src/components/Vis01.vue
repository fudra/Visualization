<template>
  <div class="flex bg-white rounded-lg shadow-lg">
    <div class="flex justify-end p-4">
      <line-chart :chart-data="chartData" :options="options"></line-chart>
    </div>

    <div class="ml-8 border-l border-gray-200">
      <div class="px-4 px-6 py-5 border-b border-gray-200">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Anstieg der Kurve
        </h3>
        <p class="max-w-2xl mt-1 text-sm leading-5 text-gray-500">
          {{ question }}
        </p>
      </div>

      <div class="px-4 mt-2 ">
        <label for="x" class="block text-sm font-medium leading-5 text-gray-700"
          >Schätzung</label
        >
        <div class="flex mt-1 ">
          <input
            id="x"
            class="block w-full leading-5 form-input"
            v-model="esimanteValue"
          />
          <a
            href="#"
            @click.prevent="estimateX"
            class="px-4 py-2 ml-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >
            Schätzen
          </a>
        </div>
      </div>

      <div class="mt-2" v-if="showEval">
        <dl>
          <div class="grid grid-cols-3 gap-4 px-4 px-6 py-5 bg-gray-50">
            <dt class="text-sm font-medium leading-5 text-gray-600">
              Steigung
            </dt>
            <dd class="col-span-2 mt-0 mt-1 text-sm leading-5 text-gray-900">
              {{ decimalAdjustment(percentaulDiff) }}
            </dd>
          </div>
          <div class="grid grid-cols-3 gap-4 px-4 px-6 py-5 bg-gray-50">
            <dt class="text-sm font-medium leading-5 text-gray-600">
              Geschätzte Steigung:
            </dt>
            <dd class="col-span-2 mt-0 mt-1 text-sm leading-5 text-gray-900">
              {{ esimanteValue }}
            </dd>
          </div>

          <div class="grid grid-cols-3 gap-4 px-4 px-6 py-5 bg-gray-50">
            <dt class="text-sm font-medium leading-5 text-gray-600">
              Differenz
            </dt>
            <dd class="col-span-2 mt-0 mt-1 text-sm leading-5 text-gray-900">
              {{ decimalAdjustment(estimateDiff) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import LineChart from './charts/LineChart';

export default {
  name: 'Vis01',
  props: {
    itemKey: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    datalabels: {
      type: Array,
      default: () => [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
    },
    dataSet: {
      type: Array,
      default: () => [
        37514,
        36717,
        35326,
        34298,
        33329,
        31805,
        30560,
        29704,
        28843,
      ],
    },
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#f87979',
    },
  },
  data() {
    return {
      esimanteValue: 0,
      showEval: false,
      options: {
        scales: {
          xAxes: [
            {
              //display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
      chartData: {
        labels: this.datalabels,
        datasets: [
          {
            label: this.label,
            borderColor: this.color,
            fill: false,
            data: this.dataSet,
          },
        ],
      },
    };
  },
  components: {
    LineChart,
  },
  methods: {
    estimateX() {
      this.showEval = true;
    },
    calulatePercentageFactor(data1, data2) {
      return (data2 * 100) / data1 - 100;
    },
    calulateEstimateDifference(real) {
      return this.esimanteValue / real;
    },
    /**
     * val: Number
     * max: anzahl der Nachkomma stellen
     */
    decimalAdjustment(val, max = 10000) {
      return Math.round(val * max) / max;
    },
  },
  computed: {
    percentaulDiff() {
      let tmp = this.chartData.datasets[0].data;
      return this.calulatePercentageFactor(tmp[0], tmp[tmp.length - 1]);
    },
    estimateDiff() {
      let x = this.calulateEstimateDifference(this.percentaulDiff);
      this.$emit('calc-x', { key: this.itemKey, value: x });
      return x;
    },
  },
};
</script>
