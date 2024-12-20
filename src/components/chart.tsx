/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ChartProps {
  type: number;
  widthParent: number;
  hParent: number;
  isFullScreen: boolean;
}
const Chart = ({ type, widthParent, hParent, isFullScreen }: ChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove(); //to avoid random values get multiplied

    const margin = { top: 20, right: 100, bottom: 30, left: 50 };
    const width = widthParent;
    const height = hParent - margin.top - margin.bottom;

    // Generate sample data with 100 items
    const data = Array.from({ length: 200 }, (_, i) => ({
      x: i,
      y: 62000 + Math.round(Math.random() * 3000 * type), //random values
    }));

    //canvas draw
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "transform",
        `translate(${isFullScreen ? margin.left : 0}, ${
          isFullScreen ? 100 : margin.left
        })`
      )
      .append("g");
    console.log(width);
    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([55000, 80000]).range([height, 0]);

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(100)
      .tickSize(-type) // to create bars on the x axis Inverted
      .tickPadding(50);
    const yAxis = d3.axisLeft(yScale).ticks(0);
    const yScaleRight = d3
      .scaleLinear()
      .domain(yScale.domain())
      .range([height, 0]);

    const yAxisRight = d3.axisRight(yScaleRight).ticks(0); // Adjust ticks as needed

    const yAxisRightGroup = svg
      .append("g")
      .attr("transform", `translate(${width}, 0)`) // Position at the end of the X-axis
      .call(yAxisRight);

    // Style the parallel Y-axis
    yAxisRightGroup
      .selectAll("path, line")
      .style("stroke", "#e2e4e7") // Customize color
      .style("stroke-width", 2);

    yAxisRightGroup
      .selectAll("text")
      .style("fill", "#6c757d") // Customize text color
      .style("font-size", "12px"); // Customize text size
    const defs = svg.append("defs");
    //color to fill
    const gradient = defs
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%"); // Vertical gradient

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#E8E7FF")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(255, 255, 255, 0)")
      .attr("stop-opacity", 0);

    // FIlling the color in designated area
    const area: any = d3
      .area()
      .x((d: any) => xScale(d.x))
      .y0(height) // Start at the bottom of the chart
      .y1((d: any) => yScale(d.y)); // End at the line

    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxisGroup = svg.append("g").call(yAxis);

    xAxisGroup
      .selectAll("path, line")
      .style("stroke", "#e2e4e7") // Change color of the x-axis line
      .style("stroke-width", 2);

    yAxisGroup
      .selectAll("path, line")
      .style("stroke", "#e2e4e7") // Change color of the x-axis line
      .style("stroke-width", 2);
    // line bar generator
    const line: any = d3
      .line()
      .x((d: any) => xScale(d.x))
      .y((d: any) => yScale(d.y));

    // line parallel to y axis
    const linePath = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4B40EE")
      .attr("stroke-width", 3)
      .attr("d", line);
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // Apply clipPath to the chart group
    const chartGroup = svg.append("g").attr("clip-path", "url(#clip)");

    // Apply the clip path to the chart group
    const barData = Array.from({ length: 200 }, (_, i) => ({
      x: i,
      y: Math.random() * 3000 + 55000,
    }));

    // Define bar width (adjust spacing if needed)
    const barWidth = width / barData.length - 2;

    // Add Bars
    chartGroup
      .selectAll(".bar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.x) - barWidth / 2) // Center bars on x-axis points
      .attr("y", (d) => yScale(d.y)) // Scale to height
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d.y)) // Extend to the base of the chart
      .attr("fill", "#e2e4e7");

    // to show the last value of the chart
    const lastValueGroup = svg.append("g");

    const lastValueBackground = lastValueGroup
      .append("rect")
      .attr("fill", "#4B40EE")
      .attr("rx", 4) // rounded
      .attr("ry", 4);

    const lastValueText = lastValueGroup
      .append("text")
      .attr("fill", "#FFFFFF")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .attr("x", width + 10)
      .text(`$${data[data.length - 1].y}`);

    // crosshair lines
    const hoverLineX = svg
      .append("line")
      .attr("stroke", "#999999")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4")
      .attr("visibility", "hidden");

    const hoverLineY = svg
      .append("line")
      .attr("stroke", "#999999")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4")
      .attr("visibility", "hidden");

    const hoverValueGroup = svg.append("g").style("visibility", "hidden");

    const hoverValueBackground = hoverValueGroup
      .append("rect")
      .attr("fill", "#000")
      .attr("rx", 4)
      .attr("ry", 4);

    const hoverValueText = hoverValueGroup
      .append("text")
      .attr("fill", "#FFF")
      .attr("font-size", "14px")
      .attr("font-weight", "bold");

    //color fill in graph
    svg
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("fill", "url(#line-gradient)")
      .attr("d", area);
    // ticks upwards on x
    svg
      .selectAll(".x-axis .tick line")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("opacity", 0.5);

    // Overlay for hover interaction
    const interval = 30;
    for (let i = interval; i < data.length; i += interval) {
      const xCoord = xScale(i);
      svg
        .append("line")
        .attr("x1", xCoord)
        .attr("x2", xCoord)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1);
    }

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      // .attr(
      //   "transform",
      //   `translate(${width > 1300 ? margin.left : 0}, ${
      //     width > 1300 ? 100 : margin.left
      //   })`
      // )
      .attr("pointer-events", "all")
      .on("mousemove", (event) => {
        const [mx, my] = d3.pointer(event);
        const xValue = Math.round(xScale.invert(mx));
        const yValue = data[xValue]?.y ?? null; // Ensure xValue is within data range

        if (yValue !== null) {
          const xCoord = xScale(xValue);
          const yCoord = yScale(yValue);

          hoverLineX
            .attr("x1", xCoord)
            .attr("x2", xCoord)
            .attr("y1", 0) // Start crosshair X at the top of the chart
            .attr("y2", height) // End crosshair X at the bottom of the chart
            .attr("visibility", "visible");

          hoverLineY
            .attr("x1", 0) // Start crosshair Y at the left of the chart
            .attr("x2", width) // End crosshair Y at the right of the chart
            .attr("y1", yCoord)
            .attr("y2", yCoord)
            .attr("visibility", "visible");
          hoverValueText.text(`$${yValue}`);
          const textBBox = hoverValueText.node()?.getBBox();
          const padding = 4;
          if (textBBox) {
            hoverValueBackground
              .attr("x", width + 10)
              .attr("y", yCoord - textBBox.height / 2 - padding / 2)
              .attr("width", textBBox.width + padding * 2)
              .attr("height", textBBox.height + padding);

            hoverValueText
              .attr("x", width + 10 + padding)
              .attr("y", yCoord + textBBox.height / 4)
              .attr("font-size", "18px")
              .attr("font-weight", "bold");
          }
          hoverValueGroup.style("visibility", "visible");
        }
      })
      .on("mouseout", () => {
        hoverLineX.attr("visibility", "hidden");
        hoverLineY.attr("visibility", "hidden");
        hoverValueGroup.attr("visibility", "hidden");
      });

    //rendering the value displayed in the right
    const updateLastValue = (newXScale: any, newYScale: any) => {
      // Get the last visible X value
      const lastVisibleIndex = Math.min(
        Math.round(newXScale.invert(width)),
        data.length - 1
      );
      const lastVisibleY = data[lastVisibleIndex]?.y ?? 0;

      const yCoord = newYScale(lastVisibleY);

      // Update text content
      lastValueText.text(`$${lastVisibleY}`);

      // Get the bounding box of the text to dynamically size and position the background
      const textBBox = lastValueText.node()?.getBBox();

      if (textBBox) {
        const padding = 4;

        // Update background rectangle dimensions and position
        lastValueBackground
          .attr("x", width + 10)
          .attr("y", yCoord - textBBox.height / 2 - padding / 2)
          .attr("width", textBBox.width + padding * 2)
          .attr("height", textBBox.height + padding);

        // Update text position to center it in the background rectangle
        lastValueText
          .attr("x", width + 10 + padding)
          .attr("y", yCoord + textBBox.height / 4);
      }
    };
    updateLastValue(xScale, yScale);

    // Zoom behavior for line chart only
    const zoom: any = d3.zoom().on("zoom", (event) => {
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);

      xAxisGroup.call(xAxis.scale(newXScale));
      yAxisGroup.call(yAxis.scale(newYScale));

      linePath.attr(
        "d",
        line
          .x((d: any) => Math.max(0, Math.min(width, newXScale(d.x)))) // Ensure x is within bounds
          .y((d: any) => Math.max(0, Math.min(height, newYScale(d.y)))) // Ensure y is within bounds
      );
      svg.select(".area").attr(
        "d",
        area
          .x((d: any) => Math.max(0, Math.min(width, newXScale(d.x))))
          .y0(height) // Set y0 at the bottom of the chart
          .y1((d: any) => Math.max(0, Math.min(height, newYScale(d.y))))
      );
      chartGroup
        .selectAll(".bar")
        .attr("x", (d: any) => newXScale(d.x) - barWidth / 2)
        .attr("y", (d: any) => newYScale(d.y))
        .attr("height", (d: any) => Math.max(0, height - newYScale(d.y)));
      svg
        .select("path") // Update line if it exists
        .attr(
          "d",
          line.x((d: any) => newXScale(d.x)).y((d: any) => newYScale(d.y))
        );
      updateLastValue(newXScale, newYScale);
    });

    svg.call(zoom);

    return () => {
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [type, widthParent, hParent]);

  return (
    <div
      id="chart"
      ref={chartRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "0 auto",
      }}
    ></div>
  );
};

export default Chart;
