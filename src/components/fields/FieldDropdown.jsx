import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getFields } from "@/api/services/fields";
import { AuthContext } from "@/gard/context/AuthContext";

const  FieldDropdown = ({ field_id, setField_id, selected_id = null }) => {
  const [selected, setSelected] = useState(null);
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(["field_id", userToken], () =>
    getFields(userToken)
  );
  useEffect(
    function () {
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
            // value: slItem.id,
            // label: slItem.name,
          });
        }
      }
    },
    [data, isLoading, isError]
  );

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!selected) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="field_id"
        isSearchable={true}
        options={data?.data?.map((field) => ({
          value: field.id,
          label: field.name,
        }))}
        defaultValue={selected ? selected : null}
        placeholder="فصل مد نظر را انتخاب کنید"
        onChange={(e) => {
          setField_id(e.value);
        }}
      />
    </div>
  );
};

export default FieldDropdown;
