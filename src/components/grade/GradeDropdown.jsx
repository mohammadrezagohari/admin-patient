import React, { useEffect, useState, useRef, useContext } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
// import { getProvince

import { getGrade, getGradeByField } from "@/api/services/grade";
import { json } from "react-router-dom";
import { AuthContext } from "@/gard/context/AuthContext";

const GradeDropdown = ({
  grade,
  setGrade,
  fieldId = null,
  selected_id = null,
}) => {
  const { userToken } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  if (!fieldId) {
    return <div>Loading....</div>;
  } 
//   if (fieldId == []) {
//     return <div>Loading..</div>;
//   }
  if (fieldId === null) {
    return <div>Loading...</div>;
  }
  const { data, isLoading, isError } = useQuery(
    ["gradeByField", fieldId, userToken],
    () => getGradeByField(fieldId, userToken)
  );

  if (isError) {
    return <div>{isError}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (selected_id && isSelected == false) {
    if (!isLoading && !isError) {
      const slItem = data?.data.find((c) => c.id == selected_id);
      if (slItem) {
        setSelected({
          value: slItem.id,
          label: slItem.name,
        });
      } else {
        const slItem = data?.data[0];
        setSelected({
          value: slItem.id,
          label: slItem.name,
        });
      }
      setIsSelected(true);
    }
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="grade"
        isSearchable={true}
        options={
          data
            ? data?.data?.map((grade) => ({
                value: grade.id,
                label: grade.name,
              }))
            : {
                value: 0,
                label: "-انتخاب کنید-",
              }
        }
        defaultValue={selected}
        placeholder="مقطع مد نظر را انتخاب کنید"
        onChange={(e) => setGrade(e.value)}
      />
    </div>
  );
};

export default GradeDropdown;
