// import React from 'react'

// export default function Contact() {
//   return (
//     <div>Contact</div>
//   )
// }
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
import { deleteCourse, getCourse } from "@/api/services/course";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { getContact } from "@/api/services/contact";
import Sortable from "sortablejs";

export function Contact() {

  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  
  const getDatas = async () => {
    const result = await getContact()
      .then(function (response) {
        console.log("response", response);
        setContacts(response?.data);
      })
      .catch(function (err) {
        console.log("error", err?.message);
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
  }, [contacts]);
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  // const deleteCourses = async (id) => {
  //   const deleteResult = await deleteCourse(id)
  //     .then(function (response) {
  //       toast.success("حذف با موفقیت انجام شد !");
  //       console.log(response?.data);
  //       setCources(cources.filter((course) => course.id !== id));
  //     })
  //     .catch(function (error) {
  //       toast.error("خطا !! مجددا تلاش نمایید");
  //       console.log(error.message);
  //     });

  //   return deleteResult;

  // };
  return (
    <>
      <Card className="min-h-screen">
        <div className="py-5">
          <Link
            to={`/dashboard/contact/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت آیتم جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست ارتباطات
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
                      "اینستاگرام",
                      "موبایل",
                      "ایمیل",
                      "آدرس",
                      // "تنظیمات",
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

                <tbody ref={listRef}>
                  {contacts?.map((contact, key) => {
                    const className = `py-3 px-5 ${
                      key === contacts.length - 1
                        ? ""
                        : "border-b text-center	 border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {key + 1}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contact?.instagram}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contact?.mobile}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contact?.email}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contact?.address}
                          </Typography>
                        </td>

                        {/* <td className={className}>
                          <Link
                            to={`/dashboard/course/show/${cource.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteCourses(cource.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Contact;
