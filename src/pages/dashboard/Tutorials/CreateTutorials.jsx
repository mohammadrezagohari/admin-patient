import {  useContext,useEffect, useState } from "react";
import axios from "axios";
import { getProfileMe } from "@/api/services/auth-api";
import { getProvince } from "./../../../api/services/province";
import { AuthContext } from "@/gard/context/AuthContext";
import Header from "@/components/Header/Hedaer";
import CategotyBox from "@/components/CategoryBox/CategoryBox";
import { Formik } from "formik";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTus } from 'use-tus'
import { useCallback ,useNavigate} from "react";
import { toast } from "react-hot-toast";
import { getTutorials } from "@/api/services/Tutorials";
import { createTutorials } from "@/api/services/Tutorials";

// import { Card, CardHeader } from "@material-tailwind/react";
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




const CreateTutorials = ()=>{

    const editorRef = useRef(null);
    // const navigate = useNavigate();


    const [tutorial_id, setTutorial_id] = useState([]);
    const [context, setContext] = useState([]);
    const [category_id, setCategory_id] = useState();
    const [main_title, setMain_title] = useState();
    const [first_title, setFirst_title] = useState();
    const [first_context, setFirst_context] = useState(null);
    const [second_title, setSecond_title] = useState();
    const [second_context, setSecond_context] = useState();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);
    const { userToken } = useContext(AuthContext);
    const uploadRef=useRef();

    const createTutorials = async (e) => {
        e.preventDefault();
    
        const createResult = await createTutorials(context,category_id,main_title,first_title,first_context,second_title,second_context,image,userToken)
          .then(function (response) {
            if (response.status) {
              if (response?.success == false) {
                toast(
                //   `${
                //     response?.data?.title != undefined ? response?.data?.title : ""
                //   } \n
                        `${
                          response?.data?.category_id != undefined
                            ? response?.data?.category_id
                            : ""
                        }\n,
                  ${
                    response?.data?.main_title != undefined
                      ? response?.data?.main_title
                      : ""
                  }\n,
                  ${
                    response?.data?.second_title != undefined
                      ? response?.data?.first_title
                      : ""
                  }\n,
                  ${
                    response?.data?.first_context != undefined
                      ? response?.data?.first_context
                      : ""
                  }\n,
                  ${
                    response?.data?.second_title != undefined
                      ? response?.data?.second_title
                      : ""
                  }\n,
                  ${
                    response?.data?.second_context != undefined
                      ? response?.data?.second_context
                      : ""
                  }\n,
                  ${
                    response?.data?.image != undefined
                      ? response?.data?.image
                      : ""
                  }`,
                  {
                    duration: 2000, 
                  }
                );
              } else {
                toast.success("آموزش با موفقیت افزوده شد !");
              }
            } else {
              toast.error("خطایی رخ داده است");
            }
          })
          .catch(function (error) {
            toast.error("خطا !! مجددا تلاش نمایید");
            console.log(error.massage);
          });
        return createResult;
      };
    
      useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }, []);
    
    const label= {
        border:'2px solid #1E88E5',
        color: "#1E88E5",
        textAlign:'center',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "0.3rem",
        cursor: "pointer",
        width:'98px',
        height:'2.5rem',
        fontSize:'.8em',
        marginLeft:'8px',
      } 
      



      const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setIcon(file)
        const file_url = URL.createObjectURL(file);
        console.log("file", file);
        console.log("file_url", file_url);
        console.log("image target", event.target.files[0]);
        setImage(event.target.files[0]);
      };
    


        return(
            <>
                
            <Card style={{height:'570px'}}>
                {/* <Header title={"دسته بندی مورد نظر را انتخاب کنید"} style={{background:'red'}} buttonValue={"دسته بندی"} icon="../img/svgs/add.svg"/> */}
               <header style={{background:'#1E88E5',height:'96px'}} className="flex items-center text-white text-xl pr-10 rounded-xl">
                    <span className="flex gap-2">
                        <img src="../../img/svgs/add2.svg" alt="add" />
                        <h2>آموزش جدید</h2>
                    </span>
               </header>
               <CardBody className="w-full h-full rounded-xl overflow-y-scroll px-10 pb-10">
                    <form onSubmit={createTutorials} className="w-full h-max overflow-y-scroll flex flex-col gap-6">
                        <Input 
                        type="text"
                        className="w-full h-10  border-2 border-color20%"
                        placeholder="عنوان اصلی"
                        label="عنوان اصلی"
                        // value={(e)=> setMain_title(e.target.value)}
                         />
                        <div className="w-full h-max flex flex-col gap-4">
                            <Input 
                            type="text" 
                            className="w-full h-10   
                            border-2 border-color20%" 
                            placeholder="عنوان ثانویه(حین بستری)" 
                            label=" عنوان ثانویه" 
                            // value={(e)=> setFirst_title(e.target.value)}
                            />
                            <Editor
                                apiKey=""
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue=""
                                // value={(e)=> setFirst_context(e.target.value)}
                                init={{
                                height: 250,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                }}
                                />
                        </div>
                        <div className="w-full h-max flex flex-col gap-4">
                            <Input 
                            type="text" 
                            className="w-full h-10 border-2 border-color20%" 
                            placeholder="عنوان ثانویه(حین ترخیص)" 
                            label=" عنوان ثانویه"
                            // value={(e)=>  setSecond_title(e.target.value)}
                            />
                            <Editor
                                // apiKey="your-api-key"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue=""
                                // value={(e)=>  setSecond_context(e.target.value)}
                                init={{
                                height: 250,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                            />
                   
                        <div className="w-full flex justify-start">
                            <div  className=" items-center h-max rounded-xl flex justify-center ">
                                <input ref={uploadRef} onChange={handleFileChange} type="file" id="uploadBtn" hidden/>
                                <label htmlFor="uploadBtn" style={label}>
                                     <img src='../../img/svgs/send-square.svg' alt="upload icon"/>
                                     <span>آپلود فایل</span>
                                </label>
                                <span>
                                    فایل مورد نظر را آپلود کنید
                                </span>

                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <Button type="submit">ثبت آموزش جدید</Button>
                        </div>
                     </div>

                    </form>
                    
               </CardBody>
            </Card>
            </>
        );
}



  export default CreateTutorials;