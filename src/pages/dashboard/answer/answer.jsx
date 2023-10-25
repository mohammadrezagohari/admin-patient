// import React from 'react'

// function Answer() {
//   return (
//     <div>Answer</div>
//   )
// }

// export default Answer

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
import { deleteAnswers, getAnswers } from "@/api/services/answer";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";

export function Answer() {
  
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const getDatas = async () => {
    const result = await getAnswers()
      .then(function (response) {
        console.log("response", response);
        setAnswers(response?.data);
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
  }, [answers]);
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const deleteAnswer = async (id) => {
    const deleteResult = await deleteAnswers(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setAnswers(fields.filter((field) => field.id !== id));
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
          <Link
            to={`/dashboard/answer/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت پاسخ جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست پاسخ ها
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
          <table className="w-full min-w-[640px] table-auto text-right">
            <thead>
              <tr>
                {[
                  "#",
                  "نام",
                  "مدت پاسخ گویی",
                  "سئوال",
                  "تمرین",
                  "پاسخ سئوال",
                  "تنظیمات",
                ].map((el) => (
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
            <tbody ref={listRef}>
              {answers?.map((aws, key) => {
                const className = `py-3 px-5 ${
                  key === answers.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <div className="flex items-center gap-4">{aws.id}</div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {aws?.description}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {aws?.spending}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {aws?.question?.title}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {aws?.exam?.status}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {aws?.question?.title}
                      </Typography>
                    </td>

                    <td className={className}>
                      {/* <Link
                        to={`/dashboard/answer/show/${aws.id}`}
                        style={linkStyle}
                      >
                        اصلاح
                      </Link> */}
                      <Button
                        onClick={() => deleteAnswer(aws.id)}
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
          {answers.length == 0 ? (
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

export default Answer;
