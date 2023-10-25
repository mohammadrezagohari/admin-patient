import axios from "axios";

import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import SectionDropdown from "@/components/section/SectionDropdown";
import { createLevel } from "@/api/services/level";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import CourseDropdown from "@/components/course/CourseDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

export function CreateLevel() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);

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
  const handleUnit = (e) => {
    setUnit(e.target.value);
  };

  const [title, setTitle] = useState();
  const [unit_id, setUnits] = useState(null);
  const [course_id, setCourse] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [field_id, setField_id] = useState([]);
  const [order, setOrder] = useState();
  const [section_id, setSection] = useState([]);

  const storeLevel = async (e) => {
    e.preventDefault();

    const createResult = await createLevel(
      title,
      // quantity_questions,
      // answer_quantity,
      section_id,
      order,
      userToken
    )
      .then(function (response) {
        console.log("my response", response);
        if (response?.success == false) {
          toast(
            `${
              response?.data?.title != undefined ? response?.data?.title : ""
            } \n
                    ${
                      response?.data?.section_id != undefined
                        ? response?.data?.section_id
                        : ""
                    } \n
                    ${
                      response?.data?.order != undefined
                        ? response?.data?.order
                        : ""
                    } \n`,
            {
              duration: 2000,
            }
          );
        } else {
          toast.success("فصل با موفقیت افزوده شد !");
        }
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
      });
    return createResult;
  };

  useEffect(() => {
    setLoading(false);
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
              <Link to={`/dashboard/levels`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت فصل جدید
              </Typography>
            </CardHeader>
            <CardBody className=" max-h-screen px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeLevel}
                className="m-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">سطح :</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3">الویت :</label>
                  <input
                    onChange={(e) => setOrder(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="order"
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
                  {field_id && field_id != [] ? (
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
                  {grade_id && grade_id != [] ? (
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
                  {course_id && course_id != [] ? (
                    <UnitDropdown
                      units={unit_id}
                      setUnits={setUnits}
                      courseId={course_id}
                    />
                  ) : (
                    <div>loading...</div>
                  )}
                </div>
                <div className="">
                  <label className="ml-3">بخش:</label>
                  <SectionDropdown
                    section={section_id}
                    setSection={setSection}
                    UnitId={unit_id}
                  />
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

export default CreateLevel;
