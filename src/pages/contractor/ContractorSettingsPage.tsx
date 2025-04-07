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
  Lock as LockIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import FormContainer from '../../components/forms/FormContainer';

const ContractorSettingsPage: React.FC = () => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskAssignments: true,
    projectUpdates: true,
    invitations: true,
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
    <MainLayout title="Settings" userRole="contractor" userName="Mike Johnson">
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
                M
              </Avatar>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Mike Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                mike.johnson@example.com
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
                Contractor
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
                    checked={notificationSettings.invitations} 
                    onChange={handleNotificationChange} 
                    name="invitations" 
                    color="primary"
                  />
                }
                label="Project Invitations"
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
                title="Company Information"
                subtitle="Update your company and contact information"
                fields={[
                  { name: 'firstName', label: 'First Name', required: true },
                  { name: 'lastName', label: 'Last Name', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true, fullWidth: true },
                  { name: 'phone', label: 'Phone Number', required: true },
                  { name: 'companyName', label: 'Company Name', required: true, fullWidth: true },
                  { name: 'businessType', label: 'Business Type', required: true },
                  { name: 'licenseNumber', label: 'Contractor License Number', required: true },
                  { name: 'taxId', label: 'Tax ID / EIN', required: true },
                  { name: 'address', label: 'Business Address', required: true, fullWidth: true },
                  { name: 'city', label: 'City', required: true },
                  { name: 'state', label: 'State', required: true },
                  { name: 'zipCode', label: 'ZIP Code', required: true },
                  { name: 'website', label: 'Website', required: false, fullWidth: true }
                ]}
                initialValues={{
                  firstName: 'Mike',
                  lastName: 'Johnson',
                  email: 'mike.johnson@example.com',
                  phone: '+1 (555) 123-4567',
                  companyName: 'Johnson Construction Services',
                  businessType: 'General Contractor',
                  licenseNumber: 'CONT-12345-GC',
                  taxId: '12-3456789',
                  address: '123 Construction Ave, Suite 200',
                  city: 'Metro City',
                  state: 'CA',
                  zipCode: '90210',
                  website: 'www.johnsonconstructionservices.com'
                }}
                onSubmit={handleProfileSubmit}
                submitButtonText="Update Company Information"
              />
            </Grid>

            <Grid item xs={12}>
              <FormContainer
                title="Services & Expertise"
                subtitle="Specify your areas of expertise and services offered"
                fields={[
                  { 
                    name: 'specializations', 
                    label: 'Specializations', 
                    required: true, 
                    fullWidth: true,
                    helperText: 'Separate multiple specializations with commas'
                  },
                  { 
                    name: 'servicesOffered', 
                    label: 'Services Offered', 
                    required: true, 
                    fullWidth: true,
                    multiline: true,
                    rows: 3,
                    helperText: 'List the services your company provides'
                  },
                  { 
                    name: 'yearsInBusiness', 
                    label: 'Years in Business', 
                    required: true,
                    type: 'number'
                  },
                  { 
                    name: 'teamSize', 
                    label: 'Team Size', 
                    required: true,
                    type: 'number'
                  },
                  { 
                    name: 'certifications', 
                    label: 'Certifications', 
                    required: false, 
                    fullWidth: true,
                    multiline: true,
                    rows: 2,
                    helperText: 'List any relevant certifications your company holds'
                  }
                ]}
                initialValues={{
                  specializations: 'Concrete Work, Structural Steel, Interior Finishing',
                  servicesOffered: 'Concrete pouring and finishing, Structural steel installation, Interior wall framing, Drywall installation, Painting',
                  yearsInBusiness: 15,
                  teamSize: 25,
                  certifications: 'OSHA Safety Certified, Green Building Certified, Quality Control Certified'
                }}
                onSubmit={handleProfileSubmit}
                submitButtonText="Update Services & Expertise"
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

export default ContractorSettingsPage;
