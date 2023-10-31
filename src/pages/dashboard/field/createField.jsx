import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createField } from "@/api/services/fields";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
export function CreateField() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [field, setField] = useState();
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
  const handleField = (e) => {
    setField(e.target.value);
  };

  const storefield = async (e) => {
    e.preventDefault();
    const createResult = await createField(field, userToken)
      .then(function (response) {

        if (response.status) {
            toast.success("پوستر با موفقیت افزوده شد !");
            setField(response?.data);
        } else {
            if (response?.success == false) {
              toast(
                `${response?.data?.name!=undefined ? response?.data?.name : '' }`,
                {
                  duration: 2000,
                }
              );
            } else {
              toast.error("خطایی رخ داده است");
            }
          }

    })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
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
              <Link to={`/dashboard/fields`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                اضافه کردن آموزش جدید
              </Typography>
            </CardHeader>
            <CardBody className="px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storefield}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">عنوان آموزش </label>
                  <input
                    onChange={(e) => handleField(e)}
                    type="text"
                    className="ml-3"
                    name="field"
                    style={inputStyle}
                  />
                </div>
                <div className="">
                  <label className="ml-3"> فایل تصویر </label>
                  <input
                    onChange={(e) => handleField(e)}
                    type="file"
                    className="ml-3"
                    name="field"
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

export default CreateField;
