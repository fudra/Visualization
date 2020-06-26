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
      cheight: 600
    };
  },
  props: {
    data: Object
  },
  methods: {
    createGraph(data) {
      // Big thanks to https://observablehq.com/@d3/force-directed-graph

      const links = data.links.map(d => Object.create(d));
      const nodes = data.nodes.map(d => Object.create(d));

      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, this.cwidth, this.cheight]);

      const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

      const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 10)
        .attr("fill", "#4299E1");

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id(d => d.id)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.cwidth / 2, this.cheight / 2));

      console.log("links", JSON.stringify(links[2]));
      console.log("nodes", JSON.stringify(nodes[2]));

      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x || 0)
          .attr("y1", d => d.source.y || 0)
          .attr("x2", d => d.target.x || 0)
          .attr("y2", d => d.target.y || 0);

        node.attr("cx", d => d.x || 0).attr("cy", d => d.y || 0);
      });

      //invalidation.then(() => simulation.stop());
    }
  },
  watch: {
    data: {
      handler(v) {
        this.createGraph(v);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
