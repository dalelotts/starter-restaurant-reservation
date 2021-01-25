import React, { useState } from "react";

function ReservationForm({
  onSubmit,
  onCancel,
  initialState = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  },
}) {
  const [reservation, setReservation] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  function numberChangeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: Number(value),
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(reservation);
  }

  return (
    <>
      <form onSubmit={submitHandler} className="reservation-form">
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={reservation.firstName}
                required={true}
                placeholder="First Name"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={reservation.lastName}
                required={true}
                placeholder="Last Name"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="date">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                className="form-control"
                value={reservation.mobileNumber}
                required={true}
                placeholder="Mobile Number"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="reservation_date">Date</label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                className="form-control"
                value={reservation.reservation_date}
                required={true}
                placeholder="Date"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="date">Time</label>
              <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                className="form-control"
                value={reservation.reservation_time}
                required={true}
                placeholder="Date"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="people">People</label>
              <input
                type="number"
                id="people"
                name="people"
                className="form-control"
                aria-label="Number of people"
                required={true}
                value={reservation.people}
                min={1}
                onChange={numberChangeHandler}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            <span className="oi oi-x" /> Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check" /> Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ReservationForm;
