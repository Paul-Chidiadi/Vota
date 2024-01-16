"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../../components/global/orgpage.css";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const page = () => {
  const router = useRouter();
  const myElementRef = useRef(null);
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    schedule: new Date(),
    public: false,
    eventType: "",
    positions: [{ id: uuidv4(), text: "" }],
    candidates: [],
    pollQuestions: [{ id: uuidv4(), text: "" }],
  });
  const [slideNum, setSlideNum] = useState(1);

  function nextSlide() {
    if (slideNum < 5) {
      const translateNumber = slideNum * (100 + 6);
      myElementRef.current.style.transform = `translateX(-${translateNumber}%)`;
      setSlideNum((prev) => prev + 1);
    }
  }
  function prevSlide() {
    if (slideNum === 2) {
      myElementRef.current.style.transform = `translateX(-0%)`;
      setSlideNum((prev) => prev - 1);
    } else if (slideNum === 3) {
      myElementRef.current.style.transform = `translateX(-106%)`;
      setSlideNum((prev) => prev - 1);
    } else if (slideNum === 4) {
      myElementRef.current.style.transform = `translateX(-212%)`;
      setSlideNum((prev) => prev - 1);
    } else if (slideNum === 5) {
      myElementRef.current.style.transform = `translateX(-318%)`;
      setSlideNum((prev) => prev - 1);
    }
  }

  return (
    <section className="org-main-page">
      <div className="new-event-section" id="myElement" ref={myElementRef}>
        {/* set name section */}
        <div className="flow set-name">
          <div className="option-sec">
            <h3>Edit Event Name</h3>
            <input
              type="text"
              name="eventName"
              value={eventDetails.eventName}
              placeholder="Set Name for your event"
              onChange={(e) => {
                setEventDetails((prev) => {
                  return { ...prev, eventName: e.target.value };
                });
              }}
            />
          </div>
          <div className="option-sec">
            <h3>Reschedule</h3>
            <DatePicker
              selected={eventDetails.schedule}
              onChange={(date) => {
                setEventDetails((prev) => {
                  return { ...prev, schedule: date };
                });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
              minDate={new Date()}
            />
          </div>
          <div className="option-sec">
            <h3>Edit event to be public or private</h3>
            <small>
              Events set to public are visible to everyone(this includes people
              who are not members of your Organization). Every user can
              participate and view your event process when it is live.
            </small>{" "}
            <div className="checkbox">
              <input
                type="checkbox"
                id="isPublic"
                name="public"
                checked={eventDetails.public}
                onChange={(e) => {
                  setEventDetails((prev) => {
                    return { ...prev, public: e.target.checked };
                  });
                }}
              />
              <label htmlFor="isPublic">
                Yes, I want this Event to be Public
              </label>
            </div>
          </div>
          <button
            className="btnn"
            onClick={nextSlide}
            style={
              eventDetails.eventName === "" || eventDetails.schedule === ""
                ? { color: "var(--black-a30)" }
                : { color: "var(--blue-70)" }
            }
            disabled={
              eventDetails.eventName === "" || eventDetails.schedule === ""
                ? true
                : false
            }
          >
            NEXT {">"}
          </button>
        </div>

        {/* confirm section */}
        <div className="flow confirm-section">
          <div>
            <h4>Good job Making an Edit to your event!</h4>
            <small>
              When you click on submit, you can view this event and make changes
              to it in the future. Completed events become history and can't be
              edited.
            </small>
          </div>
          <span className="material-symbols-outlined image">task_alt</span>
          <div className="actions">
            <button
              className="btn"
              onClick={() => {
                if (eventDetails.eventType === "Poll") {
                  myElementRef.current.style.transform = `translateX(-212%)`;
                  setSlideNum((prev) => prev - 2);
                } else prevSlide();
              }}
            >
              back
            </button>
            <button className="btn">submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
