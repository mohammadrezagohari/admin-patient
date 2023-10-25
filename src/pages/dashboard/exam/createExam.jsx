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
import { createExam } from "@/api/services/exam";
import LevelDropdown from "@/components/level/LevelDropdown";
import CourseDropdown from "@/components/course/CourseDropdown";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import StatusDropdown from "@/components/course/StatusDropdown";
// const initialValues = {
//   title: "",
//   unit_id: "",
// };

export function CreateExam() {
  const navigate = useNavigate();

  const [course_id, setCourse] = useState([]);
  const [level_id, setLevel] = useState([]);
  const [question_quantity, setQuestion_quantity] = useState();
  const [answer_quantity, setAnswer_quantity] = useState();
  const [time_exam, setTime_exam] = useState();
  const [status, setStatus] = useState(null);
  const [score, setScore] = useState();
  const [loading, setLoading] = useState(true);
  const statusItem = [
    { value: "chocolate", label: "ساخته شده" },
    { value: "started", label: "شروع شده" },
    { value: "done", label: " انجام شده " },
    { value: "timeIsOver", label: " زمان آزمون به اتمام رسیده " },
    { value: "noAnswer", label: " بدون پاسخ " },
    { value: "stopped", label: " متوقف شده " },
  ];
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
  // const handleUnit = (e) => {
  //   setUnit(e.target.value);
  // };

  // function storeUnit(e) {
  //   e.preventDefault();

  //   const token = localStorage.getItem("_token_testato");
  //   const { data } = axios
  //     .post(
  //       "https://testato.ir/api/section/store",
  //       {
  //         title: values.title,
  //         unit_id: values.unit_id,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       navigate(-1);
  //     })
  //     .catch(function (error) {
  //       console.log(data);
  //     });
  // }

  // const handleSubmit = (values) => {
  //   alert(values.title);
  //   // setUserInfo(values);
  //   console.log(userInfo);

  //   const { data } = axios
  //     .post(
  //       "https://testato.ir/api/section/store",
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

  const storeExam = async (e) => {
    e.preventDefault();

    const createResult = await createExam(
      level_id,
      course_id,
      question_quantity,
      answer_quantity,
      time_exam,
      status,
      score
    )
      .then(function (response) {
        toast.success("  امتحان جدید با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error?.massage);
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
              <Link to={`/dashboard/exams`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت امتحان جدید
              </Typography>
            </CardHeader>
            <CardBody className="px-4 pt-0 pb-44">
              <form
                method="post"
                onSubmit={storeExam}
                className="m-6 mb-44 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 "
              >
                <div className="">
                  <label className="ml-3"> سطح:</label>
                  {/* <input
              onChange={(e) => setLevel_id(e.target.value)}
              type="text"
              className="ml-3"
              name="name"
              style={inputStyle}
            /> */}
                  <LevelDropdown level={level_id} setLevel={setLevel} />
                </div>

                <div className="">
                  <label className="ml-3">درس:</label>
                  {/* <input
              onChange={(e) => setCourse_id(e.target.value)}
              type="text"
              className="ml-3"
              name="field"
              style={inputStyle}
            /> */}
                  <CourseDropdown course={course_id} setCourse={setCourse} />
                </div>

                <div className="">
                  <label className="ml-3">تعداد سئوال :</label>
                  <input
                    onChange={(e) => setQuestion_quantity(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="name"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3">تعداد پاسخ:</label>
                  <input
                    onChange={(e) => setAnswer_quantity(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="field"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3"> تایم امتحان:</label>
                  <input
                    onChange={(e) => setTime_exam(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="name"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3">وضعیت:</label>
                  <input
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                className="ml-3"
                name="status"
                style={inputStyle}
              />
                  {/* <StatusDropdown
                    statusItem={statusItem}
                    status={status}
                    setStatus={setStatus}
                  /> */}
                </div>

                <div className="">
                  <label className="ml-3">امتیاز:</label>
                  <input
                    onChange={(e) => setScore(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="field"
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

export default CreateExam;
