import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { showPackage, updatePackageCoin } from "@/api/services/packageCoin";

export function ShowPackageCoin() {
  const { id } = useParams();
  const [packageCoins, setPackageCoins] = useState();
  const [loading, setLoading] = useState(true);

  const intitialValues = {
    title: packageCoins?.title,
    quantity: packageCoins?.quantity,
  };
  
  const showInfoPackage = async (id) => {
    const showResult = await showPackage(id)
      .then(function (response) {
        setPackageCoins(response?.data);
        console.log(packageCoins);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoPackage(id);
    }, 3000);
  }, []);

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
 
  const editInfoPackage = async (id, values) => {
    const editResult = await updatePackageCoin(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return editResult;
  };

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
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی پکیج
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoPackage(id, values);
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3">نام :</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                        label="نام"
                      />
                    </div>

                    <div className="">
                      <label className="ml-3"> تعداد:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="quantity"
                        value={values?.quantity}
                        style={inputStyle}
                        label="مقطع"
                      />
                    </div>

                    <div className="col-span-2">
                      <Button type="submit" className="mt-4">
                        ذخیره
                      </Button>
                    </div>
                    {errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default ShowPackageCoin;
