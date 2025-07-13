import format from "date-fns/format";
export const formatDate = (date: Date | null | undefined) => {
  if (!date) {
    return "--";
  }
  return format(date, "MMM dd yyyy");
};

export const formatDateForIssuerOnboarding = (
  date: Date | null | undefined,
) => {
  if (!date) {
    return "--";
  }
  return format(date, "yyyy-MM-dd");
};
