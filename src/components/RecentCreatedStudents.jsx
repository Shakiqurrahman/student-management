import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useMutationApi from "../hooks/useMutationQuery";
import useQueryApi from "../hooks/useQueryApi";
import { handleApiError } from "../utils/handleApiError";
import StudentCard from "./StudentCard";

const RecentCreatedStudents = () => {
  const { data: studentsData } = useQueryApi("/students");
  const { callMutation } = useMutationApi();

  const [students, setStudents] = useState(studentsData || []);

  useEffect(() => {
    if (studentsData) {
      setStudents(studentsData);
    }
  }, [studentsData]);

  const handleDelete = async (id) => {
    const deleteStudent = async () => {
      await callMutation(`/students/${id}`, null, {
        method: "DELETE",
      });

      // Update state after successful deletion
      setStudents((prev) => prev.filter((student) => student._id !== id));
    };

    toast.promise(deleteStudent(), {
      loading: "Deleting...",
      success: "Student deleted successfully!",
      error: (err) => handleApiError(err),
    });
  };
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-semibold leading-none">
          Recently Admitted Students
        </h1>
        <Link
          to={"/students"}
          className="font-medium px-6 py-2 rounded-[30px] border-primary bg-primary text-white border hover:border-primary duration-300 flex items-center gap-1 text-sm hover:bg-white hover:text-primary"
        >
          See All
        </Link>
      </div>

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {students
          ?.slice(-6)
          .reverse()
          .map((student, idx) => (
            <StudentCard
              key={idx}
              studentsData={student}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </section>
  );
};

export default RecentCreatedStudents;
