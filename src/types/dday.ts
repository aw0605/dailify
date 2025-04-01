export interface DdayFormValuesProps {
  title: string;
  date: Date;
}

export interface DdayEvent extends DdayFormValuesProps {
  id: string;
}
