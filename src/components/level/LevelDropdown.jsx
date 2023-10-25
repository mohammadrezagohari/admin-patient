import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getLevel, getLevelBySection } from "@/api/services/level";
import { AuthContext } from "@/gard/context/AuthContext";

const LevelDropdown = ({ level, setLevel, sectionId = null }) => {
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["levelListBySection", sectionId, userToken],
    () => getLevelBySection(sectionId, userToken)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Sorry</div>;
  }
  // const uniqueNames = [...new Set(data?.data)]
  const uniqueNames = Array.from(new Set(data?.data));
  console.log("uniqueNames : ", uniqueNames);
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="level"
        isSearchable={true}
        options={uniqueNames?.map((level) => ({
          value: level.id,
          label: level.title,
        }))}
        placeholder="سطح مد نظر را انتخاب کنید"
        onChange={(e) => setLevel(e.value)}
      />
    </div>
  );
};

export default LevelDropdown;

// import React from 'react'

// export default function LevelDropdown() {
//   return (
//     <div>LevelDropdown</div>
//   )
// }
