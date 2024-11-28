export const getYear = function (yearString: string) {
  return yearString?.split("-")[0];
};

export const getDuration = function (durationString: string) {
  return durationString?.split(" ")?.slice(0, 2).join(" ");
};

export const formatNumberWithCommas = function (number: number | string) {
  if (number == null) return "";

  let numStr: string;

  if (typeof number === "number") {
    numStr = number.toString();
  } else {
    numStr = number;
  }

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
