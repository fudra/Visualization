<template>
  <div class="flex flex-col flex-shrink-0 w-56 pb-4 mx-5 ">
        <div class="flex justify-between ">
          <h4 class="font-semibold text-md">
            {{item.Model}}
            <span class="ml-3 text-sm text-gray-500">({{ item.Hersteller}})</span>
          </h4>
        </div>

        <div class="mb-2">
          <span class="px-2 py-1 text-sm rounded" :class="getBadgeColor(item.Herkunft)">{{item.Herkunft}}</span>
        </div>

        <div class="flex justify-between">
          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Baujahr</span>
              <font-awesome-icon icon="wrench" />
              <div class="ml-1 text-gray-700">{{item.Baujahr}}</div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Hubraum</span>
              <font-awesome-icon icon="car" />
              <div class="ml-1 text-gray-700">{{item.Hubraum}}</div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Zylinder</span>
              <font-awesome-icon icon="brush" />
              <div class="ml-1 text-gray-700">{{item.Zylinder}}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-3">
          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Verbrauch</span>
              <font-awesome-icon icon="gas-pump" />
              <div class="ml-1 text-gray-700">{{item.Verbrauch}}</div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Gewicht</span>
              <font-awesome-icon icon="weight-hanging" />
              <div class="ml-1 text-gray-700">{{item.Gewicht}}</div>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center justify-center tooltip">
              <span class="tooltiptext">Beschleunigung</span>
              <font-awesome-icon icon="tachometer-alt" />
              <div class="ml-1 text-gray-700">{{item.Beschleunigung}}</div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name: "VCCarSelector",
    props: {
        item: {
            type: Object, 
            required: true,
        }
    },
    methods: {
         getBadgeColor(country) {
          return {
            'text-red-800 bg-red-200': country === "Japanese",
            'text-blue-800 bg-blue-200': country === "European",
            'text-green-800 bg-green-200': country === "American",
          }
      }
    }
}
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