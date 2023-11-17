import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { Formik } from "formik";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getProfileMe } from "@/api/services/auth-api";
import { getProvince } from "./../../../api/services/province";
import { AuthContext } from "@/gard/context/AuthContext";
import { fetchUsers } from "@/api/services/users";

export function Profile() {
  const { userToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [province, setProvince] = useState();

  const intitialValues = {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    password: userInfo?.password,
    sex: userInfo?.gender,
    city: userInfo?.city?.name,
    mobile: userInfo?.mobile,
  };

  const getAllProvince = async () => {
    const result = await getProvince(userToken)
      .then(function (response) {
        setProvince(response?.data);
      })
      .catch(function (err) {
        console.log(err.message);
      });
    return result;
  };

  // const getProfileMeData = async () => {
  //   const result = await getProfileMe(userToken)
  //     .then(function (response) {
  //       console.log("response:", response.data);
  //       setUserInfo(response?.data);
  //     })
  //     .catch(function (error) {
  //       console.log("error :", error.message);
  //     });
  //   return result;
  // };
  // useEffect(() => {
  //   getProfileMeData();
  //   getAllProvince();
  // }, []);
  const getDatas = async () => {
    const result = await fetchUsers(userToken)
      .then(function (response) {
        console.log("response", response);
        setUsers(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  useEffect(() => {
    setTimeout(() => {
      getDatas();
      console.log("first");
    }, 3000);
  }, []);
  return (

      <>
        <Card className=" h-full rounded-none  w-full  lg:bg-white md:bg-blue-900  ">
          <CardHeader
            color="blue"
            floated={false}
            shadow={false}
            className="m-0 grid relative overflow-visible place-items-center rounded-none py-8 px-4  h-40 text-center"
          >
          <div className="mb-4 w-32  border border-white rounded-full bg-white  text-white absolute right-16 top-20 z-50">
            <img
              className="w-full "
              src={
                userInfo?.avatar == 0
                  ? "../../images/avatar/men.png"
                  : "../../images/avatar/women.png"
              }
            />
          </div>
          <Typography variant="h4" color="white" className="absolute text-xl top-28 right-56 font-extrabold">
            {userInfo?.full_name} 
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="mt-8 i flex flex-col">
            <Formik
              initialValues={intitialValues}
              enableReinitialize={true}
              onSubmit={(values) => {
                const { data } = axios
                  .post(
                    "https://localhost/api/profile/store",
                    {
                      intitialValues,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: userToken,
                      },
                    }
                  )
                  .then(function (response) {
                    console.log(response.data.message);

                    navigate("/home");
                  })
                  .catch(function (error) {
                    console.log(data);
                  });
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  className="!w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:w-96 pr-10 pl-12 gap-4"
                >
                  <Input
                    size="md"
                    onChange={handleChange}
                    className="mt-1em"
                    value={values.first_name}
                    name="full_name"
                    label=" نام "
                  />
                  <Input
                    className="mt-1em  ml-8 "
                    onChange={handleChange}
                    name="last_name"
                    size="md"
                    value={values.last_name}
                    label="نام خانوادگی"
                  />
                  <Input
                    className="mt-1em "
                    onChange={handleChange}
                    name="city_id"
                    size="md"
                    autoComplete="off"
                    value={values?.city_id}
                    label="شهر"
                  />
                  <Input
                    className="mt-1em "
                    onChange={handleChange}
                    name="mobile"
                    size="md"
                    value={values?.mobile}
                    // value={values.city_id}
                    label="موبایل"
                  />
                  <Input
                    type="password"
                    size="md"
                    onChange={handleChange}
                    name="password"
                    className="mt-1em  "
                    value={values.password}
                    label="رمزعبور"
                  />
      
                  <Input
                    className="mt-1em  "
                    onChange={handleChange}
                    name="gender"
                    size="md"
                    label="جنسیت"
                    value={(values.sex = "men" ? "مرد" : "زن")}
                  />
                  <br/>
                  {/* <div className="col-span-1 md:col-span-2 lg:col-span-2"></div> */}
                    <Button className="" type="submit" size="md" >
                      ذخیره
                    </Button>
                  {errors.name && (
                    <div style={{ color: "red"}}>{errors.name}</div>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </CardBody>
      </Card>
    </>
    
  );
}

export default Profile;
