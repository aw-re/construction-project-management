import React from 'react';
import { Grid, Box, Typography, Paper, useTheme } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Construction as ProjectsIcon,
  Description as ReportsIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/ui/StatCard';

// Mock data for the dashboard
const mockStats = {
  assignedTasks: {
    total: 18,
    trend: { value: 4, isPositive: true }
  },
  completedTasks: {
    total: 12,
    trend: { value: 5, isPositive: true }
  },
  activeProjects: {
    total: 5,
    trend: { value: 1, isPositive: true }
  },
  submittedReports: {
    total: 8,
    trend: { value: 2, isPositive: true }
  }
};

// Mock data for recent tasks
const mockTasks = [
  { 
    id: 1, 
    title: 'Foundation Inspection', 
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-15',
    priority: 'high',
    status: 'in-progress'
  },
  { 
    id: 2, 
    title: 'Electrical Wiring - Floor 1', 
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-20',
    priority: 'medium',
    status: 'todo'
  },
  { 
    id: 3, 
    title: 'Structural Design Review', 
    project: 'Central Park Office Building',
    dueDate: '2025-04-18',
    priority: 'high',
    status: 'todo'
  },
  { 
    id: 4, 
    title: 'Plumbing System Design', 
    project: 'Riverside Apartments Renovation',
    dueDate: '2025-04-25',
    priority: 'medium',
    status: 'todo'
  },
  { 
    id: 5, 
    title: 'HVAC Installation Plan', 
    project: 'Harbor View Hotel',
    dueDate: '2025-05-02',
    priority: 'low',
    status: 'todo'
  }
];

const EngineerDashboardPage: React.FC = () => {
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
    <MainLayout title="Engineer Dashboard" userRole="engineer" userName="Jane Smith">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Engineer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your tasks, projects, and activities
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Assigned Tasks"
            value={mockStats.assignedTasks.total}
            icon={<TasksIcon fontSize="large" />}
            color="primary"
            trend={mockStats.assignedTasks.trend}
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
            title="Submitted Reports"
            value={mockStats.submittedReports.total}
            icon={<ReportsIcon fontSize="large" />}
            color="info"
            trend={mockStats.submittedReports.trend}
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
                      {item === 4 && 'Project meeting scheduled'}
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
                    {item === 1 && 'Foundation inspection marked as in progress'}
                    {item === 2 && 'Structural analysis report for Central Park Office Building'}
                    {item === 3 && 'Electrical wiring task for Skyline Tower Construction'}
                    {item === 4 && 'Weekly progress meeting for Riverside Apartments Renovation'}
                    {item === 5 && 'Comment on Plumbing System Design task'}
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
                      {item === 1 && 'Foundation Inspection'}
                      {item === 2 && 'Electrical Wiring - Floor 1'}
                      {item === 3 && 'Structural Design Review'}
                      {item === 4 && 'Plumbing System Design'}
                      {item === 5 && 'HVAC Installation Plan'}
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
                      {item === 2 && '7 days left'}
                      {item === 3 && '5 days left'}
                      {item === 4 && '12 days left'}
                      {item === 5 && '19 days left'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item === 1 && 'Skyline Tower Construction'}
                    {item === 2 && 'Skyline Tower Construction'}
                    {item === 3 && 'Central Park Office Building'}
                    {item === 4 && 'Riverside Apartments Renovation'}
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

export default EngineerDashboardPage;
