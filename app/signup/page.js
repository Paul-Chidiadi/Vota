"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";

export default function Sign() {
  const router = useRouter();
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "I'm an organization, managing a poll.",
      image: "/images/Get-Organized.png",
      isSelected: false,
    },
    {
      id: 2,
      text: "I'm an elector, participating in a poll.",
      image: "/images/Get-Close.png",
      isSelected: false,
    },
  ]);
  const [account, setAccount] = useState("");
  const [selectAccountClassName, setSelectAccountClassName] = useState(
    "inner-container selected"
  );
  const [orgClassName, setOrgClassName] = useState("org");
  const [electClassName, setElectClassName] = useState("elect");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });
  const [userAuth, { isLoading, reset }] = useSendDataMutation();

  //FORM DATA TO BE SENT TO BACKEND
  const [organizationData, setOrganizationData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    account: "Organization",
  });
  const [electorData, setElectorData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    account: "Elector",
  });

  //CHECK IF VALUES ARE EITHER EMPTY, NULL OR UNDEFINED
  function areValuesEmpty(obj) {
    return Object.values(obj).some(
      (value) => value === "" || value === null || value === undefined
    );
  }
  //VALIDATE INPUTS
  function validateRegistration(email, password, confirmPassword) {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    // Password validation
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isPasswordValid =
      hasCapitalLetter && hasSmallLetter && hasNumber && password.length > 6;

    // Confirm password validation
    const isConfirmPasswordValid = password === confirmPassword;

    if (isEmailValid === false) {
      setNotification({
        message: "Email is invalid",
        status: "error",
        show: true,
      });
      return;
    } else if (isPasswordValid === false) {
      setNotification({
        message:
          "Password must have capital & small letters with numbers & at least 7 characters",
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

  //CREATE ACCOUNT FUNCTION
  async function createAccount(e) {
    e.preventDefault();
    if (account === "Elector") {
      //HANDLE ELECTOR LOGIN
      const electorIsEmpty = areValuesEmpty(electorData);
      if (electorIsEmpty) {
        setNotification({
          message: "Empty Fields",
          status: "error",
          show: true,
        });
        return;
      }
      const validationResult = validateRegistration(
        electorData.email,
        electorData.password,
        electorData.confirmPassword
      );
      if (validationResult) {
        //PERFORM SIGNUP handle request
        const request = await userAuth({
          url: "auth/elector/signUp",
          data: {
            account: electorData.account,
            fullName: electorData.fullName,
            email: electorData.email,
            password: electorData.password,
            confirmPassword: electorData.confirmPassword,
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
          router.push(`/activateaccount?email=${data.email}`);
        } else {
          setNotification({
            message: request?.error?.data?.error,
            status: "error",
            show: true,
          });
        }
      }
    } else {
      //HANDLE ORGANIZATION LOGIN
      const organizationIsEmpty = areValuesEmpty(organizationData);
      if (organizationIsEmpty) {
        setNotification({
          message: "Empty Fields",
          status: "error",
          show: true,
        });
        return;
      }
      const validationResult = validateRegistration(
        organizationData.email,
        organizationData.password,
        organizationData.confirmPassword
      );
      if (validationResult) {
        //PERFORM SIGNUP handle request
        const request = await userAuth({
          url: "auth/organization/signUp",
          data: {
            account: organizationData.account,
            companyName: organizationData.companyName,
            email: organizationData.email,
            password: organizationData.password,
            confirmPassword: organizationData.confirmPassword,
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
          router.push(`/activateaccount?email=${data.email}`);
        } else {
          setNotification({
            message: request?.error?.data?.error,
            status: "error",
            show: true,
          });
        }
      }
    }
  }

  //HANDLE SELECTION FUNCTION
  function handleClick(id) {
    if (id === 1) {
      setAccount("Organization");
    } else if (id === 2) {
      setAccount("Elector");
    }
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false };
      });
    });
  }

  //HANDLE SWITCH FUNCTION
  function handleSwitch() {
    if (account === "Organization") {
      setAccount("Elector");
      setOrgClassName("org");
      setElectClassName("elect selected");
    } else if (account === "Elector") {
      setAccount("Organization");
      setElectClassName("elect");
      setOrgClassName("org selected");
    }
  }

  //HANDLE JOIN FUNCTION
  function joinNow() {
    if (account === "Organization") {
      setSelectAccountClassName("inner-container");
      setOrgClassName("org selected");
    } else if (account === "Elector") {
      setSelectAccountClassName("inner-container");
      setElectClassName("elect selected");
    }
  }

  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? "col selected" : "col"}
        key={option.id}
        onClick={() => handleClick(option.id)}
      >
        <div className="circle"></div>
        <Image
          className="choose-img"
          src={option.image}
          alt="image info"
          width={100}
          height={70}
        />
        <h4>{option.text}</h4>
      </div>
    );
  });

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
        {/* SELECT ACCOUNT SECTION */}
        <div className={selectAccountClassName}>
          <h1>Join as an organization or elector</h1>
          <div className="choose">
            {/* dynamically display options */}
            {optionElements}
          </div>
          {account !== "" && (
            <button onClick={joinNow} className="btn">
              Join as an {account}
            </button>
          )}
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
        </div>

        {/* ORGANIZATION SECTION */}
        <div className={orgClassName}>
          <h1>Joining as an {account}</h1>
          <form className="forms">
            <input
              type="name"
              placeholder="Organization Name"
              value={organizationData.companyName}
              required
              onChange={(e) => {
                setOrganizationData((prev) => {
                  return { ...prev, companyName: e.target.value };
                });
              }}
            />
            <input
              type="email"
              placeholder="Work Email Address"
              value={organizationData.email}
              required
              onChange={(e) => {
                setOrganizationData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={organizationData.password}
              required
              onChange={(e) => {
                setOrganizationData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={organizationData.confirmPassword}
              required
              onChange={(e) => {
                setOrganizationData((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
            />
            <button
              onClick={createAccount}
              className="btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                "Create my account"
              )}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
          <p onClick={handleSwitch}>
            <Link className="links" href="/signup">
              Join as an Elector.
            </Link>
          </p>
        </div>

        {/* ELECTOR SECTION */}
        <div className={electClassName}>
          <h1>Joining as an {account}</h1>
          <form className="forms">
            <input
              type="name"
              placeholder="Full Name"
              value={electorData.fullName}
              required
              onChange={(e) => {
                setElectorData((prev) => {
                  return { ...prev, fullName: e.target.value };
                });
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={electorData.email}
              required
              onChange={(e) => {
                setElectorData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={electorData.password}
              required
              onChange={(e) => {
                setElectorData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={electorData.confirmPassword}
              required
              onChange={(e) => {
                setElectorData((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
            />
            <button
              onClick={createAccount}
              className="btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                "Create my account"
              )}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
          <p onClick={handleSwitch}>
            <Link className="links" href="/signup">
              Join as an Organization.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
