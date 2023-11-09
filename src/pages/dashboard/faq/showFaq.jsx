import { showFaq, updateFaq } from "@/api/services/faq";
import { AuthContext } from "@/gard/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseUrl from "@/configs/base-url";
import { ThreeDots } from "react-loader-spinner";
import {
    Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import toast from "react-hot-toast";

function ShowFaq() {
  const { id } = useParams();
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState(null);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
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


  const intitialValues = {
    context: faqs?.context,
  };

  const showFaqsItem = async (id) => {
    const showResult = await showFaq(id, userToken)
      .then(function (response) {
        setFaqs(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    setTimeout(() => {
        showFaqsItem(id);
    }, 3000);
  }, []);

  const editFaqItems = async (id, values) => {
    console.log("values", values);
    const editResult = await updateFaq(id, values, userToken)
      .then(function (response) {
        console.log("dataresult", response);
        if (response.status) {
          toast.success("تغییرات با موفقیت انجام گرفت");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.context != undefined ? response?.data?.context : ""
              } \n`,
              {
                duration: 2000,
              }
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
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
        <Card>
          <div className="py-5">
            <Link
              to={`/dashboard/faq`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
                 اصلاح سوال
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <Formik
              initialValues={intitialValues}
              enableReinitialize={true}
              encType="multipart/form-data"
              onSubmit={(values) => {
                editFaqItems(id, values);
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  className="m-6 mb-4 flex flex-wrap"
                >
                  <div className="w-7/12">
                    <label className="ml-3">عنوان سوال</label>
                    <textarea
                      onChange={handleChange}
                      type="text"
                      className="ml-3"
                      name="name"
                      value={values?.context}
                      style={inputStyle}
                    ></textarea>
                  </div>
                  <div className="col-span-2 mt-4 w-6/12">
                    <Button type="submit">ذخیره</Button>
                  </div>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ShowFaq;
