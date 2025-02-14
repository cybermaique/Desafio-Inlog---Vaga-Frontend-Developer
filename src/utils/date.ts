import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (
  date: Date | string,
  dateFormat: string = "dd/MM/yyyy"
): string => {
  return format(new Date(date), dateFormat, { locale: ptBR });
};
