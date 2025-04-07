import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  projectId: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  assignedTo: string;
  assignedBy: string;
  assignedDate: string;
  completedDate?: string;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: string;
  uploadDate: string;
}

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null
};

// Create slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTaskByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTaskByIdSuccess: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTaskByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      if (state.currentTask && state.currentTask.id === action.payload.id) {
        state.currentTask = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskStatusSuccess: (state, action: PayloadAction<{ id: string; status: 'todo' | 'in-progress' | 'done' }>) => {
      const { id, status } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index].status = status;
        if (status === 'done') {
          state.tasks[index].completedDate = new Date().toISOString();
        }
      }
      if (state.currentTask && state.currentTask.id === id) {
        state.currentTask.status = status;
        if (status === 'done') {
          state.currentTask.completedDate = new Date().toISOString();
        }
      }
      state.loading = false;
      state.error = null;
    },
    updateTaskStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      if (state.currentTask && state.currentTask.id === action.payload) {
        state.currentTask = null;
      }
      state.loading = false;
      state.error = null;
    },
    deleteTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCommentSuccess: (state, action: PayloadAction<{ taskId: string; comment: Comment }>) => {
      const { taskId, comment } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        if (!state.tasks[taskIndex].comments) {
          state.tasks[taskIndex].comments = [];
        }
        state.tasks[taskIndex].comments!.push(comment);
      }
      if (state.currentTask && state.currentTask.id === taskId) {
        if (!state.currentTask.comments) {
          state.currentTask.comments = [];
        }
        state.currentTask.comments!.push(comment);
      }
      state.loading = false;
      state.error = null;
    },
    addCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearTaskError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const { 
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTaskByIdRequest,
  fetchTaskByIdSuccess,
  fetchTaskByIdFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  updateTaskStatusRequest,
  updateTaskStatusSuccess,
  updateTaskStatusFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  clearTaskError
} = tasksSlice.actions;

export default tasksSlice.reducer;
