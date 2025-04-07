import React from 'react';
import { Grid, Box, Typography, Paper, Button, useTheme } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Construction as ProjectsIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/ui/StatCard';

// Mock data for the dashboard
const mockStats = {
  projects: {
    total: 12,
    trend: { value: 3, isPositive: true }
  },
  tasks: {
    total: 48,
    trend: { value: 8, isPositive: true }
  },
  completedTasks: {
    total: 32,
    trend: { value: 15, isPositive: true }
  },
  pendingInvitations: {
    total: 5,
    trend: { value: 2, isPositive: false }
  }
};

// Mock data for recent projects
const mockProjects = [
  { 
    id: 1, 
    name: 'Skyline Tower Construction', 
    progress: 75, 
    engineers: 4, 
    contractors: 6,
    dueDate: '2025-08-15'
  },
  { 
    id: 2, 
    name: 'Riverside Apartments Renovation', 
    progress: 45, 
    engineers: 2, 
    contractors: 4,
    dueDate: '2025-06-30'
  },
  { 
    id: 3, 
    name: 'Central Park Office Building', 
    progress: 20, 
    engineers: 3, 
    contractors: 5,
    dueDate: '2025-12-10'
  }
];

const OwnerDashboardPage: React.FC = () => {
  const theme = useTheme();

  return (
    <MainLayout title="Owner Dashboard" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Owner Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your construction projects and activities
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={mockStats.projects.total}
            icon={<ProjectsIcon fontSize="large" />}
            color="primary"
            trend={mockStats.projects.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={mockStats.tasks.total}
            icon={<TasksIcon fontSize="large" />}
            color="warning"
            trend={mockStats.tasks.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Tasks"
            value={mockStats.completedTasks.total}
            icon={<DashboardIcon fontSize="large" />}
            color="success"
            trend={mockStats.completedTasks.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Invitations"
            value={mockStats.pendingInvitations.total}
            icon={<NotificationsIcon fontSize="large" />}
            color="info"
            trend={mockStats.pendingInvitations.trend}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Recent Projects
          </Typography>
          <Button variant="outlined" color="primary">
            View All Projects
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {mockProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {project.name}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: theme.palette.primary.main
                    }}
                  >
                    {project.progress}% Complete
                  </Typography>
                </Box>
                
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
                        backgroundColor: 
                          project.progress < 30 ? theme.palette.error.main :
                          project.progress < 70 ? theme.palette.warning.main :
                          theme.palette.success.main,
                        borderRadius: 4
                      }} 
                    />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Engineers
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {project.engineers}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Contractors
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {project.contractors}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Tasks
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {Math.floor(Math.random() * 20) + 5}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activity
            </Typography>
            <Box>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    py: 2, 
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="bold">
                      {item === 1 && 'Task status updated'}
                      {item === 2 && 'New comment added'}
                      {item === 3 && 'Contractor uploaded report'}
                      {item === 4 && 'Engineer completed task'}
                      {item === 5 && 'New task created'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item === 1 && '2 hours ago'}
                      {item === 2 && '5 hours ago'}
                      {item === 3 && 'Yesterday'}
                      {item === 4 && '2 days ago'}
                      {item === 5 && '3 days ago'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item === 1 && 'Foundation inspection marked as complete'}
                    {item === 2 && 'Jane Smith commented on Electrical wiring task'}
                    {item === 3 && 'Mike Johnson uploaded Site preparation report'}
                    {item === 4 && 'Robert Brown completed Plumbing installation'}
                    {item === 5 && 'You created Interior design planning task'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Upcoming Deadlines
            </Typography>
            <Box>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    py: 2, 
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight="bold">
                      {item === 1 && 'Foundation inspection'}
                      {item === 2 && 'Electrical wiring'}
                      {item === 3 && 'Roof installation'}
                      {item === 4 && 'Plumbing fixtures'}
                      {item === 5 && 'Interior painting'}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 
                          item === 1 ? theme.palette.error.main :
                          item === 2 ? theme.palette.error.main :
                          item === 3 ? theme.palette.warning.main :
                          theme.palette.success.main
                      }}
                    >
                      {item === 1 && 'Tomorrow'}
                      {item === 2 && '2 days left'}
                      {item === 3 && '5 days left'}
                      {item === 4 && '2 weeks left'}
                      {item === 5 && '3 weeks left'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item === 1 && 'Skyline Tower Construction'}
                    {item === 2 && 'Riverside Apartments Renovation'}
                    {item === 3 && 'Central Park Office Building'}
                    {item === 4 && 'Skyline Tower Construction'}
                    {item === 5 && 'Riverside Apartments Renovation'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default OwnerDashboardPage;
