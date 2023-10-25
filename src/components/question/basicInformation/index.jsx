import React from "react";
import { Field, Formik, useFormik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import CourseDropdown from "@/components/course/CourseDropdown";
import UnitDropdown from "@/components/units/UnitDropdown";
import GradeDropdown from "@/components/grade/GradeDropdown";
import LevelDropdown from "@/components/level/LevelDropdown";
import SectionDropdown from "@/components/section/SectionDropdown";
import FieldDropdown from "@/components/fields/FieldDropdown";

function BasicInformation({
  field,
  setField,
  section,
  setSection,
  course,
  setCourse,
  level,
  setLevel,
  units,
  setUnits,
  grade,
  setGrade,
  // files,
  // setFiles,
  image,
  setImages,
  selectedImage,
  setSelectedImage,
  handleFileChange,
  handleRemoveFile,
  storeQuestion,
  inputStyle,
}) {
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
          {
            console.log()
          }
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="ml-3">مقطع:</label>
          <GradeDropdown grade={grade} setGrade={setGrade}  />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="ml-3">درس:</label>
          <CourseDropdown course={course} setCourse={setCourse} />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="ml-3">فصل:</label>

          <UnitDropdown units={units} setUnits={setUnits} />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="ml-3">بخش:</label>

          <SectionDropdown section={section} setSection={setSection} />
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="ml-3">سطح:</label>

          <LevelDropdown level={level} setLevel={setLevel} />
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
    </>
  );
}

export default BasicInformation;
