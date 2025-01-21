import React, { useEffect, useState, useRef } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../LoadingPage";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { apiContext } from "../CompanyDashboard";
import { useContext } from "react";
import { getCompanyData } from "../../../../redux/features/company/utilService/companyUtilSlice";
import { toast } from "react-toastify";
import InputField from "../../../../components/inputField/InputField";

const StudentsToCompany = () => {
  const globalAuth = useSelector((state) => state.globalAuth);
  const {
    isLoggedIn,
    isLoading,
    isSuccess,
    company,
    message,
    isProfilePhotoUploaded,
  } = useSelector((state) => state.companyUtil);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (globalAuth.isLoggedin) {
      dispatch(getCompanyData());
      // console.log("data fetched");
      toast.success("Data Fetched Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // dispatch(RESET())
  }, [message]);

  // console.log(company);
  const { apiURL, setAPIURL } = useContext(apiContext);

  function handleApplicationStatusChange(e) {
    // console.log(e.target.value);
  }
  return (
    <div
      className={` bg-purple-100  flex  flex-col justify-center pb-20  items-center gap-10
  // ${(isLoading || globalAuth.isLoading) && " blur-sm"}`}
    >
      {/* search */}
      <div className=" flex justify-center bg-slate-100 w-[90%] py-2 mt-10 rounded-lg  shadow-slate-300 shadow-md ">
        <div className="bg-white flex justify-center items-center w-1/2 rounded-xl ">
          <h1 className="text-2xl">Enter Student's Name : </h1>
          <div className=" flex pt-6 gap-4 px-10 items-center h-full">
            <InputField placeholder="Enter the student's name" labelName="" />

            <div className="bg-blue-200 rounded-full justify-center items-center mb-5 p-3">
              <FiSearch size={25} />
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col  bg-slate-100 w-[90%] rounded-lg px-20 py-16 shadow-slate-300 shadow-md  items-center justify-evenly gap-16">
        {company?.studentDetails.map((eachStudent) => (
          <div
            key={eachStudent._id}
            className="flex  items-center p-10 gap-12  bg-slate-300 rounded-md w-full h-96 shadow-grey-700 shadow-md"
          >
            <div className="bg-white flex flex-col  items-center gap-4 px-8 pt-7 pb-2 w-72 rounded-md ">
              <img
                src={eachStudent.personalDetail.profilePicture}
                alt=""
                className="border-4 rounded-md  h-56"
              />
              <div className="flex justify-between w-full px-2">
                <NavLink
                  to={eachStudent.resume}
                  target="_blank"
                  className="text-xl underline cursor:pointer text-blue-600"
                >
                  Resume
                </NavLink>
                <NavLink
                  to={`/company/studentDetails/${eachStudent._id}`}
                  onClick={() => setAPIURL(eachStudent._id)}
                  className="text-xl underline cursor:pointer text-blue-600"
                >
                  Details
                </NavLink>
              </div>
            </div>

            <div className="flex justify-between w-4/5 gap-8">
              <div className="flex flex-col text-xl gap-5 w-1/3">
                <div className="bg-white p-3 flex flex-col gap-2 rounded-md ">
                  <div className="flex gap-6 justify-between">
                    <h1>Name:</h1>{" "}
                    <span className="font-medium">
                      {eachStudent.personalDetail.firstName +
                        " " +
                        eachStudent.personalDetail.lastName}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <h1>Email: </h1>
                    <span className="font-medium">
                      {eachStudent.personalDetail.emailID}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <h1>Phone: </h1>
                    <span className="font-medium">
                      {eachStudent.personalDetail.phone}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 flex flex-col gap-2 rounded-md ">
                  <div className="flex gap-6 justify-between">
                    <h1>Roll Number: </h1>
                    <span className="font-medium">
                      {eachStudent.educationalDetails.rollNumber}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <h1>College Name: </h1>
                    <span className="font-medium">
                      {eachStudent.educationalDetails.collegeName}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <h1>CGPA: </h1>
                    <span className="font-medium">
                      {eachStudent.educationalDetails.cgpa}
                    </span>
                  </div>
                  <div className="flex gap-6 justify-between">
                    <h1>Year Of Passing: </h1>
                    <span className="font-medium">
                      {eachStudent.educationalDetails.yearOfPassing}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-xl gap-5 w-1/3 ">
                <div className="bg-white p-3 flex flex-col gap-2 h-1/2 rounded-md">
                  <label htmlFor="applicationStatus">
                    Application Status :{" "}
                  </label>
                  <select
                    onChange={handleApplicationStatusChange}
                    id="applicationStatus"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md  w-56 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Allowed" defaultValue={"Allowed"}>
                      {" "}
                      Allowed{" "}
                    </option>
                    {[
                      "Debarred",
                      "Form Submitted",
                      "Shortlisted",
                      "Online Assessment",
                      "Technical Interview",
                      "HR Interview",
                      "Offer Letter",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {" "}
                        {option}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white  flex  flex-col px-4 py-4 text-xl gap-2 h-1/2 rounded-md">
                  <h1>Degrees:</h1>
                  <ul className="mx-6   list-disc">
                    {eachStudent?.educationalDetails.degrees.map((degree) => (
                      <li className="p-2">degree</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-1/3 flex flex-col gap-5 ">
                <div className="bg-white flex flex-col gap-5 text-xl full h-1/2 rounded-md">
                  <div className="flex flex-col gap-1 p-3">
                    <h1>Internships: </h1>
                    <ul className="font-medium ml-7 list-disc flex-col flex-wrap">
                      {eachStudent.pastInternshipsProjects.internships.map(
                        (intenship) => (
                          <li key={intenship.company}>{intenship.company}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className=" justify-between bg-white  flex flex-col gap-5 text-xl full h-1/2 rounded-md">
                  <div className="flex flex-col gap-1 p-3">
                    <h1>Projects: </h1>
                    <ul className="font-medium ml-7 list-disc">
                      {eachStudent.pastInternshipsProjects.projects.map(
                        (project) => (
                          <li key={project.title}>{project.title}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsToCompany;
