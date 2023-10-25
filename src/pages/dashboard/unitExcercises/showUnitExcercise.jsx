import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
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
import {
  showUnitExercises,
  updateUnitExercise,
} from "@/api/services/unitExercise";
import { data } from "autoprefixer";
import UnitDropdown from "@/components/units/UnitDropdown";
import UserDropdown from "@/components/users/UserDropdown";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import CourseDropdown from "@/components/course/CourseDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowUnitExcercise() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const [unitExcercise, setUnitExcercises] = useState();

  const [field_id, setField_id] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [course_id, setCourse] = useState([]);
  const [unit_id, setUnits] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    field_id: unitExcercise?.field_id,
    grade_id: unitExcercise?.grade_id,
    course_id: unitExcercise?.course_id,
    unit_id: unitExcercise?.unit_id,
    user_id: unitExcercise?.user_id,
    image: unitExcercise?.image,
  };
  const showInfoUnitExcercise = async (id) => {
    const showResult = await showUnitExercises(id, userToken)
      .then(function (response) {
        setUnitExcercises(response?.data);
        setSelectedField(response?.data?.field_id);
        setSelectedGrade(response?.data?.grade_id);
        setSelectedCourse(response?.data?.course_id);
        setSelectedUnit(response?.data?.unit_id);
        console.log("response", response);
      })
      .catch(function (err) {
        console.log("error", err.message);
        console.log("data", unitExcercise);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    setTimeout(() => {
      showInfoUnitExcercise(id);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    // setFile(URL.createObjectURL(e.target.files[0]));
    setImage(file_url);
  };

  const editInfoUnitExcercise = async (id, values) => {
    const editResult = await updateUnitExercise(id, values, userToken)
      .then(function (response) {
        console.log(response.data.message);
        toast.success("تغییرات با موفقیت انجام گرفت");
        navigate("/dashboard/grades");
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
              <Link
                to={`/dashboard/unitExcercises`}
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
                بروزرسانی تمرین فصل
              </Typography>
            </CardHeader>
            <CardBody className="min-h-screen  px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                encType="multipart/form-data"
                onSubmit={(values) => {
                  editInfoUnitExcercise(values.id);
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3"> رشته:</label>
                      <FieldDropdown
                        field_id={selectedField}
                        setField_id={setSelectedField}
                        selected_id={selectedField}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">نام مقطع:</label>
                      <GradeDropdown
                        grade={grade_id}
                        setGrade={setSelectedGrade}
                        fieldId={selectedGrade}
                        selected_id={selectedGrade}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">نام درس:</label>
                      <CourseDropdown
                        gradeId={selectedGrade}
                        course={selectedCourse}
                        setCourse={setSelectedCourse}
                        selected_id={selectedCourse}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 mb-4 block">نام فصل:</label>
                      <UnitDropdown
                        units={selectedUnit}
                        setUnits={setSelectedUnit}
                        courseId={selectedCourse}
                        selected_id={selectedUnit}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block"> آدرس فایل:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          name="image"
                          accept="image/png,image/jpeg,image/webp"
                          style={inputStyle}
                          onChange={handleFileChange}
                        />
                        <div className=" h-20 w-36 rounded-md border">
                          {/* <img
                        className="h-full w-full rounded-md object-cover"
                        src={values?.image}
                        // src={icon}
                        alt="Uploaded File"
                      /> */}
                          <span>{values?.image}</span>
                        </div>
                      </div>
                      {/* <Field
                    component="input"
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="name"
                    value={values?.name}
                    style={inputStyle}
                  /> */}
                    </div>
                    <div className=""></div>
                    <div className="">
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

export default ShowUnitExcercise;
