import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Invitation {
  id: string;
  project: string;
  projectId: string;
  owner: string;
  ownerId: string;
  recipient: string;
  recipientId: string;
  role: 'owner' | 'engineer' | 'contractor';
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  sentDate: string;
  responseDate?: string;
  declineReason?: string;
}

interface InvitationsState {
  invitations: Invitation[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InvitationsState = {
  invitations: [],
  loading: false,
  error: null
};

// Create slice
const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    fetchInvitationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInvitationsSuccess: (state, action: PayloadAction<Invitation[]>) => {
      state.invitations = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchInvitationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createInvitationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createInvitationSuccess: (state, action: PayloadAction<Invitation>) => {
      state.invitations.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    respondToInvitationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    respondToInvitationSuccess: (state, action: PayloadAction<{ id: string; status: 'accepted' | 'declined'; declineReason?: string }>) => {
      const { id, status, declineReason } = action.payload;
      const index = state.invitations.findIndex(invitation => invitation.id === id);
      if (index !== -1) {
        state.invitations[index].status = status;
        state.invitations[index].responseDate = new Date().toISOString();
        if (status === 'declined' && declineReason) {
          state.invitations[index].declineReason = declineReason;
        }
      }
      state.loading = false;
      state.error = null;
    },
    respondToInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInvitationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteInvitationSuccess: (state, action: PayloadAction<string>) => {
      state.invitations = state.invitations.filter(invitation => invitation.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearInvitationError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const { 
  fetchInvitationsRequest,
  fetchInvitationsSuccess,
  fetchInvitationsFailure,
  createInvitationRequest,
  createInvitationSuccess,
  createInvitationFailure,
  respondToInvitationRequest,
  respondToInvitationSuccess,
  respondToInvitationFailure,
  deleteInvitationRequest,
  deleteInvitationSuccess,
  deleteInvitationFailure,
  clearInvitationError
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
