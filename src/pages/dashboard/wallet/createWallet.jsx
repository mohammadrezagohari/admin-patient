import axios from "axios";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import UnitDropdown from "@/components/units/UnitDropdown";
import { createWallet } from "@/api/services/wallet";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const initialValues = {
  title: "",
  unit_id: "",
};

export function CreateWallet() {
  const navigate = useNavigate();

  const [section, setSection] = useState();
  const [amount, setAmount] = useState();
  const [bonus, setBonus] = useState();
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

  // const handleSubmit = (values) => {

  //   const { data } = axios
  //     .post(
  //       "https://testato.ir/api/wallet/store",
  //       {
  //         userInfo,
  //       },
  //       header_token
  //     )
  //     .then(function (response) {
  //       console.log(response.data);
  //       navigate("/home");
  //     })
  //     .catch(function (error) {
  //       console.log(data);
  //     });
  // };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleBonus = (e) => {
    setBonus(e.target.value);
  };

  const storeWallet = async (e) => {
    e.preventDefault();

    const createResult = await createWallet(amount, bonus)
      .then(function (response) {
        toast.success("درس با موفقیت افزوده شد !");
        console.log(response);
        navigate(-1);
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.message);
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
            <div className="p-8">
              <Link
                to={`/dashboard/wallets`}
                className="mr-3"
                style={linkStyle}
              >
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت کیف پول جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-4 pt-0 pb-44">
              <form
                method="post"
                onSubmit={storeWallet}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3"> میزان:</label>
                  <input
                    onChange={(e) => handleAmount(e)}
                    type="text"
                    className="ml-3"
                    name="amount"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3">جایزه:</label>
                  <input
                    onChange={(e) => handleBonus(e)}
                    type="text"
                    className="ml-3"
                    name="bonus"
                    style={inputStyle}
                  />
                </div>

                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
              {/* <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="w-100 max-w-screen-lg sm:w-96"
              >
                
                <label className="ml-4">نام بخش:</label>
                <Field
                  size="md"
                  type="text"
                  component={Input}
                  onChange={handleChange}
                  className="mt-1em"
                  name="title"
                  label=" نام بخش را واردکنید"

                />

                <label className="ml-3">نام فصل:</label>
                <Field
                  component={UnitDropdown}
                  className="mt-1em text-black"
                  type="text"
                  onChange={handleChange}
                  name="unit_id"
                  size="md"
                  label="نام فصل"

                />

                <Button type="submit">ذخیره</Button>
                {errors.full_name && (
                  <div style={{ color: "red" }}>{errors.full_name}</div>
                )}
              </form>
            )}
          </Formik> */}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateWallet;
