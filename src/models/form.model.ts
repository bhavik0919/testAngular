interface FormOption {
  id: number;
  value: string;
}

export interface FormQuestion {
  id: number;
  title: string;
  options: FormOption[];
}

export interface FormSection {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  questions: FormQuestion[];
}