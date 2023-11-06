import React, { useContext } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { AuthContext } from "@/gard/context/AuthContext";

export function Home() {
  const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
    useContext(AuthContext);

  return (
    <>
    
    </>
    // <div className="mt-12 ">
    //   <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
    //     <Card className="overflow-hidden xl:col-span-2">
    //       <CardHeader
    //         floated={false}
    //         shadow={false}
    //         color="transparent"
    //         className="m-0 flex items-center justify-between p-6"
    //       >
    //         <div>
    //           <Typography variant="h6" color="blue-gray" className="mb-1">
    //             Projects
    //           </Typography>
    //           <Typography
    //             variant="small"
    //             className="flex items-center gap-1 font-normal text-blue-gray-600"
    //           >
    //             <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
    //             <strong>30 done</strong> this month
    //           </Typography>
    //         </div>
    //       </CardHeader>
    //       <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
    //         <table className="w-full min-w-[640px] table-auto">
    //           <thead>
    //             {/* <tr>
    //               {["companies", "members", "budget", "completion"].map(
    //                 (el) => (
    //                   <th
    //                     key={el}
    //                     className="border-b border-blue-gray-50 py-3 px-6 text-left"
    //                   >
    //                     <Typography
    //                       variant="small"
    //                       className="text-[11px] font-medium uppercase text-blue-gray-400"
    //                     >
    //                       {el}
    //                     </Typography>
    //                   </th>
    //                 )
    //               )}
    //             </tr> */}
    //           </thead>
    //           <tbody>
        
    //           </tbody>
    //         </table>
    //       </CardBody>
    //     </Card>
    //     <Card>
    //       <CardHeader
    //         floated={false}
    //         shadow={false}
    //         color="transparent"
    //         className="m-0 p-6"
    //       >
    //         <Typography variant="h6" color="blue-gray" className="mb-2">
    //           Orders Overview
    //         </Typography>
    //         <Typography
    //           variant="small"
    //           className="flex items-center gap-1 font-normal text-blue-gray-600"
    //         >
    //           <ArrowUpIcon
    //             strokeWidth={3}
    //             className="h-3.5 w-3.5 text-green-500"
    //           />
    //           <strong>24%</strong> this month
    //         </Typography>
    //       </CardHeader>
    //       <CardBody className="pt-0">
    //       </CardBody>
    //     </Card>
    //   </div>
    // </div>
  );
}

export default Home;
