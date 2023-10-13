import React from "react";
import "../../App.css";
import {
  select,
  scaleLinear,
  scaleBand,
  axisRight,
  axisBottom,
  axisLeft,
  brushX,
} from "d3";
import { line } from "d3";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// [25, 30, 45, 50, 65]
const BarChart = () => {
  const [maindata, setMaindata] = useState([]);
  const [datedata, setDatedata] = useState([]);
  const [data, setData] = useState([]);
  const [rerender, setRender] = useState(0);
  const svgref = useRef();
  const svgref2 = useRef();
  const getalldata = async () => {
    try {
      const email=localStorage.getItem("email");
      console.log("email",email);
      const details = await axios.get(`http://localhost:5000/getdatabydates/${email}`);
      if (details) {
        //   console.log("hello",details.data.allFamilyDetails);
        // console.log(details.data.allfamily1);
        //   setDetails1(details.data.allFamilyDetails);
        // console.log("details", details.data);
        const maindatacal = details.data.map((item) => {
          return item.memberCount;
        });
        const datedatacal = details.data.map((item) => {
          return parseInt(item._id);
        });
        // console.log("datedata", datedatacal);
        // setData(details.data);
        setMaindata(maindatacal);
        setDatedata(datedatacal);

        // console.log("maindata", maindata);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const makebarchart = () => {
    // console.log(svgref);
    const svg = select(svgref.current);
    const xscale = scaleBand()
      .domain(
        datedata.map((item, index) => {
          return index;
        })
      )
      .range([0, 300])
      .padding(0.5);
    const xAxis = axisBottom(xscale)
      .ticks(datedata.length)
      .tickFormat((index) => datedata[index]);
    xAxis(svg.select(".x-axis"));

    const yscale = scaleLinear().domain([0, 10]).range([150, 0]);
    const colorscale = scaleLinear()
      .domain([0, 100, 150])
      .range(["blue", "orange", "red"])
      .clamp(true);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    const yaxis = axisRight(yscale);

    svg.select(".y-axis").style("transform", "translateX(300px)").call(yaxis);
    svg
      .selectAll(".bar")
      .data(maindata)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (value, index) => xscale(index))
      .attr("y", -150)
      .attr("width", xscale.bandwidth())
      .transition()
      .attr("fill", colorscale)
      .attr("height", (value) => 150 - yscale(value));
    // setRender(1);
  };
  const makelinechart = () => {
    const svg = select(svgref2.current);

    const xScale = scaleLinear()
      .domain([0, datedata.length - 1])
      .range([0, 300]);
    const xaxis = axisBottom(xScale)
      .ticks(datedata.length)
      .tickFormat((index) => datedata[index]);

    const yScale = scaleLinear().domain([0, 10]).range([150, 0]);

    svg.select(".x-axis2").style("transform", "translateY(150px)").call(xaxis);
    const myline = line()
      .x((value, index) => xScale(index))
      .y(yScale);

    const yaxis = axisRight(yScale);
    svg.select(".y-axis2").style("transform", "translateX(300px)").call(yaxis);

    svg
      .selectAll(".line")
      .data([maindata])
      .join("path")
      .attr("class", "line")
      .attr("d", myline)
      .attr("fill", "none")
      .attr("stroke", "blue");
    // setRender(2);
    //brush
    const brush=brushX().extent([
      [0,0],
      [300,150]
    ])
    svg.select(".brush").call(brush).call(brush.move,[0,50]);
  };
  useEffect(() => {
     getalldata();
    // if(maindata.length>0 && datedata.length>0){
      makelinechart();
      makebarchart();
    // }
  }, []);
  useEffect(() => {
    // Call chart rendering functions whenever the data or dimensions change
    if (maindata.length > 0 && datedata.length > 0) {
      makebarchart();
      makelinechart();
    }
  }, [maindata, datedata]);
  // useEffect(()=>{

  // },[])
  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <h2>BARCHART</h2> */}
      <div
        style={{
          width: "60vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <svg ref={svgref}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <svg ref={svgref2}>
          <g className="x-axis2" />
          <g className="y-axis2" />
          <g className="brush" />
        </svg>
      </div>
    </div>
  );
};
export default BarChart;
