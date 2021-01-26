export function formatAsDate(dateString) {
  return dateString.match(/\d\d\d\d-\d\d-\d\d/)[0];
}

export function today() {
  return formatAsDate(new Date().toISOString());
}

export function previous(currentDate) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - 1);
  return formatAsDate(date.toISOString());
}

export function next(currentDate) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + 1);
  return formatAsDate(date.toISOString());
}
