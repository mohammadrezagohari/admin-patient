import { useContext, useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { getPoster,updatePoster,showPoster } from "@/api/services/poster";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";


export function ShowPoster() {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [poster ,setPoster] = useState(null);
  const [title, setTitle] = useState(null); 
  const [posterData,setPosterData] = useState()

  const [imagePreview, setImagePreview] = useState(null);

  const [category_id, setCategory_id] = useState(null);

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
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("image target", event.target.files[0]);
    setPoster(event.target.files[0]);
    setImagePreview(file_url);
  };

  const showPosters = async (id) => {
    const showResult = await showPoster(id,userToken)
      .then(function (response) {
        setPosterData(response?.data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return showResult;
  };
  useEffect(() => {
    showPosters(id);
  }, []); 

  const editPoster= async (id, values) => {
    const editResult = await updateSchool(id, 
      {
        poster:poster,
        title:title, 
        category_id:category_id
    }
      , userToken
      )
      .then(function (response) {
        if (response.data.status == true) {
          toast.success("تغییرات با موفقیت انجام گرفت");
        }
        console.log(response.data.message);
        navigate("/dashboard/poster");
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.message);
      });

    return editResult;
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
              to={`/dashboard/poster`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ساخت پوستر جدید
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={editPoster}
              className="m-6 mb-4 flex flex-wrap"
            >
       
              
              <div className="w-7/12 mt-4">
                <label className="ml-3 block">فایل پوستر:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    name="poster"
                    accept="image/png,image/jpeg,image/webp,"
                    style={inputStyle}
                    onChange={handleFileChange}
                  />
                  <div className=" h-20 w-36 rounded-md border-2 p-3">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={imagePreview ?? "../../images/no-image.svg"}
                      alt="آپلود عکس"
                    />
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <label className="ml-3"> عنوان پوستر</label>
                <input
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  value={title}
                  type="text"
                  className="ml-3"
                  name="title"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">دسته بندی</label>
                <CategoryDropdown
                  category={category_id}
                  setCategory={setCategory_id}
                />
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



export default ShowPoster;
