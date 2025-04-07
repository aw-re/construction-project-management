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
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for users
const mockUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'owner', 
    status: 'active', 
    company: 'ABC Construction',
    createdAt: '2025-01-15'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'engineer', 
    status: 'active', 
    company: 'Smith Engineering',
    createdAt: '2025-02-03'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    role: 'contractor', 
    status: 'inactive', 
    company: 'Johnson Contractors',
    createdAt: '2025-01-28'
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    email: 'sarah.williams@example.com', 
    role: 'owner', 
    status: 'active', 
    company: 'Williams Projects',
    createdAt: '2025-03-10'
  },
  { 
    id: 5, 
    name: 'Robert Brown', 
    email: 'robert.brown@example.com', 
    role: 'engineer', 
    status: 'active', 
    company: 'Brown Engineering',
    createdAt: '2025-02-15'
  },
  { 
    id: 6, 
    name: 'Emily Davis', 
    email: 'emily.davis@example.com', 
    role: 'contractor', 
    status: 'active', 
    company: 'Davis Construction',
    createdAt: '2025-03-05'
  },
  { 
    id: 7, 
    name: 'David Wilson', 
    email: 'david.wilson@example.com', 
    role: 'owner', 
    status: 'inactive', 
    company: 'Wilson Properties',
    createdAt: '2025-01-20'
  },
  { 
    id: 8, 
    name: 'Lisa Taylor', 
    email: 'lisa.taylor@example.com', 
    role: 'engineer', 
    status: 'active', 
    company: 'Taylor Engineering',
    createdAt: '2025-02-28'
  }
];

const AdminUsersPage: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleStatusToggle = () => {
    // Handle status toggle logic here
    handleMenuClose();
  };

  const handleEditClick = () => {
    // Handle edit logic here
    handleMenuClose();
  };

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
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

  return (
    <MainLayout title="User Management" userRole="admin" userName="Admin User">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage all users in the system
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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <TextField
            placeholder="Search users..."
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
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Add New User
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getRoleColor(user.role) + '20',
                          color: getRoleColor(user.role),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)} 
                        size="small" 
                        color={user.status === 'active' ? 'success' : 'default'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* User action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleStatusToggle}>
          {selectedUserId && mockUsers.find(u => u.id === selectedUserId)?.status === 'active' ? (
            <>
              <BlockIcon fontSize="small" sx={{ mr: 1 }} />
              Deactivate User
            </>
          ) : (
            <>
              <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
              Activate User
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete User
        </MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default AdminUsersPage;
