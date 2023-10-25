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
import { createField } from "@/api/services/fields";
import { toast } from "react-hot-toast";
import { createAnswer } from "@/api/services/answer";
import QuestionDropdown from "@/components/question/QuestionDropdown";
import { ThreeDots } from "react-loader-spinner";

function CreateAnswer() {
  const navigate = useNavigate();

  const [question_id, setQuestion_id] = useState([]);
  const [option_question_id, setOption_question_id] = useState([]);
  const [description, setDescription] = useState();
  const [spending, setSpending] = useState();
  const [exam_id, setExam_id] = useState([]);
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(true);

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
  const handleField = (e) => {
    setAnswer(e.target.value);
  };

  const storefield = async (e) => {
    e.preventDefault();
    const createResult = await createAnswer(
      province_id,
      option_question_id,
      description,
      spending,
      exam_id
    )
      .then(function (response) {
        toast.success("رشته با موفقیت افزوده شد !");
        setAnswer(response?.data);
        console.log(field);
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
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
              <Link to={`/dashboard/answers`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت رشته جدید
              </Typography>
            </CardHeader>
            <CardBody className="min-h-screen px-0 pt-0 pb-2">
              <form
                method="post"
                onSubmit={storefield}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3"> توضیحات</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="description"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3"> مدت پاسخ گویی</label>
                  <input
                    onChange={(e) => setSpending(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="spending"
                    style={inputStyle}
                  />
                </div>

                <div className="">
                  <label className="ml-3"> سئوال</label>
                  <QuestionDropdown
                    question_id={question_id}
                    setQuestion_id={setQuestion_id}
                  />
                  {/* <input
                onChange={(e) => setQ(e.target.value)}
                type="text"
                className="ml-3"
                name="description"
                style={inputStyle}
              /> */}
                </div>

                {/* <div className="">
              <label className="ml-3"> سئوال</label>
              <QuestionDropdown
                question_id={question_id}
                setQuestion_id={setQuestion_id}
              />
             
            </div> */}

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

export default CreateAnswer;
