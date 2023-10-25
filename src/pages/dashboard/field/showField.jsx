import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { showField, updateFields } from "@/api/services/fields";
import { useParams } from "react-router-dom";
import { useFormik, Formik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import fieldSchema from "./../../../validations/field/field";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowField() {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [field, setField] = useState();
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    name: field?.name,
  };

  const editInfoField = async (id, values) => {
    const editResult = await updateFields(id, values,userToken)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
        navigate("/dashboard/fields");
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return editResult;
  };

  const showInfoField = async (id) => {
    const showResult = await showField(id,userToken)
      .then(function (response) {
        setField(response?.data);
        console.log(field);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    // const { data } = axios
    //   .get(`https://testato.ir/api/field/show/${id}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
    //     },
    //   })
    //   .then(function (response) {
    //     setField(response?.data?.data);
    //     console.log(field);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });

    setTimeout(() => {
      showInfoField(id);
    }, 3000);
  }, []);

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

  // const form = useFormik({
  //   initialValues: { name: "" },

  //   onSubmit: (values, { setSubmitting }) => {
  //     console.log("Form Inputs Data =>", values);
  //     setTimeout(() => {
  //       setSubmitting(false);
  //     }, 3000);
  //   },

  //   validationSchema: fieldSchema,
  // });

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
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی رشته
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                className="w-[50%]"
                initialValues={intitialValues}
                validationSchema={fieldSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoField(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/field/update/${id}`,
                  //     {
                  //       name: values.name,
                  //     },
                  //     {
                  //       headers: {
                  //         "Content-Type": "application/json",
                  //         Accept: "application/json",
                  //         Authorization: `Bearer ${localStorage.getItem(
                  //           "_token_testato"
                  //         )}`,
                  //       },
                  //     }
                  //   )
                  //   .then(function (response) {
                  //     console.log(response.data.message);

                  //     navigate("/dashboard/fields");
                  //   })
                  //   .catch(function (error) {
                  //     console.log(data);
                  //   });
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3">نام رشته</label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="name"
                        value={values?.name}
                        style={inputStyle}
                        label="رشته"
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

export default ShowField;
