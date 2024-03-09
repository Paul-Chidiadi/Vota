"use client";
import React, { useState, useRef } from "react";
import Notification from "../../components/global/Notification.js";
import { useSendDataMutation } from "../../store/api/api.js";

const UploadImage = ({ closeModal, role }) => {
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("Drag and drop images here");
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  const handleFileInputChange = (e) => {
    e.preventDefault();
    setDragging(false);
    setText(() => "Image Dropped Click on upload");

    setFile(() => {
      return e.dataTransfer ? Array.from(e.dataTransfer.files) : e.target.files;
    });
  };

  const [uploadImage, { isLoading, reset }] = useSendDataMutation();

  return (
    <>
      <h1>Upload Image</h1>
      <small>Click to insert or drag and drop Image here</small>
      <div
        className={`drag-and-drop-zone ${dragging ? "dragging" : ""}`}
        onClick={() => fileInputRef.current.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => {
          setDragging(false);
        }}
        onDrop={handleFileInputChange}>
        <p>{text}</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
      <button
        onClick={async () => {
          //Handle the dropped files (e.g., upload to a server or process them)
          if (file.length === 0) {
            setNotification({
              message: "No image choosen yet",
              status: "error",
              show: true,
            });
          } else {
            const formData = new FormData();
            formData.append("image", file[0]);
            //MAKE IMAGE UPLOAD REQUEST
            const request = await uploadImage({
              url:
                role === "elector" ? "elector/uploadProfileImage" : "organization/uploadLogoImage",
              data: formData,
              type: "PATCH",
            });
            if (request?.data) {
              const { data, message, success } = request?.data;
              setNotification({
                message: message,
                status: "success",
                show: true,
              });
              setTimeout(() => {
                closeModal();
              }, 4000);
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
        }}
        className="btn"
        style={{ width: "100%", marginTop: "10px" }}
        disabled={isLoading ? true : false}>
        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "Upload"}
      </button>

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
    </>
  );
};

export default UploadImage;
