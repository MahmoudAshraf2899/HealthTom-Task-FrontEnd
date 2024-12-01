import React, { useState, useEffect } from "react";
import moment from "moment";
import API from "../../../Api";
import "./Add.scss";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Loading/Loading";

// Define the validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please add patinet name"),
  gender: Yup.string().required("Please add patinet gender"),
  birthDate: Yup.string().required("Please add patient birthdate"),
  email: Yup.string().required("Please add patient email"),
  examType: Yup.string().required("Please add exam type"),
  examStatus: Yup.string().required("Please add exam status"),
});

export const AddVisit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {}, []);

  const [addObject, setAddObject] = useState({
    name: "",
    gender: "",
    email: "",
    birthDate: "",
    examType: "",
    examStatus: "",
    comment: "",
  });

  const handleChangeValues = (value: any, fieldName: string) => {
    // Update addObject with the new value
    setAddObject((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleAddVisit = (values: any) => {
    setIsLoading(true);

    let requestObject: {
      name: string;
      gender: string;
      email: string;
      birthDate: string;
      examType: string;
      examStatus: string;
      comment: string;
    } = {
      name: values.name,
      email: values.email,
      birthDate: moment(values.birthDate).format("YYYY-MM-DD"),
      comment: values.comment,
      examStatus: values.examStatus,
      examType: values.examType,
      gender: values.gender,
    };

    API.post(`api/admin/Visit`, requestObject)
      .then((res: any) => {
        if (res.status === 200) {
          toast.success("Operation completed successfully");
          navigate(-1);
          setIsLoading(false);
        } else {
          toast.error("Something went wrong ..!");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong ..!");
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="AddVisit">
      {isLoading === true ? <Loading /> : null}
      <Formik
        onSubmit={(values) => handleAddVisit(values)}
        initialValues={addObject}
        validationSchema={validationSchema}
        key={`AddVisit`}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="main-info-section mt-4">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 gap-4 px-4">
                  {/* Header */}
                  <div className="col-span-full pr-4 pt-4 flex items-center">
                    <div className="text-2xl text-indigo-900">
                      Add New Visit
                    </div>
                  </div>
                  <div className="col-span-full">
                    <div className="divider"></div>
                  </div>
                  <>{console.log("Add Object :", addObject)}</>
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Patient Name</p>
                    <div className="form-control relative">
                      <input
                        id="name"
                        name="name"
                        className={
                          errors.name && touched.name
                            ? "input input-error"
                            : "input"
                        }
                        placeholder="Patient Name"
                        type="text"
                        onChange={(e) => {
                          handleChange(e);
                          handleChangeValues(e.target.value, "name");
                        }}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Patient Email</p>
                    <div className="form-control relative">
                      <input
                        id="email"
                        name="email"
                        className={
                          errors.email && touched.email
                            ? "input input-error"
                            : "input"
                        }
                        type="email"
                        placeholder="Patient Email"
                        onChange={(e) => {
                          handleChange(e);
                          handleChangeValues(e.target.value, "email");
                        }}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Birthdate */}
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Patient Birthdate</p>
                    <div className="form-control relative">
                      <Field
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        className="input"
                      ></Field>

                      {errors.birthDate && touched.birthDate && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.birthDate}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Patient Gender</p>
                    <div className="form-control relative">
                      <Field
                        as="select"
                        id="gender"
                        name="gender"
                        className="select"
                      >
                        <option value="">Select an option</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </Field>

                      {errors.gender && touched.gender && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Exam Status */}
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Exam Status</p>
                    <div className="form-control relative">
                      <Field
                        as="select"
                        id="examStatus"
                        name="examStatus"
                        className="select"
                      >
                        <option value="">Select an Exam Status</option>
                        <option value="1">Scheduled</option>
                        <option value="2">Arrived</option>
                        <option value="3">Canceled</option>
                        <option value="4">Completed</option>
                      </Field>

                      {errors.examStatus && touched.examStatus && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.examStatus}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Exam Type */}
                  <div className="flex flex-col lg:col-span-1 md:col-span-full sm:col-span-full xs:col-span-full pr-4">
                    <p className="title">Exam Type</p>
                    <div className="form-control relative">
                      <Field
                        as="select"
                        id="examType"
                        name="examType"
                        className="select"
                      >
                        <option value="">Select an Exam Type</option>
                        <option value="1">CTBrain</option>
                        <option value="2">ChestXRay</option>
                      </Field>

                      {errors.examType && touched.examType && (
                        <div className="error err-msg absolute wrap  bottom-[-20px]   left-0 w-full xs:mt-2">
                          {errors.examType}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full w-full pr-4">
                    <p className="title">Comment</p>

                    <textarea
                      id="comment"
                      name="comment"
                      className="textarea w-full"
                      onChange={(e) => {
                        handleChange(e);
                        handleChangeValues(e.target.value, "comment");
                      }}
                      onBlur={handleBlur}
                      value={values.comment}
                    />
                  </div>
                </div>
              </div>

              <div className="add-actions p-5 ">
                <div className="grid grid-cols-2">
                  <div className="col-start-1">
                    <div className="flex gap-4">
                      <button
                        className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-2 focus:ring-gray-300 px-4 py-2 rounded transition"
                        type="submit"
                      >
                        Search
                      </button>
                      <button
                        className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-2 focus:ring-gray-300 px-4 py-2 rounded transition"
                        type="button"
                        onClick={() => navigate("/Visits")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};
