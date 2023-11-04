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

  const DashboardBody = ()=>{

    return(
      
            <Card className="w-full rounded-4 bg-white h-full">
            </Card>

    );
    
  }


  export default DashboardBody;


