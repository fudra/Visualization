<template>
  <div class="w-96">
    <div class="flex flex-col flex-shrink-0 p-4 pb-4 mx-5 border rounded-lg">
      <div class="flex justify-between mb-3">
        <div>
          <p class="text-sm leading-none text-gray-500 uppercase">{{ item.Hersteller}}</p>
          <h4 class="text-2xl font-semibold leading-snug">{{item.Model}}</h4>
        </div>
        <div class>
          <span
            class="px-2 py-1 text-sm rounded"
            :class="getBadgeColor(item.Herkunft)"
          >{{item.Herkunft}}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <div class="inline-flex items-center justify-center">
            <div class="text-gray-700">Baujahr: {{item.Baujahr}}</div>
          </div>
        </div>

        <div>
          <div class="inline-flex items-center justify-center">
            <div class="text-gray-700">Hubraum: {{item.Hubraum}}</div>
          </div>
        </div>

        <div>
          <div class="inline-flex items-center justify-center">
            <font-awesome-icon icon="brush" />
            <div class="ml-2 text-gray-700">{{item.Zylinder}} Zylinder</div>
          </div>
        </div>

                <div>
          <div class="inline-flex items-center justify-center tooltip">
            <span class="tooltiptext">Gewicht</span>
            <font-awesome-icon icon="weight-hanging" />
            <div class="ml-2 text-gray-700">{{unitConverter(item.Gewicht, "Gewicht")}}</div>
          </div>
        </div>

        <div>
          <div class="inline-flex items-center justify-center tooltip">
            <span class="tooltiptext">Verbrauch</span>
            <font-awesome-icon icon="gas-pump" />
            <div class="ml-2 text-gray-700">{{unitConverter(item.Verbrauch, "Verbrauch")}}</div>
          </div>
        </div>



        <div>
          <div class="inline-flex items-center justify-center tooltip">
            <span class="tooltiptext">Beschleunigung</span>
            <font-awesome-icon icon="tachometer-alt" />
            <div class="ml-2 text-gray-700"> {{item.Beschleunigung}} s</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { round } from "../helper";

import { mapGetters } from "vuex";

export default {
  name: "VCCarSelector",
  data() {
    return {
      unitDictonary: {
        Gewicht: {
          imperial: {
            times: 1,
            unit: "lb"
          },
          metric: {
            times: 0.4536,
            unit: "kg"
          }
        },
        Verbrauch: {
          imperial: {
            times: 1,
            unit: "gallon"
          },
          metric: {
            times: 3.785,
            unit: "Liter"
          }
        },
        Hubraum: {
          imperial: {
            times: 1,
            unit: "cubic inch"
          },
          metric: {
            times: 16.387,
            unit: "ccm"
          }
        },
         Beschleunigung: {
          imperial: {
            times: 1,
            unit: "mile"
          },
          metric: {
            times: 1.609,
            unit: "km"
          }
        }
      }
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      unit: "cars/unit"
    })
  },
  methods: {
    getBadgeColor(country) {
      return {
        "text-red-800 bg-red-200": country === "Japanese",
        "text-blue-800 bg-blue-200": country === "European",
        "text-green-800 bg-green-200": country === "American"
      };
    },
    unitConverter(value, type) {
      let base = this.unitDictonary[type][this.unit];

      return `${round(value * base.times)} ${base.unit}`;
    }
  }
};
</script>

<style scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>