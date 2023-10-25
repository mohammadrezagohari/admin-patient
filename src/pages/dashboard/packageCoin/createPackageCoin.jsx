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
import { createMenu } from "@/api/services/menu";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { createPackage } from "@/api/services/packageCoin";

export function CreatePackageCoin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState();
  const [quantity, setQuantity] = useState();

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

  const storePackage = async (e) => {
    e.preventDefault();

    const createResult = await createPackage(title, quantity )
      .then(function (response) {
        toast.success("   پکیج با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
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
              <Link to={`/dashboard/packagecoins`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت پکیج جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storePackage}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">نام پکیج:</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3"> تعداد:</label>
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="quantity"
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

export default CreatePackageCoin;
