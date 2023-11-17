import React, { useEffect, useRef } from "react";
import {
  select,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  axisTop
} from "d3";
import * as d3 from 'd3';
// import useResizeObserver from "../../utils/useResizeObserver";

/**
 * Component that renders a StackedAreaChart
 */

function StackedAreaChart({ data, keys, colors }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keys: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svgRef: any = useRef();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapperRef: any = useRef();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const dimensions: any = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef?.current);
    const { width, height } =
      wrapperRef.current.getBoundingClientRect();

    // stacks / layers
    const stackGenerator = stack()
      .keys(keys)
      .order(stackOrderAscending).offset(d3.stackOffsetExpand);
    const layers = stackGenerator(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extent: any = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1]))
    ];

    // scales
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xScale: any = scalePoint()
      // eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
      .domain(data.map((d: { year: any; }) => d.year))
      .range([0, width]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yScale: any = scaleLinear()
      .domain(extent)
      .range([height, 0]);

    // area generator
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const areaGenerator: any = area()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((sequence: any) => xScale(sequence?.data?.year))
      .y0(sequence => yScale(sequence[0]))
      .y1(sequence => yScale(sequence[1]))
      .curve(d3.curveStep);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("path")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .attr("d", areaGenerator);
    // svg.append("text")      // text label for the x axis
    //     .attr("x", 265 )
    //     .attr("y", 240 )
    //     .style("text-anchor", "middle")
    //     .text("Date")
    // axes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xAxis: any = axisTop(xScale);
    svg
      .select(".x-axis")
      // .attr("transform", `translate(0, ${height})`)
      .attr("transform", `translate(0, 0)`)
      .call(xAxis);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yAxis: any = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, keys]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default StackedAreaChart;