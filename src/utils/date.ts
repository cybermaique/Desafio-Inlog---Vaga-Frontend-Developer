import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export const formatDate = (
  date: string | Date,
  dateFormat: string = "DD/MM/YYYY"
): string => {
  return dayjs(date).locale("pt-br").format(dateFormat);
};
