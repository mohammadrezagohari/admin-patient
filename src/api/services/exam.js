import { useQuery } from "react-query";
import apiClient from "../apiClient";

const auth_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
};

export const getExam = async () => {
  const response = await apiClient.get("/exam?count=1000", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
}; 

export const createExam = async (
  // name,
  // priority
  level_id,
  course_id,
  question_quantity,
  answer_quantity,
  time_exam,
  status,
  score
) => {
  const response = await apiClient.post(
    `/exam/store`,
    {
      //   name: name,
      //   priority: priority,
      level_id: level_id,
      course_id: course_id,
      question_quantity: question_quantity,
      answer_quantity: answer_quantity,
      time_exam: time_exam,
      status: status,
      score: score,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const showExams = async (id) => {
  const response = await apiClient.get(`/exam/show/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};
 
export const updateExam = async (id, values) => {
  const response = await apiClient.patch(
    `/exam/update/${id}`,
    {
      level_id: values.level_id,
      course_id: values.course_id,
      question_quantity: values.question_quantity,
      answer_quantity: values.answer_quantity,
      time_exam: values.time_exam,
      status: values.status,
      score: values.score,
    },
    {
      headers: auth_header,
    }
  );
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const deleteExam = async (id) => {
  const response = await apiClient.delete(`/exam/delete/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

//----------------------------------------------

export const getExamStatus = async () => {
  const response = await apiClient.get("/exam/status", {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getExamFinish_exam = async (id) => {
  const response = await apiClient.get(`/exam/finish-exam/${id}`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};

export const getExamListMe = async () => {
  const response = await apiClient.get(`/exam/list/me`, {
    headers: auth_header,
  });
  console.log("status", response);
  if (response.status !== 200) {
    return null;
  }
  return response?.data;
};


export const ExamStudent_store = async (
    level_id,
    course_id,
    question_quantity,
    silver_coin,
    gold_coin,
  ) => {
    const response = await apiClient.post(
      `/exam/student_store`,
      {
        level_id: level_id,
        course_id: course_id,
        question_quantity: question_quantity,
        silver_coin: silver_coin,
        gold_coin: gold_coin,
      },
      {
        headers: auth_header,
      }
    );
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };


  export const getExamListByCourseID = async (course_id) => {
    const response = await apiClient.get(`/exam/list/by/course/${course_id}`, {
      headers: auth_header,
    });
    console.log("status", response);
    if (response.status !== 200) {
      return null;
    }
    return response?.data;
  };
  
