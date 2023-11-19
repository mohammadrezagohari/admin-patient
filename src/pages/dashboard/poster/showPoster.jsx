import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

import { getPoster,createPoster,showPoster } from "@/api/services/poster";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";

export function ShowPoster() {
  const { userToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [poster ,setPoster] = useState(null);
  const [title, setTitle] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [category_id, setCategory_id] = useState(null);

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


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("image target", event.target.files[0]);
    setPoster(event.target.files[0]);
    setImagePreview(file_url);
  };

  const showPosters = async (e) => {
    e.preventDefault();
    const createResult = await showPoster(id, userToken)
    .then(function (response) {
        setPoster(response?.data?.poster);
        setTitle(`${response?.data?.title}`);
        setCategory_id(response?.data.category_id);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };

    return createResult;
  };

  
export default ShowPoster;
