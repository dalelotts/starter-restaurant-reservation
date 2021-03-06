/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./formatReservationDate";
import formatReservationTime from "./formatReservationTime";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */
export async function listReservations(date, signal) {
  const url = `${API_BASE_URL}/reservations?date=${date}`;
  return await fetchJson(url, { signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a new reservation
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the newly created reservation.
 */
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}

/**
 * Retrieves the reservation with the specified `reservationId`
 * @param reservationId
 *  the `id` property matching the desired reservation.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves to the reservation.
 */
export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { signal });
}

/**
 * Updates a existing reservation
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the update reservation.
 */
export async function updateReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Deletes the reservation with the specified `reservationId`.
 * @param reservationId
 *  the id of the reservation to delete
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<null|String>}
 *  a promise that resolves to null or an error message.
 */
export async function deleteReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}
