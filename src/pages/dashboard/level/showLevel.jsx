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
import SectionDropdown from "@/components/section/SectionDropdown";
import { showLevels, updateLevel } from "@/api/services/level";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowLevel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [section_id, setSection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState();

  const intitialValues = {
    title: level?.title,
    order: level?.order,
    quantity_questions: level?.quantity_questions,
    answer_quantity: level?.answer_quantity,
    section_id: level?.section_id,
  };
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/level/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setLevel(response?.data?.data);
  //       console.log("level",level);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

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

  const showInfoLevel = async (id) => {
    const showResult = await showLevels(id)
      .then(function (response) {
        setLevel(response?.data);
        console.log(level);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoLevel(id);
    }, 3000);
  }, []);

  const editInfoLevel = async (id, values) => {
    const editResult = await updateLevel(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
        // navigate("/dashboard/levels");
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.message);
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
              <Link to={`/dashboard/levels`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی سطح
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoLevel(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/level/update/${id}`,
                  //     {
                  //       title: values.title,
                  //       quantity_questions: values.quantity_questions,
                  //       section: values.section
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

                  //     navigate("/dashboard/levels");
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
                      <label className="ml-3">نام سطح:</label>
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
                      <label className="ml-3"> الویت:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="order"
                        value={values?.order}
                        style={inputStyle}
                      />
                    </div>

                    {/* <div className="">
                      <label className="ml-3"> تعدادسوال:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="quantity_questions"
                        value={values?.quantity_questions}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3"> تعداد پاسخ:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="answer_quantity"
                        value={values?.answer_quantity}
                        style={inputStyle}
                      />
                    </div> */}

                    <div className="">
                      <label className="ml-3">بخش:</label>
                      {/* <input
                onChange={(e) => handleSection_id(e)}
                type="text"
                className="ml-3 w-full"
                name="section"
                style={inputStyle}
              /> */}
                      <SectionDropdown
                        section={section_id}
                        setSection={setSection}
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

export default ShowLevel;
