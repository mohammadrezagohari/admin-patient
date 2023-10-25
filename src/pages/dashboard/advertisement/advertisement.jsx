import { deleteGrade, getGrade } from "@/api/services/grade";
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
import {
  deleteAdvertisement,
  getAdvertisement,
} from "@/api/services/advertisement";
import { ThreeDots } from "react-loader-spinner";

const Advertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getDatas = async () => {
    const result = await getAdvertisement()
      .then(function (response) {
        console.log("response", response);
        setAdvertisements(response?.data);
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
  const deleteAdvertisements = async (id) => {
    const deleteResult = await deleteAdvertisement(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setAdvertisements(advertisements.filter((ads) => ads.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.massage);
      });
    return deleteResult;
  };
  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/advertisement/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت تبلیغات جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست تبلیغات ها
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
                {[
                  "#",
                  "عنوان",
                  "لینک",
                  "لینک ویدئو",
                  "وضعیت پرداخت",
                  "منقضی در تاریخ",
                  "تنظیمات",
                ].map((el) => (
                  <th
                    key={el}
                    className="place-items-center border-b border-blue-gray-50		 py-3 px-5 text-center "
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
              {advertisements?.map((ads, key) => {
                const className = `py-3 px-5 ${
                  key === advertisements.length - 1
                    ? ""
                    : "border-b text-center	 border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <div className="flex items-center gap-4">{key + 1}</div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {ads?.title}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {ads?.link}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {ads?.video_link}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {ads?.paid_status == "true"
                          ? "پرداخت شده"
                          : "پرداخت نشده"}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {ads?.expire_at}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Link
                        to={`/dashboard/advertisement/show/${ads.id}`}
                        style={linkStyle}
                      >
                        اصلاح
                      </Link>
                      <Button
                        onClick={() => deleteAdvertisements(ads.id)}
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
          {advertisements.length == 0 ? (
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
};

export default Advertisement;

// ------------------------------------------------------------------------------------------------
