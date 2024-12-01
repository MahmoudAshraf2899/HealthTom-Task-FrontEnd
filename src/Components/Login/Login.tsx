import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import frame from "../../Assets/Icons/Vector (Stroke).png";
import logo from "../../Assets/Icons/Daginlogo.jpg";
import eye from "../../Assets/Icons/eye.svg";
import API from "../../Api";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import "./Login.scss";
import { handleLogin, setUserType } from "../../redux/Slices/LoginSlice";
import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app-layout/auth";

export const Login = () => {
  const LoginSchema = Yup.object().shape({
    // phone: Yup.number.required("required"),
    // password: Yup.string().required("required"),
  });
  const loginObject = {
    personalKey: "",
    password: "",
  };
  const [personalKey, setPersonalKey] = useState("");
  const [loginObj, setLoginObj] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const handleChangeInput = (e: string, field: string) => {
    if (field === "personalKey") {
      let obj = {
        personalKey: e,
      };
      setPersonalKey(e);
      setLoginObj(obj);
    } else {
      let obj = {
        password: personalKey,
        personalKey: e,
      };
      setUserPassword(e);
      setLoginObj(obj);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = () => {
    setIsLoading(true);
    let obj = {
      personalKey: personalKey,
      password: userPassword,
    };
    API.post("api/Auth/Login", obj)
      .then((response) => {
        if (response) {
          setIsLoading(false);

          let userType = 1;
          dispatch(setUserType({ userType }));
          localStorage.setItem("token", response.data.data.accessToken);
          auth?.login(userType);

          navigate("/Visits");
          window.location.reload();
        } else {
          localStorage.clear();
          toast.error("Password or Username is incorrect");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.code === 1) {
          setIsLoading(false);
          toast.error("Password or Username is incorrect");
        } else {
          console.log(error);
        }
      });
  };
  return (
    <div className="Login">
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section */}

        <div className="bg-indigo-950 flex flex-col items-center justify-center h-screen gap-8">
          <img
            src="https://healthtom.com/wp-content/uploads/2024/09/HealthTOM-Logo.png"
            loading="lazy"
            alt="logo"
          />
        </div>

        {/* Right Section */}
        <div className="rounded-md mt-10 px-4 md:px-10">
          <Formik
            onSubmit={() => handleLoginSubmit()}
            initialValues={loginObj}
            validationSchema={LoginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <form
                  className="mx-auto flex w-full max-w-lg flex-col p-4 md:p-8"
                  onSubmit={handleSubmit}
                >
                  <div className="flex w-full flex-col gap-2">
                    <p className="inline-flex items-center justify-center welcome-banner text-xl md:text-2xl">
                      Welcome To
                      <p className="overflow-hidden healthtom text-lg md:text-xl">
                        HealthTom
                      </p>
                    </p>
                    <span className="inline-flex items-center justify-center log-to-acc text-sm md:text-base">
                      Sign in to your account
                    </span>
                  </div>

                  <div className="form-group mt-6">
                    <div className="form-field mb-4">
                      <input
                        type="text"
                        placeholder="Username"
                        className="login-phone bg-white p-2 border rounded w-full"
                        name="personalKey"
                        onChange={(e) =>
                          handleChangeInput(e.target.value, "personalKey")
                        }
                        id="personalKey"
                      />
                    </div>
                    <div className="form-field mb-4 relative">
                      <input
                        type={showPassword === true ? "text" : "password"}
                        className="input input-lg max-w-full login-password bg-white p-2 border rounded w-full"
                        placeholder="Password"
                        onChange={(e) =>
                          handleChangeInput(e.target.value, "password")
                        }
                        id="password"
                      />
                      <span
                        className="absolute inset-y-0 right-8 flex items-center cursor-pointer"
                        onClick={() => togglePasswordVisibility()}
                      >
                        <img src={eye} alt="eye-pw" />
                      </span>
                    </div>
                    <div className="form-field mt-4">
                      <div className="form-control flex justify-between">
                        <label className="form-label text-sm">
                          <a className="link link-underline-hover link-primary forget-pw">
                            Forget Password
                          </a>
                        </label>
                        <div className="flex gap-2 items-center">
                          <a href="#" className="text-sm">
                            Remember Me
                          </a>
                          <input
                            type="checkbox"
                            className="checkbox-success checkbox rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-field pt-5">
                      <div className="form-control justify-between">
                        <button className="btn bg-indigo-800 text-white w-full">
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
