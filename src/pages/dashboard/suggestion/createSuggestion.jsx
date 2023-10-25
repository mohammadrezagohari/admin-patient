import axios from "axios";

import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createGrade } from "@/api/services/grade";
import { toast } from "react-hot-toast";
import { storeSuggestion } from "@/api/services/suggestion";
import { ThreeDots } from "react-loader-spinner";

function CreateSuggestion() {
  const navigate = useNavigate();

  const [context, setContext] = useState();
  const [loading, setLoading] = useState(true);

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

  console.log("storeSuggestions 1");



  const storeSuggestions = async (e) => {
    e.preventDefault();

    const createResult = await storeSuggestion(context)
      .then(function (response) {
        toast.success("محتوا با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :",error);
        console.log(data);
      });
    return createResult;

    
  };
  console.log("storeSuggestions : " , storeSuggestions);

  console.log("storeSuggestions 1");

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
        <Link to={`/dashboard/suggestions`} className="mr-3" style={linkStyle}>
          بازگشت
        </Link>
      </div>
      <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
        <Typography variant="h6" color="white">
          ساخت محتوا جدید
        </Typography>
      </CardHeader>
      <CardBody className=" px-0 pt-0 pb-2">
        <form method="post" onSubmit={storeSuggestions} className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          
          <div className="">

          <label className="ml-3 block">نام محتوا:</label>
          <input
            onChange={(e) => setContext(e.target.value)}
            type="text"
            className="ml-3"
            name="context"
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
    )
    }
    </>
  )
}

export default CreateSuggestion


