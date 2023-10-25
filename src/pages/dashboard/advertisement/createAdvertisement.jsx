import axios from "axios";

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
import { createAdvertisement } from "@/api/services/advertisement";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ThreeDots } from "react-loader-spinner";
// import moment from 'moment';
function CreateAdvertisement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [video_link, setVideo_link] = useState();
  const [paid_status, setPaid_status] = useState(true);
  const [expire_at, setExpire_at] = useState();
  // const [video, setVideo] = useState();
  // const moment = require('moment')
  // const expire_at_Str = moment(expire_at).format('YYYY-MM-DD HH:mm:ss')

  // const handleCheckboxChange = (e) => {
  //   setPaid_status(e.target.checked); // Update the boolean value when the checkbox changes
  // };

  const handleRadioChange = (e) => {
    setPaid_status(e.target.value === "true"); // Convert the radio button value to a boolean
    console.log("paid_status : ", paid_status);
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
  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // const handlePriority = (e) => {
  //   setPriority(e.target.value);
  // };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    // const file_url = URL.createObjectURL(file);
    // console.log("file", file);
    // console.log("file_url", file_url);
    setVideo_link(event.target.files[0]);
    console.log("video_link : ", video_link);
  };

  const storeAdvertisement = async (e) => {
    e.preventDefault();

    const createResult = await createAdvertisement(
      title,
      link,
      video_link,
      paid_status,
      expire_at
    )
      .then(function (response) {
        toast.success("مقطع با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error.massage);
      });
    console.log("result : success");
    return createResult;
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   // setIcon(file)
  //   const file_url = URL.createObjectURL(file);
  //   console.log("file", file);
  //   console.log("file_url", file_url);
  //   setLink(file_url);
  // };
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
        
     
        <Card>
          <div className="py-5">
            <Link
              to={`/dashboard/advertisements`}
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
          <CardBody className="min-h-screen  px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={storeAdvertisement}
              encType="multipart/form-data"
              className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
            >
              <div className="">
                <label className="ml-3 block">نام :</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="title"
                  style={inputStyle}
                />
              </div>

              <div className="">
                <label className="ml-3 block">لینک:</label>

                <input
                  onChange={(e) => setLink(e.target.value)}
                  // value={link}
                  type="url"
                  className="ml-3"
                  name="link"
                  style={inputStyle}
                />
              </div>

              <div className="">
                <label className="ml-3 block">لینک ویدئو:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    name="video_link"
                    accept="video/*"
                    style={inputStyle}
                    onChange={handleVideoFileChange}
                  />
                  {/* <div className=" h-20 w-36 rounded-md border-2">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={video_link}
                      alt="Uploaded File"
                    />
                  </div> */}
                  {/* <input
                    // onChange={(e) => setVideo_link(e.target.value)}
                    readOnly
                    value={video_link}
                    type="text"
                    className="ml-3"
                    name="video_link"
                    style={inputStyle}
                  /> */}
                </div>
              </div>

              <div className="">
                <label className="ml-3 block"> وضعیت پرداخت:</label>
                {/* <input
                  onChange={(e) => setPaid_status(e.target.value)} 
                  // value={paid_status=="true"?"پرداخت شده":paid_status=="false"?"پرداخت نشده":""}
                  type="text"
                  className="ml-3"
                  name="paid_status"
                  style={inputStyle}
                /> */}
                {/* <input
                 name="paid_status"
                 style={inputStyle}
                 type="checkbox"
                 checked={paid_status}
                 onChange={handleCheckboxChange}
                 /> */}
                <div className="flex items-center gap-3 py-2">
                  <label for="paid">
                    <input
                      id="paid"
                      type="radio"
                      name="paid_status"
                      value="true"
                      checked={paid_status === true}
                      onChange={handleRadioChange}
                      className="px-1"
                    />
                    پرداخت نشده
                  </label>
                  <label for="unpaid">
                    <input
                      id="unpaid"
                      type="radio"
                      name="paid_status"
                      value="false"
                      checked={paid_status === false}
                      onChange={handleRadioChange}
                      className="px-1"
                    />
                    پرداخت شده
                  </label>
                </div>
              </div>

              {/* <div className="">
                <label className="ml-3 block"> منقضی در تاریخ:</label>
                <input
                  onChange={(e) => setExpire_at(e.target.value)}
                  type="date"
                  className="ml-3"
                  name="expire_at"
                  style={inputStyle}
                />
              </div> */}
               <div className="">
                  <label className="ml-3 block"> تاریخ انقضا: </label>
                  <DatePicker
                    value={expire_at}
                    name="expire_at"
                    onChange={setExpire_at}
                    inputClass="h-10 w-full"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    format="YYYY/MM/DD"
                    style={inputStyle}
                  />
                </div>

              <div className="col-span-2">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
     
      
      )}
    </>
    
  );
}

export default CreateAdvertisement;
