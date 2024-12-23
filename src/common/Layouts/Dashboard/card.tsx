import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface DashboardCardProps {
  stats: boolean;
  label: string;
  data: string;
  diff?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  stats,
  label,
  data,
  diff,
}) => {
  return (
    <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow-customDashboard">
      <div className="flex justify-between items-center">
        <p className="font-[Inter] font-semibold text-[13px] leading-4 tracking-[-2%] text-[#93A3AB]">
          {label}
        </p>
        <MoreHorizIcon htmlColor="#93A3AB" />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-[Inter] font-semibold text-[21px] leading-6 text-black">
          {data}
        </p>
        {stats && (
          <div className="rounded-xl bg-[#E3F4E3] px-2 py-1">
            <p className="font-[Inter] font-semibold text-[12px] leading-4 tracking-[-2%] text-center text-[#65C565]">
              {diff}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
