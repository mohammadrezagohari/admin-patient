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
import { showUnits, updateUnit } from "@/api/services/units";
import CourseDropdown from "@/components/course/CourseDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import {
  showSummaryFormulas,
  updateSummaryFormula,
} from "@/api/services/summaryFormula";
import UserDropdown from "@/components/users/UserDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";

function ShowSummaryFormula() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [unit, setUnit] = useState();
  const [summaryFormula, setSummaryFormula] = useState();

  const [unit_id, setUnits] = useState([]);
  const [user_id, setUserProfile] = useState([]);
  const [image, setImage] = useState();

  const intitialValues = {
    unit_id: summaryFormula?.unit_id,
    user_id: summaryFormula?.user_id,
    image: summaryFormula?.image,
  };
  const showInfoSummaryFormula = async (id) => {
    const showResult = await showSummaryFormulas(id)
      .then(function (response) {
        setSummaryFormula(response?.data);
        console.log(summaryFormula);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };
  useEffect(() => {
    showInfoSummaryFormula(id);
  }, []);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
    width: "43%",
    marginRight: "5px",
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
  const editInfoSummaryFormula = async (id, values) => {
    const editResult = await updateSummaryFormula(id, values)
      .then(function (response) {
        console.log(response.data.message);
        navigate("/dashboard/summaryFormulas");
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return editResult;
  };
  return (
    <>
      <Card>
        <div className="py-5">
          <Link to={`/dashboard/summaryFormulas`} className="mr-3" style={linkStyle}>
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-4 mt-3 p-6">
          <Typography variant="h6" color="white">
            بروزرسانی فصل
          </Typography>
        </CardHeader>
        <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
          <Formik
            initialValues={intitialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              editInfoSummaryFormula(id, values);
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">نام فصل:</label>
                  <UnitDropdown units={unit_id} setUnits={setUnits} />
                </div>

                <div className="">
                  <label className="ml-3">نام کربر:</label>

                  <UserDropdown
                    userProfile={unit_id}
                    setUserProfile={setUserProfile}
                  />
                </div>

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
                        src={values?.image}
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
  );
}

export default ShowSummaryFormula;
