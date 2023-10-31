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
import { createCourse } from "@/api/services/course";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import { AuthContext } from "@/gard/context/AuthContext";
export function CreateCourse() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [field_id, setField_id] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [gradeBox, setGradeBox] = useState(null);
  const [description, setDescription] = useState();
  const [background, setBackground] = useState();
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setIcon(event.target.files[0]);
  };

  const handleBackgroundFileChange = (event) => {
    setBackground(event.target.files[0]);
  };

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

  const storeCourse = async (e) => {
    e.preventDefault();

    const createResult = await createCourse(
      title,
      field_id,
      grade_id,
      icon,
      background,
      description,
      userToken
    )
      .then(function (response) {
        if (response.status) {
          toast.success("عنوان هدف با موفقیت افزوده شد !");
        } else {
          if (response?.success == false) {
            toast(
              `${response?.data?.title!=undefined ? response?.data?.title : '' } \n
              ${response?.data?.description!=undefined ? response?.data?.description : '' } \n
              ${response?.data?.icon!=undefined ? response?.data?.icon : '' } \n
              ${response?.data?.background!=undefined ? response?.data?.background : '' } \n
              ${response?.data?.field_id!=undefined ? response?.data?.field_id : '' } \n
              ${response?.data?.grade_id!=undefined ? response?.data?.grade_id : '' } \n`,
              {
                duration: 2000,
              }
            );
          } else {
            toast.error("خطایی رخ داده است");
          }
        }

      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error mssage : ", error);
      });
    return createResult;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    field_id
      ? setGradeBox(
          <GradeDropdown
            grade={grade_id}
            setGrade={setGrade}
            fieldId={field_id}
          />
        )
      : setGradeBox(
          <GradeDropdown grade={grade_id} setGrade={setGrade} fieldId={1} />
        );
  }, [field_id]);

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
                to={`/dashboard/courses`}
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
                ساخت عنوان هدف جدید
              </Typography>
            </CardHeader>
            <CardBody className=" mx-auto  w-full px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeCourse}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                encType="multipart/form-data"
              >
                <div className="">
                  <label className="ml-3 block">عنوان هدف :</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block"> توضیحات:</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="description"
                    style={inputStyle}
                  />
                  {/* <textarea className="w-full border-solid border-2 border-gray-500 rounded  min-h-min"></textarea> */}
                </div>

                <div className="">
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

export default CreateCourse;
