import { FaUserPlus } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { Link } from "react-router";
import RecentCreatedStudents from "../components/RecentCreatedStudents";
import useQueryApi from "../hooks/useQueryApi";

export default function Home() {
  const { data: totalStudents } = useQueryApi("/students/total");
  return (
    <section className="min-h-[calc(100vh_-_96px)]">
      <div className="flex justify-between flex-wrap mb-8 gap-y-4 gap-x-2 items-center">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm">Student Management</p>
        </div>
        <Link
          to={"/students/create"}
          className="flex items-center gap-1 px-4 sm:px-6 py-2.5 sm:py-4 rounded-full bg-primary text-white duration-300 hover:bg-primary/85 text-sm"
        >
          <FaUserPlus className="mr-2" size={20} />
          New Admission
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.totalStudents || 0}
            </h2>
            <p className="text-base font-medium">Total Students</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.computerStudentsCount || 0}
            </h2>
            <p className="text-base font-medium">Computer Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2">
              {totalStudents?.electricalStudentsCount || 0}
            </h2>
            <p className="text-base font-medium">Electrical Technology</p>
          </div>
          <div className="w-full">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.civilStudentsCount || 0}
            </h2>
            <p className="text-base font-medium">Civil Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.ElectroMedicalTechnology || 0}
            </h2>
            <p className="text-base font-medium">Electro-Medical Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.powerStudentsCount || 0}
            </h2>
            <p className="text-base font-medium">Power Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.AutomobileTechnology || 0}
            </h2>
            <p className="text-base font-medium">Automobile Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.ElectronicsTechnology || 0}
            </h2>
            <p className="text-base font-medium">Electronics Technology</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
        <div className="flex items-center justify-between p-8 bg-white  rounded-2xl border border-input">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-2 text-center">
              {totalStudents?.TourismAndHospitality || 0}
            </h2>
            <p className="text-base font-medium">Tourism and Hospitality</p>
          </div>
          <div className="w-full text-center">
            <HiMiniUsers className="text-primary mx-auto" size={50} />
          </div>
        </div>
      </div>
      <RecentCreatedStudents />
    </section>
  );
}
