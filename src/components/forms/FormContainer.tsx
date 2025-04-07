import React from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  helperText?: string;
}

interface FormContainerProps {
  title: string;
  subtitle?: string;
  fields: FormFieldProps[];
  onSubmit: (values: any) => void;
  initialValues: Record<string, any>;
  validationSchema?: any;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  initialValues,
  validationSchema,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  onCancel
}) => {
  const theme = useTheme();
  
  // Create default validation schema if not provided
  const defaultValidationSchema = Yup.object().shape(
    fields.reduce((schema: any, field) => {
      if (field.required) {
        schema[field.name] = Yup.string().required(`${field.label} is required`);
      }
      return schema;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema || defaultValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid 
              item 
              xs={12} 
              md={field.fullWidth ? 12 : 6} 
              key={field.name}
              
            >
              {field.options ? (
                <FormControl 
                  fullWidth 
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  disabled={field.disabled}
                >
                  <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                  <Select
                    labelId={`${field.name}-label`}
                    id={field.name}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched[field.name] && formik.errors[field.name] && (
                    <FormHelperText>{formik.errors[field.name] as string}</FormHelperText>
                  )}
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || 'text'}
                  multiline={field.multiline}
                  rows={field.rows}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name] as string}
                  disabled={field.disabled}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {onCancel && (
            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={onCancel}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
          >
            {submitButtonText}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default FormContainer;
