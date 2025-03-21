import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MindMapNode } from '../types';

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 1200;
    const height = 800;
    const nodeWidth = 120;
    const nodeHeight = 40;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const tree = d3.tree<MindMapNode>()
      .size([height / 2, width / 2 - 160])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2));

    const root = d3.hierarchy(data);
    const links = tree(root).links();
    const nodes = root.descendants();

    // Custom curve for links
    const diagonal = d3.linkHorizontal<any, any>()
      .x(d => d.y)
      .y(d => d.x);

    // Add links
    g.selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', diagonal)
      .attr('fill', 'none')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1.5);

    // Add nodes
    const node = g.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Node rectangles
    node.append('rect')
      .attr('x', -nodeWidth / 2)
      .attr('y', -nodeHeight / 2)
      .attr('width', nodeWidth)
      .attr('height', nodeHeight)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', '#fff')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 1.5);

    // Node text
    node.append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm font-medium')
      .text(d => d.data.name)
      .attr('fill', '#1e293b');

  }, [data]);

  return (
    <div className="w-full h-full overflow-auto bg-slate-50 rounded-lg shadow-inner">
      <svg ref={svgRef} className="mx-auto"></svg>
    </div>
  );
};

export default MindMap