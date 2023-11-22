import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getCities, getCitiesByProvince } from "../../api/services/cities";
import { AuthContext } from "@/gard/context/AuthContext";

const CityDropdown = ({ city_id, setCity_id}) => {
  let count = 999;
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getCitiesByProvince1", userToken],
    () => getCities(userToken)
  );
  if (isError) {
    return <div>error...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        isSearchable={true}
        options={data?.map((city) => ({
          value: city?.id,
          label: city?.name,
        }))}
        placeholder="شهر مد نظر را انتخاب کنید"
        onChange={(e) => setCity_id(e.value)}
      />
    </div>
  );
};

export default CityDropdown;
