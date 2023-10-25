import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { getWallet } from "@/api/services/wallet";
import { deleteWallet } from "./../../../api/services/wallet";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";


export function Wallet() {


  const [wallets, setWallets] = useState([]);
  const listRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getWallet()
      .then(function (response) {
        console.log("response", response);
        setWallets(response?.data);
      })
      .catch(function (err) {
        console.log("error", err.message);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150, // Animation speed
        onSort: (event) => {
          // Handle sorting logic here
          console.log("New order:", event.newIndex);
        },
        ghostClass: "bg-blue-100",
        // handle: '.handle',
      });
    }
  }, [wallets]);

  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/wallet?count=100", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setWallets(response?.data?.data);
  //       console.log(wallets);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
 
  const deleteWallets = async (id) => {
    const deleteResult = await deleteWallet(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setWallets(wallets.filter((wallet) => wallet.id !== id));
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return deleteResult;
    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .delete(`https://testato.ir/api/wallet/delete/${walletId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data.data);
    //     setWallets(wallets.filter((wallet) => wallet.id != walletId));
    //     // return (
    //     //   <div className="flex w-full flex-col gap-2">
    //     //     <Alert color="green">A success alert for showing message.</Alert>
    //     //   </div>
    //     // );
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };

  //----------------------------------------------------------------

  return (
    <>
      <Card className="min-h-screen">
        <div className="py-5">
          {/* <Link
            to={`/dashboard/wallet/create`}
            className="mr-3"
            style={linkStyle}
          >
            ساخت کیف پول جدید
          </Link> */}
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست کیف پول
          </Typography>
          {/* <div className="mt-2 flex gap-6">
            <input
            className="text-gray-900 p-1 rounded-md pr-2 focus:outline-none"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="hover:cursor-pointer" onClick={() => handleSort("user?.name")}>
                 نام
                  {sortColumn === "user?.name" &&
                    (sortDirection === "asc" ? " ▲" : " ▼")}
            </div>
          </div> */}
        </CardHeader>
        {loading ? (
          <div className="flex w-full  items-center justify-center py-60">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <>
            <CardBody className="px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {[
                      "#",
                      "نام کاربر",
                      "موبایل",
                      "جنسیت",
                      "مقدار کیف پول",
                      "جایزه",
                      "دارای اعتبار",
                      "تنظیمات",
                    ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody ref={listRef}>
                  {wallets?.map((wallet, key) => {
                    const className = `py-3 px-5 ${
                      key === wallets.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* {key + 1} */}
                            {wallet?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.user?.name}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.user?.mobile}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.user?.sex}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.amount}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.bonus}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {wallet?.has_credit}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Link
                            to={`/dashboard/wallet/show/${wallet.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteWallets(wallet.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <div className="flex justify-center my-6 mt-10 w-full mx-auto  items-center gap-3">
            <button
              className={`bg-purple p-1 px-2 text-sm text-white rounded-md ${currentPage === 1?'opacity-50':''}`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              قبلی
            </button>
            <span className="p-1">{currentPage}</span>
            <button
              className={`bg-purple p-1 px-2 text-sm text-white rounded-md ${currentPage === totalPages?'opacity-50':''}`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              بعدی
            </button>
          </div> */}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Wallet;
