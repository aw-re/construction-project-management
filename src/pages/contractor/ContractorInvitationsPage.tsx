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
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for invitations
const mockInvitations = [
  { 
    id: 1, 
    project: 'Skyline Tower Construction',
    owner: 'John Doe',
    role: 'contractor',
    message: 'We would like to invite you to join our Skyline Tower Construction project as a contractor for concrete pouring and structural work.',
    status: 'pending',
    sentDate: '2025-04-01T10:30:00Z'
  },
  { 
    id: 2, 
    project: 'Harbor View Hotel',
    owner: 'Sarah Williams',
    role: 'contractor',
    message: 'Based on your excellent work on previous projects, we invite you to join our Harbor View Hotel project for exterior finishing work.',
    status: 'pending',
    sentDate: '2025-03-28T14:15:00Z'
  },
  { 
    id: 3, 
    project: 'Central Park Office Building',
    owner: 'Sarah Williams',
    role: 'contractor',
    message: 'We need your expertise for interior wall framing on our Central Park Office Building project. Please consider joining our team.',
    status: 'pending',
    sentDate: '2025-03-25T16:20:00Z'
  },
  { 
    id: 4, 
    project: 'Metro City Hospital Extension',
    owner: 'John Doe',
    role: 'contractor',
    message: 'Your company has been recommended for the site preparation work on our Metro City Hospital Extension project.',
    status: 'accepted',
    sentDate: '2025-03-15T11:10:00Z',
    responseDate: '2025-03-16T13:30:00Z'
  },
  { 
    id: 5, 
    project: 'Riverside Apartments Renovation',
    owner: 'David Wilson',
    role: 'contractor',
    message: 'We would like to invite you to handle the plumbing installation for our Riverside Apartments Renovation project.',
    status: 'accepted',
    sentDate: '2025-03-10T09:45:00Z',
    responseDate: '2025-03-11T15:20:00Z'
  },
  { 
    id: 6, 
    project: 'Greenfield Residential Community',
    owner: 'Lisa Taylor',
    role: 'contractor',
    message: 'We are looking for experienced contractors for our new residential community project. Your expertise would be valuable.',
    status: 'declined',
    sentDate: '2025-03-05T13:50:00Z',
    responseDate: '2025-03-06T10:15:00Z',
    declineReason: 'Currently at full capacity with other projects'
  }
];

const ContractorInvitationsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [invitationDetailOpen, setInvitationDetailOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<any>(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

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

  const handleInvitationDetailOpen = (invitation: any) => {
    setSelectedInvitation(invitation);
    setInvitationDetailOpen(true);
  };

  const handleInvitationDetailClose = () => {
    setInvitationDetailOpen(false);
  };

  const handleResponseDialogOpen = (invitation: any) => {
    setSelectedInvitation(invitation);
    setResponseDialogOpen(true);
  };

  const handleResponseDialogClose = () => {
    setResponseDialogOpen(false);
    setDeclineReason('');
  };

  const handleAcceptInvitation = () => {
    // Handle accept invitation logic here
    console.log('Accepting invitation:', selectedInvitation?.id);
    setResponseDialogOpen(false);
  };

  const handleDeclineInvitation = () => {
    // Handle decline invitation logic here
    console.log('Declining invitation:', selectedInvitation?.id, 'Reason:', declineReason);
    setResponseDialogOpen(false);
    setDeclineReason('');
  };

  const getFilteredInvitations = () => {
    let filtered = mockInvitations.filter(invitation => 
      invitation.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.owner.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <MainLayout title="Invitations" userRole="contractor" userName="Mike Johnson">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Project Invitations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage invitations to join construction projects
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
                <TableCell>Project</TableCell>
                <TableCell>Owner</TableCell>
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
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {invitation.project}
                      </Typography>
                    </TableCell>
                    <TableCell>{invitation.owner}</TableCell>
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
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => handleInvitationDetailOpen(invitation)}
                      >
                        View Details
                      </Button>
                      {invitation.status === 'pending' && (
                        <Button 
                          size="small" 
                          variant="contained"
                          color="primary"
                          sx={{ ml: 1 }}
                          onClick={() => handleResponseDialogOpen(invitation)}
                        >
                          Respond
                        </Button>
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
          <EmailIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No invitations found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You don't have any project invitations matching your search or filter criteria.
          </Typography>
        </Paper>
      )}

      {/* Invitation detail dialog */}
      <Dialog
        open={invitationDetailOpen}
        onClose={handleInvitationDetailClose}
        maxWidth="md"
        fullWidth
      >
        {selectedInvitation && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                Invitation to {selectedInvitation.project}
              </Typography>
              <Chip 
                label={selectedInvitation.status.charAt(0).toUpperCase() + selectedInvitation.status.slice(1)} 
                size="small" 
                sx={{ 
                  mt: 1,
                  backgroundColor: getStatusColor(selectedInvitation.status) + '20',
                  color: getStatusColor(selectedInvitation.status),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }} 
              />
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Project
                  </Typography>
                  <Typography variant="body1">
                    {selectedInvitation.project}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Project Owner
                  </Typography>
                  <Typography variant="body1">
                    {selectedInvitation.owner}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Role
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {selectedInvitation.role}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Sent Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedInvitation.sentDate)}
                  </Typography>
                </Grid>
                {selectedInvitation.responseDate && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Response Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedInvitation.responseDate)}
                    </Typography>
                  </Grid>
                )}
                {selectedInvitation.declineReason && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Decline Reason
                    </Typography>
                    <Typography variant="body1">
                      {selectedInvitation.declineReason}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Message
                  </Typography>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: theme.palette.background.default
                    }}
                  >
                    <Typography variant="body1">
                      {selectedInvitation.message}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleInvitationDetailClose} color="inherit">
                Close
              </Button>
              {selectedInvitation.status === 'pending' && (
                <>
                  <Button 
                    onClick={() => {
                      handleInvitationDetailClose();
                      handleResponseDialogOpen(selectedInvitation);
                    }} 
                    color="primary" 
                    variant="contained"
                  >
                    Respond to Invitation
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Response dialog */}
      <Dialog
        open={responseDialogOpen}
        onClose={handleResponseDialogClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedInvitation && (
          <>
            <DialogTitle>
              Respond to Invitation
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>
                You have been invited to join the <strong>{selectedInvitation.project}</strong> project as a <strong>{selectedInvitation.role}</strong>.
              </Typography>
              <Typography variant="body1" paragraph>
                Would you like to accept or decline this invitation?
              </Typography>
              {tabValue === 3 && (
                <TextField
                  fullWidth
                  label="Reason for Declining (Optional)"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResponseDialogClose} color="inherit">
                Cancel
              </Button>
              <Button 
                onClick={handleDeclineInvitation} 
                color="error" 
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                Decline
              </Button>
              <Button 
                onClick={handleAcceptInvitation} 
                color="success" 
                variant="contained"
                startIcon={<CheckCircleIcon />}
              >
                Accept
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MainLayout>
  );
};

export default ContractorInvitationsPage;
