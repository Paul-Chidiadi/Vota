"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import "../../../../components/global/orgpage.css";
import Uploadimage from "../../../../components/global/Uploadimage.js";
import Notification from "../../../../components/global/Notification.js";
import { useGetElectorQuery, useSendDataMutation } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const overlayRef = useRef(null);
  const [edit, setEdit] = useState();
  const userId = getDataFromLocalStorage("id");

  const [editUser, { isLoading, reset }] = useSendDataMutation();
  const [accountEdit, { isLoading: accountLoading, reset: mailReset }] = useSendDataMutation();
  const [resendOtp, { isLoading: otpLoading, reset: passReset }] = useSendDataMutation();

  const { data: userData, isLoading: userIsLoading, error: userError } = useGetElectorQuery(userId);
  const user = userData?.data?.elector;
  const [editProfileData, setEditProfileData] = useState({
    fullName: user && user.fullName ? user.fullName : "",
    phoneNumber: "",
    organization: "",
    position: "",
    location: "",
  });
  const [editPasswordData, setEditPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editEmailData, setEditEmailData] = useState({
    email: "",
  });
  const [otpData, setOtpData] = useState({
    OTP: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  //CHECK IF VALUES ARE EITHER EMPTY, NULL OR UNDEFINED
  function areValuesEmpty(obj) {
    return Object.values(obj).some(
      (value) => value === "" || value === null || value === undefined
    );
  }

  //SEND OTP FUNCTION
  async function sendOTP(e) {
    e.preventDefault();
    const request = await resendOtp({
      url: "auth/resendOTP",
      data: {
        email: user && user.email,
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
      overlayRef.current.style.display = `flex`;
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

  //EDIT PROFILE FUNCTION
  async function editProfile(e) {
    e.preventDefault();
    const editProfileDataIsEmpty = areValuesEmpty(editProfileData);
    if (editProfileDataIsEmpty) {
      setNotification({
        message: "Empty Fields",
        status: "error",
        show: true,
      });
      return;
    }
    //MAKE EDIT PROFILE REQUEST
    const request = await editUser({
      url: "global/editProfile",
      data: {
        fullName: editProfileData.fullName,
        phoneNumber: editProfileData.phoneNumber,
        organization: editProfileData.organization,
        position: editProfileData.position,
        location: editProfileData.location,
      },
      type: "PATCH",
    });
    if (request?.data) {
      const { data, message, success } = request?.data;
      setNotification({
        message: message,
        status: "success",
        show: true,
      });
      setEditProfileData({
        fullName: "",
        phoneNumber: "",
        organization: "",
        position: "",
        location: "",
      });
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

  //EDIT ACCOUNT SETTINGS FUNCTION
  async function editAccount(e) {
    e.preventDefault();
    if (edit === "email") {
      //MAKE EDIT EMAIL REQUEST
      const request = await accountEdit({
        url: "global/editEmail",
        data: {
          email: editEmailData.email,
          OTP: otpData.OTP,
        },
        type: "PATCH",
      });
      if (request?.data) {
        const { data, message, success } = request?.data;
        setNotification({
          message: message,
          status: "success",
          show: true,
        });
        setEditEmailData({
          email: "",
          OTP: "",
        });
        overlayRef.current.style.display = `none`;
      } else {
        setNotification({
          message: request?.error?.data?.error
            ? request?.error?.data?.error
            : "Check Internet Connection and try again",
          status: "error",
          show: true,
        });
      }
    } else if (edit === "password") {
      //MAKE EDIT PASSWORD REQUEST
      const request = await accountEdit({
        url: "global/editPassword",
        data: {
          email: user && user.email,
          OTP: otpData.OTP,
          newPassword: editPasswordData.newPassword,
          confirmPassword: editPasswordData.confirmPassword,
        },
        type: "PATCH",
      });
      if (request?.data) {
        const { data, message, success } = request?.data;
        setNotification({
          message: message,
          status: "success",
          show: true,
        });
        setEditPasswordData({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
        overlayRef.current.style.display = `none`;
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
    <section className="profile-page">
      <>
        {/* top section */}
        {userIsLoading ? (
          // IF FETCH IS STILL LOADING
          <div className="org-single-top">
            <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
          </div>
        ) : userError ? (
          //IF THEIR IS AN ERROR FETCHING
          <div className="org-single-top">
            <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
            <small>NetworkError</small>
          </div>
        ) : user ? (
          <div className="org-single-top">
            <Image
              className="img prof"
              src={
                user && (user.displayPicture === undefined || user.displayPicture === "nil")
                  ? "/images/profile.jpeg"
                  : `https://vota.onrender.com/${user && user.displayPicture}`
              }
              width={150}
              height={150}
              alt={user && user.fullName ? user.fullName[0] + user.fullName[1] : ""}
            />
            <div className="parted">
              <h1>{user && user.fullName}</h1>
              <small>{user && user.email}</small>
              <p>
                <i className="bx bx-poll"></i> <span>0</span> events engaged
              </p>
              <p>
                <i className="bx bx-poll"></i> <span>0</span> events ongoing
              </p>
              <i
                className="bx bxs-camera"
                onClick={() => {
                  setEdit(() => "image");
                  overlayRef.current.style.display = `flex`;
                }}></i>
            </div>
          </div>
        ) : (
          ""
        )}

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

        {/* body section */}
        <div className="profile-section">
          {/* Edit profile */}
          <form className="profile-forms">
            <h1 className="edit-profile">
              Edit Profile <i className="bx bx-pencil"></i>
            </h1>
            <input
              type="text"
              placeholder="Full Name"
              value={editProfileData.fullName}
              required
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, fullName: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={editProfileData.phoneNumber}
              required
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, phoneNumber: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Organization"
              value={editProfileData.organization}
              required
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, organization: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Position Held"
              value={editProfileData.position}
              required
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, position: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Location"
              value={editProfileData.location}
              required
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, location: e.target.value };
                });
              }}
            />
            <button onClick={editProfile} className="btn" disabled={isLoading ? true : false}>
              {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "Confirm"}
            </button>
          </form>

          {/* Edit account settings */}
          <form className="profile-forms">
            <h1 className="edit-profile">
              Edit Account Settings <i className="bx bx-pencil"></i>
            </h1>
            <input
              type="email"
              placeholder="Enter New Email"
              required
              value={editEmailData.email}
              onChange={(e) => {
                setEditEmailData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmailValid = emailRegex.test(editEmailData.email);
                if (editEmailData.email === "" || isEmailValid === false) {
                  setNotification({
                    message: "email is invalid",
                    status: "error",
                    show: true,
                  });
                } else {
                  setEdit(() => "email");
                  sendOTP(e);
                }
              }}
              className="btn edits"
              disabled={otpLoading ? true : false}>
              {otpLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                <>
                  <i className="bx bx-pencil"></i> {"Edit Email"}
                </>
              )}
            </button>
            <input
              type="password"
              placeholder="Password"
              required
              value={editPasswordData.password}
              onChange={(e) => {
                setEditPasswordData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              required
              value={editPasswordData.newPassword}
              onChange={(e) => {
                setEditPasswordData((prev) => {
                  return { ...prev, newPassword: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={editPasswordData.confirmPassword}
              required
              onChange={(e) => {
                setEditPasswordData((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const dataIsEmpty = areValuesEmpty(editPasswordData);
                // Password validation
                const hasCapitalLetter = /[A-Z]/.test(editPasswordData.newPassword);
                const hasSmallLetter = /[a-z]/.test(editPasswordData.newPassword);
                const hasNumber = /\d/.test(editPasswordData);
                // Confirm password validation
                const isConfirmPasswordValid =
                  editPasswordData.newPassword === editPasswordData.confirmPassword;
                const isPasswordValid =
                  hasCapitalLetter &&
                  hasSmallLetter &&
                  hasNumber.newPassword &&
                  editPasswordData.newPassword.length > 6;
                if (dataIsEmpty || isPasswordValid === false || isConfirmPasswordValid === false) {
                  setNotification({
                    message: "Passwords are invalid",
                    status: "error",
                    show: true,
                  });
                } else {
                  setEdit(() => "password");
                  sendOTP(e);
                }
              }}
              className="btn edits"
              disabled={otpLoading ? true : false}>
              {otpLoading ? (
                <i className="bx bx-loader-alt bx-spin"></i>
              ) : (
                <>
                  <i className="bx bx-pencil"></i> {"Edit Password"}
                </>
              )}
            </button>
          </form>
        </div>

        {/* POP UP */}
        <div className="overlay" id="overlay" ref={overlayRef}>
          <div className="popup">
            <span className="close-btn" onClick={() => (overlayRef.current.style.display = `none`)}>
              &times;
            </span>
            {edit === "image" ? (
              <Uploadimage
                role="elector"
                closeModal={() => {
                  overlayRef.current.style.display = `none`;
                }}
              />
            ) : (
              <>
                <h1>Confirm Request</h1>
                <small>An OTP was sent to your mail</small>
                <form className="forms">
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otpData.OTP}
                    required
                    onChange={(e) => {
                      setOtpData({ OTP: e.target.value });
                    }}
                  />{" "}
                  <button
                    onClick={editAccount}
                    className="btn"
                    disabled={accountLoading ? true : false}>
                    {accountLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "Confirm"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    </section>
  );
}
