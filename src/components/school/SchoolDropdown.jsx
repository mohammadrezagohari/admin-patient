// import React from 'react'

// function SchoolDropdown() {
//   return (
//     <div>SchoolDropdown</div>
//   )
// }

// export default SchoolDropdown

import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getSchool } from "@/api/services/school";
import { AuthContext } from "@/gard/context/AuthContext";

const SchoolDropdown = ({
  onChanged = null,
  className = null,
  value = null,
  school_id,
  setSchool_id,
}) => {
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(["provinces", userToken], () =>
    getSchool(userToken)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="school_id"
        className={className}
        isSearchable={true}
        options={data?.data?.map((field) => ({
          value: field.id,
          label: field.name,
          selected: field.id === school_id,
        }))}
        placeholder="مدرسه مد نظر را انتخاب کنید"
        // onChange={setSelectedOption}

        onChange={(e) => {
          console.log(e.value);
          setSchool_id(e.value);
        }}
      />
    </div>
  );
};

export default SchoolDropdown;
