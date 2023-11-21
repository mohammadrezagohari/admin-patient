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
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
import { getArticle,createArticle } from "@/api/services/article";

export function CreateArticle() {
  const { userToken } = useContext(AuthContext);
  const [title,setTitle] = useState([]);
  const [context,setContext] = useState([]);
  const [category_id,setCategory_id] = useState([]);

  const [loading, setLoading] = useState(true);

  const inputStyle = {
    border: "1px solid #CCC8AA",
    borderRadius: "5px",
    padding: "0.45rem",
    width: "100%",
    marginTop: ".8rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createArticle(
      {
        title:title,
        context:context,
        category_id:category_id,
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" سوال با موفقیت درج شد!   !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
              ${
                response?.data?.context != undefined ? response?.data?.context : ""
              } \n
              ${
                response?.data?.category_id != undefined ? response?.data?.category_id : ""
              } \n`,{
                duration: 2000,
              },
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
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
              to={`/dashboard/articles`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
               ایجاد مقاله  
            </Typography>
          </CardHeader>
          <CardBody className="h-full px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="m-6 mt-0 mb-4 flex flex-col w-1/2 h-full gap-6"
            >
             <div className="w-full">
                <label className="ml-3">  عنوان مقاله </label>
                <input
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={title}
                  type="text"
                  className="ml-3 p-4"
                  name="question"
                  style={inputStyle}
                  autoComplete="off"
                />
                
              </div>
              <div className="w-full  ">
                <label className=""> توضیحات  </label>
                <textarea
                  onChange={(e) => {
                    setContext(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={context}
                  type="text"
                  className="ml-3 p-4 h-full "
                  name="description"
                  style={inputStyle}
                >
                </textarea>
              </div>
              <div className="w-full">
                <label className="ml-3">دسته بندی</label>
                <CategoryDropdown
                  category={category_id}
                  setCategory={setCategory_id}
                />
              </div>
              <div className="mt-6 w-6/12">
                <Button type="submit" className="w-2/3">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );

}

export default CreateArticle;
