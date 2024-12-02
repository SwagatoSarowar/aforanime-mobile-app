import { CustomButtonProps } from "@/types/type";

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

export const getVariantStyle = function (
  variant: CustomButtonProps["variant"]
) {
  switch (variant) {
    case "danger":
      return "bg-danger";
    case "success":
      return "bg-success";
    case "outline":
      return "border-2 border-white/50";
    default:
      return "bg-primary";
  }
};
