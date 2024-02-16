"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuth } from "../../store/slices/isAuthSlice";
import { getDataFromLocalStorage } from "../../utils/localStorage";
import { useEffect } from "react";

export default function Login() {
  const [electClassName, setElectClassName] = useState("elect selected");
  const router = useRouter();
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [userAuth, { isLoading, reset }] = useSendDataMutation();
  const dispatch = useDispatch();

  //CHECK IF VALUES ARE EITHER EMPTY, NULL OR UNDEFINED
  function areValuesEmpty(obj) {
    return Object.values(obj).some(
      (value) => value === "" || value === null || value === undefined
    );
  }
  //VALIDATE INPUTS
  function validateRegistration(email, password) {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    // Password validation
    const isPasswordValid = password.length >= 6;

    if (isEmailValid === false) {
      setNotification({
        message: "Email is invalid",
        status: "error",
        show: true,
      });
      return;
    } else if (isPasswordValid === false) {
      setNotification({
        message: "Password must have at least 7 characters",
        status: "error",
        show: true,
      });
      return;
    }
    return true;
  }

  //LOGIN FUNCTION
  async function login(e) {
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
    const validationResult = validateRegistration(
      userData.email,
      userData.password
    );
    if (validationResult) {
      const request = await userAuth({
        url: "auth/login",
        data: {
          email: userData.email,
          password: userData.password,
        },
        type: "POST",
      });
      if (request?.data) {
        const { data, message, success, accessToken, refreshToken, user } =
          request?.data;
        setNotification({
          message: message,
          status: "success",
          show: true,
        });
        dispatch(
          setIsAuth({
            isAuth: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
          })
        );
        user.role === "Elector"
          ? router.push(`/dashboard/elector`)
          : router.push(`/dashboard/organization`);
      } else {
        setNotification({
          message: request?.error?.data?.error,
          status: "error",
          show: true,
        });
      }
    }
  }

  //CHECK IF USER IS AUTHENTICATED BASED ON WHAT IS STORED ON LOCAL STORAGE
  const isAuthenticated = getDataFromLocalStorage("isAuth") === true;

  useEffect(() => {
    if (isAuthenticated) {
      const role = getDataFromLocalStorage("role");
      role === "Elector"
        ? router.push(`/dashboard/elector`)
        : router.push(`/dashboard/organization`);
    }
  }, [isAuthenticated]);

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
        <div className={electClassName}>
          <h1>Login to Vota</h1>
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
              type="password"
              placeholder="Password"
              value={userData.password}
              required
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <button
              onClick={login}
              className="btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                " Login to my account"
              )}
            </button>
          </form>
          <p>
            <Link className="links" href="/forgotpassword">
              forgot password
            </Link>
          </p>
          <p>
            Already have an account?{" "}
            <Link className="links" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
