export interface TodoFormValuesProps {
  subject: string;
  title: string;
  content?: string;
}

export interface TodoItem {
  id: string;
  subject: string;
  title: string;
  date: Date;
  completed: boolean;
  content?: string;
}
