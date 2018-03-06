// @flow

export function parseDateTime(timeNumber: Number) {
  const date: Date = new Date(timeNumber);
  const month: Number = date.getMonth() + 1;
  const year: Number = date.getFullYear();
  return `${month >= 10 ? `${month}` : `0${month}`}/${year}`;
}
