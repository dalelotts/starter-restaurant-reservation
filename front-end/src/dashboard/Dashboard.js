import React, {useEffect, useState} from "react";
import {listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {Link} from "react-router-dom";
import {next, previous, today} from "../utils/dates";

function Dashboard ({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard () {
    const abortController = new AbortController();
    setReservationsError(null)
    listReservations(date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  const reservationsList = reservations.map((reservation, index) => {

    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.firstName}</td>
        <td>{reservation.lastName}</td>
        <td>{reservation.mobileNumber}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="white-box">
            <div className="d-md-flex mb-3">
              <h4 className="box-title mb-0">Reservations for {date}</h4>
            </div>
            <ErrorAlert error={reservationsError}/>
            <div className="btn-group" role="group" aria-label="navigation buttons">
              <Link className="btn btn-secondary" to={`/dashboard?date=${previous(date)}`}>
                <span className="oi oi-chevron-left"/>&nbsp;Previous
              </Link>
              <Link className="btn btn-secondary" to={`/dashboard?date=${today()}`}>
                Today
              </Link>
              <Link className="btn btn-secondary" to={`/dashboard?date=${next(date)}`}>
                Next&nbsp;<span className="oi oi-chevron-right"/>
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap">
                <thead>
                <tr>
                  <th className="border-top-0">#</th>
                  <th className="border-top-0">FIRST NAME</th>
                  <th className="border-top-0">LAST NAME</th>
                  <th className="border-top-0">PHONE</th>
                  <th className="border-top-0">DATE</th>
                  <th className="border-top-0">TIME</th>
                  <th className="border-top-0">PEOPLE</th>
                </tr>
                </thead>
                <tbody>{reservationsList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
