import { getFields, deleteFields } from "@/api/services/fields";
import React, { useEffect, useState } from "react";
import { getAddress } from "@/api/services/address";
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
// const [fields, setFields] = useState(null);

export default function address() {
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  // const getDatas = async () => {
  //   const result = await getAddress()
  //     .then(function (response) {
  //       console.log("response", response);
  //       setAddress(response?.data);
  //     })
  //     .catch(function (err) {
  //       console.log("error", err);
  //     });
  //   return result;
  // };

  // useEffect(() => {
  //   getDatas();
  // }, []);
  return (
    <>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست آدرس ها
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px]	   table-auto text-right">
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
              {address?.map((addss, key) => {
                const className = `py-3 px-5 ${
                  key === address.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <div className="flex items-center gap-4">{key + 1}</div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {/* {addss?.name} */}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}
