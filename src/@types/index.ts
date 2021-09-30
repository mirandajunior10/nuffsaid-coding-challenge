export enum Priority {
  Error,
  Warn,
  Info,
}

export interface Message {
  id: string
  message: string;
  priority: Priority;
}