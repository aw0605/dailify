export interface MonthlyFormValuesProps {
  title: string;
  date: Date;
  content?: string;
}

export interface MonthlyEvent extends MonthlyFormValuesProps {
  id: string;
}
