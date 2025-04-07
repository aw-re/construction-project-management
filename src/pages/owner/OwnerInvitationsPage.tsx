import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for invitations
const mockInvitations = [
  { 
    id: 1, 
    email: 'robert.johnson@example.com', 
    role: 'engineer', 
    project: 'Skyline Tower Construction',
    status: 'pending',
    sentDate: '2025-04-01T10:30:00Z'
  },
  { 
    id: 2, 
    email: 'sarah.williams@example.com', 
    role: 'contractor', 
    project: 'Skyline Tower Construction',
    status: 'accepted',
    sentDate: '2025-03-28T14:15:00Z',
    responseDate: '2025-03-29T09:45:00Z'
  },
  { 
    id: 3, 
    email: 'michael.brown@example.com', 
    role: 'engineer', 
    project: 'Riverside Apartments Renovation',
    status: 'pending',
    sentDate: '2025-04-02T16:20:00Z'
  },
  { 
    id: 4, 
    email: 'jennifer.davis@example.com', 
    role: 'contractor', 
    project: 'Central Park Office Building',
    status: 'declined',
    sentDate: '2025-03-25T11:10:00Z',
    responseDate: '2025-03-26T13:30:00Z'
  },
  { 
    id: 5, 
    email: 'david.miller@example.com', 
    role: 'engineer', 
    project: 'Harbor View Hotel',
    status: 'accepted',
    sentDate: '2025-03-30T09:45:00Z',
    responseDate: '2025-03-30T15:20:00Z'
  },
  { 
    id: 6, 
    email: 'lisa.anderson@example.com', 
    role: 'contractor', 
    project: 'Skyline Tower Construction',
    status: 'pending',
    sentDate: '2025-04-03T13:50:00Z'
  },
  { 
    id: 7, 
    email: 'james.wilson@example.com', 
    role: 'engineer', 
    project: 'Metro City Hospital Extension',
    status: 'accepted',
    sentDate: '2025-03-27T10:15:00Z',
    responseDate: '2025-03-28T11:40:00Z'
  }
];

// Mock data for projects
const mockProjects = [
  { id: 1, name: 'Skyline Tower Construction' },
  { id: 2, name: 'Riverside Apartments Renovation' },
  { id: 3, name: 'Central Park Office Building' },
  { id: 4, name: 'Harbor View Hotel' },
  { id: 5, name: 'Metro City Hospital Extension' }
];

const OwnerInvitationsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInviteDialogOpen = () => {
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setInviteDialogOpen(false);
  };

  const handleSendInvitation = () => {
    // Handle send invitation logic here
    setInviteDialogOpen(false);
  };

  const getFilteredInvitations = () => {
    let filtered = mockInvitations.filter(invitation => 
      invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(invitation => invitation.status === 'pending');
    } else if (tabValue === 2) {
      filtered = filtered.filter(invitation => invitation.status === 'accepted');
    } else if (tabValue === 3) {
      filtered = filtered.filter(invitation => invitation.status === 'declined');
    }

    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return theme.palette.warning.main;
      case 'accepted':
        return theme.palette.success.main;
      case 'declined':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'engineer':
        return theme.palette.success.main;
      case 'contractor':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <MainLayout title="Invitations" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Invitations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage invitations to engineers and contractors for your projects
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <TextField
          placeholder="Search invitations..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={handleInviteDialogOpen}
        >
          Send New Invitation
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Invitations" />
          <Tab label="Pending" />
          <Tab label="Accepted" />
          <Tab label="Declined" />
        </Tabs>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sent Date</TableCell>
                <TableCell>Response Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredInvitations()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getRoleColor(invitation.role) + '20',
                          color: getRoleColor(invitation.role),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{invitation.project}</TableCell>
                    <TableCell>
                      <Chip 
                        label={invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStatusColor(invitation.status) + '20',
                          color: getStatusColor(invitation.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{formatDate(invitation.sentDate)}</TableCell>
                    <TableCell>
                      {invitation.responseDate ? formatDate(invitation.responseDate) : '-'}
                    </TableCell>
                    <TableCell align="right">
                      {invitation.status === 'pending' ? (
                        <Box>
                          <IconButton 
                            size="small" 
                            color="primary"
                            title="Resend Invitation"
                          >
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            title="Cancel Invitation"
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No actions available
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getFilteredInvitations().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {getFilteredInvitations().length === 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No invitations found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters, or send a new invitation.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            sx={{ mt: 2 }}
            onClick={handleInviteDialogOpen}
          >
            Send New Invitation
          </Button>
        </Paper>
      )}

      {/* Send invitation dialog */}
      <Dialog
        open={inviteDialogOpen}
        onClose={handleInviteDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Send New Invitation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                placeholder="Enter email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                select
                variant="outlined"
                defaultValue="engineer"
                required
              >
                <MenuItem value="engineer">Engineer</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project"
                select
                variant="outlined"
                required
              >
                {mockProjects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Add a personal message to the invitation"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleSendInvitation} color="primary" variant="contained">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default OwnerInvitationsPage;
