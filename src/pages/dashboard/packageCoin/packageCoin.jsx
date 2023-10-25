import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
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
import { ThreeDots } from "react-loader-spinner";
import { deletePackageCoin, getPackageCoin } from "@/api/services/packageCoin";
import Sortable from "sortablejs";

export function PackageCoin() {
  const [packageCoins, setPackageCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  const getDatas = async () => {
    const result = await getPackageCoin()
      .then(function (response) {
        console.log("response", response);
        setPackageCoins(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150, // Animation speed
        onSort: (event) => {
          // Handle sorting logic here
          console.log("New order:", event.newIndex);
        },
        ghostClass: "bg-blue-100",
        // handle: '.handle',
      });
    }
  }, [packageCoins]);
 
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };


  const removePackageCoin = async (id) => {
    const deleteResult = await deletePackageCoin(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setPackageCoins(packageCoins.filter((coin) => coin.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return deleteResult;
  };

  return (
    <>
      <Card className="">
        <div className="py-5">
          <Link
            to={`/dashboard/package/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت پکیج جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست پکیج ها
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
            <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {["#", "نام", "تعداد", "تنظیمات"].map(
                      (el) => (
                        <th
                          key={el}
                          className="place-items-center border-b 		 border-blue-gray-50 py-3 px-5 "
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody ref={listRef}>
                  {packageCoins?.map((coin, key) => {
                    const className = `py-3 px-5 ${
                      key === coin.length - 1
                        ? ""
                        : "border-b  border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* {coin?.id} */}
                            {key+1}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coin?.gold_coin}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coin?.quantity}
                          </Typography>
                        </td>
                       

                        <td className={className}>
                          <Link
                            to={`/dashboard/package/show/${coin.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => removePackageCoin(coin.id)}
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
              {packageCoins.length == 0 ? (
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

export default PackageCoin;
