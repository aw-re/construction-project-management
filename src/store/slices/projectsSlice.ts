import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  progress: number;
  tasksTotal: number;
  tasksAssigned: number;
  tasksCompleted: number;
  startDate: string;
  dueDate: string;
  status: 'planning' | 'in-progress' | 'completed';
  location: string;
  members?: string[];
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null
};

// Create slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProjectByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectByIdSuccess: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProjectByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProjectSuccess: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProjectSuccess: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      if (state.currentProject && state.currentProject.id === action.payload.id) {
        state.currentProject = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProjectSuccess: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
      if (state.currentProject && state.currentProject.id === action.payload) {
        state.currentProject = null;
      }
      state.loading = false;
      state.error = null;
    },
    deleteProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProjectError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const { 
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  fetchProjectByIdRequest,
  fetchProjectByIdSuccess,
  fetchProjectByIdFailure,
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
  clearProjectError
} = projectsSlice.actions;

export default projectsSlice.reducer;
