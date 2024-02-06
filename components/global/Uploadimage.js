"use client";
import React, { useState, useRef } from "react";

const Uploadimage = () => {
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("Drag and drop images here");
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    e.preventDefault();
    setDragging(false);
    setText(() => "Image Dropped Click on upload");

    setFile(() => {
      return e.dataTransfer ? Array.from(e.dataTransfer.files) : e.target.files;
    });
  };

  console.log(file);
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
        onDrop={handleFileInputChange}
      >
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
        onClick={() => {
          //Handle the dropped files (e.g., upload to a server or process them)
          const formData = new FormData();
          formData.append("file", file[0]);

          console.log(formData);
        }}
        className="btn"
        style={{ width: "100%", marginTop: "10px" }}
      >
        Upload
      </button>
    </>
  );
};

export default Uploadimage;
