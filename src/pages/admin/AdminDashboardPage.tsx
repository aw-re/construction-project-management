import React from 'react';
import { Grid, Box, Typography, Paper, useTheme } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as TasksIcon,
  Construction as ProjectsIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import StatCard from '../../components/ui/StatCard';

// Mock data for the dashboard
const mockStats = {
  users: {
    total: 124,
    trend: { value: 12, isPositive: true }
  },
  projects: {
    total: 38,
    trend: { value: 5, isPositive: true }
  },
  tasks: {
    total: 287,
    trend: { value: 18, isPositive: true }
  },
  activeUsers: {
    total: 78,
    trend: { value: 3, isPositive: false }
  }
};

// Mock data for recent activity
const mockActivity = [
  { id: 1, user: 'John Doe', action: 'created a new project', time: '2 hours ago', userType: 'owner' },
  { id: 2, user: 'Jane Smith', action: 'completed a task', time: '3 hours ago', userType: 'engineer' },
  { id: 3, user: 'Mike Johnson', action: 'uploaded a report', time: '5 hours ago', userType: 'contractor' },
  { id: 4, user: 'Sarah Williams', action: 'invited a new contractor', time: '1 day ago', userType: 'owner' },
  { id: 5, user: 'Robert Brown', action: 'updated project status', time: '1 day ago', userType: 'engineer' }
];

const AdminDashboardPage: React.FC = () => {
  const theme = useTheme();

  return (
    <MainLayout title="Admin Dashboard" userRole="admin" userName="Admin User">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of system statistics and recent activity
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={mockStats.users.total}
            icon={<PeopleIcon fontSize="large" />}
            color="primary"
            trend={mockStats.users.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={mockStats.projects.total}
            icon={<ProjectsIcon fontSize="large" />}
            color="success"
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
            title="Active Users"
            value={mockStats.activeUsers.total}
            icon={<DashboardIcon fontSize="large" />}
            color="info"
            trend={mockStats.activeUsers.trend}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activity
            </Typography>
            <Box>
              {mockActivity.map((activity) => (
                <Box 
                  key={activity.id} 
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
                      {activity.user}
                      <Typography 
                        component="span" 
                        variant="caption" 
                        sx={{ 
                          ml: 1, 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1, 
                          backgroundColor: theme.palette.background.default,
                          textTransform: 'capitalize'
                        }}
                      >
                        {activity.userType}
                      </Typography>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {activity.action}
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
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Distribution
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              mt: 2
            }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Project Owners</Typography>
                  <Typography variant="body2" fontWeight="bold">32</Typography>
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
                      width: '26%', 
                      height: '100%', 
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 4
                    }} 
                  />
                </Box>
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Engineers</Typography>
                  <Typography variant="body2" fontWeight="bold">45</Typography>
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
                      width: '36%', 
                      height: '100%', 
                      backgroundColor: theme.palette.success.main,
                      borderRadius: 4
                    }} 
                  />
                </Box>
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Contractors</Typography>
                  <Typography variant="body2" fontWeight="bold">47</Typography>
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
                      width: '38%', 
                      height: '100%', 
                      backgroundColor: theme.palette.warning.main,
                      borderRadius: 4
                    }} 
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default AdminDashboardPage;
