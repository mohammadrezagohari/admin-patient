import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function SendOtp() {
  let navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setMobile(localStorage.getItem("mobile"));
  });
  function handleOtp(e) {
    setOtp(e.target.value);
  }
  function checkOtpCode(e) {
    e.preventDefault();
     // const {data} = await axios.post(
  //   "https://testato.ir/api/auth/login",
  //   {
  //     mobile: mobile,
  //     password: password,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //   }
  // ) .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  // console.log(data);
  navigate("/dashboard/home");

  }

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h6" color="white">
         کد تایید به {mobile} ارسال گردید
            </Typography>
          
          </CardHeader>
          <form onSubmit={checkOtpCode} dir="rtl">
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                onChange={(e) => handleOtp(e)}
                label="لطفا کد ارسالی را وارد کنید"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                ورود
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                ورود با رمز?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    ورود
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SendOtp;
