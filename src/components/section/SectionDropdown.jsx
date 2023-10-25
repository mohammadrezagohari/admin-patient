import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { listSectionByUnit } from "@/api/services/section";
import { AuthContext } from "@/gard/context/AuthContext";

const SectionDropdown = ({
  section,
  setSection,
  UnitId = null,
  selected_id = null,
}) => {
  const { userToken } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  if (!UnitId) return <div>Loading...</div>;
  if (UnitId == []) return <div>Loading...</div>;
  const { isLoading, data, isError } = useQuery(
    ["listSectionByUnit", UnitId, userToken],
    () => listSectionByUnit(UnitId, userToken)
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
        name="section"
        isSearchable={true}
        options={
          data
            ? data?.data?.map((section) => ({
                value: section.id,
                label: section.title,
              }))
            : {
                value: 0,
                label: "-انتخاب کنید-",
              }
        }
        placeholder="بخش مد نظر را انتخاب کنید"
        onChange={(e) => setSection(e.value)}
      />
    </div>
  );
};

export default SectionDropdown;
