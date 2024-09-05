import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
const PieChart = ({ data }) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;  
    svg.selectAll('*').remove(); 
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal([
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ]);
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    g.selectAll('path')
      .data(pie(data))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('opacity', 0.9);
    // Add labels to the slices
    g.selectAll('text')
      .data(pie(data))
      .enter().append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '18px') 
      .style('fill', '#333')
      .style('font-family', 'Poppins, sans-serif') 
      .style('font-weight', '600') 
      .text(d => `${d.data.name}: ${d.data.value}`);
  }, [data]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg ref={svgRef} width={500} height={500}></svg>
    </div>
  );
};
export default PieChart;
