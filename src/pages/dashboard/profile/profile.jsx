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

export function Profile() {
  const { userToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [province, setProvince] = useState();

  const intitialValues = {
    full_name: userInfo?.full_name,
    sex: userInfo?.sex,
    city: userInfo?.city?.name,
    grade: userInfo?.grade?.name,
    mobile: userInfo?.mobile,
    province: userInfo?.province?.name,
    school: userInfo?.school?.name,
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

  const getProfileMeData = async () => {
    const result = await getProfileMe(userToken)
      .then(function (response) {
        console.log("response:", response.data);
        setUserInfo(response?.data);
      })
      .catch(function (error) {
        console.log("error :", error.message);
      });
    return result;
  };
  useEffect(() => {
    getProfileMeData();
    getAllProvince();
  }, []);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-56 mb-6 lg:mx-4">
        <CardHeader
          color="blue"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
        >
          <div className="mb-4  border border-white/10 bg-white/10 p-6 text-white">
            <img
              className="w-20"
              src={
                userInfo?.avatar == 0
                  ? "../../images/avatar/men.png"
                  : "../../images/avatar/women.png"
              }
            />
          </div>
          <Typography variant="h4" color="white">
            <i className="fa fa-user"></i> {userInfo?.full_name}
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="i flex flex-col">
            <Formik
              initialValues={intitialValues}
              enableReinitialize={true}
              onSubmit={(values) => {
                const { data } = axios
                  .post(
                    "https://testato.ir/api/profile/store",
                    {
                      intitialValues,
                      // full_name:values?.full_name,
                      // sex:values?.sex,
                      // city:values?.city?.name,
                      // grade:values?.grade?.name,
                      // mobile:values?.mobile,
                      // province:values?.province?.name,
                      // school:values?.school?.name,
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
                  className="w-100 max-w-screen-lg sm:w-96"
                >
                  <Input
                    size="md"
                    onChange={handleChange}
                    className="mt-1em"
                    value={values.full_name}
                    name="full_name"
                    label="نام ونام خانوادگی"
                  />
                  <Input
                    className="mt-1em"
                    onChange={handleChange}
                    name="grade"
                    size="md"
                    value={values.grade}
                    label="مقطع"
                  />
                  <Input
                    className="mt-1em"
                    onChange={handleChange}
                    name="mobile"
                    size="md"
                    value={values.mobile}
                    label="موبایل"
                  />
                  <Input
                    className="mt-1em"
                    onChange={handleChange}
                    name="province"
                    size="md"
                    value={values.province}
                    label="استان"
                  />
                  <Input
                    size="md"
                    onChange={handleChange}
                    name="city"
                    className="mt-1em"
                    value={values.city}
                    label="شهر"
                  />
                  <Input
                    className="mt-1em"
                    onChange={handleChange}
                    name="school"
                    size="md"
                    value={values.school}
                    label="مدرسه"
                  />
                  <Input
                    className="mt-1em"
                    onChange={handleChange}
                    name="sex"
                    size="md"
                    value={(values.sex = "men" ? "مرد" : "زن")}
                    label="جنسیت"
                  />
                  <Button className="mt-4" type="submit" size="md">
                    ذخیره
                  </Button>
                  {errors.name && (
                    <div style={{ color: "red" }}>{errors.name}</div>
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
