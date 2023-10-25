import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getCourseByGrade } from "@/api/services/course";
import { AuthContext } from "@/gard/context/AuthContext";

const CourseDropdown = ({
  course,
  setCourse,
  gradeId = null,
  fieldId = null,
  selected_id = null,
}) => {
  const { userToken } = useContext(AuthContext);
  let [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  if (!gradeId) return <div>Loading...</div>;
  if (gradeId == []) return <div>Loading...</div>;

  const { isLoading, data, isError } = useQuery(
    ["course_by_grad", gradeId, userToken],
    () => getCourseByGrade(gradeId, userToken)
  );

  if (isError) {
    console.log("error:", isError);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (selected_id && isSelected==false) {
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
        name="course"
        isSearchable={true}
        options={data?.data?.map((course) => ({
          value: course.id,
          label: course.title,
        }))}
        defaultValue={selected}
        placeholder="درس مد نظر را انتخاب کنید"
        // value={course}
        onChange={(e) => setCourse(e.value)}
      />
    </div>
  );
};

export default CourseDropdown;
