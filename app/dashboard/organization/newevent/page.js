'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../../../components/global/orgpage.css';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const page = () => {
  const router = useRouter();
  const myElementRef = useRef(null);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    schedule: '',
    public: false,
    eventType: '',
    positions: [{ id: uuidv4(), text: '' }],
    candidates: [],
    pollQuestions: [{ id: uuidv4(), text: '' }],
  });
  const [slideNum, setSlideNum] = useState(1);

  function nextSlide() {
    if (slideNum < 4) {
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
    }
  }

  //SET EVENT TYPE STATE AND VARIABLES
  const [options, setOptions] = useState([
    {
      id: 1,
      title: 'Poll',
      text: 'Set up a Poll where members can choose from different options.',
      image: '/images/Get-Organized.png',
      isSelected: false,
    },
    {
      id: 2,
      title: 'Election',
      text: 'Set up Election where members choose a candidate for different positions',
      image: '/images/Get-in-Front.png',
      isSelected: false,
    },
  ]);
  const [account, setAccount] = useState('');
  //Option elements
  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? 'col selected' : 'col'}
        key={option.id}
        onClick={() => handleClick(option.id)}
      >
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
        eventType: id === 1 ? 'Poll' : 'Election',
        positions: id === 1 ? [{ id: uuidv4(), text: '' }] : prev.positions,
        pollQuestions: id === 1 ? prev.pollQuestions : [{ id: uuidv4(), text: '' }],
      };
    });
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false };
      });
    });
  }

  console.log(eventDetails);
  return (
    <section className="org-main-page">
      <div className="new-event-section" id="myElement" ref={myElementRef}>
        {/* set name section */}
        <div className="flow set-name">
          <div>
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
          <div>
            <h3>Schedule</h3>
            <input
              type="text"
              name="schedule"
              value={eventDetails.schedule}
              placeholder="Time and Date"
              onChange={(e) => {
                setEventDetails((prev) => {
                  return { ...prev, schedule: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <h3>Do you want this event to be public?</h3>
            <small>
              Events set to public are visible to everyone(this includes people who are not members of your
              Organization). Every user can participate and view your event process when it is live.
            </small>{' '}
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
              eventDetails.eventName === '' || eventDetails.schedule === ''
                ? { color: 'var(--black-a30)' }
                : { color: 'var(--blue-70)' }
            }
            disabled={eventDetails.eventName === '' || eventDetails.schedule === '' ? true : false}
          >
            NEXT {'>'}
          </button>
        </div>

        {/* set event type section */}
        <div className="flow set-type">
          <h1>Choose Event Type</h1>
          <small>Choose which event type you are creating. Poll event or proper Election event.</small>
          <div className="inner-container selected">
            <div className="choose">{optionElements}</div>
          </div>
          <div className="actions">
            <button className="btnn" onClick={prevSlide}>
              {'<'} PREV
            </button>
            <button
              className="btnn"
              onClick={nextSlide}
              style={eventDetails.eventType === '' ? { color: 'var(--black-a30)' } : {}}
              disabled={eventDetails.eventType === '' ? true : false}
            >
              NEXT {'>'}
            </button>
          </div>
        </div>

        {/* set event proper section */}
        <div className="flow">
          {eventDetails.eventType === 'Election' ? (
            //For election type
            <div className="poll-questions">
              <h3>
                Set Election Positions{' '}
                <i
                  className="bx bx-plus"
                  onClick={() => {
                    setEventDetails((prev) => {
                      return {
                        ...prev,
                        positions: [...prev.positions, { id: uuidv4(), text: '' }],
                      };
                    });
                  }}
                ></i>
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
                              positions: prev.positions.map((poll) => {
                                return poll.id === item.id ? { ...poll, text: e.target.value } : poll;
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
                              positions: prev.positions.filter((option) => {
                                return option.id !== item.id;
                              }),
                            };
                          });
                        }}
                      ></i>
                    </div>
                  );
                })}
              </div>
              <div className="actions">
                <button className="btnn" onClick={prevSlide}>
                  {'<'} PREV
                </button>
                <button
                  className="btnn"
                  onClick={nextSlide}
                  style={
                    eventDetails.positions.length !== 0 && eventDetails.positions.every((item) => item.text.length > 0)
                      ? {}
                      : { color: 'var(--black-a30)' }
                  }
                  disabled={
                    eventDetails.positions.length !== 0 && eventDetails.positions.every((item) => item.text.length > 0)
                      ? false
                      : true
                  }
                >
                  NEXT {'>'}
                </button>
              </div>
            </div>
          ) : (
            //For Poll type
            <div className="poll-questions">
              <h3>
                Set Poll Questions{' '}
                <i
                  className="bx bx-plus"
                  onClick={() => {
                    setEventDetails((prev) => {
                      return {
                        ...prev,
                        pollQuestions: [...prev.pollQuestions, { id: uuidv4(), text: '' }],
                      };
                    });
                  }}
                ></i>
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
                                return poll.id === item.id ? { ...poll, text: e.target.value } : poll;
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
                        }}
                      ></i>
                    </div>
                  );
                })}
              </div>
              <div className="actions">
                <button className="btnn" onClick={prevSlide}>
                  {'<'} PREV
                </button>
                <button
                  className="btnn"
                  onClick={nextSlide}
                  style={
                    eventDetails.pollQuestions.length !== 0 &&
                    eventDetails.pollQuestions.every((item) => item.text.length > 0)
                      ? {}
                      : { color: 'var(--black-a30)' }
                  }
                  disabled={
                    eventDetails.pollQuestions.length !== 0 &&
                    eventDetails.pollQuestions.every((item) => item.text.length > 0)
                      ? false
                      : true
                  }
                >
                  NEXT {'>'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* confirm section */}
        <div className="flow confirm-section">
          <div>
            <h4>Good job setting up a new event!</h4>
            <small>
              When you click on submit, you can view this event and make changes to it in the future. Completed events
              become history and can't be edited.
            </small>
          </div>
          <span className="material-symbols-outlined image">task_alt</span>
          <div className="actions">
            <button className="btn" onClick={prevSlide}>
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
