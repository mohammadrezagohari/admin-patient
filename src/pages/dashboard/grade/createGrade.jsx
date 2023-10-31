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
import { createGrade } from "@/api/services/grade";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";
export function CreateGrade() {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [field_id, setField_id] = useState([]);
  const [name, setName] = useState();
  const [priority, setPriority] = useState();

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
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const storeGrade = async (e) => {
    e.preventDefault();

    const createResult = await createGrade(name, priority, field_id,userToken)
      .then(function (response) {
        if (response.status) {
            toast.success("پوستر با موفقیت درج شده است.");
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
              toast.error("خطایی رخ داده است!");
            }
          }



      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
        console.log(data);
      });
    return createResult;

    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .post(
    //     "https://testato.ir/api/grade/store",
    //     {
    //       name: name,
    //       priority: priority,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     navigate(-1);
    //   })
    //   .catch(function (error) {
    //     console.log(data);
    //   });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log("field_id : ", field_id);
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
              <Link to={`/dashboard/grades`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت پوستر جدید
              </Typography>
            </CardHeader>
            <CardBody className="  px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storeGrade}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3 block"> عنوان پوستر:</label>
                  <input
                    onChange={(e) => handleName(e)}
                    type="text"
                    className="ml-3"
                    name="name"
                    style={inputStyle}
                  />
                </div>

                {/* <div className="">
                  <label className="ml-3"> رشته:</label>

                  <FieldDropdown
                    field_id={field_id}
                    setField_id={setField_id}
                  />
                </div> */}

                <div className="">
                  <label className="ml-3 block">فایل پوستر جدید :</label>
                  <input
                    onChange={(e) => handlePriority(e)}
                    type="file"
                    className="ml-3"
                    name="field"
                    style={inputStyle}
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

export default CreateGrade;
