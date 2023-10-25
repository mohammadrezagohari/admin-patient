import React, { useRef, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
function UploadVideo({ filesNumber, video, setVideo }) {

  console.log("image imageNumber: ", filesNumber);


  const storeVideoQuestion = async (e) => {
    e.preventDefault();
    // console.log(id);
  };
  const inputRef = useRef();
  // const [source, setSource] = useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setVideo(url);
  }; 

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  return (
    <>
      <div className="maincontainer">
        <div className="grid min-h-[300px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {filesNumber.map((item, i) => (
            <div key={i} className="min-h-10">
              <form
                method="post"
                onSubmit={storeVideoQuestion}
                className="m-6 "
                encType="multipart/form-data"
              >
                <div className="VideoInput flex flex-col gap-2 my-2 ">
                  <input
                    ref={inputRef}
                    className="VideoInput_input hidden"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                  />
                  {!video && <button className=" bg-deep-purple-50 p-2 flex justify-center items-center " onClick={handleChoose}>
                    <img src="/images/avatar/icon-play.png" alt="" />
                    </button>}
                  {video && (
                    <video
                      className="VideoInput_video block"
                      width="100%"
                      height="500px"
                      controls
                      src={video}
                    />
                  )}
                  <div className="VideoInput_footer bg-deep-purple-200 py-1">
                    {video || "Nothing selectd"}
                  </div>
                </div>

                <Button type="submit">ذخیره</Button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
