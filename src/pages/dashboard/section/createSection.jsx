import axios from "axios";

import React, { useContext, useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, useFormik } from "formik";
import UnitDropdown from "@/components/units/UnitDropdown";
import { SectionContext } from "../../../stateMangement/section/SectionContext";
import { createSection } from "@/api/services/section";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import CourseDropdown from "@/components/course/CourseDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

const initialValues = {
  title: "",
  unit_id: "",
};

export function CreateSection() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "3px",
    padding: "4.5px 0.45rem",
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

  const [title, setTitle] = useState();
  const [unit_id, setUnits] = useState([]);
  const [course_id, setCourse] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [field_id, setField_id] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeSection = async (e) => {
    e.preventDefault();

    const createResult = await createSection(title, unit_id,userToken)
      .then(function (response) {
        if (response.status) {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
                    ${
                      response?.data?.field_id != undefined
                        ? response?.data?.field_id
                        : ""
                    }`,
              {
                duration: 2000, 
              }
            );
          } else {
            toast.success("فصل با موفقیت افزوده شد !");
          }
        } else {
          toast.error("خطایی رخ داده است");
        }
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
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
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت بخش جدید
              </Typography>
            </CardHeader>
            <CardBody className="px-4 pt-0 pb-44">
              <form
                method="post"
                onSubmit={storeSection}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">نام بخش:</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>
                <div className="">
                  <label className="ml-3"> رشته:</label>
                  <FieldDropdown
                    field_id={field_id}
                    setField_id={setField_id}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block">نام مقطع:</label>
                  {field_id ? (
                    <GradeDropdown
                      grade={grade_id}
                      setGrade={setGrade}
                      fieldId={field_id}
                    />
                  ) : (
                    <div>loading</div>
                  )}
                </div>
                <div className="">
                  <label className="ml-3 block">نام درس:</label>
                  {grade_id ? (
                    <CourseDropdown
                      course={course_id}
                      setCourse={setCourse}
                      gradeId={grade_id}
                    />
                  ) : (
                    <div>loading...</div>
                  )}
                </div>

                <div className="">
                  <label className="ml-3">نام فصل:</label>
                  {course_id ? (
                    <UnitDropdown
                      units={unit_id}
                      setUnits={setUnits}
                      courseId={course_id}
                    />
                  ) : (
                    <div>loading...</div>
                  )}
                </div>

                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateSection;
