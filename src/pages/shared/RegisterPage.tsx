import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Link, 
  Grid,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  useTheme
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Engineering as EngineeringIcon,
  Construction as ConstructionIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface RegisterPageProps {
  onRegister: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: string;
    userType: 'owner' | 'engineer' | 'contractor';
  }) => void;
  isLoading?: boolean;
  error?: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ 
  onRegister, 
  isLoading = false, 
  error 
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Account Type', 'Personal Information', 'Account Details'];

  const validationSchema = [
    // Step 1 validation
    Yup.object({
      userType: Yup.string()
        .oneOf(['owner', 'engineer', 'contractor'], 'Please select a valid account type')
        .required('Account type is required')
    }),
    // Step 2 validation
    Yup.object({
      firstName: Yup.string()
        .required('First name is required'),
      lastName: Yup.string()
        .required('Last name is required'),
      phone: Yup.string()
        .required('Phone number is required'),
        company: Yup.string().when('userType', (userType: any) =>
          (userType === 'engineer' || userType === 'contractor')
            ? Yup.string().required('Company name is required')
            : Yup.string()
        ),
    }),
    // Step 3 validation
    Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
    })
  ];

  const formik = useFormik({
    initialValues: {
      userType: '',
      firstName: '',
      lastName: '',
      phone: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema[activeStep],
    onSubmit: (values) => {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        const { confirmPassword, ...userData } = values;
        onRegister(userData as any);
      }
    }
  });

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <FormLabel component="legend">Select Account Type</FormLabel>
            <RadioGroup
              aria-label="user-type"
              name="userType"
              value={formik.values.userType}
              onChange={formik.handleChange}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2, 
                mt: 2 
              }}>
                <Paper 
                  elevation={formik.values.userType === 'owner' ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    flex: 1, 
                    borderRadius: 2,
                    border: formik.values.userType === 'owner' 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => formik.setFieldValue('userType', 'owner')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountCircleIcon 
                      color={formik.values.userType === 'owner' ? 'primary' : 'action'} 
                      sx={{ mr: 1 }} 
                    />
                    <FormControlLabel 
                      value="owner" 
                      control={<Radio />} 
                      label="Project Owner" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                    Create and manage construction projects, invite engineers and contractors
                  </Typography>
                </Paper>

                <Paper 
                  elevation={formik.values.userType === 'engineer' ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    flex: 1, 
                    borderRadius: 2,
                    border: formik.values.userType === 'engineer' 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => formik.setFieldValue('userType', 'engineer')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EngineeringIcon 
                      color={formik.values.userType === 'engineer' ? 'primary' : 'action'} 
                      sx={{ mr: 1 }} 
                    />
                    <FormControlLabel 
                      value="engineer" 
                      control={<Radio />} 
                      label="Engineer" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                    Manage project tasks, upload reports, and collaborate with contractors
                  </Typography>
                </Paper>

                <Paper 
                  elevation={formik.values.userType === 'contractor' ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    flex: 1, 
                    borderRadius: 2,
                    border: formik.values.userType === 'contractor' 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => formik.setFieldValue('userType', 'contractor')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ConstructionIcon 
                      color={formik.values.userType === 'contractor' ? 'primary' : 'action'} 
                      sx={{ mr: 1 }} 
                    />
                    <FormControlLabel 
                      value="contractor" 
                      control={<Radio />} 
                      label="Contractor" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                    Receive tasks, submit reports, and track project progress
                  </Typography>
                </Paper>
              </Box>
            </RadioGroup>
            {formik.touched.userType && formik.errors.userType && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {formik.errors.userType}
              </Typography>
            )}
          </FormControl>
        );
      case 1:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                margin="normal"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                margin="normal"
                variant="outlined"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                margin="normal"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {(formik.values.userType === 'engineer' || formik.values.userType === 'contractor') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="company"
                  name="company"
                  label="Company Name"
                  margin="normal"
                  variant="outlined"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.company && Boolean(formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                margin="normal"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        p: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 700, 
          width: '100%',
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join the Construction Project Management platform
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Box 
            sx={{ 
              p: 2, 
              mb: 3, 
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.dark,
              borderRadius: 1
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        <form onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="inherit"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              sx={{ 
                py: 1,
                px: 3,
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              {isLoading 
                ? 'Processing...' 
                : activeStep === steps.length - 1 
                  ? 'Create Account' 
                  : 'Continue'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" fontWeight="bold">
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
