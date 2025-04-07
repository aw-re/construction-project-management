import React from 'react';
import { Grid, Box, Typography, Paper, useTheme } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Construction as ProjectsIcon,
  Description as ReportsIcon,
  Email as InvitationsIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/ui/StatCard';

// Mock data for the dashboard
const mockStats = {
  activeTasks: {
    total: 15,
    trend: { value: 3, isPositive: true }
  },
  completedTasks: {
    total: 8,
    trend: { value: 2, isPositive: true }
  },
  activeProjects: {
    total: 4,
    trend: { value: 1, isPositive: true }
  },
  pendingInvitations: {
    total: 3,
    trend: { value: 1, isPositive: false }
  }
};

// Mock data for recent tasks
const mockTasks = [
  { 
    id: 1, 
    title: 'Concrete Pouring - Level 5', 
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-12',
    priority: 'high',
    status: 'in-progress'
  },
  { 
    id: 2, 
    title: 'HVAC System Installation - Ground Floor', 
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-25',
    priority: 'medium',
    status: 'todo'
  },
  { 
    id: 3, 
    title: 'Plumbing Installation - Basement', 
    project: 'Riverside Apartments Renovation',
    dueDate: '2025-04-18',
    priority: 'medium',
    status: 'in-progress'
  },
  { 
    id: 4, 
    title: 'Interior Wall Framing - Floor 3', 
    project: 'Central Park Office Building',
    dueDate: '2025-04-30',
    priority: 'low',
    status: 'todo'
  },
  { 
    id: 5, 
    title: 'Exterior Painting - West Wing', 
    project: 'Harbor View Hotel',
    dueDate: '2025-05-05',
    priority: 'medium',
    status: 'todo'
  }
];

const ContractorDashboardPage: React.FC = () => {
  const theme = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return theme.palette.info.main;
      case 'in-progress':
        return theme.palette.warning.main;
      case 'done':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <MainLayout title="Contractor Dashboard" userRole="contractor" userName="Mike Johnson">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Contractor Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your tasks, projects, and invitations
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Tasks"
            value={mockStats.activeTasks.total}
            icon={<TasksIcon fontSize="large" />}
            color="primary"
            trend={mockStats.activeTasks.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Tasks"
            value={mockStats.completedTasks.total}
            icon={<TasksIcon fontSize="large" />}
            color="success"
            trend={mockStats.completedTasks.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={mockStats.activeProjects.total}
            icon={<ProjectsIcon fontSize="large" />}
            color="warning"
            trend={mockStats.activeProjects.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Invitations"
            value={mockStats.pendingInvitations.total}
            icon={<InvitationsIcon fontSize="large" />}
            color="info"
            trend={mockStats.pendingInvitations.trend}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Recent Tasks
        </Typography>
        <Grid container spacing={3}>
          {mockTasks.map((task) => (
            <Grid item xs={12} md={6} key={task.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {task.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1, 
                        backgroundColor: getPriorityColor(task.priority) + '20',
                        color: getPriorityColor(task.priority),
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    >
                      {task.priority}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1, 
                        backgroundColor: getStatusColor(task.status) + '20',
                        color: getStatusColor(task.status),
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    >
                      {task.status.replace('-', ' ')}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {task.project}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    Due: <strong>{new Date(task.dueDate).toLocaleDateString()}</strong>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: new Date(task.dueDate) < new Date() ? theme.palette.error.main : 'inherit',
                      fontWeight: new Date(task.dueDate) < new Date() ? 'bold' : 'regular'
                    }}
                  >
                    {new Date(task.dueDate) < new Date() ? 'Overdue' : ''}
                  </Typography>
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
                      {item === 2 && 'Report submitted'}
                      {item === 3 && 'New task assigned'}
                      {item === 4 && 'Project invitation received'}
                      {item === 5 && 'Comment added to task'}
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
                    {item === 1 && 'Concrete pouring task marked as in progress'}
                    {item === 2 && 'Progress report for Skyline Tower Construction'}
                    {item === 3 && 'HVAC System Installation task for Skyline Tower Construction'}
                    {item === 4 && 'Invitation to join Harbor View Hotel project'}
                    {item === 5 && 'Comment on Plumbing Installation task'}
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
                      {item === 1 && 'Concrete Pouring - Level 5'}
                      {item === 2 && 'Plumbing Installation - Basement'}
                      {item === 3 && 'HVAC System Installation - Ground Floor'}
                      {item === 4 && 'Interior Wall Framing - Floor 3'}
                      {item === 5 && 'Exterior Painting - West Wing'}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 
                          item === 1 ? theme.palette.error.main :
                          item === 2 ? theme.palette.warning.main :
                          theme.palette.success.main
                      }}
                    >
                      {item === 1 && '2 days left'}
                      {item === 2 && '8 days left'}
                      {item === 3 && '15 days left'}
                      {item === 4 && '20 days left'}
                      {item === 5 && '25 days left'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item === 1 && 'Skyline Tower Construction'}
                    {item === 2 && 'Riverside Apartments Renovation'}
                    {item === 3 && 'Skyline Tower Construction'}
                    {item === 4 && 'Central Park Office Building'}
                    {item === 5 && 'Harbor View Hotel'}
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

export default ContractorDashboardPage;
