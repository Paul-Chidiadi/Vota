"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";

export default function ResetPassword() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    OTP: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });
  const [userAuth, { isLoading, reset }] = useSendDataMutation();

  //CHECK IF VALUES ARE EITHER EMPTY, NULL OR UNDEFINED
  function areValuesEmpty(obj) {
    return Object.values(obj).some(
      (value) => value === "" || value === null || value === undefined
    );
  }

  //VALIDATE INPUTS
  function validateRegistration(email, OTP, newPassword, confirmPassword) {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    // Password validation
    const hasCapitalLetter = /[A-Z]/.test(newPassword);
    const hasSmallLetter = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const isPasswordValid =
      hasCapitalLetter && hasSmallLetter && hasNumber && newPassword.length > 6;

    // Confirm password validation
    const isConfirmPasswordValid = newPassword === confirmPassword;

    // OTP validation
    const isOTPValid = OTP.length === 6;

    if (isEmailValid === false) {
      setNotification({
        message: "Email is invalid",
        status: "error",
        show: true,
      });
      return;
    } else if (isOTPValid === false) {
      setNotification({
        message: "OTP must be 6 characters",
        status: "error",
        show: true,
      });
      return;
    } else if (isPasswordValid === false) {
      setNotification({
        message: "Password must have capital & small letters with numbers & at least 7 characters",
        status: "error",
        show: true,
      });
      return;
    } else if (isConfirmPasswordValid === false) {
      setNotification({
        message: "Passwords don't match",
        status: "error",
        show: true,
      });
      return;
    }

    return true;
  }

  //RESET PASSWORD FUNCTION
  async function resetPassword(e) {
    e.preventDefault();
    //HANDLE ORGANIZATION LOGIN
    const isDataEmpty = areValuesEmpty(userData);
    if (isDataEmpty) {
      setNotification({
        message: "Empty Fields",
        status: "error",
        show: true,
      });
      return;
    }
    const validationResult = validateRegistration(
      userData.email,
      userData.OTP,
      userData.newPassword,
      userData.confirmPassword
    );
    if (validationResult) {
      //PERFORM rest password handle request
      const request = await userAuth({
        url: "auth/resetPassword",
        data: {
          email: userData.email,
          OTP: userData.OTP,
          newPassword: userData.newPassword,
          confirmPassword: userData.confirmPassword,
        },
        type: "POST",
      });
      if (request?.data) {
        const { data, message, success } = request?.data;
        setNotification({
          message: message,
          status: "success",
          show: true,
        });
        router.push(`/login`);
      } else {
        setNotification({
          message: request?.error?.data?.error
            ? request?.error?.data?.error
            : "Check Internet Connection and try again",
          status: "error",
          show: true,
        });
      }
    }
  }

  return (
    <main>
      <section className="home-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
      </section>

      {/* DISPLAY NOTIFICATION TO USER IF IT EXISTS */}
      {notification.show ? (
        <Notification
          status={notification.status}
          message={notification.message}
          switchShowOff={() => {
            setNotification((prev) => {
              return { ...prev, show: false };
            });
          }}
        />
      ) : (
        ""
      )}

      <section className="signup-page-body">
        <div className="elect selected">
          <h1>Reset Password</h1>
          <form className="forms">
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="OTP"
              value={userData.OTP}
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, OTP: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={userData.newPassword}
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, newPassword: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
            />
            <button onClick={resetPassword} className="btn" disabled={isLoading ? true : false}>
              {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "Reset"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
