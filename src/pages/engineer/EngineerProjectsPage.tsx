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
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Construction as ConstructionIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for projects
const mockProjects = [
  { 
    id: 1, 
    name: 'Skyline Tower Construction', 
    description: 'Construction of a 30-story commercial tower in downtown area with modern facilities and sustainable design.',
    owner: 'John Doe',
    progress: 75, 
    tasksTotal: 12,
    tasksAssigned: 5,
    tasksCompleted: 3,
    startDate: '2024-10-15',
    dueDate: '2025-08-15',
    status: 'in-progress',
    location: 'Downtown, Metro City'
  },
  { 
    id: 2, 
    name: 'Riverside Apartments Renovation', 
    description: 'Complete renovation of a 50-unit apartment complex including structural repairs, electrical upgrades, and interior modernization.',
    owner: 'David Wilson',
    progress: 45, 
    tasksTotal: 8,
    tasksAssigned: 2,
    tasksCompleted: 1,
    startDate: '2025-01-10',
    dueDate: '2025-06-30',
    status: 'in-progress',
    location: 'Riverside District, Metro City'
  },
  { 
    id: 3, 
    name: 'Central Park Office Building', 
    description: 'Development of a 15-story office building with underground parking, green roof, and smart building technology integration.',
    owner: 'Sarah Williams',
    progress: 20, 
    tasksTotal: 10,
    tasksAssigned: 4,
    tasksCompleted: 1,
    startDate: '2025-02-20',
    dueDate: '2025-12-10',
    status: 'in-progress',
    location: 'Central Business District, Metro City'
  },
  { 
    id: 4, 
    name: 'Harbor View Hotel', 
    description: 'Construction of a luxury 5-star hotel with 200 rooms, conference facilities, restaurants, and spa amenities.',
    owner: 'Sarah Williams',
    progress: 10, 
    tasksTotal: 15,
    tasksAssigned: 3,
    tasksCompleted: 0,
    startDate: '2025-03-05',
    dueDate: '2026-04-30',
    status: 'planning',
    location: 'Harbor District, Metro City'
  },
  { 
    id: 5, 
    name: 'Metro City Hospital Extension', 
    description: 'Extension of the existing hospital with a new wing for specialized care, including state-of-the-art medical equipment installation.',
    owner: 'John Doe',
    progress: 5, 
    tasksTotal: 6,
    tasksAssigned: 1,
    tasksCompleted: 0,
    startDate: '2025-05-15',
    dueDate: '2026-08-20',
    status: 'planning',
    location: 'North District, Metro City'
  }
];

const EngineerProjectsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getFilteredProjects = () => {
    let filtered = mockProjects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(project => project.tasksAssigned > 0);
    } else if (tabValue === 2) {
      filtered = filtered.filter(project => project.tasksCompleted > 0);
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
    <MainLayout title="Projects" userRole="engineer" userName="Jane Smith">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          My Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage projects you are assigned to
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <TextField
          placeholder="Search projects..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Status"
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: { xs: '100%', sm: 200 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="planning">Planning</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Projects" />
          <Tab label="With Assigned Tasks" />
          <Tab label="With Completed Tasks" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredProjects().map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
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
                      Owner
                    </Typography>
                    <Typography variant="body2">
                      {project.owner}
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
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Total Tasks
                    </Typography>
                    <Typography variant="body2">
                      {project.tasksTotal}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Assigned
                    </Typography>
                    <Typography variant="body2" fontWeight={project.tasksAssigned > 0 ? 'bold' : 'regular'}>
                      {project.tasksAssigned}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Completed
                    </Typography>
                    <Typography variant="body2">
                      {project.tasksCompleted}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                >
                  View Details
                </Button>
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
          <ConstructionIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
        </Paper>
      )}
    </MainLayout>
  );
};

export default EngineerProjectsPage;
