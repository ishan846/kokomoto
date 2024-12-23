import { Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DashboardCard from "../../common/Layouts/Dashboard/card";
import DashboardTable, { OrderData } from "../../common/Tables/dashboardTable";
import DashboardLineChart from "../../common/Charts/dashboardLineChart";
import DashboardBarChart from "../../common/Charts/dashboardBarChart";

const labels = [
  "Monday",
  "Tuesday",
  "WednesDay",
  "Thursday",
  "Friday",
  "Saturdy",
  "Sunday",
];
const dataPoints = [65, 59, 80, 81, 56, 55, 40];

const rowData: OrderData[] = [
  {
    id: "1",
    item: "Iphone 13",
    quantity: 40,
    orderDate: "January 20, 2022",
    amount: 20000,
    status: "pending",
  },
  {
    id: "1",
    item: "Iphone 13",
    quantity: 40,
    orderDate: "January 20, 2022",
    amount: 20000,
    status: "pending",
  },
  {
    id: "1",
    item: "Iphone 13",
    quantity: 40,
    orderDate: "January 20, 2022",
    amount: 20000,
    status: "pending",
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <Typography
        fontFamily={"Inter"}
        fontWeight={"500"}
        fontSize={"20px"}
        lineHeight={"24px"}
        letterSpacing={"-3%"}
        color="#000000"
      >
        Dashboard
      </Typography>
      <div className="grid gird-cols-5 gap-4">
        <DashboardCard label="Total Revenue" data="$ 52.6k" stats diff="+3,4" />
        <DashboardCard label="Today Revenue" data="$ 52.6k" stats diff="+3,4" />
        <DashboardCard label="Total Revenue" data="236" stats={false} />
        <DashboardCard label="Total Revenue" data="22" stats={false} />
        <DashboardCard label="Total Revenue" data="11" stats={false} />
        <div className="col-span-3 flex flex-col gap-2 p-6 bg-white rounded-lg shadow-customDashboard">
          <DashboardLineChart dataPoints={dataPoints} labels={labels} />
        </div>
        <div className="col-span-2 flex flex-col gap-2 p-6 bg-white rounded-lg shadow-customDashboard">
          <DashboardBarChart dataPoints={dataPoints} labels={labels} />
        </div>
        <div className="col-span-5 flex flex-col gap-6 p-6 bg-white rounded-lg shadow-customDashboard">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <p className="font-[Inter] font-meduim text-[17px] leading-6 tracking-[-3%] text-black">
                Recent Orders
              </p>
              <p className="font-[Inter] font-meduim text-[13px] leading-4 tracking-[-1%] text-[#93A3AB]">
                <span className="font-[Inter] font-semibold text-[13px] leading-4 text-[#65C565]">
                  +1
                </span>{" "}
                new order
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-[Inter] font-medium text-base tracking-[-2%] text-[#ACB7BD]">
                Go to Orders Page
              </p>
              <ArrowRightAltIcon htmlColor="#ACB7BD" />
            </div>
          </div>
          <DashboardTable data={rowData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
