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
  import { getProvince } from "../../../api/services/province";
  import CategotyBox from "@/components/CategoryBox/CategoryBox";
import { useRef } from "react";

  const DashboardBody = ()=>{
 
  
    const category=[
      {id:1,name:'ارتوپدی',src:'../img/svgs/Data Set.svg'},
      {id:2,name:'اورولوژی',src:'../img/svgs/Profile.svg'},
      {id:3,name:'جراحی اعصاب',src:'../img/svgs/Cards.svg'},
      {id:4,name:'جراحی زنان',src:'../img/svgs/icons8-news 1.svg'},
    ]
    return(
     
            <Card className="w-full rounded-4 bg-white h-full">
              <CardBody>
                    <label id='parentCkeck' className="border-2 border-gray-100 flex justify-around items-center  pb-8 p-5 w-full h-26 overflow-hidden rounded-xl " >
                        {category.map(
                            (el) => (
                            <CategotyBox key={el.id} name={el.name} src={el.src}>
                              <div>s<div className=""></div></div>
                            </CategotyBox>
                            )
                        )}
                    </label>
              </CardBody>
            </Card>

    );
    
  }


  export default DashboardBody;


