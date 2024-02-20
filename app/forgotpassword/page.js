"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";

export default function ForgotPassword() {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "" });
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
  function validateRegistration(email) {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (isEmailValid === false) {
      setNotification({
        message: "Email is invalid",
        status: "error",
        show: true,
      });
      return;
    }
    return true;
  }

  async function sendMail(e) {
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
    const validationResult = validateRegistration(userData.email);
    if (validationResult) {
      const request = await userAuth({
        url: "auth/forgotPassword",
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
        router.push("/resetpassword");
      } else {
        setNotification({
          message: request?.error?.data?.error,
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
          <h1>Forgot Password</h1>
          <form className="forms">
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              required
              onChange={(e) => {
                setUserData(() => {
                  return { email: e.target.value };
                });
              }}
            />
            <button onClick={sendMail} className="btn" disabled={isLoading ? true : false}>
              {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "Send Mail"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
