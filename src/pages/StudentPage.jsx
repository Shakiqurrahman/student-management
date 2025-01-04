import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router";
import StudentCard from "../components/StudentCard";
import useMutationApi from "../hooks/useMutationQuery";
import useQueryApi from "../hooks/useQueryApi";
import { handleApiError } from "../utils/handleApiError";

const StudentPage = () => {
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
    <section className="min-h-[calc(100vh_-_96px)]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-semibold leading-none">Students</h1>
        <Link
          to={"create"}
          className="font-medium px-4 py-2 rounded-[30px] border-primary bg-primary text-white border hover:border-primary duration-300 flex items-center gap-1 text-sm hover:bg-white hover:text-primary"
        >
          <FiPlusCircle />
          Create new
        </Link>
      </div>
      <span className="block w-full h-px bg-black/20 my-5"></span>

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {students?.length > 0 ? (
          students?.map((student, idx) => (
            <StudentCard
              key={idx}
              studentsData={student}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No students data created yet.</p>
        )}
      </div>
    </section>
  );
};

export default StudentPage;
