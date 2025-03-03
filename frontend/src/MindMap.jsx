import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const initialData = {
  name: "Root",
  children: [
    { name: "Child 1", children: [{ name: "Grandchild 1" }, { name: "Grandchild 2" }] },
    { name: "Child 2" }
  ]
};

const MindMap = () => {
  const svgRef = useRef();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("font", "12px sans-serif");

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const link = svg.selectAll(".link")
      .data(root.links())
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "#555")
      .attr("fill", "none")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", 10)
      .attr("fill", "steelblue");

    node.append("text")
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .text(d => d.data.name);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default MindMap;
