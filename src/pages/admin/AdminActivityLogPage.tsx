import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for activity log
const mockActivityLog = [
  { 
    id: 1, 
    user: 'John Doe', 
    userRole: 'owner',
    action: 'Created a new project',
    target: 'Skyline Tower Construction',
    timestamp: '2025-04-06T10:30:00Z',
    ipAddress: '192.168.1.1'
  },
  { 
    id: 2, 
    user: 'Jane Smith', 
    userRole: 'engineer',
    action: 'Updated task status',
    target: 'Foundation inspection',
    timestamp: '2025-04-06T09:45:00Z',
    ipAddress: '192.168.1.2'
  },
  { 
    id: 3, 
    user: 'Mike Johnson', 
    userRole: 'contractor',
    action: 'Uploaded report',
    target: 'Site preparation report',
    timestamp: '2025-04-05T16:20:00Z',
    ipAddress: '192.168.1.3'
  },
  { 
    id: 4, 
    user: 'Sarah Williams', 
    userRole: 'owner',
    action: 'Invited user',
    target: 'Robert Brown (Engineer)',
    timestamp: '2025-04-05T14:10:00Z',
    ipAddress: '192.168.1.4'
  },
  { 
    id: 5, 
    user: 'Admin User', 
    userRole: 'admin',
    action: 'Modified user permissions',
    target: 'Emily Davis',
    timestamp: '2025-04-05T11:30:00Z',
    ipAddress: '192.168.1.5'
  },
  { 
    id: 6, 
    user: 'David Wilson', 
    userRole: 'owner',
    action: 'Deleted task',
    target: 'Initial site survey',
    timestamp: '2025-04-04T17:45:00Z',
    ipAddress: '192.168.1.6'
  },
  { 
    id: 7, 
    user: 'Lisa Taylor', 
    userRole: 'engineer',
    action: 'Added comment',
    target: 'Electrical wiring task',
    timestamp: '2025-04-04T15:20:00Z',
    ipAddress: '192.168.1.7'
  },
  { 
    id: 8, 
    user: 'Robert Brown', 
    userRole: 'engineer',
    action: 'Changed task priority',
    target: 'Plumbing installation',
    timestamp: '2025-04-04T13:10:00Z',
    ipAddress: '192.168.1.8'
  },
  { 
    id: 9, 
    user: 'Emily Davis', 
    userRole: 'contractor',
    action: 'Marked task as complete',
    target: 'Concrete pouring',
    timestamp: '2025-04-03T16:40:00Z',
    ipAddress: '192.168.1.9'
  },
  { 
    id: 10, 
    user: 'Admin User', 
    userRole: 'admin',
    action: 'System backup',
    target: 'Database',
    timestamp: '2025-04-03T02:00:00Z',
    ipAddress: '192.168.1.10'
  }
];

const AdminActivityLogPage: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterAction, setFilterAction] = useState('all');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredActivityLog = mockActivityLog.filter(activity => {
    const matchesSearch = 
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRoleFilter = filterRole === 'all' || activity.userRole === filterRole;
    const matchesActionFilter = filterAction === 'all' || activity.action.toLowerCase().includes(filterAction.toLowerCase());
    
    return matchesSearch && matchesRoleFilter && matchesActionFilter;
  });

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return theme.palette.error.main;
      case 'owner':
        return theme.palette.primary.main;
      case 'engineer':
        return theme.palette.success.main;
      case 'contractor':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('Created') || action.includes('Added')) {
      return theme.palette.success.main;
    } else if (action.includes('Updated') || action.includes('Changed') || action.includes('Modified')) {
      return theme.palette.info.main;
    } else if (action.includes('Deleted')) {
      return theme.palette.error.main;
    } else {
      return theme.palette.warning.main;
    }
  };

  return (
    <MainLayout title="Activity Log" userRole="admin" userName="Admin User">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Activity Log
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track all user activities in the system
        </Typography>
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
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Search activities..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="role-filter-label">Filter by Role</InputLabel>
              <Select
                labelId="role-filter-label"
                id="role-filter"
                value={filterRole}
                label="Filter by Role"
                onChange={(e) => setFilterRole(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon color="action" fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="engineer">Engineer</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="action-filter-label">Filter by Action</InputLabel>
              <Select
                labelId="action-filter-label"
                id="action-filter"
                value={filterAction}
                label="Filter by Action"
                onChange={(e) => setFilterAction(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon color="action" fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Actions</MenuItem>
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="updated">Updated</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
                <MenuItem value="uploaded">Uploaded</MenuItem>
                <MenuItem value="invited">Invited</MenuItem>
                <MenuItem value="modified">Modified</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredActivityLog
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {activity.user}
                        <Chip 
                          label={activity.userRole.charAt(0).toUpperCase() + activity.userRole.slice(1)} 
                          size="small" 
                          sx={{ 
                            ml: 1,
                            backgroundColor: getRoleColor(activity.userRole) + '20',
                            color: getRoleColor(activity.userRole),
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }} 
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={activity.action} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getActionColor(activity.action) + '20',
                          color: getActionColor(activity.action),
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{activity.target}</TableCell>
                    <TableCell>{formatDate(activity.timestamp)}</TableCell>
                    <TableCell>{activity.ipAddress}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredActivityLog.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </MainLayout>
  );
};

export default AdminActivityLogPage;
