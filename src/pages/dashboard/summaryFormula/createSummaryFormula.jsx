import React, { useEffect, useState } from "react";

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
import { createSummaryFormula } from "@/api/services/summaryFormula";
import UserDropdown from "@/components/users/UserDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";
import { ThreeDots } from "react-loader-spinner";

function CreateSummaryFormula() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unit_id, setUnits] = useState([]);
  const [user_id, setUserProfile] = useState([]);
  const [image, setImage] = useState();
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

  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    // const file_url = URL.createObjectURL(file);
    // console.log("file", file);
    // console.log("file_url", file_url);
    setImage(event.target.files[0]);
    console.log("image", image);
  };

  const storeSummaryFormula = async (e) => {
    e.preventDefault();

    const createResult = await createSummaryFormula(unit_id, user_id, image)
      .then(function (response) {
        toast.success("مقطع با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error.massage);
        console.log(data);
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
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/summaryFormulas`}
            className="mr-3"
            style={linkStyle}
          >
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            ساخت مقطع جدید
          </Typography>
        </CardHeader>
        <CardBody className="max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
          <form
            method="post"
            onSubmit={storeSummaryFormula}
            encType="multipart/form-data"
            className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
          >
            <div className="">
              <label className="ml-3">نام فصل:</label>
              <UnitDropdown
                // name="unit_id"
                units={unit_id}
                setUnits={setUnits}
              />
            </div>

            <div className="">
              <label className="ml-3">نام کاربر:</label>
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
                  accept="image/png,image/jpeg,image/webp,"
                  style={inputStyle}
                  onChange={handleFileChange}
                />
                {/* <div className=" h-20 w-36 rounded-md border-2">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    src={image}
                    alt="Uploaded File"
                  />
                </div> */}
              </div>
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

export default CreateSummaryFormula;
