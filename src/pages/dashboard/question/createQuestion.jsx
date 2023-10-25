import axios from "axios";
import { createQuestions } from "@/api/services/question";
import React, { useState, useEffect, useRef, useContext } from "react";

import { Card, CardHeader, CardBody, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicInformation from "@/components/question/basicInformation";
import UploadVideo from "@/components/question/upload-video";
import CourseDropdown from "@/components/course/CourseDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import LevelDropdown from "@/components/level/LevelDropdown";
import SectionDropdown from "@/components/section/SectionDropdown";
import FieldDropdown from "@/components/fields/FieldDropdown";
import { AuthContext } from "@/gard/context/AuthContext";
const steps = ["اطلاعات پایه", "آپلود ویدئو"];
export function CreateQuestion() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);


  const [filesNumber, setFilesNumber] = useState([]);
  const [field, setField] = useState(null);
  const [grade, setGrade] = useState([]);
  const [units, setUnits] = useState(null);
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState(null);
  const [level, setLevel] = useState([]);
  // const [files, setFiles] = useState([]);
  const [image, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  //upload image files
  const handleFileChange = (event) => {
    setImages([...image, ...event.target.files]);
    filesNumber.push(...event.target.files);
    console.log("image : ", ...event.target.files);
    // console.log("image name : ", ...event.target.files.name);
    console.log("image imageNumber: ", filesNumber);
    // console.log("image length imageNumber: ", filesNumber.length);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...image];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);
    console.log("updatedFiles: " + updatedFiles);
  };

  // steper
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const storeVideoQuestion = async (e) => {
    e.preventDefault();
    // console.log(id);
  };
  const inputRef = useRef();
  // const [source, setSource] = useState();
//   onst deleteQuestion = async (id) => {
  const handleVideoFileChange = (event) => {
    // console.log("i :",i);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setVideo(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <form
              method="post"
              onSubmit={storeQuestion}
              className="m-6  grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
              encType="multipart/form-data"
            >
                <div className="">
                <label className="ml-3"> رشته:</label>
                <FieldDropdown field_id={field} setField_id={setField} />
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <label className="ml-3">مقطع:</label>
                {field ? (
                    <GradeDropdown
                    grade={grade}
                    setGrade={setGrade}
                    fieldId={field ? field : null}
                    />
                ) : (
                    <div> loading...</div>
                )}
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <label className="ml-3">درس:</label>
                {grade ? (
                    <CourseDropdown
                    course={course}
                    setCourse={setCourse}
                    gradeId={grade}
                    />
                ) : (
                    <div> loading...</div>
                )}
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <label className="ml-3">فصل:</label>
                {course ? (
                    <UnitDropdown
                    units={units}
                    setUnits={setUnits}
                    courseId={course}
                    />
                ) : (
                    <div> loading...</div>
                )}
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <label className="ml-3">بخش:</label>
                {units ? (
                    <SectionDropdown
                    section={section}
                    setSection={setSection}
                    UnitId={units}
                    />
                ) : (
                    <div> loading...</div>
                )}
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <label className="ml-3">سطح:</label>
                {section ? (
                    <LevelDropdown
                    level={level}
                    setLevel={setLevel}
                    sectionId={section}
                    />
                ) : (
                    <div> loading...</div>
                )}
                </div>

                <div className="col-span-2">
                <label className="ml-3">Files:</label>
                <input
                    style={inputStyle}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                <div className="my-5 mt-9 flex flex-wrap items-center gap-5">
                    <div className="flex flex-wrap justify-center ">
                    {image.map((file, index) => (
                        <div className=" relative m-2 h-40 w-40 p-4 " key={index}>
                        <img
                            className="h-full w-auto rounded-md object-cover"
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                        />
                        <span>{file.name}</span>
                        <button
                            className="absolute top-0 left-0 h-5 w-5 rounded bg-red-500 text-white "
                            onClick={() => handleRemoveFile(index)}
                        >
                            X
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

              
              <div className="col-span-2">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>

            {/* <BasicInformation
              handleFileChange={handleFileChange}
              handleRemoveFile={handleRemoveFile}
              storeQuestion={storeQuestion}
              inputStyle={inputStyle}
              section={section}
              setSection={setSection}
              course={course}
              setCourse={setCourse}
              level={level}
              setLevel={setLevel}
              units={units}
              setUnits={setUnits}
              grade={grade}
              setGrade={setGrade}
              // files={files}
              // setFiles={setFiles}
              image={image}
              setImages={setImages}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              field={field}
              setField={setField}
            /> */}
          </>
        );

      case 1:
        return (
          <>
            {/* <UploadVideo
              video={video}
              setVideo={setVideo}
              filesNumber={filesNumber}
            /> */}
            <div className="maincontainer">
              <div className="w-full grid min-h-[300px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
                {filesNumber.map((item, i) => (
                  <div key={i} className="min-h-10">
                    <p>{item.name}</p>
                    <p>{item.size}</p>
                    <form
                      method="post"
                      onSubmit={storeVideoQuestion}
                      className="m-6 "
                      encType="multipart/form-data"
                    >
                    <div className="VideoInput my-2 flex flex-col gap-2 ">
                      <input
                        ref={inputRef}
                        className="VideoInput_input hidden"
                        type="file"
                        onChange={handleVideoFileChange}
                        // onChange={()=>handleVideoFileChange(i)}
                        // () => deleteQuestion(question.id)
                        accept=".mov,.mp4"
                      />
                      {!video && (
                        <button
                          className=" flex items-center justify-center bg-deep-purple-50 p-2 "
                          onClick={handleChoose}
                        >
                          <img src="/images/avatar/icon-play.png" alt="" />
                        </button>
                      )}
                      {video && (
                        <video
                          className="VideoInput_video block"
                          width="100%"
                          height="500px"
                          controls
                          src={video}
                        />
                      )}
                      <div className="VideoInput_footer bg-deep-purple-200 py-1">
                        {video || "Nothing selectd"}
                      </div>
                    </div>

                    <Button type="submit">ذخیره</Button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2">
                <Button type="submit">ذخیره</Button>
            </div>
          </>
        );

      default:
        return "unknown step";
    }
  }

  const storeQuestion = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("title", title);
    formData.append("level", level);
    formData.append("units", units);
    formData.append("course", course);
    formData.append("section", section);
    formData.append("grade", grade);
    for (let i = 0; i < image.length; i++) {
      formData.append("image[]", image[i]);
    }
    // for (let i = 0; i < video.length; i++) {
    //   formData.append("video[]", video[i]);
    // }

    const createResult = await createQuestions(formData,userToken)
      .then(function (response) {
        toast.success("سئوال با موفقیت افزوده شد !");
        // if (response.data.status === true) {
        //   toast.success("سئوال با موفقیت افزوده شد !");
        // }
        console.log("response result : ", response);
        console.log("response result : ", data);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("data", data);
        console.log("error", error.massage);
      });

    return createResult;
  };

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
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
          <Card className="!shadow-0 container m-auto overflow-x-hidden">
            <div className="p-8">
              <Link
                to={`/dashboard/questions`}
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
                ساخت سئوال جدید
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-4 pt-0 pb-44">
              {/* <form
                method="post"
                onSubmit={storeQuestion}
                className="m-6  grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
                encType="multipart/form-data"
              >
              
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">سطح:</label>

                  <LevelDropdown level={level} setLevel={setLevel} />
                </div>

                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">دوره:</label>

                  <CourseDropdown course={course} setCourse={setCourse} />
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">درس:</label>

                  <UnitDropdown units={units} setUnits={setUnits} />
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">فصل:</label>

                  <SectionDropdown section={section} setSection={setSection} />
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                  <label className="ml-3">بخش:</label>

                  <GradeDropdown grade={grade} setGrade={setGrade} />
                </div>

                <div className="col-span-2">
                  <label className="ml-3">Files:</label>
                  <input
                    style={inputStyle}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="my-5 mt-9 flex flex-wrap items-center gap-5">
                    <div className="flex flex-wrap justify-center ">
                      {files.map((file, index) => (
                        <div
                          className=" relative m-2 h-40 w-40 p-4 "
                          key={index}
                        >
                          <img
                            className="h-full w-auto rounded-md object-cover"
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                          />
                          <span>{file.name}</span>
                          <button
                            className="absolute top-0 left-0 h-5 w-5 rounded bg-red-500 text-white "
                            onClick={() => handleRemoveFile(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form> */}

              <Box sx={{ width: "100%" }}>
                <Stepper
                  className="font-sans"
                  sx={{ fontFamily: "Vazir" }}
                  activeStep={activeStep}
                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //   labelProps.optional = (
                    //     <Typography variant="caption">Optional</Typography>
                    //   );
                    // }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step
                        className="font-sans"
                        sx={{ fontFamily: "Vazir" }}
                        key={label}
                        {...stepProps}
                      >
                        <StepLabel
                          className="font-sans"
                          sx={{ fontFamily: "Vazir" }}
                          {...labelProps}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        className="font-sans"
                        sx={{ fontFamily: "Vazir" }}
                        onClick={handleReset}
                        type="button"
                      >
                        از سرگیری
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <>
                      <form
                        method="post"
                        onSubmit={storeQuestion}
                        className="m-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
                        encType="multipart/form-data"
                      >
                        {getStepContent(activeStep)}
                        <div className="col-span-2">
                          <Button type="submit">ذخیره</Button>
                        </div>
                      </form>

                      <div className="col-span-2">
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, fontFamily: "Vazir" }}
                            type="button"
                          >
                            قبلی
                          </button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          {/* {isStepOptional(activeStep) && (
                        <Button
                          className="font-sans"
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 ,fontFamily: "Vazir"}}
                        >
                          گذرکردن
                        </Button>
                      )} */}

                          {activeStep === steps.length - 1 ? (
                            <>
                              {/* <Button type="submit">ذخیره</Button> */}
                              {/* <Button  sx={{fontFamily: "Vazir"}} onClick={handleNext}>
                                 finished
                              </Button> */}
                            </>
                          ) : (
                            <>
                              <button
                                sx={{ fontFamily: "Vazir" }}
                                onClick={handleNext}
                                type="button"
                              >
                                بعدی
                              </button>
                            </>
                          )}
                        </Box>
                      </div>
                      {/* <Typography sx={{ mt: 2, mb: 1 }}>
                      Step {activeStep + 1}
                    </Typography> */}
                    </>
                  </React.Fragment>
                )}
              </Box>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateQuestion;
