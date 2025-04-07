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
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for projects
const mockProjects = [
  { 
    id: 1, 
    name: 'Skyline Tower Construction', 
    description: 'Construction of a 30-story commercial tower in downtown area with modern facilities and sustainable design.',
    progress: 75, 
    engineers: 4, 
    contractors: 6,
    startDate: '2024-10-15',
    dueDate: '2025-08-15',
    status: 'in-progress',
    budget: 12500000,
    location: 'Downtown, Metro City'
  },
  { 
    id: 2, 
    name: 'Riverside Apartments Renovation', 
    description: 'Complete renovation of a 50-unit apartment complex including structural repairs, electrical upgrades, and interior modernization.',
    progress: 45, 
    engineers: 2, 
    contractors: 4,
    startDate: '2025-01-10',
    dueDate: '2025-06-30',
    status: 'in-progress',
    budget: 3800000,
    location: 'Riverside District, Metro City'
  },
  { 
    id: 3, 
    name: 'Central Park Office Building', 
    description: 'Development of a 15-story office building with underground parking, green roof, and smart building technology integration.',
    progress: 20, 
    engineers: 3, 
    contractors: 5,
    startDate: '2025-02-20',
    dueDate: '2025-12-10',
    status: 'in-progress',
    budget: 8900000,
    location: 'Central Business District, Metro City'
  },
  { 
    id: 4, 
    name: 'Harbor View Hotel', 
    description: 'Construction of a luxury 5-star hotel with 200 rooms, conference facilities, restaurants, and spa amenities.',
    progress: 10, 
    engineers: 5, 
    contractors: 8,
    startDate: '2025-03-05',
    dueDate: '2026-04-30',
    status: 'planning',
    budget: 15700000,
    location: 'Harbor District, Metro City'
  },
  { 
    id: 5, 
    name: 'Metro City Hospital Extension', 
    description: 'Extension of the existing hospital with a new wing for specialized care, including state-of-the-art medical equipment installation.',
    progress: 0, 
    engineers: 4, 
    contractors: 0,
    startDate: '2025-05-15',
    dueDate: '2026-08-20',
    status: 'planning',
    budget: 22300000,
    location: 'North District, Metro City'
  },
  { 
    id: 6, 
    name: 'Greenfield Residential Community', 
    description: 'Development of a sustainable residential community with 120 single-family homes, parks, and community facilities.',
    progress: 95, 
    engineers: 2, 
    contractors: 7,
    startDate: '2024-05-10',
    dueDate: '2025-05-01',
    status: 'completed',
    budget: 18500000,
    location: 'Greenfield Area, Metro City'
  },
  { 
    id: 7, 
    name: 'Industrial Park Warehouses', 
    description: 'Construction of five large warehouses with modern logistics facilities and office spaces in the industrial zone.',
    progress: 100, 
    engineers: 2, 
    contractors: 4,
    startDate: '2024-07-20',
    dueDate: '2025-03-15',
    status: 'completed',
    budget: 7200000,
    location: 'Industrial Zone, Metro City'
  }
];

const OwnerProjectsPage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
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

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleCreateProject = () => {
    // Handle create project logic here
    setCreateDialogOpen(false);
  };

  const getFilteredProjects = () => {
    let filtered = mockProjects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(project => project.status === 'in-progress');
    } else if (tabValue === 2) {
      filtered = filtered.filter(project => project.status === 'planning');
    } else if (tabValue === 3) {
      filtered = filtered.filter(project => project.status === 'completed');
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return theme.palette.info.main;
      case 'in-progress':
        return theme.palette.warning.main;
      case 'completed':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return theme.palette.error.main;
    if (progress < 70) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <MainLayout title="Projects" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          My Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor all your construction projects
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <TextField
          placeholder="Search projects..."
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
          onClick={handleCreateDialogOpen}
        >
          Create New Project
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Projects" />
          <Tab label="In Progress" />
          <Tab label="Planning" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredProjects().map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.status.replace('-', ' ').toUpperCase()} 
                    size="small" 
                    sx={{ 
                      backgroundColor: getStatusColor(project.status) + '20',
                      color: getStatusColor(project.status),
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }} 
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {project.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      {project.progress}%
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: 8, 
                      backgroundColor: theme.palette.background.default,
                      borderRadius: 4
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: `${project.progress}%`, 
                        height: '100%', 
                        backgroundColor: getProgressColor(project.progress),
                        borderRadius: 4
                      }} 
                    />
                  </Box>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Start Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Due Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(project.dueDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Engineers
                    </Typography>
                    <Typography variant="body2">
                      {project.engineers}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Contractors
                    </Typography>
                    <Typography variant="body2">
                      {project.contractors}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                >
                  View Details
                </Button>
                <IconButton 
                  size="small"
                  onClick={(e) => handleMenuOpen(e, project.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {getFilteredProjects().length === 0 && (
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
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters, or create a new project.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={handleCreateDialogOpen}
          >
            Create New Project
          </Button>
        </Paper>
      )}

      {/* Project action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Project
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
            Are you sure you want to delete this project? This action cannot be undone and will remove all associated tasks and data.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create project dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleCreateProject} color="primary" variant="contained">
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default OwnerProjectsPage;
