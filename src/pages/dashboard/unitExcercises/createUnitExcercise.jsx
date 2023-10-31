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
import UserDropdown from "@/components/users/UserDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";
import { createUnitExercise } from "@/api/services/unitExercise";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import CourseDropdown from "@/components/course/CourseDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

export function CreateUnitExcercise() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [unitExcercises, setUnitExcercises] = useState();
  const [field_id, setField_id] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [course_id, setCourse] = useState([]);
  const [unit_id, setUnits] = useState([]);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [loading, setLoading] = useState(true);

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

  const storeUnit = async (e) => {
    e.preventDefault();

    const createResult = await createUnitExercise(
      // field_id,
      // grade_id,
      // course_id,
      unit_id,
      image,
      userToken
    )
      .then(function (response) {
        console.log('result ',response);
        // navigate(-1);
        toast.success("عنوان با موفقیت افزوده شد !");
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(data);
      });
    return createResult;

   
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    setImagePreview(file_url);
    setImage(event.target.files[0]);
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
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت عنوان فواید جدید
              </Typography>
            </CardHeader>
            <CardBody className=" min-h-screen  px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeUnit}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                encType="multipart/form-data"
              >

                <div className="">
                  <label className="ml-3"> عنوان :</label>

                  {/* <FieldDropdown
                    field_id={field_id}
                    setField_id={setField_id}
                  /> */}
                   <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block">توضیحات :</label>

                  {/* {field_id ? (
                    <GradeDropdown
                      grade={grade_id}
                      setGrade={setGrade}
                      fieldId={field_id}
                    />
                  ) : (
                    <div>loading</div>
                  )} */}
                   <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                {/* <div className="">
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
                </div> */}

                {/* <div className="">
                  <label className="ml-3 mb-4 block">نام فصل:</label>
                  <UnitDropdown units={unit_id} setUnits={setUnits} courseId={course_id}
 />
                </div> */}

                {/* <br></br> */}
{/* 
                <div className="">
                  <label className="ml-3 block">عکس:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      name="image"
                      accept="image/png,image/jpeg,image/webp,"
                      style={inputStyle}
                      onChange={handleFileChange}
                    /> */}
                    {/* <div className=" h-20 w-36 rounded-md border-2">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    
                    src={image}
                    alt="Uploaded File"
                  />
                </div>
                <p>{image}</p> */}
                  {/* </div>
                </div> */}
                {/* <div className=""></div> */}
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

export default CreateUnitExcercise;
