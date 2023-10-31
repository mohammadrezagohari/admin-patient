


//-------------------------------------------------------------------------------------

import axios from "axios";
import React, { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createSchool } from "@/api/services/school";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function CreateGrade() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const handleName = (e) => {
    setName(e.target.value);
  };

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const storeSchool = async (e) => {
    e.preventDefault();

    const createResult = await createSchool(name)
      .then(function (response) {
        toast.success("آموزش جدید با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
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
              <Link to={`/dashboard/scools`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت آموزش جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2 ">
              <form method="post" onSubmit={storeSchool} className="m-6 grid  grid-cols-1 lg:grid-cols-2" >
             <div className="">
              <label className="ml-3 block">نام آموزش:</label>
                  <input
                    onChange={(e) => handleName(e)}
                    type="text"
                    className="ml-3 my-3"
                    name="name"
                    style={inputStyle}
                  />
             </div>
                  <div className="">
                      <label className="ml-3  block">لوگو: </label>
                      <input
                        // onChange={handleChange}
                        type="file"
                        className="ml-3"
                        name="name"       
                        // value={values?.name}
                        style={inputStyle}
                        label="لوگو"
                      />
                    </div>
                <div className="">
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

export default CreateGrade;
