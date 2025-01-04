import { HiMiniUsers } from "react-icons/hi2";
import useQueryApi from "../hooks/useQueryApi";

export default function Home() {
  const { data: totalStudents } = useQueryApi("/students/total");
  return (
    <section className="min-h-[calc(100vh_-_96px)]">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm">Student Management</p>
        </div>
        {/* <Button size="rounded">
          <FaUserPlus className="mr-2" size={20} />
          New Admission
        </Button> */}
      </div>
      <div className="flex items-center justify-between p-8 bg-white w-[300px] rounded-2xl border border-input">
        <div>
          <h2 className="text-4xl font-bold mb-2 text-center">
            {totalStudents || 0}
          </h2>
          <p className="text-base font-medium">Total Students</p>
        </div>
        <div>
          <HiMiniUsers className="text-primary" size={50} />
        </div>
      </div>
    </section>
  );
}
