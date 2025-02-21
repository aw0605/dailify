export type TodoType = "today" | "weekly" | "monthly";

export interface TodoItem {
  id: number;
  type: TodoType;
  subject?: string;
  title: string;
  date?: string;
  checked?: boolean;
  content?: string;
}
