import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
// import { getProvince
import { getQuestions } from "@/api/services/question";

const QuestionDropdown = ({question_id,setQuestion_id}) => {
  // const [question_id, setQuestion_id] = useState([]);
  const { isLoading, data } = useQuery("provinces", getQuestions);
  if (isLoading) {
    return <div>Loading...</div>;
  }  
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="question_id"
        isSearchable={true}
        options={data?.data?.map((question)=>({
            value: question.id,
            label: question.title,
        }))}
        placeholder="سئوال مد نظر را انتخاب کنید"
        
        onChange={(e) => setQuestion_id(e.value)}
      />
    </div>
  );
};

export default QuestionDropdown;
