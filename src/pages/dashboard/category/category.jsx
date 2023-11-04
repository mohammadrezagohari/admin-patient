import axios from "axios";
import { getFields, deleteFields } from "@/api/services/fields";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Alert,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deleteCategory, getCategory } from "@/api/services/Category";
import { ThreeDots } from "react-loader-spinner";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getCategorys()
      .then(function (response) {
        console.log("response", response);
        setCategories(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
      setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const deleteCategory = async (id) => {
    const deleteResult = await deleteCategorys(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setCategories(categories.filter((catgry) => catgry.id !== id));
        // return (
        //   <div className="flex w-full flex-col gap-2">
        //     <Alert color="green">A success alert for showing message.</Alert>
        //   </div>
        // );
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return deleteResult;
  };
  return (
    <>
      <Card>
        <div className="py-5">
          {/* <Link
            to={`/dashboard/category/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت دسته بندی جدید
          </Link> */}
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست دسته بندی ها
          </Typography>
        </CardHeader>

        {loading ? (
          <div className="flex w-full  items-center justify-center py-60">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <> 
        <CardBody className="min-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto text-right">
            <thead>
              <tr>
                {["#", "نام", "تنظیمات"].map((el) => (
                  <th
                    key={el}
                    className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories?.map((catgry, key) => {
                const className = `py-3 px-5 ${
                  key === categories.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <div className="flex items-center gap-4"> {catgry?.id}</div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {catgry?.name}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Link
                        to={`/dashboard/category/show/${catgry.id}`}
                        style={linkStyle}
                      >
                        اصلاح
                      </Link>
                      <Button
                        onClick={() => deleteCategory(catgry.id)}
                        className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {categories.length == 0 ? (
            <>
              <div className="flex h-[80vh] w-full items-center justify-center">
                <p className="">آیتمی وجود ندارد :(</p>
              </div>
            </>
            ) : (
            <>
                 
            </>
          )}
        </CardBody>
        </>
        )}
      </Card>
    </>
  );
}

export default Category;
