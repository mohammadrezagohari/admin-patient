import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getCitiesByProvince } from "../../api/services/cities";
import { AuthContext } from "@/gard/context/AuthContext";

const CityDropdown = ({ city_id, setCity_id, province_id = null }) => {
  let count = 999;
  if (province_id == null) {
    return <div>loading.</div>;
  }
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getCitiesByProvince1", province_id, userToken],
    () => getCitiesByProvince(province_id, userToken)
  );
  if (isError) {
    return <div>Loading...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        isSearchable={true}
        options={data?.data?.map((city) => ({
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
