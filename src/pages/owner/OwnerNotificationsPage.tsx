import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Badge,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Comment as CommentIcon,
  Build as BuildIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for notifications
const mockNotifications = [
  { 
    id: 1, 
    type: 'task',
    title: 'Task assigned to you',
    message: 'Foundation inspection task has been assigned to Jane Smith',
    project: 'Skyline Tower Construction',
    date: '2025-04-06T10:30:00Z',
    read: false
  },
  { 
    id: 2, 
    type: 'comment',
    title: 'New comment on task',
    message: 'Robert Brown commented on Electrical wiring task',
    project: 'Skyline Tower Construction',
    date: '2025-04-05T14:15:00Z',
    read: false
  },
  { 
    id: 3, 
    type: 'invitation',
    title: 'Invitation accepted',
    message: 'Mike Johnson accepted your invitation to join Riverside Apartments Renovation',
    project: 'Riverside Apartments Renovation',
    date: '2025-04-04T16:20:00Z',
    read: true
  },
  { 
    id: 4, 
    type: 'task',
    title: 'Task completed',
    message: 'Site preparation task has been marked as complete by Emily Davis',
    project: 'Central Park Office Building',
    date: '2025-04-03T11:10:00Z',
    read: true
  },
  { 
    id: 5, 
    type: 'deadline',
    title: 'Upcoming deadline',
    message: 'Concrete pouring task is due in 2 days',
    project: 'Skyline Tower Construction',
    date: '2025-04-02T09:45:00Z',
    read: true
  },
  { 
    id: 6, 
    type: 'invitation',
    title: 'Invitation declined',
    message: 'Lisa Taylor declined your invitation to join Harbor View Hotel',
    project: 'Harbor View Hotel',
    date: '2025-04-01T13:50:00Z',
    read: true
  },
  { 
    id: 7, 
    type: 'comment',
    title: 'New comment on task',
    message: 'David Wilson commented on Plumbing installation task',
    project: 'Riverside Apartments Renovation',
    date: '2025-03-31T10:15:00Z',
    read: true
  }
];

const OwnerNotificationsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, notificationId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotificationId(notificationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = () => {
    // Handle mark as read logic here
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    handleMenuClose();
  };

  const handleMarkAllAsRead = () => {
    // Handle mark all as read logic here
  };

  const getFilteredNotifications = () => {
    // Filter by tab
    if (tabValue === 1) {
      return mockNotifications.filter(notification => !notification.read);
    } else if (tabValue === 2) {
      return mockNotifications.filter(notification => notification.read);
    }
    return mockNotifications;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <AssignmentIcon />;
      case 'comment':
        return <CommentIcon />;
      case 'invitation':
        return <PersonIcon />;
      case 'deadline':
        return <ScheduleIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'task':
        return theme.palette.primary.main;
      case 'comment':
        return theme.palette.info.main;
      case 'invitation':
        return theme.palette.success.main;
      case 'deadline':
        return theme.palette.warning.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  const unreadCount = mockNotifications.filter(notification => !notification.read).length;

  return (
    <MainLayout title="Notifications" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with project activities and team communications
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All Notifications" />
            <Tab 
              label={
                <Badge badgeContent={unreadCount} color="error" sx={{ pr: 2 }}>
                  Unread
                </Badge>
              } 
            />
            <Tab label="Read" />
          </Tabs>
        </Box>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          sx={{ ml: 2 }}
        >
          Mark All as Read
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4
        }}
      >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="more"
                      onClick={(e) => handleMenuOpen(e, notification.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{ 
                    py: 2,
                    px: 3,
                    backgroundColor: notification.read ? 'inherit' : theme.palette.action.hover
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={notification.read ? 'regular' : 'bold'}>
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(notification.date)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {notification.message}
                        </Typography>
                        <Chip 
                          label={notification.project} 
                          size="small" 
                          variant="outlined"
                          color="primary"
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < getFilteredNotifications().length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <NotificationsIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 1 
                  ? "You don't have any unread notifications" 
                  : tabValue === 2 
                    ? "You don't have any read notifications" 
                    : "You don't have any notifications yet"}
              </Typography>
            </Box>
          )}
        </List>
      </Paper>

      {/* Notification action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMarkAsRead}>
          <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
          Mark as {selectedNotificationId && mockNotifications.find(n => n.id === selectedNotificationId)?.read ? 'unread' : 'read'}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </MainLayout>
  );
};

export default OwnerNotificationsPage;
