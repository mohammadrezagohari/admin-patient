import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getUnitsByCourse } from "@/api/services/units";
import { AuthContext } from "@/gard/context/AuthContext";

const UnitDropdown = ({
  units,
  setUnits,
  courseId = null,
  selected_id = null,
}) => {
  const { userToken } = useContext(AuthContext);

  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  if (!courseId) return [];
  const { isLoading, data, isError } = useQuery(
    ["unitsByCourse", courseId, userToken],
    () => getUnitsByCourse(courseId, userToken)
  );

  if (isError) {
    console.log("error:", isError);
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
          label: slItem.title,
        });
      } else {
        const slItem = data?.data[0];
        setSelected({
          value: slItem.id,
          label: slItem.title,
        });
      }
      setIsSelected(true);
    }
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="unit"
        isSearchable={true}
        options={data?.data?.map((unit) => ({
          value: unit.id,
          label: unit.title,
        }))}
        defaultValue={selected}
        placeholder="فصل مد نظر را انتخاب کنید"
        onChange={(e) => setUnits(e.value)}
      />
    </div>
  );
};

export default UnitDropdown;
