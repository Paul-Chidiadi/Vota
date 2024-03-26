"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import "../../../../components/global/orgpage.css";
import Uploadimage from "../../../../components/global/Uploadimage.js";
import Notification from "../../../../components/global/Notification.js";
import { useGetOrganizationQuery, useSendDataMutation } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const overlayRef = useRef(null);
  const [edit, setEdit] = useState();
  const userId = getDataFromLocalStorage("id");

  const [editUser, { isLoading, reset }] = useSendDataMutation();
  const [accountEdit, { isLoading: accountLoading, reset: acountReset }] = useSendDataMutation();
  const [resendOtp, { isLoading: otpLoading, reset: otpReset }] = useSendDataMutation();
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetOrganizationQuery(userId);

  const user = userData?.data?.organization;
  const [editProfileData, setEditProfileData] = useState({
    companyName: user && user.companyName ? user.companyName : "",
    address: "",
    phoneNumber: "",
    numberOfStaff: "",
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
        companyName: editProfileData.companyName,
        phoneNumber: editProfileData.phoneNumber,
        numberOfStaff: editProfileData.numberOfStaff,
        address: editProfileData.address,
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
        companyName: "",
        phoneNumber: "",
        address: "",
        numberOfStaff: "",
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
                user && (user.logo === undefined || user.logo === "nil")
                  ? "/images/profile.jpeg"
                  : `https://vota.onrender.com/${user && user.logo}`
              }
              width={150}
              height={150}
              alt={user && user.companyName ? user.companyName[0] + user.companyName[1] : ""}
            />
            <div className="parted">
              <h1>{user.companyName}</h1>
              <small>{user.email}</small>
              <p>
                <i className="bx bx-poll"></i> <span>0</span> events conducted
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
              placeholder="Organization Name"
              required
              value={editProfileData.companyName}
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, companyName: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={editProfileData.address}
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, address: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Contact Number"
              required
              value={editProfileData.phoneNumber}
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, phoneNumber: e.target.value };
                });
              }}
            />
            <input
              type="number"
              placeholder="Number of Staff"
              required
              value={editProfileData.numberOfStaff}
              onChange={(e) => {
                setEditProfileData((prev) => {
                  return { ...prev, numberOfStaff: e.target.value };
                });
              }}
            />
            <input
              type="text"
              placeholder="Location"
              required
              value={editProfileData.location}
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
              type="Enter New Email"
              placeholder="Organization Email"
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
                role="organization"
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
