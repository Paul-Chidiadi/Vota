"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";

export default function Activate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [userData, setUserData] = useState({ email: email, OTP: "" });
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
  function validateRegistration(email, OTP) {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

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
    }
    return true;
  }

  async function activateUser(e) {
    e.preventDefault();
    const isDataEmpty = areValuesEmpty(userData);
    if (isDataEmpty) {
      setNotification({
        message: "Empty Fields",
        status: "error",
        show: true,
      });
      return;
    }
    const validationResult = validateRegistration(userData.email, userData.OTP);
    if (validationResult) {
      const request = await userAuth({
        url: "auth/activateAccount",
        data: {
          email: userData.email,
          OTP: userData.OTP,
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
          message: request?.error?.data?.error,
          status: "error",
          show: true,
        });
      }
    }
  }

  async function resendOTP(e) {
    e.preventDefault();
    const request = await userAuth({
      url: "auth/resendOTP",
      data: {
        email: userData.email,
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
    } else {
      setNotification({
        message: request?.error?.data?.error,
        status: "error",
        show: true,
      });
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
          <h1>Activate Account</h1>
          <form className="forms">
            <input type="email" placeholder="Email" value={email} readOnly />
            <input
              type="text"
              placeholder="OTP"
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, OTP: e.target.value };
                });
              }}
            />
            <button
              onClick={resendOTP}
              className="btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                "Resend OTP "
              )}
            </button>
            <button
              onClick={activateUser}
              className="btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                "Activate"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
