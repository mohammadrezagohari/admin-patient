import axios from "axios";

import React, { useContext, useEffect, useRef, useState } from "react";
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
import { getSection, deleteSection } from "@/api/services/section";
import { toast } from "react-hot-toast";
// import { deleteSection } from './../../../api/services/section';
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { AuthContext } from "@/gard/context/AuthContext";

export function Section() {
  const { userToken } = useContext(AuthContext);

  const [sections, setSections] = useState();
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getSection(userToken)
      .then(function (response) {
        console.log("response", response);
        setSections(response?.data);
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
  }, [sections]);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const deleteSections = async (id,userToken) => {
    const deleteResult = await deleteSection(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setSections(sections.filter((section) => section.id !== id));
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

    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .delete(`https://testato.ir/api/section/delete/${sectionId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data.data);
    //     setSections(sections.filter((section) => section.id != sectionId));
    //     // return (
    //     //   <div className="flex w-full flex-col gap-2">
    //     //     <Alert color="green">A success alert for showing message.</Alert>
    //     //   </div>
    //     // );
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };

  // const deleteField= async (id) => {
  //   const deleteResult = await deleteFields(id)
  //       .then(function (response) {
  //       console.log(response?.data);
  //       setFields(fields.filter((field) => field.id !== id));
  //       // return (
  //       //   <div className="flex w-full flex-col gap-2">
  //       //     <Alert color="green">A success alert for showing message.</Alert>
  //       //   </div>
  //       // );
  //     })
  //     .catch(function (err) {
  //       console.log("error", err);
  //     });
  //   return deleteResult;

  // }
  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/section/create`}
            className="mr-3"
            style={linkStyle}
          >
            ساخت بخش جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست بخش ها
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
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {["#", "نام بخش", "نام فصل", "تنظیمات"].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b border-blue-gray-50	 py-3 px-5 text-center "
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
                  {sections?.map((section, key) => {
                    const className = `py-3 px-5 ${
                      key === sections.length - 1
                        ? ""
                        : "border-b text-center border-blue-gray-50"
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
                            {section?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {section?.unit?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Link
                            to={`/dashboard/section/show/${section.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteSections(section.id)}
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
              {sections.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Section;
