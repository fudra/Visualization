<template>
  <div id="chart" />
</template>

<script>
/* eslint-disable  */
import * as d3 from "d3";

export default {
  name: "VHChart",
  data() {
    return {
      cwidth: 600,
      cheight: 600,
      scale: [-10, 10],
      svg: {},
      g: {},
      graph: {
        nodes: [],
        links: [],
        simulation: {},
        node: {},
        link: {}
      }
    };
  },
  props: {
    data: Object
  },
  methods: {
    initData(data) {
      this.graph.links = data.links.map(d => Object.create(d));
      this.graph.nodes = data.nodes.map(d => Object.create(d));
    },
    initSvg() {
      this.svg = d3
        .select("#chart")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .classed("svg-content-responsive", true)
        .attr("viewBox", [0, 0, this.cwidth, this.cheight]);

      this.g = this.svg.append("g");
    },
    zoomChart() {
      this.svg.call(
        d3
          .zoom()
          .extent([
            [0, 0],
            [this.cwidth, this.cheight]
          ])
          .scaleExtent(this.scale)
          .on("zoom", () => {
            this.g.attr("transform", d3.event.transform);
          })
      );
    },
    forceSimulation() {
      this.simulation = d3
        .forceSimulation(this.graph.nodes)
        .force(
          "link",
          d3.forceLink(this.graph.links).id(d => d.id)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.cwidth / 2, this.cheight / 2))
        .on("tick", () => {
          this.graph.link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          this.graph.node.attr("cx", d => d.x).attr("cy", d => d.y);
        });
    },
    createGraph(data) {
      this.initSvg();

      // create links
      this.graph.link = this.g
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(this.graph.links)
        .join("line")
        .attr("stroke-width", d => d.weight);

      // create nodes
      this.graph.node = this.g
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(this.graph.nodes)
        .join("circle")
        .attr("r", 10)
        .attr("fill", "#4299E1");

      this.forceSimulation();

      this.zoomChart();
    },
  },
  watch: {
    data: {
      handler(value) {
        this.initData(value);
        this.createGraph(value);
      }
    }
  }
};
</script>

<style scoped>
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* aspect ratio */
  vertical-align: top;
  overflow: hidden;
}
.svg-content-responsive {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 0;
}

svg .rect {
  fill: gold;
  stroke: steelblue;
  stroke-width: 5px;
}
</style>
