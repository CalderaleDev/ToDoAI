export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId: string;
  categoryId?: string;
  recurringType?: 'daily' | 'weekly' | 'monthly';
  googleCalendarEventId?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    darkMode: boolean;
    notifications: boolean;
  };
}