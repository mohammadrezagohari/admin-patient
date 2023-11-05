// import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getTutorials } from "@/api/services/tutorials";
import { AuthContext } from "@/gard/context/AuthContext";
import Header from "@/components/Header/Hedaer";
import CategotyBox from "@/components/CategoryBox/CategoryBox";
import { getCategory } from "@/api/services/category";
import { useRef } from "react";


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
import { Link } from "react-router-dom";
import './tutorials.css';
import { useRef } from "react";





const Tutorials = ()=>{

    const { userToken } = useContext(AuthContext);
    const cateBoxRef = useRef();
    const [category_id,setCategory_id] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Filter data based on the search term
        const filtered = category_id?.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      }, [searchTerm, category_id]);


      const getCategorys = async () => {
      
          const result = await getCategory(category_id)
            .then(function (response) {
              setCategory_id(response?.data);
            })
            .catch(function (err) {
              console.log("error", err);
            });
          return result;
          
        };
    
      //SORTING
    //   const sortedData = [...filteredData].sort((a, b) => {
    //     if (a[sortColumn] < b[sortColumn]) {
    //       return sortDirection === "asc" ? -1 : 1;
    //     }
    //     if (a[sortColumn] > b[sortColumn]) {
    //       return sortDirection === "asc" ? 1 : -1;
    //     }
    //     return 0;
    //   });


    const linkStyle = {
        width: "193px",
        height: "48px",
        borderRadius:" 8px",
        background:'#1E88E5',
        color:'#fff',
      };
    const category=[
        {id:1,name:'ارتوپدی',src:'../img/svgs/ارتوپدی.svg',category_id},
        {id:2,name:'اورولوژی',src:'../img/svgs/اورولوژی.svg',category_id},
        {id:3,name:'جراحی اعصاب',src:'../img/svgs/جراحی اعصاب.svg',category_id},
        {id:4,name:'جراحی زنان',src:'../img/svgs/جراحی زنان.svg',category_id},
        {id:5,name:'جراحی عمومی',src:'../img/svgs/جراحی عمومی.svg',category_id},
        {id:6,name:'جراحی قلب',src:'../img/svgs/جراحی قلب.svg',category_id},
        {id:7,name:'چشم',src:'../img/svgs/چشم.svg',category_id},
        {id:8,name:'خون و سرطان',src:'../img/svgs/خون و سرطان.svg',category_id},
        {id:9,name:'داخلی اعصاب',src:'../img/svgs/داخلی اعصاب.svg',category_id},
        {id:10,name:'داخلی تنفس',src:'../img/svgs/داخلی تنفس.svg',category_id},
        {id:11,name:'داخلی روماتولوژی',src:'../img/svgs/داخلی روماتولوژی.svg',category_id},
        {id:12,name:'داخلی غدد',src:'../img/svgs/داخلی غدد.svg',category_id},
        {id:13,name:'کلیه و مجاری ادرار',src:'../img/svgs/جراحی کلیه 2.svg',category_id},
        {id:14,name:'داخلی گوارش',src:'../img/svgs/گوارش.svg',category_id},
        {id:15,name:'دیالیز',src:'../img/svgs/دیالیز.svg',category_id},
        {id:16,name:'روانپزشکی',src:'../img/svgs/روانپزشکی.svg',category_id},
        {id:17,name:'عفونی',src:'../img/svgs/عفونی.svg',category_id},
        {id:18,name:'قلب و عروق',src:'../img/svgs/قلب و عروق.svg',category_id},
        {id:19,name:'کودکان',src:'../img/svgs/کودکان.svg',category_id},
        {id:20,name:'گوش وحلق و بینی',src:'../img/svgs/گوش و حلق و بینی.svg',category_id},
        {id:21,name:'مامایی',src:'../img/svgs/مامایی 1.svg',category_id},
        {id:22,name:'نوزادان',src:'../img/svgs/نوزادان.svg',category_id},
    ];
    const newCategory =()=>{
        category.push[category_id]
    }
    return(
        <>
            <Card style={{height:'570px'}}>
                <Header title={"دسته بندی مورد نظر را انتخاب کنید"} buttonValue={"دسته بندی"} icon="../img/svgs/add.svg"/>
                <div  className="container flex flex-col w-full mt-4 ">
                    <div ref={cateBoxRef} className="border-2 border-gray-100 grid grid-cols-5 gap-x-0 gap-y-6  pb-8 p-5 w-full h-80 overflow-y-scroll overflow-x-hidden " >
                        {category.map(
                            (el) => (
                            <CategotyBox key={el.id} name={el.name} src={el.src}/>
                            )
                        
                        )}
                    </div>
                    <div className="more w-full flex justify-end pl-12 pt-20">
                        <Link
                            to={`/dashboard/Tutorials/create`}
                            className="flex justify-center items-center text-sm"
                            style={linkStyle}
                        >
                        ادامه
                        </Link>
                    </div>

                
                </div>
            </Card>
        </>
    );
                    }


export default Tutorials