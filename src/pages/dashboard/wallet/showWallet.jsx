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
import UnitDropdown from "@/components/units/UnitDropdown";
import { showWallets, updateWallet } from "@/api/services/wallet";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowWallet() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [wallets, setWallets] = useState();
  const [loading, setLoading] = useState(true);

  const intitialValues = {
    amount: wallets?.amount,
    bonus: wallets?.bonus,
  };
  const showInfoWallet = async (id) => {
    const showResult = await showWallets(id)
      .then(function (response) {
        setWallets(response?.data);
        console.log(wallets);
      })
      .catch(function (err) {
        console.log("error", err.message);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoWallet(id);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/wallet/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setExam(response?.data?.data);
  //       console.log(exam);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

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

  const editInfoWallet = async (id, values) => {
    console.log('Wallet id :',id);
    const editResult = await updateWallet(id, values)
      .then(function (response) {
        if (response.data.status === true) {
          toast.success("تغییرات با موفقیت انجام گرفت");
        }
        console.log(response.data.message);

        // navigate("/dashboard/wallet");
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err.message);
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
                to={`/dashboard/wallets`}
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
                بروزرسانی کیف پول
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                onSubmit={(values) => {
                  editInfoWallet(id,values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/exam/update/${id}`,
                  //     {
                  //       name: values.name,
                  //       level_id: "vitae",
                  //       course_id: "aliquid",
                  //       question_quantity: 82.52108004,
                  //       answer_quantity: 247.94,
                  //       time_exam: 38016.3,
                  //       status: "در حال انجام",
                  //       score: 15,
                  //     },
                  //     {
                  //       headers: {
                  //         "Content-Type": "application/json",
                  //         Accept: "application/json",
                  //         Authorization: `Bearer ${localStorage.getItem(
                  //           "_token_testato"
                  //         )}`,
                  //       },
                  //     }
                  //   )
                  //   .then(function (response) {
                  //     console.log(response.data.message);

                  //     navigate("/dashboard/exams");
                  //   })
                  //   .catch(function (error) {
                  //     console.log(data);
                  //   });
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3 block">میزان :</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="amount"
                        value={values?.amount}
                        style={inputStyle}
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block"> جایزه:</label>
                      <Field
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="bonus"
                        value={values?.bonus}
                        style={inputStyle}
                      />
                    </div>

                    <div className=" col-span-2">
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

export default ShowWallet;
