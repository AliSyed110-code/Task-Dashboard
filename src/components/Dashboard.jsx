import React, { useEffect, useState } from "react";
import { TfiDashboard } from "react-icons/tfi";
import { TfiTarget } from "react-icons/tfi";
import { IoStatsChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
  Bar,
  PieChart,
  Pie,
} from "recharts";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const getdata = async () => {
    let a = await fetch("eve.json");
    let res = await a.json();
    const formattedData = formatData(res);

    setdata(formattedData);
  };

  useEffect(() => {
    getdata();
  }, []);

  const formatData = (jsonData) => {
    const counts = jsonData.reduce((acc, entry) => {
      const timestamp = new Date(entry.timestamp).toLocaleTimeString(); // Extracting time
      acc[timestamp] = (acc[timestamp] || 0) + 1;
      return acc;
    }, {});

    // Formatting data for Recharts
    return Object.keys(counts).map((time) => ({ time, count: counts[time] }));
  };

  return (
    <div className="container w-auto h-auto mx-auto  flex relative">
      <div className=" md:w-[20%] h-screen sticky top-0 hidden md:flex bg-black st flex-col  items-center py-7">
        <div className="size-44 bg-gray-900 rounded-full"></div>
        <div className="w-full">
          <ul className="text-white w-full flex flex-col font-medium gap-1 my-5">
            <li className=" hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2 bg-gray-950">
              <TfiDashboard size={30} /> Dashboard
            </li>
            <li className="hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2 bg-gray-950">
              <TfiTarget size={30} /> Targets
            </li>
            <li className="hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2 bg-gray-950">
              <IoStatsChart size={30} /> Charts
            </li>
            <li
              className="hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2
             bg-gray-950"
            >
              <IoMdSettings size={30} /> Settings
            </li>
            <li className="hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2 bg-gray-950">
              <MdOutlineMail size={30} /> Messages
            </li>
            <li className="hover:bg-violet-900 transition-all  cursor-pointer px-10 py-3 flex items-center gap-2 bg-gray-950">
              <MdOutlineMessage size={30} />
              Feedback
            </li>
          </ul>
          <div className="button  mt-10 bg-violet-900 hover:bg-violet-950 gap-2   py-4 text-white  flex items-center justify-center w-full">
            <FaLessThan size={25} />
            <button className="font-semibold">Back</button>
          </div>
        </div>
      </div>
      <div className="md:w-[80%] mx-auto py-5 container  inset-0 -z-10  items-center px-5  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] pb-2">
        <div className="mx-8 mt-5">
          <header className=" md:w-full mx-auto   font-bold   md:p-6 rounded-md  flex justify-center">
            <LineChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </header>
          <div className="flex-col items-center md:flex-row flex gap-5 justify-center ">
            {" "}
            <div className="md:w-[50%]  flex md:justify-start px-2 md:py-10 font-bold">
              <ComposedChart width={500} height={300} data={data}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="count"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="count" barSize={30} fill="#413ea0" />
                <Line type="monotone" dataKey="count" stroke="#ff7300" />
              </ComposedChart>
            </div>
            <div className="w-[50%] flex-wrap flex justify-center items-center">
              <PieChart width={230} height={230}>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="time"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#4c1c94"
                />
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="time"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#ffffff"
                  label
                />
              </PieChart>
            </div>
          </div>

          <div className="flex justify-evenly ">
            <div className="box1  gap-3  w-40 shadow-sm bg-white rounded-lg py-4  flex flex-col items-center justify-center border ">
              <h2 className=" font-bold ">Pharetra</h2>
              <h1 className="font-bold text-4xl text-violet-950">1,253</h1>
              <p>23%</p>
            </div>
            <div className="box2  gap-3 w-40 shadow-sm bg-white rounded-lg py-4 flex flex-col items-center justify-center border ">
              <h2 className=" font-bold ">Pulvinar</h2>
              <h1 className="font-bold text-4xl text-violet-950">68 (4)</h1>
              <p>38%</p>
            </div>
            <div className="box3 gap-3  w-40 shadow-sm bg-white rounded-lg py-4 flex flex-col items-center justify-center border ">
              <h2 className=" font-bold ">Sapien</h2>
              <h1 className="font-bold text-4xl text-violet-950">157</h1>
              <p>6%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
