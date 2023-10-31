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
import { showUnits, updateUnit } from "@/api/services/units";
import CourseDropdown from "@/components/course/CourseDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";
import baseUrl from "@/configs/base-url";

export function ShowUnit() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const [units, setUnit] = useState();

  const [course_id, setCourse] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [field_id, setField_id] = useState([]);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    title: units?.title,
    course_id: units?.course_id,
    grade_id: units?.grade_id,
    field_id: units?.field_id,
    image: units?.image,
  };
  const showInfoUnit = async (id) => {
    const showResult = await showUnits(id, userToken)
      .then(function (response) {
        setUnit(response?.data);
        setField_id(response?.data?.field?.id)
        setImagePreview(
          `${baseUrl}/${response?.data?.unit_attachments[0]?.image_url}`
        );
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    setTimeout(() => {
      showInfoUnit(id);
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
    setImagePreview(file_url);
    setImage(event.target.files[0]);
  };
  const editInfoUnit = async (id, values) => {
    const editResult = await updateUnit(id, values, userToken)
      .then(function (response) {
        // navigate("/dashboard/units");
        toast.success("تغییرات با موفقیت انجام گرفت");
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
          <Card>
            <div className="py-5">
              <Link to={`/dashboard/units`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                 بروزرسانی خبر
              </Typography>
            </CardHeader>
            <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                encType="multipart/form-data"
                onSubmit={(values) => {
                  editInfoUnit(id, values);
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3"> خبر:</label>
                      <FieldDropdown
                        field_id={field_id}
                        setField_id={setField_id}
                        selected_id={units?.field?.id}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3"> عنوان خبر:</label>
                      {/* 
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="name"
                        value={values?.name}
                        style={inputStyle}
                        />
                    */}
                    {

                    }
                      <GradeDropdown
                        fieldId={field_id != [] ? field_id : units?.field?.id}
                        grade={grade_id}
                        setGrade={setGrade}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">نام درس:</label>
                      {/* <Field
                component="input"
                  onChange={handleChange}
                  type="text"
                  className="ml-3"
                  name="name"
                  value={values?.name}
                  style={inputStyle}
                /> */}
                      <CourseDropdown
                        course={course_id}
                        setCourse={setCourse}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">نام فصل:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3 w-full"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                      />
                    </div>

                    {/* <div className="">
                  <label className="ml-3 mb-4 block"> عکس:</label>
                  
                  <Field
                    onChange={handleChange}
                    type="file"
                    className="ml-3"
                    name="image"
                    value={values?.image}
                    style={inputStyle}
                  />
                </div> */}

                    <div className="">
                      <label className="ml-3 block">عکس:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          name="image"
                          accept="image/png,image/jpeg,image/webp"
                          style={inputStyle}
                          onChange={handleFileChange}
                        />
                        <div className=" h-20 w-36 rounded-md border">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={imagePreview}
                            // src={values?.image}
                            // src={icon}
                            alt="Uploaded File"
                          />
                        </div>
                      </div>
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

export default ShowUnit;
