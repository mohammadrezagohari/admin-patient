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
import UnitDropdown from "@/components/units/UnitDropdown";
import { showSections, updateSection } from "@/api/services/section";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import CourseDropdown from "@/components/course/CourseDropdown";

export function ShowSection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [section, setSection] = useState();
  const [title, setTitle] = useState();
  const [unit_id, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const intitialValues = {
    title: section?.title,
    unit_id: section?.unit_id,
  };
  const editInfoSection = async (id, values) => {
    const editResult = await updateSection(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
        navigate("/dashboard/sections");
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return editResult;
  };
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/section/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setSection(response?.data?.data);
  //       console.log(section);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "3px",
    padding: "4.5px 0.45rem",
    textAlign: "center",
    width: "100%",
    // marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const showInfoSection = async (id) => {
    const showResult = await showSections(id)
      .then(function (response) {
        setSection(response?.data);
        console.log(section);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoSection(id);
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
          <Card>
            <div className="py-5">
              <Link
                to={`/dashboard/sections`}
                className="mr-3"
                style={linkStyle}
              >
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی بخش
              </Typography>
            </CardHeader>
            <CardBody className="min-h-screen overflow-x-scroll  px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoSection(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/unit/update/${id}`,
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

                  //     navigate("/dashboard/sections");
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
                      <label className="ml-3 mb-4 block">نام بخش:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                      />
                    </div>

                  

                    <div className="">
                      <label className="ml-3 mb-4 block">نام فصل:</label>
                      {/* <Field
                  component={UnitDropdown}
                  onChange={handleChange}
                  type="text"
                  className="ml-3"
                  name="unit"
                  value={values?.unit}
                  style={inputStyle}
                  size="md"
                /> */}
                      <UnitDropdown units={unit_id} setUnits={setUnits} />
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

export default ShowSection;
