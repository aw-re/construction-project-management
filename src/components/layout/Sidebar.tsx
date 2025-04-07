import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Build as ProjectsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  People as UsersIcon,
  History as ActivityIcon,
  Description as ReportsIcon,
  Mail as InvitationsIcon,
  Star as ReviewsIcon
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userRole: 'admin' | 'owner' | 'engineer' | 'contractor';
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, userRole }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
          { text: 'Activity Log', icon: <ActivityIcon />, path: '/admin/activity-log' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }
        ];
      case 'owner':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' },
          { text: 'Projects', icon: <ProjectsIcon />, path: '/owner/projects' },
          { text: 'Invitations', icon: <InvitationsIcon />, path: '/owner/invitations' },
          { text: 'Reviews', icon: <ReviewsIcon />, path: '/owner/reviews' },
          { text: 'Notifications', icon: <NotificationsIcon />, path: '/owner/notifications' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/owner/settings' }
        ];
      case 'engineer':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/engineer/dashboard' },
          { text: 'Tasks', icon: <TasksIcon />, path: '/engineer/tasks' },
          { text: 'Projects', icon: <ProjectsIcon />, path: '/engineer/projects' },
          { text: 'Reports', icon: <ReportsIcon />, path: '/engineer/reports' },
          { text: 'Notifications', icon: <NotificationsIcon />, path: '/engineer/notifications' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/engineer/settings' }
        ];
      case 'contractor':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/contractor/dashboard' },
          { text: 'Tasks', icon: <TasksIcon />, path: '/contractor/tasks' },
          { text: 'Projects', icon: <ProjectsIcon />, path: '/contractor/projects' },
          { text: 'Reports', icon: <ReportsIcon />, path: '/contractor/reports' },
          { text: 'Invitations', icon: <InvitationsIcon />, path: '/contractor/invitations' },
          { text: 'Notifications', icon: <NotificationsIcon />, path: '/contractor/notifications' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/contractor/settings' }
        ];
      default:
        return [];
    }
  };

  const drawerContent = (
    <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Construction PM
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
          {userRole} Portal
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {getMenuItems().map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.text}
            selected={location.pathname === item.path}
            onClick={isMobile ? onClose : undefined}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          © 2025 Construction PM
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
