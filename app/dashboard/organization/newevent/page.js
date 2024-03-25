"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../../components/global/orgpage.css";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetOrganizationQuery, useSendDataMutation } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";
import Notification from "../../../../components/global/Notification.js";

const page = () => {
  const router = useRouter();
  const myElementRef = useRef(null);
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    schedule: new Date(new Date().setDate(new Date().getDate() + 1)),
    public: false,
    eventType: "",
    positions: [{ id: uuidv4(), text: "" }],
    candidates: [],
    pollQuestions: [{ id: uuidv4(), text: "" }],
  });
  const [slideNum, setSlideNum] = useState(1);
  const userId = getDataFromLocalStorage("id");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  const {
    data: organizationData,
    isLoading: organizationIsLoading,
    error: organizationError,
  } = useGetOrganizationQuery(userId);
  const organizationsMembers = organizationData?.data?.organization?.members;

  //CHECK IF VALUES ARE EITHER EMPTY, NULL OR UNDEFINED
  function areValuesEmpty(obj) {
    return Object.values(obj).some(
      (value) => value === "" || value === null || value === undefined
    );
  }

  const [createEvent, { isLoading, reset }] = useSendDataMutation();

  async function create() {
    const isDataEmpty = areValuesEmpty(eventDetails);
    if (isDataEmpty) {
      setNotification({
        message: "Empty Fields",
        status: "error",
        show: true,
      });
      return;
    }
    const request = await createEvent({
      url: "organization/createEvent",
      data:
        eventDetails.eventType === "Poll"
          ? {
              eventName: eventDetails.eventName,
              schedule: eventDetails.schedule,
              isPublic: eventDetails.public,
              eventType: eventDetails.eventType,
              pollQuestions: eventDetails.pollQuestions.map((item) => {
                return { question: item.text };
              }),
            }
          : {
              eventName: eventDetails.eventName,
              schedule: eventDetails.schedule,
              isPublic: eventDetails.public,
              eventType: eventDetails.eventType,
              positions: eventDetails.positions.map((item) => {
                return item.text;
              }),
              candidates: eventDetails.candidates.map((item) => {
                return { runfor: item.position, candidateId: item.name };
              }),
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
      setTimeout(() => {
        router.push(`/dashboard/organization/events`);
      }, 3000);
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

  //SET EVENT TYPE STATE AND VARIABLES
  const [options, setOptions] = useState([
    {
      id: 1,
      title: "Poll",
      text: "Set up a Poll where members can choose from different options.",
      image: "/images/Get-Organized.png",
      isSelected: false,
    },
    {
      id: 2,
      title: "Election",
      text: "Set up Election where members choose a candidate for different positions",
      image: "/images/Get-in-Front.png",
      isSelected: false,
    },
  ]);
  //Option elements
  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? "col selected" : "col"}
        key={option.id}
        onClick={() => handleClick(option.id)}>
        <div className="circle"></div>
        <Image className="choose-img" src={option.image} alt="image info" width={100} height={70} />
        <h4>{option.text}</h4>
      </div>
    );
  });
  //HANDLE SELECTION FUNCTION
  function handleClick(id) {
    setEventDetails((prev) => {
      return {
        ...prev,
        eventType: id === 1 ? "Poll" : "Election",
        positions: id === 1 ? [{ id: uuidv4(), text: "" }] : prev.positions,
        candidates: id === 1 ? [] : prev.candidates,
        pollQuestions: id === 1 ? prev.pollQuestions : [{ id: uuidv4(), text: "" }],
      };
    });
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false };
      });
    });
  }

  return (
    <section className="org-main-page">
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

      <div className="new-event-section" id="myElement" ref={myElementRef}>
        {/* set name section */}
        <div className="flow set-name">
          <div className="option-sec">
            <h3>Set Event Name</h3>
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
            <h3>Schedule</h3>
            {/* <input
              type="text"
              name="schedule"
              value={eventDetails.schedule}
              placeholder="Time and Date"
              onChange={(e) => {
                setEventDetails((prev) => {
                  return { ...prev, schedule: e.target.value };
                });
              }}
              disabled
            /> */}
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
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // Add one day to current date
            />
          </div>
          <div className="option-sec">
            <h3>Do you want this event to be public?</h3>
            <small>
              Events set to public are visible to everyone(this includes people who are not members
              of your Organization). Every user can participate and view your event process when it
              is live.
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
              <label htmlFor="isPublic">Yes, I want this Event to be Public</label>
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
            disabled={eventDetails.eventName === "" || eventDetails.schedule === "" ? true : false}>
            NEXT {">"}
          </button>
        </div>

        {/* set event type section */}
        <div className="flow set-type">
          <h1>Choose Event Type</h1>
          <small>
            Choose which event type you are creating. Poll event or proper Election event.
          </small>
          <div className="inner-container selected">
            <div className="choose">{optionElements}</div>
          </div>
          <div className="actions">
            <button className="btnn" onClick={prevSlide}>
              {"<"} PREV
            </button>
            <button
              className="btnn"
              onClick={nextSlide}
              style={eventDetails.eventType === "" ? { color: "var(--black-a30)" } : {}}
              disabled={eventDetails.eventType === "" ? true : false}>
              NEXT {">"}
            </button>
          </div>
        </div>

        {/* set event proper section */}
        <div className="flow">
          {eventDetails.eventType === "Election" ? (
            //For setting positions for election type
            <div className="poll-questions">
              <h3>
                Set Election Positions{" "}
                <i
                  className="bx bx-plus"
                  onClick={() => {
                    setEventDetails((prev) => {
                      return {
                        ...prev,
                        positions: [...prev.positions, { id: uuidv4(), text: "" }],
                      };
                    });
                  }}></i>
              </h3>
              <div className="poll-list">
                {eventDetails.positions.map((item) => {
                  return (
                    <div key={item.id}>
                      <input
                        type="text"
                        placeholder="Set Election Positions"
                        onChange={(e) => {
                          setEventDetails((prev) => {
                            return {
                              ...prev,
                              candidates: prev.candidates.map((candidate) => {
                                return candidate.position === item.text
                                  ? { ...candidate, position: e.target.value }
                                  : candidate;
                              }),
                              positions: prev.positions.map((poll) => {
                                return poll.id === item.id
                                  ? { ...poll, text: e.target.value }
                                  : poll;
                              }),
                            };
                          });
                        }}
                      />
                      <i
                        className="bx bx-x"
                        onClick={() => {
                          setEventDetails((prev) => {
                            return {
                              ...prev,
                              candidates: prev.candidates.filter((option) => {
                                return option.position !== item.text;
                              }),
                              positions: prev.positions.filter((option) => {
                                return option.id !== item.id;
                              }),
                            };
                          });
                        }}></i>
                    </div>
                  );
                })}
              </div>
              <div className="actions">
                <button className="btnn" onClick={prevSlide}>
                  {"<"} PREV
                </button>
                <button
                  className="btnn"
                  onClick={nextSlide}
                  style={
                    eventDetails.positions.length !== 0 &&
                    eventDetails.positions.every((item) => item.text.length > 0)
                      ? {}
                      : { color: "var(--black-a30)" }
                  }
                  disabled={
                    eventDetails.positions.length !== 0 &&
                    eventDetails.positions.every((item) => item.text.length > 0)
                      ? false
                      : true
                  }>
                  NEXT {">"}
                </button>
              </div>
            </div>
          ) : (
            //For Poll type
            <div className="poll-questions">
              <h3>
                Set Poll Questions{" "}
                <i
                  className="bx bx-plus"
                  onClick={() => {
                    setEventDetails((prev) => {
                      return {
                        ...prev,
                        pollQuestions: [...prev.pollQuestions, { id: uuidv4(), text: "" }],
                      };
                    });
                  }}></i>
              </h3>
              <div className="poll-list">
                {eventDetails.pollQuestions.map((item) => {
                  return (
                    <div key={item.id}>
                      <input
                        type="text"
                        placeholder="Set Poll Question"
                        onChange={(e) => {
                          setEventDetails((prev) => {
                            return {
                              ...prev,
                              pollQuestions: prev.pollQuestions.map((poll) => {
                                return poll.id === item.id
                                  ? { ...poll, text: e.target.value }
                                  : poll;
                              }),
                            };
                          });
                        }}
                      />
                      <i
                        className="bx bx-x"
                        onClick={() => {
                          setEventDetails((prev) => {
                            return {
                              ...prev,
                              pollQuestions: prev.pollQuestions.filter((option) => {
                                return option.id !== item.id;
                              }),
                            };
                          });
                        }}></i>
                    </div>
                  );
                })}
              </div>
              <div className="actions">
                <button className="btnn" onClick={prevSlide}>
                  {"<"} PREV
                </button>
                <button
                  className="btnn"
                  onClick={() => {
                    //move to last side since candidate sectin doesn't need to be filled
                    const translateNumber = 4 * (100 + 6);
                    myElementRef.current.style.transform = `translateX(-${translateNumber}%)`;
                    setSlideNum((prev) => prev + 2);
                  }}
                  style={
                    eventDetails.pollQuestions.length !== 0 &&
                    eventDetails.pollQuestions.every((item) => item.text.length > 0)
                      ? {}
                      : { color: "var(--black-a30)" }
                  }
                  disabled={
                    eventDetails.pollQuestions.length !== 0 &&
                    eventDetails.pollQuestions.every((item) => item.text.length > 0)
                      ? false
                      : true
                  }>
                  NEXT {">"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* set candidate section */}
        <div className="flow">
          {/* For setting positions for election type */}
          <div className="poll-questions">
            <h3>Set Candidates for each Position </h3>
            <div className="candidate-type">
              {eventDetails.positions.map((item) => {
                return (
                  <div className="divider" key={item.id}>
                    <h3>
                      {item.text}
                      <i
                        className="bx bx-plus"
                        onClick={() => {
                          setEventDetails((prev) => {
                            return {
                              ...prev,
                              candidates: [
                                ...prev.candidates,
                                { id: uuidv4(), position: item.text, name: "" },
                              ],
                            };
                          });
                        }}></i>
                    </h3>
                    <div className="poll-list">
                      {eventDetails.candidates.map((cand) => {
                        return cand.position === item.text ? (
                          <div key={cand.id}>
                            <select
                              // type="text"
                              // placeholder="Input Candidates Email"
                              onChange={(e) => {
                                setEventDetails((prev) => {
                                  return {
                                    ...prev,
                                    candidates: prev.candidates.map((single) => {
                                      return single.id === cand.id
                                        ? { ...single, name: e.target.value }
                                        : single;
                                    }),
                                  };
                                });
                              }}>
                              {organizationsMembers && organizationsMembers.length !== 0 ? (
                                <>
                                  <option value="">Select Candidate</option>
                                  {organizationsMembers.map((item) => {
                                    return (
                                      <option key={item._id} value={item._id}>
                                        {item.email}
                                      </option>
                                    );
                                  })}
                                </>
                              ) : (
                                <option value="">No members to select as candidates</option>
                              )}
                            </select>
                            <i
                              className="bx bx-x"
                              onClick={() => {
                                setEventDetails((prev) => {
                                  return {
                                    ...prev,
                                    candidates: prev.candidates.filter((option) => {
                                      return option.id !== cand.id;
                                    }),
                                  };
                                });
                              }}></i>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="actions">
              <button className="btnn" onClick={prevSlide}>
                {"<"} PREV
              </button>
              <button
                className="btnn"
                onClick={nextSlide}
                style={
                  eventDetails.candidates.length !== 0 &&
                  eventDetails.candidates.every((item) => item.name.length > 0)
                    ? {}
                    : { color: "var(--black-a30)" }
                }
                disabled={
                  eventDetails.candidates.length !== 0 &&
                  eventDetails.candidates.every((item) => item.name.length > 0)
                    ? false
                    : true
                }>
                NEXT {">"}
              </button>
            </div>
          </div>
        </div>

        {/* confirm section */}
        <div className="flow confirm-section">
          <div>
            <h4>Good job setting up a new event!</h4>
            <small>
              When you click on submit, you can view this event and make changes to it in the
              future. Completed events become history and can't be edited.
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
              }}>
              back
            </button>
            <button className="btn" disabled={isLoading ? true : false} onClick={create}>
              {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
