export function checkValidPlayerName(data) {
  /// check for empty data
  if (data.length === 0) return "hidden";
  /// a digit exist , 17 words exist , space exist, non-alpha-digit exist
  if (/\d|^\w{17}|\s|[^\w]/.test(data) === true) return "Please try again!";
  return "Valid Name";
}
