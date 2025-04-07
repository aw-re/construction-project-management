import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Notification {
  id: string;
  type: 'task' | 'comment' | 'project' | 'report' | 'invitation' | 'deadline';
  title: string;
  message: string;
  project: string;
  projectId: string;
  date: string;
  read: boolean;
  relatedItemId?: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null
};

// Create slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(notification => !notification.read).length;
      state.loading = false;
      state.error = null;
    },
    fetchNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsReadRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    markAsReadSuccess: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(notification => notification.id === action.payload);
      if (index !== -1 && !state.notifications[index].read) {
        state.notifications[index].read = true;
        state.unreadCount -= 1;
      }
      state.loading = false;
      state.error = null;
    },
    markAsReadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    markAllAsReadRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    markAllAsReadSuccess: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
      state.loading = false;
      state.error = null;
    },
    markAllAsReadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNotificationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteNotificationSuccess: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(notification => notification.id === action.payload);
      if (index !== -1) {
        if (!state.notifications[index].read) {
          state.unreadCount -= 1;
        }
        state.notifications.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
    },
    deleteNotificationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotificationError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const { 
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  addNotification,
  markAsReadRequest,
  markAsReadSuccess,
  markAsReadFailure,
  markAllAsReadRequest,
  markAllAsReadSuccess,
  markAllAsReadFailure,
  deleteNotificationRequest,
  deleteNotificationSuccess,
  deleteNotificationFailure,
  clearNotificationError
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
