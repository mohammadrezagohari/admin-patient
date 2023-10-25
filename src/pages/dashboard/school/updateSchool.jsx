import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { showSchools, updateSchool } from "@/api/services/school";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function UpdateSchool() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [school, setSchool] = useState();
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    name: school?.name,
  };
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/school/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setSchool(response?.data?.data);
  //       console.log(school);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const showInfoSchool = async (id) => {
    const showResult = await showSchools(id)
      .then(function (response) {
        setSchool(response?.data);
        console.log(grade);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return showResult;
  };
  useEffect(() => {
    showInfoSchool(id);
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

  const editInfoScool = async (id, values) => {
    const editResult = await updateSchool(id, values)
      .then(function (response) {
        if (response.data.status == true) {
          toast.success("تغییرات با موفقیت انجام گرفت");
        }
        console.log(response.data.message);
        // navigate("/dashboard/schools");
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.message);
      });

    return editResult;
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
              <Link
                to={`/dashboard/schools`}
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
                بروزرسانی مدرسه جدید
              </Typography>
            </CardHeader>
            <CardBody className="min-h-screen  px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoScool(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/school/update/${id}`,
                  //     {
                  //       name:values.name
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

                  //     navigate("/dashboard/schools");
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
                      <label className="ml-3">نام مدرسه</label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="name"
                        value={values?.name}
                        style={inputStyle}
                        label="مدرسه"
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

export default UpdateSchool;
