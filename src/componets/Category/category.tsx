import { Button, TextField } from "@mui/material";
import searchIcon from "../../assets/searchIcon.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SlidersHorizontal } from "lucide-react";
import DataGridTable from "../../common/Tables/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../API/Services/categories";

export interface CategoryData {
  category: {
    name: string;
    description: string;
    icon_url: string;
    is_active: boolean;
    category_id: number;
  };
}

const Category = () => {
  const [rowData, setRowData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories(1, 10);
        if (response.status === 200) {
            console.log(response.data.data?.results)
          setRowData(response.data.data?.result);
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    getCategories();
  }, []);


  const columns: GridColDef[] = [
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4">
            <img src={params.row.icon_url} alt="" />
            <div className="flex flex-col">
              <p>{params.row.name}</p>
              <p>{params.row.description}</p>
            </div>
          </div>
        );
      },
    },
    { field: "products", headerName: "No of Products", flex: 1 },
    { field: "tags", headerName: "Tags", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className=""></div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="relative">
            <TextField
              size="small"
              className="bg-white !font-[Inter]"
              autoComplete="off"
            />
            <img
              src={searchIcon}
              alt="search"
              className="absolute top-2.5 right-0 pr-1"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <button>
              <div className="flex items-center py-2.5 px-[14px] gap-1.5 font-[Inter] font-medium text-[14px] leading-[16.94px] bg-black text-white rounded-md">
                <AddCircleIcon />
                Add Category
              </div>
            </button>
            <button className="h-10">
              <div className="flex items-center py-2.5 px-[14px] gap-1.5 font-[Inter] font-medium text-[14px] leading-[16.94px] bg-[#D2D2D2] text-[#0D2E44] rounded-md">
                <SlidersHorizontal size="14px" />
                Filter
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white shadow-customTable1 rounded-md p-5 flex flex-col gap-5">
          <p className="font-[Inter] font-[700] text-[20px] leading-6">
            Categories
          </p>
          <hr className="border-2 border-[#E2E2E2]" />
          <DataGridTable columns={columns} rows={rowData} />
        </div>
      </div>
    </div>
  );
};

export default Category;
