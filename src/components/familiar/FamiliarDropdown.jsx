import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";

import { AuthContext } from "@/gard/context/AuthContext";
import { getFamiliar } from "@/api/services/familiar";

const FamiliarDropdown = ({ familiar_id, setFamiliar_id }) => {
  const { userToken } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery(
    ["familiarGetData", userToken],
    () => getFamiliar(userToken)
  );
  if (isError) {
    console.log("we have error", isError);
    return;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("familiar", familiar_id);
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="familiar_id"
        isSearchable={true}
        options={data?.data?.map((familiar) => ({
          value: familiar.id,
          label: familiar.title,
        }))}
        // defaultValue={{
        //     value:familiar_id,
        //     label:data?.data.find(c=>C.id==familiar_id).title,
        // }}
        placeholder="نحوه آشنایی تان را انتخاب کنید"
        onChange={(e) => setProvince_id(e.value)}
      />
    </div>
  );
};

export default FamiliarDropdown;
