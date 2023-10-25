import axios from "axios";
import { showGrades, updateGrade } from "@/api/services/grade";
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
import { toast } from "react-hot-toast";
import { showSuggestions, updateSuggestion } from "@/api/services/suggestion";

function ShowSuggestion() {
  const [suggestion, setSuggestion] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const intitialValues = {
    context: suggestion?.context,
  };

  const showInfoSuggestion = async (id) => {
    const showResult = await showSuggestions(id)
      .then(function (response) {
        setSuggestion(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };
  useEffect(() => {
    showInfoSuggestion(id);
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

  const editInfoSuggestion = async (id, values) => {
    const editResult = await updateSuggestion(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);

        // navigate("/dashboard/suggestions");
      })
      .catch((err) => {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.massage);
      });

    return editResult;
  };

  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/suggestions`}
            className="mr-3"
            style={linkStyle}
          >
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-4 mt-3 p-6">
          <Typography variant="h6" color="white">
            بروزرسانی محتوا
          </Typography>
        </CardHeader>
        <CardBody className="max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
          <Formik
            initialValues={intitialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              editInfoSuggestion(id, values);
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3"> محتوا:</label>
                  <Field
                    component="input"
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="context"
                    value={values?.context}
                    style={inputStyle}
                    label="محتوا"
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
  );
}

export default ShowSuggestion;
