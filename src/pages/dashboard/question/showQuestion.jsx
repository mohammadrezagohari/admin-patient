import axios from "axios";
import { showSingleQuestion, updateQuestion } from "@/api/services/question";
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
import CourseDropdown from "@/components/course/CourseDropdown";
import LevelDropdown from "@/components/level/LevelDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import SectionDropdown from "@/components/section/SectionDropdown";
import DragDropImg from "@/components/dragDropImg/DragDropImg";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [questions, setQuestions] = useState();

  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [level, setLevel] = useState([]);
  const [units, setUnits] = useState([]);
  const [grade, setGrade] = useState([]);
  const [image, setImages] = useState([]);
  const [video, setVideo] = useState([]);

  const [teacher_id, setTeacher_id] = useState();
  const [title, setTitle] = useState();
  const [questions_type, setQuestions_type] = useState();
  const [loading, setLoading] = useState(true);

  const handleTeacher_id = (e) => {
    setTeacher_id(e.target.value);
  };
  // const intitialValues = {
  //   title: exam?.course?.title,
  //   level: exam?.level,
  //   question_quantity: exam?.question_quantity,
  //   time_exam: exam?.time_exam,
  //   status: exam?.status,
  //   score: exam?.score,
  // };
  const intitialValues = {
    title: questions?.title,
    // questions_type: questions?.questions_type,
    section: questions?.section,
    course: questions?.course,
    level: questions?.level,
    units: questions?.units,
    grade: questions?.grade,
    image: questions?.image,
    image: questions?.image,
    // priority:grade?.priority
  }; 

  const handleFileChange = (event) => {
    const file_url = URL.createObjectURL(files);
    setFiles([...files, ...event.target.files],...file_url);
    console.log("files: " + files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    console.log("updatedFiles: " + updatedFiles);
  };

  const showInfoQuestion = async (id) => {
    const showResult = await showSingleQuestion(id)
      .then(function (response) {
        setQuestions(response?.data);
        console.log(questions);
      })
      .catch(function (err) {
        console.log(err.message);
      });
      setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      
      showInfoQuestion(id);
    }, 3000);
  }, []);
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/question/show/${id}`, {
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
  const editInfoQuestion = async (id, values) => {
    const editResult = await updateQuestion(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);

        // navigate("/dashboard/questions");
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error : ",error.massage);
        console.log(data);
      });

    return editResult;
  };

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "right",
    width: "100%",
    marginRight: "5px",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
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
          <Link
            to={`/dashboard/questions`}
            className="lg:mr-3"
            style={linkStyle}
          >
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-4 mt-3 p-6">
          <Typography variant="h6" color="white">
            بروزرسانی سوال
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <Formik
            initialValues={intitialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              editInfoQuestion(id, values);
              // const { data } = axios
              //   .patch(
              //     `https://testato.ir/api/exam/update/${id}`,
              //     {
              //       name: values.name,
              //       level_id: "vitae",
              //       course_id: "aliquid",
              //       question_quantity: 82.52108004,
              //       answer_quantity: 247.94,
              //       time_exam: 38016.3,
              //       status: "در حال انجام",
              //       score: 15,
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
            {/* handleSubmit, handleChange, values, errors */}
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="m-6 mb-44 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">عنوان :</label>
                  <Field
                    component="input"
                    // onChange={handleChange}
                    readOnly
                    type="text"
                    className="ml-3"
                    name="title"
                    value={values?.title}
                    style={inputStyle}
                  />
                </div>

                {/* <div className="">
                  <label className="ml-3 pb-3">نوع سوال:</label>
                  <Field
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="questions_type"
                    value={values?.questions_type}
                    style={inputStyle}
                  />
                </div> */}

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3 pb-3">سطح :</label>
                  {/* <Input
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.level}
                        style={inputStyle}
                      /> */}
                  <LevelDropdown level={level} setLevel={setLevel} />
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3 pb-3">نام درس:</label>
                  {/* <Field
                  onChange={handleChange}
                  type="text"
                  className="ml-3"
                  name="title"
                  value={values?.title}
                  style={inputStyle}
                /> */}
                  <CourseDropdown course={course} setCourse={setCourse} />
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">درس:</label>
                  <UnitDropdown units={units} setUnits={setUnits} />

                  {/* <label className="ml-3 pb-3"> سطح:</label>
                  <Field
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="level"
                    value={values?.level == null ? "null" : values?.level}
                    style={inputStyle}
                  /> */}
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">فصل:</label>

                  <SectionDropdown section={section} setSection={setSection} />
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">بخش:</label>

                  <GradeDropdown grade={grade} setGrade={setGrade} />
                </div>

                <div className="col-span-1">
                  <div className="">
                    <label className="ml-3">Files:</label>
                    <input
                      style={inputStyle}
                      type="file"
                      multiple 
                      name="files"
                      onChange={handleFileChange}
                    />
                    {/* <div
                            className=" relative m-2 h-40 w-40 p-4 "
                         
                          >
                            <img
                              className="h-full w-auto rounded-md object-cover"
                              src={files}
                              alt={``}
                            />
                            <span>{files.name}</span>
                            <button
                              className="absolute top-0 left-0 h-5 w-5 rounded bg-red-500 text-white "
                              // onClick={() => handleRemoveFile(index)}
                            >
                              X
                            </button>
                          </div> */}
                    
                    {/* <div className="my-5 mt-9 flex flex-wrap items-center gap-5">
                      <div className="flex flex-wrap justify-center ">
                        {files.map((file, index) => (
                          <div
                            className=" relative m-2 h-40 w-40 p-4 "
                            key={index}
                          >
                            <img
                              className="h-full w-auto rounded-md object-cover"
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index}`}
                            />
                            <span>{file.name}</span>
                            <button
                              className="absolute top-0 left-0 h-5 w-5 rounded bg-red-500 text-white "
                              onClick={() => handleRemoveFile(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* <div className="">
                  <label className="ml-3">مدرس:</label>
                  <input
                    onChange={(e) => handleTeacher_id(e)}
                    type="text"
                    className="ml-3 w-full"
                    name="teacher"
                    style={inputStyle}
                  />
                </div> */}

                {/* <div className=" col-span-2">
                <DragDropImg  files={files} setFiles={setFiles} />
                </div> */}

                {/* <div className="">
                  <label className="ml-3 pb-3">تعداد پاسخ:</label>
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
                  <label className="ml-3 pb-3">زمان پیشنهادی:</label>
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
                  <label className="ml-3 pb-3">وضعیت:</label>
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
                  <label className="ml-3 pb-3">نمره :</label>
                  <Field
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="score"
                    value={values?.score}
                    style={inputStyle}
                  />
                </div>
                <div className={inputStyle}>
                  <Field
                    component={UnitDropdown}
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="unit"
                    value={values?.unit}
                    style={inputStyle}
                  />
                </div> */}

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
    )
    }
    </>
  );
}

export default ShowQuestion;
