import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";

export type OrderData = {
  id: string | number;
  item: string;
  quantity: number;
  orderDate: string;
  amount: number;
  status: string;
};

type OrderTableProps = {
  data: OrderData[];
};

const DashboardTable = ({ data }: OrderTableProps) => {
  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      processing: "bg-blue-100 text-blue-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              ID
            </TableCell>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              Item
            </TableCell>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              Qty
            </TableCell>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              Order Date
            </TableCell>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              Amount
            </TableCell>
            <TableCell className="!font-[Inter] !font-meduim !text-[13px] !leading-4 !text-[#ADB1B2]">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              <TableCell className="!border-none !text-[#ADB1B2] !font-[Inter]">
                {row.id}
              </TableCell>
              <TableCell className="!border-none !font-[Inter] !font-semibold">
                {row.item}
              </TableCell>
              <TableCell className="!border-none !font-[Inter] !font-semibold">
                {row.quantity}
              </TableCell>
              <TableCell className="!border-none !text-[#ADB1B2] !font-[Inter]">
                {formatDate(row.orderDate)}
              </TableCell>
              <TableCell className="!border-none !font-[Inter] !font-semibold">
                {formatAmount(row.amount)}
              </TableCell>
              <TableCell className="!border-none">
                <span
                  className={`px-4 py-2 rounded-md   text-sm font-medium ${getStatusColor(row.status)}`}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
