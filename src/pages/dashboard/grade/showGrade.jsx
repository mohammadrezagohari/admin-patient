import axios from "axios";
import { showGrades, updateGrade } from "@/api/services/grade";
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
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowGrade() {
  const { userToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const [grade, setGrade] = useState();
  const [field_id, setField_id] = useState([]);
  const [loading, setLoading] = useState(true);
  const intitialValues = {
    name: grade?.name,
    priority: grade?.priority,
    field_id: grade?.fields?.id,
  };

  const showInfoGrade = async (id) => {
    const showResult = await showGrades(id, userToken)
      .then(function (response) {
        setGrade(response?.data);
        console.log("grade data", grade);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    // setTimeout(() => {
    showInfoGrade(id);
    // }, 3000);
  }, [id]);

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

  const editInfoGrade = async (id, values) => {
    const editResult = await updateGrade(id, values, userToken)
      .then(function (response) {
        if (response.status) {
            toast.success("تغییرات با موفقیت انجام گرفت");
            navigate("/dashboard/grades");
        } else {
            if (response?.success == false) {
              toast(
                `${response?.data?.field_id!=undefined ? response?.data?.field_id : '' } \n
                ${response?.data?.name!=undefined ? response?.data?.name : '' } \n
                ${response?.data?.priority!=undefined ? response?.data?.priority : '' } \n`,
                {
                  duration: 2000,
                }
              );
            } else {
              toast.error("خطایی رخ داده است");
            }
          }
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.massage);
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
              <Link to={`/dashboard/grades`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی مقطع
              </Typography>
            </CardHeader>
            <CardBody className="max-h-screen px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoGrade(id, values);
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3">نام مقطع:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="name"
                        value={values?.name}
                        style={inputStyle}
                        label="مقطع"
                      />
                    </div>

                    <div className="">
                      <label className="ml-3">نام رشته:</label>
                      <div className={inputStyle}>
                        <FieldDropdown
                          field_id={field_id}
                          setField_id={setField_id}
                          selected_id={grade?.fields?.id}
                        />
                      </div>
                    </div>

                    <div className="">
                      <label className="ml-3">الویت:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="priority"
                        value={values?.priority}
                        style={inputStyle}
                        label="مقطع"
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
      )}
    </>
  );
}

export default ShowGrade;
