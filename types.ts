export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ViewMode {
  NORMAL = 'NORMAL',
  BURR = 'BURR' // The lisp mode
}
