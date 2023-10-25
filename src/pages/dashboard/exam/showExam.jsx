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
import { showExams, updateExam } from "@/api/services/exam";
import CourseDropdown from "@/components/course/CourseDropdown";
import LevelDropdown from "@/components/level/LevelDropdown";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowExam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [exam, setExam] = useState();
  const [course_id, setCourse] = useState([]);
  const [level_id, setLevel] = useState([]);
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    level_id: exam?.level_id,
    course_id: exam?.course_id,
    question_quantity: exam?.question_quantity,
    answer_quantity: exam?.answer_quantity,
    time_exam: exam?.time_exam,
    status: exam?.status,
    score: exam?.score,
  };

  const showInfoExam = async (id) => {
    const showResult = await showExams(id)
      .then(function (response) {
        setExam(response?.data);
        console.log(grade);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoExam(id);
    }, 3000);
  }, []);
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/exam/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setExam(response?.data?.data);
  //       console.log(exam);
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

  const editInfoExam = async (id, values) => {
    const editResult = await updateExam(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);
        // navigate("/dashboard/exams");
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
              <Link to={`/dashboard/exams`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی امتحان
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoExam(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/exam/update/${id}`,
                  //     {
                  //       name: values.name,
                  //       level_id: values.level_id,
                  //       course_id: values.course_id,
                  //       question_quantity: values.question_quantity ,
                  //       answer_quantity: values.answer_quantity ,
                  //       time_exam: values.time_exam ,
                  //       status: values.status ,
                  //       score: values.score ,
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

                  //     navigate("/dashboard/exams");
                  //   })
                  //   .catch(function (error) {
                  //     console.log(data);
                  //   });
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-44 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 "
                  >
                    <div className="">
                      <label className="ml-3">نام درس:</label>
                      {/* <Field
                  onChange={handleChange}
                  type="text"
                  className="ml-3"
                  name="course_id"
                  value={values?.course_id}
                  style={inputStyle}
                /> */}
                      <CourseDropdown
                        course={course_id}
                        setCourse={setCourse}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3"> سطح:</label>
                      {/* <Field
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="level_id"
                    value={values?.level_id == null ? "null" : values?.level_id}
                    style={inputStyle}
                  /> */}
                      <LevelDropdown level={level_id} setLevel={setLevel} />
                    </div>

                    <div className="">
                      <label className="ml-3">تعداد سوال:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="question_quantity"
                        value={values?.question_quantity}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">تعداد پاسخ:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="answer_quantity"
                        value={values?.answer_quantity}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">زمان پیشنهادی:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="time_exam"
                        value={values?.time_exam}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">وضعیت:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="status"
                        value={values?.status}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">نمره :</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="score"
                        value={values?.score}
                        style={inputStyle}
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

export default ShowExam;
