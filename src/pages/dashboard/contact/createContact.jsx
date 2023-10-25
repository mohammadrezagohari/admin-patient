// import React from 'react'

// export default function CreateContact() {
//   return (
//     <div>CreateContact</div>
//   )
// }
import axios from "axios";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import CourseDropdown from "@/components/course/CourseDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import { createUnit } from "@/api/services/units";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { createContact } from "@/api/services/contact";

export function CreateContact() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [instagram, setInstagram] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
    width: "100%",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // const handlePriority = (e) => {
  //   setPriority(e.target.value);
  // };

  const storeGrade = async (e) => {
    e.preventDefault();

    const createResult = await createContact(instagram,mobile,email,address)
      .then(function (response) {
        toast.success("مقطع با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
        console.log(data);
      });
    return createResult;

  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <Card className="min-h-screen">
            <div className="py-5">
              <Link to={`/dashboard/grades`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت مقطع جدید
              </Typography>
            </CardHeader>
            <CardBody className="  px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeGrade}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3 block">instagram :</label>
                  <input
                    onChange={(e) => setInstagram(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="instagram"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block">mobile:</label>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="mobile"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block"> email:</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="email"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block">الویت:</label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="address"
                    style={inputStyle}
                  />
                </div>

                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateContact;
