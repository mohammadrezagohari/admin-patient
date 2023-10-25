import React, { useEffect, useState } from "react";
import Select from "react-select";

const StatusDropdown = ({ status, setStatus, statusItem }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="status"
        isSearchable={true}
        // defaultValue={status}
        onChange={(e) => {
          setStatus(e.value);
          console.log("status : " + status);
          console.log("statusItem : " + statusItem);
        }}
        options={statusItem}
      />
    </div>
  );
};

export default StatusDropdown;
