import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import { 
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import FormContainer from '../../components/forms/FormContainer';

const OwnerSettingsPage: React.FC = () => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskAssignments: true,
    projectUpdates: true,
    teamInvitations: true,
    deadlineReminders: true
  });

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked
    });
  };

  const handlePasswordSubmit = (values: any) => {
    console.log('Password change submitted:', values);
    setSnackbarOpen(true);
  };

  const handleProfileSubmit = (values: any) => {
    console.log('Profile update submitted:', values);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainLayout title="Settings" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Account Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your profile, preferences, and account security
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  bgcolor: theme.palette.primary.main
                }}
              >
                J
              </Avatar>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                john.doe@example.com
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  bgcolor: theme.palette.primary.main + '20', 
                  color: theme.palette.primary.main,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold',
                  mt: 1
                }}
              >
                Project Owner
              </Typography>

              <Box sx={{ mt: 2, position: 'relative' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCameraIcon />}
                    sx={{ mt: 2 }}
                  >
                    Change Photo
                  </Button>
                </label>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon sx={{ mr: 1 }} fontSize="small" />
              Notification Settings
            </Typography>

            <FormGroup sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onChange={handleNotificationChange} 
                    name="emailNotifications" 
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.taskAssignments} 
                    onChange={handleNotificationChange} 
                    name="taskAssignments" 
                    color="primary"
                  />
                }
                label="Task Assignments"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.projectUpdates} 
                    onChange={handleNotificationChange} 
                    name="projectUpdates" 
                    color="primary"
                  />
                }
                label="Project Updates"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.teamInvitations} 
                    onChange={handleNotificationChange} 
                    name="teamInvitations" 
                    color="primary"
                  />
                }
                label="Team Invitations"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.deadlineReminders} 
                    onChange={handleNotificationChange} 
                    name="deadlineReminders" 
                    color="primary"
                  />
                }
                label="Deadline Reminders"
              />
            </FormGroup>

            <Button 
              variant="contained" 
              startIcon={<SaveIcon />} 
              fullWidth 
              sx={{ mt: 3 }}
              onClick={() => setSnackbarOpen(true)}
            >
              Save Preferences
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormContainer
                title="Profile Information"
                subtitle="Update your personal information"
                fields={[
                  { name: 'firstName', label: 'First Name', required: true },
                  { name: 'lastName', label: 'Last Name', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true, fullWidth: true },
                  { name: 'phone', label: 'Phone Number', required: false },
                  { name: 'company', label: 'Company Name', required: false },
                  { name: 'position', label: 'Position', required: false }
                ]}
                initialValues={{
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'john.doe@example.com',
                  phone: '+1 (555) 123-4567',
                  company: 'ABC Construction',
                  position: 'Project Manager'
                }}
                onSubmit={handleProfileSubmit}
                submitButtonText="Update Profile"
              />
            </Grid>

            <Grid item xs={12}>
              <FormContainer
                title="Change Password"
                subtitle="Ensure your account is using a secure password"
                fields={[
                  { name: 'currentPassword', label: 'Current Password', type: 'password', required: true },
                  { name: 'newPassword', label: 'New Password', type: 'password', required: true },
                  { name: 'confirmPassword', label: 'Confirm New Password', type: 'password', required: true }
                ]}
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                onSubmit={handlePasswordSubmit}
                submitButtonText="Change Password"
              />
            </Grid>

            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1 }} fontSize="small" />
                  Security Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage your account security preferences
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Two-factor authentication"
                  />
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Login notification emails"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Require password reset every 90 days"
                  />
                </FormGroup>

                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  onClick={() => setSnackbarOpen(true)}
                >
                  Save Security Settings
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Settings updated successfully!
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default OwnerSettingsPage;
