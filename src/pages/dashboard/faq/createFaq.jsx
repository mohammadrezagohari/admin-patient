import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getFaq } from "@/api/services/faq";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function CreateFaq() {
  const { userToken } = useContext(AuthContext);
  const [question,setQuestion] = useState();
  const [description,setDescription] = useState();


  const [loading, setLoading] = useState(true);

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

  const storeFaq = async (e) => {
    e.preventDefault();
    const createResult = await createCategory(context, userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" سوال با موفقیت درج شد!   !");
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
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
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
              ارسال سوال  
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              // onSubmit={storeCover}
              className="m-6 mb-4 flex flex-wrap"
            >
                   <div className="w-7/12">
                <label className="ml-3">  عنوان سوال </label>
                <input
                  onChange={(e) => setQuestion(e)}
                  value={question}
                  type="text"
                  className="ml-3 p-4"
                  name="name"
                  style={inputStyle}
                  autoComplete="off"
                />
                
              </div>
              <div className="w-7/12  mt-4">
                <label className="ml-3"> توضیحات  </label>
                <textarea
                  onChange={(e) => setDescription(e)}
                  value={description}
                  type="text"
                  className="ml-3 p-4"
                  name="name"
                  style={inputStyle}
                >
                </textarea>
              </div>
         
              <div className="col-span-2 mt-4 w-6/12">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CreateFaq;
