import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router";
import { config } from "../config/config";
import { useAuth } from "../context/ContextHooks";
import useMutationApi from "../hooks/useMutationQuery";

const CreateStudent = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { isLoading, callMutation } = useMutationApi();

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    profile: "",
    gender: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    gurdian: {
      gurdianName: "",
      gurdianRelation: "",
      gurdianNumber: "",
    },
    department: "",
  };

  const [form, setForm] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setSelectedAvatar(file);
      e.target.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    setSelectedAvatar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is inside the gurdian object
    if (name.includes("gurdian")) {
      const field = name.split(".")[1];
      setForm((prevForm) => ({
        ...prevForm,
        gurdian: {
          ...prevForm.gurdian,
          [field]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    // Validate required fields
    const { fullName, email, department, gender, dateOfBirth, phone, gurdian } =
      form;

    // Basic Validation for Required Fields
    if (
      !fullName ||
      !department ||
      !gender ||
      !dateOfBirth ||
      !phone ||
      !gurdian
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    // Check for valid email format
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    // Check Guardian Fields
    if (
      !gurdian.gurdianName ||
      !gurdian.gurdianRelation ||
      !gurdian.gurdianNumber
    ) {
      toast.error("Please fill all the guardian fields.");
      return;
    }

    try {
      if (selectedAvatar) {
        const data = new FormData();
        data.append("file", selectedAvatar);

        const uploadResponse = await axios.post(
          `${config.API}/students/upload`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (uploadResponse?.data?.imageUrl) {
          form.profile = uploadResponse.data.imageUrl;
        } else {
          throw new Error("Image upload failed");
        }
      }
      await callMutation("/students/create-student", form, {
        token,
      });
    } catch (error) {
      toast.error("Failed to create Admission");
    } finally {
      navigate("/students");
      setForm(initialState);
      setSelectedAvatar(null);
      setImageLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh_-_96px)]">
      <form
        className="max-w-[600px] mx-auto bg-white rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center font-medium mb-10">
          Student Admission
        </h1>
        <div className="relative mt-5">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.fullName
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Full Name
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.email
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Email
          </label>
        </div>
        <div className="relative mt-5">
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] text-sm"
          >
            <option value="">Select Department</option>
            <option value="Computer Technology">Computer Technology</option>
            <option value="Electrical Technology">Electrical Technology</option>
            <option value="Electrical Technology">Civil Technology</option>
            <option value="Electro-Medical Technology">
              Electro-Medical Technology
            </option>
            <option value="Power Technology">Power Technology</option>
            <option value="Electronics Technology">
              Electronics Technology
            </option>
            <option value="Automobile Technology">Automobile Technology</option>
            <option value="Tourism and Hospitality">
              Tourism and Hospitality
            </option>
          </select>
          <label
            className={`select-none duration-300 text-xs absolute bg-white -translate-y-1/2 mx-4 left-0 top-0 leading-none z-[2] text-gray-500 mt-[2px] inline-block ${
              form.department ? "text-xs top-0 z-[2] text-primary mt-[2px]" : ""
            }`}
          >
            Department
          </label>
        </div>
        <div className="relative mt-5">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] text-sm"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label
            className={`select-none duration-300 text-xs absolute bg-white -translate-y-1/2 mx-4 left-0 top-0 leading-none z-[2] text-gray-500 mt-[2px] inline-block ${
              form.gender ? "text-xs top-0 z-[2] text-primary mt-[2px]" : ""
            }`}
          >
            Gender
          </label>
        </div>

        <div className="relative mt-5">
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] text-sm"
          />
          <label
            className={`select-none duration-300 text-xs absolute bg-white -translate-y-1/2 mx-4 left-0 top-0 leading-none z-[2] mt-[2px] inline-block text-gray-500 ${
              form.dateOfBirth
                ? "text-xs top-0 z-[2] mt-[2px] text-primary"
                : ""
            }`}
          >
            Date Of Birth
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="file"
            name="avatar"
            id="avatar"
            hidden
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatar"
            className="flex w-full items-center gap-2 bg-gray-200 cursor-pointer rounded overflow-hidden"
          >
            <div className="py-1.5 px-3 bg-primary text-white shrink-0">
              Choose Profile
            </div>
            <p className="line-clamp-1 font-ador">{selectedAvatar?.name}</p>
          </label>
        </div>
        {selectedAvatar && (
          <div className="relative mt-5 text-center">
            <img
              src={URL.createObjectURL(selectedAvatar)}
              alt={selectedAvatar?.name}
              className="mx-auto block size-[200px] rounded-full shadow-box object-cover mb-5"
            />
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium"
              onClick={handleRemoveAvatar}
            >
              Remove
            </button>
          </div>
        )}

        <div className="relative mt-5">
          <input
            type="text"
            name="presentAddress"
            value={form.presentAddress}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.presentAddress
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Present Address
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="text"
            name="permanentAddress"
            value={form.permanentAddress}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.permanentAddress
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Permanent Address
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.phone
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Phone Number
          </label>
        </div>

        {/* Gurdians details  */}
        <p className="text-center mt-5 font-semibold">Gurdian Details</p>
        <div className="relative mt-5">
          <input
            type="text"
            name="gurdian.gurdianName"
            value={form.gurdian.gurdianName}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.gurdian.gurdianName
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Gurdian Name
          </label>
        </div>
        <div className="relative mt-5">
          <select
            name="gurdian.gurdianRelation"
            value={form.gurdian.gurdianRelation}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] text-sm"
          >
            <option value="">Select Guardian Relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Other">Other</option>
          </select>
          <label
            className={`select-none duration-300 text-xs absolute bg-white -translate-y-1/2 mx-4 left-0 top-0 leading-none z-[2] text-gray-500 mt-[2px] inline-block ${
              form.gurdian.gurdianRelation
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : ""
            }`}
          >
            Guardian Relation
          </label>
        </div>

        <div className="relative mt-5">
          <input
            type="text"
            name="gurdian.gurdianNumber"
            value={form.gurdian.gurdianNumber}
            onChange={handleChange}
            className="block relative w-full py-2.5 px-4 border-gray-300 border rounded bg-transparent outline-none z-[1] peer"
          />
          <label
            className={`select-none duration-300 peer-focus-visible:text-xs absolute bg-white -translate-y-1/2 text-sm mx-4 left-0 peer-focus-visible:top-0 leading-none peer-focus-visible:z-[2] peer-focus-visible:text-primary peer-focus-visible:mt-[2px] inline-block ${
              form.gurdian.gurdianNumber
                ? "text-xs top-0 z-[2] text-primary mt-[2px]"
                : "top-1/2 text-gray-500 z-0 mt-0"
            }`}
          >
            Gurdian Number
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || imageLoading}
          className="disabled:bg-primary/80 flex items-center justify-center w-full text-center h-11 bg-primary hover:bg-primary/80 text-white font-medium mt-5 duration-300 rounded select-none"
        >
          {isLoading || imageLoading ? (
            <CgSpinner className="animate-spin text-xl" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateStudent;
