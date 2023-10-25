import axios from "axios";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createStorys } from "@/api/services/story";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
// import DatePicker from "react-multi-date-picker";
// import jalaliMoment from "jalali-moment";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function CreateStory() {
  const navigate = useNavigate();
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

  // const handleSubmit = (values) => {
  //   const file= document.getElementById("file").files[0];
  //   let arr =file.type.split("/");
  //   const token = localStorage.getItem("_token_testato");
  //   const { data } = axios
  //     .post(
  //       "https://testato.ir/api/story/store",
  //       {
  //         title: values?.title,
  //         link: values?.link,
  //         priority_order: values?.priority_order,
  //         file_url: values?.file,
  //         mime_type:arr[1],
  //         file_size: file?.size,
  //       },
  //       {
  //         headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //         }
  //       },
  //     )
  //     .then(function (response) {

  //       console.log(response.data);
  //       navigate("/dashboard/stories");
  //     })
  //     .catch(function (error) {

  //       console.log(data);
  //     });
  // };

  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [priority_order, setPriority_order] = useState();
  const [image_preview, setImage_preview] = useState();
  const [file_url, setFile_url] = useState();
  const [expire_at, setExpire_at] = useState(new Date());

  const [loading, setLoading] = useState(true);

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setFile_url(file);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImage_preview(file);
    }
  };

  const storeStory = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", file);

    const createResult = await createStorys(
      title,
      link,
      priority_order,
      expire_at,
      image_preview,
      file_url
    )
      .then(function (response) {
        toast.success(" استوری جدید با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        // console.log(data);
        console.log("error", error.massage);
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
            <div className="p-8">
              <Link
                to={`/dashboard/stories`}
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
                ساخت استوری جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-4 pt-0 pb-44">
              <form
                method="post"
                onSubmit={storeStory}
                encType="multipart/form-data"
                className="m-6  grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3 block">
                    {" "}
                    نام استوری را واردکنید :
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3 block"> لینک: </label>
                  <input
                    onChange={(e) => setLink(e.target.value)}
                    type="url"
                    className="ml-3"
                    name="link"
                    style={inputStyle}
                  />
                  {/* <div className="w-32 rounded-md object-cover">
                      <img
                        className="w-full rounded-md"
                        src={file_url}
                        alt=""
                      />
                    </div> */}
                </div>

                <div className="">
                  <label className="ml-3 block"> الویت : </label>
                  <input
                    onChange={(e) => setPriority_order(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="priority_order"
                    style={inputStyle}
                  />
                </div>
 
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

                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="ml-3 block py-2">file_url:</label>
                  <input
                    type="file"
                    name="file_url"
                    style={inputStyle}
                    onChange={handleVideoFileChange}
                  />
                </div>

                <div className="">
                  <label className="ml-3"> image_preview: </label>
                  <input
                    type="file"
                    name="image_preview"
                    // accept="image/png,image/jpeg,image/webp,"
                    // accept=".jpg, .jpeg, .png, .bmp, .tiff"
                    style={inputStyle}
                    onChange={handleImageFileChange}
                  />
                </div>

                <div className=""></div>
                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
              {/* <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="w-100 max-w-screen-lg sm:w-96"
              >
                <Field
                  size="md"
                  type="text"
                  component={Input}
                  onChange={handleChange}
                  values={values?.title}
                  className="mt-1em"
                  id="title"
                  name="title"
                  label=" نام استوری را واردکنید"
                />

                <Field
                  component={Input}
                  className="mt-1em text-black"
                  type="text"
                  onChange={handleChange}
                  values={values?.link}
                  id="link"
                  name="link"
                  size="md"
                  label="link را وارد کنید"
                />

                <Field
                  component={Input}
                  className="mt-1em text-black"
                  type="text"
                  onChange={handleChange}
                  values={values?.priority_order}
                  id="priority_order"
                  name="priority_order"
                  size="md"
                  label="الویت"
                />

                <input
                  className="mt-2em text-black mb-3"
                  type="file"
                  onChange={handleChange}
                  values={values?.file}
                  id="file"
                  name="file"
                  size="md"
                  label="فایل"
                />
<br></br>
                <Button type="submit">ذخیره</Button>
                {errors.full_name && (
                  <div style={{ color: "red" }}>{errors.full_name}</div>
                )}
              </form>
            )}
          </Formik> */}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateStory;
