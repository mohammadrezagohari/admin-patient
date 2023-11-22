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
import Select from "react-select";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import ProvinceDropdown from "@/components/provinces/ProvinceDropdown";
import { showProfile, updateProfiles } from "@/api/services/auth-api";
import CityDropdown from "@/components/cities/CityDropdown";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { showUser } from "@/api/services/users";
export function EditUser() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [familiar_id, setFamiliar_id] = useState([]);
  const [field_id, setField_id] = useState([]);
  const [school_id, setSchool_id] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [grade_id, setGrade] = useState([]);
  const [city_id, setCity_id] = useState([]);
  const [province_id, setProvince_id] = useState(null);
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(true);
  const initialValues = {
    avatar: userInfo?.avatar,
    full_name: userInfo?.full_name,
    mobile: userInfo?.mobile,
    is_student: userInfo?.is_student,
    field_id: userInfo?.field_id,
    grade_id: userInfo?.grade_id,
    school_id: userInfo?.school_id,
    familiar_id: userInfo?.familiar_id,
    city_id: userInfo?.city_id,
    province_id: userInfo?.province_id,
    sex: userInfo?.sex,
  };

  const showUserProfileInfo = async (id) => {
    const showResult = await showUser(id, userToken)
      .then(function (response) {
        setUserInfo(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showUserProfileInfo(id);
  }, []);

  const editUserProfileInfo = async (id, values) => {
    const editResult = await updateProfiles(id, values, userToken)
      .then(function (response) {
        console.log(response.data.message);

        // navigate("/dashboard/fields");
      })
      .catch(function (err) {
        console.log("error", err.massage);
      });

    return editResult;
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
          <div className="container mx-auto">
            <div className=" relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover	bg-center">
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
                      userInfo?.sex == "men"
                        ? "/images/avatar/men.png"
                        : "/images/avatar/women.png"
                    }
                  />
                </div>
                <Typography variant="h4" color="white">
                  <span>{userInfo?.full_name}</span>
                </Typography>
              </CardHeader>
              <CardBody className="min-h-screen">
                <div className="i flex flex-col">
                  <Formik
                    validateOnChange={true}
                    validateOnBlur={true}
                    initialValues={initialValues}
                    // initialValues={intitialValues}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      editUserProfileInfo(id, values);
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <form
                        onSubmit={handleSubmit}
                        className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                      >
                        <div className="">
                          <label htmlFor="first_name">نام :</label>
                          <Input
                            component="input"
                            onChange={handleChange}
                            type="text"
                            className="ml-3"
                            // style={inputStyle}
                            name="first_name"
                            value={values?.first_name}
                            label="نام "
                          />
                        </div>
                        <div className="">
                          <label htmlFor="last_name">نام خانوادگی:</label>
                          <Input
                            component="input"
                            onChange={handleChange}
                            type="text"
                            className="ml-3"
                            // style={inputStyle}
                            name="last_name"
                            value={values?.last_name}
                            label="نام خانوادگی"
                          />
                        </div>

                        <div className="">
                          <label htmlFor="mobile">شماره تلفن:</label>
                          <Input
                            component="input"
                            onChange={handleChange}
                            type="text"
                            className="ml-3"
                            // style={inputStyle}
                            name="mobile"
                            id="mobile"
                            value={values?.mobile}
                            label="شماره تلفن"
                          />
                        </div>

                        <div className="">
                          <label htmlFor="sex">جنسیت</label>
                          <Select
                            id="sex"
                            className="mt-4"
                            options={[
                              {
                                value: "men",
                                label: "آقا",
                              },
                              {
                                value: "women",
                                label: "خانم",
                              },
                            ]}
                            defaultValue={{
                              value: values?.sex,
                              label: values?.sex == "men" ? "آقا" : "خانم",
                            }}
                          />
                        </div>

                        <div className="">
                          <CityDropdown
                            city_id={city_id}
                            setCity_id={setCity_id}
                          />
                        </div>
                     
                        <div className="col-span-2">
                          <Button className="mt-4" type="submit" size="md">
                            ذخیره
                          </Button>
                        </div>

                        {errors.full_name && (
                          <div style={{ color: "red" }}>{errors.full_name}</div>
                        )}
                      </form>
                    )}
                  </Formik>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default EditUser;
