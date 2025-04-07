import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Upload as UploadIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for reports
const mockReports = [
  { 
    id: 1, 
    title: 'Foundation Inspection Report', 
    description: 'Detailed report on foundation inspection including structural integrity assessment and recommendations.',
    project: 'Skyline Tower Construction',
    task: 'Foundation Inspection',
    type: 'technical',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    uploadDate: '2025-04-05T14:30:00Z',
    status: 'submitted'
  },
  { 
    id: 2, 
    title: 'Electrical System Design', 
    description: 'Complete electrical system design documentation including wiring diagrams, load calculations, and equipment specifications.',
    project: 'Skyline Tower Construction',
    task: 'Electrical Wiring - Floor 1',
    type: 'design',
    fileType: 'pdf',
    fileSize: '5.7 MB',
    uploadDate: '2025-04-03T10:15:00Z',
    status: 'submitted'
  },
  { 
    id: 3, 
    title: 'Structural Analysis Results', 
    description: 'Analysis results of structural elements including load-bearing capacity, stress distribution, and safety factors.',
    project: 'Central Park Office Building',
    task: 'Structural Design Review',
    type: 'analysis',
    fileType: 'pdf',
    fileSize: '3.2 MB',
    uploadDate: '2025-04-01T16:45:00Z',
    status: 'draft'
  },
  { 
    id: 4, 
    title: 'Site Survey Photos', 
    description: 'Collection of high-resolution photos from the site survey showing existing conditions and key features.',
    project: 'Metro City Hospital Extension',
    task: 'Site Survey Analysis',
    type: 'visual',
    fileType: 'zip',
    fileSize: '18.5 MB',
    uploadDate: '2025-03-28T09:20:00Z',
    status: 'submitted'
  },
  { 
    id: 5, 
    title: 'Plumbing System Layout', 
    description: 'Detailed plumbing system layout drawings for all floors including water supply, drainage, and fixture locations.',
    project: 'Riverside Apartments Renovation',
    task: 'Plumbing System Design',
    type: 'design',
    fileType: 'dwg',
    fileSize: '4.8 MB',
    uploadDate: '2025-03-25T13:40:00Z',
    status: 'draft'
  },
  { 
    id: 6, 
    title: 'HVAC Equipment Specifications', 
    description: 'Technical specifications for HVAC equipment including performance requirements, dimensions, and installation guidelines.',
    project: 'Harbor View Hotel',
    task: 'HVAC Installation Plan',
    type: 'technical',
    fileType: 'docx',
    fileSize: '1.9 MB',
    uploadDate: '2025-03-20T15:30:00Z',
    status: 'submitted'
  },
  { 
    id: 7, 
    title: 'Roof Design Calculations', 
    description: 'Structural calculations for roof design including load analysis, material specifications, and drainage considerations.',
    project: 'Central Park Office Building',
    task: 'Roof Design Specifications',
    type: 'analysis',
    fileType: 'xlsx',
    fileSize: '1.2 MB',
    uploadDate: '2025-03-15T10:15:00Z',
    status: 'submitted'
  }
];

// Mock data for projects
const mockProjects = [
  { id: 1, name: 'Skyline Tower Construction' },
  { id: 2, name: 'Riverside Apartments Renovation' },
  { id: 3, name: 'Central Park Office Building' },
  { id: 4, name: 'Harbor View Hotel' },
  { id: 5, name: 'Metro City Hospital Extension' }
];

const EngineerReportsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [reportDetailOpen, setReportDetailOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const handleReportDetailOpen = (report: any) => {
    setSelectedReport(report);
    setReportDetailOpen(true);
  };

  const handleReportDetailClose = () => {
    setReportDetailOpen(false);
  };

  const getFilteredReports = () => {
    let filtered = mockReports.filter(report => 
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.project.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (projectFilter === 'all' || report.project === projectFilter) &&
      (typeFilter === 'all' || report.type === typeFilter)
    );

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(report => report.status === 'submitted');
    } else if (tabValue === 2) {
      filtered = filtered.filter(report => report.status === 'draft');
    }

    return filtered;
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <PdfIcon />;
      case 'jpg':
      case 'png':
      case 'zip':
        return <ImageIcon />;
      case 'docx':
      case 'doc':
        return <DescriptionIcon />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <DescriptionIcon />;
      case 'dwg':
        return <DescriptionIcon />;
      default:
        return <FileIcon />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return theme.palette.primary.main;
      case 'design':
        return theme.palette.success.main;
      case 'analysis':
        return theme.palette.warning.main;
      case 'visual':
        return theme.palette.info.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return theme.palette.warning.main;
      case 'submitted':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <MainLayout title="Reports" userRole="engineer" userName="Jane Smith">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Reports & Documents
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and upload reports, designs, and documentation for your projects
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <TextField
          placeholder="Search reports..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 250 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            select
            label="Project"
            variant="outlined"
            size="small"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 200 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All Projects</MenuItem>
            {mockProjects.map((project) => (
              <MenuItem key={project.id} value={project.name}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Type"
            variant="outlined"
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 150 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="technical">Technical</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="analysis">Analysis</MenuItem>
            <MenuItem value="visual">Visual</MenuItem>
          </TextField>
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            onClick={handleUploadDialogOpen}
          >
            Upload Report
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Reports" />
          <Tab label="Submitted" />
          <Tab label="Drafts" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredReports().map((report) => (
          <Grid item xs={12} md={6} key={report.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: theme.palette.background.default,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {getFileIcon(report.fileType)}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold">
                      {report.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip 
                        label={report.type.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getTypeColor(report.type) + '20',
                          color: getTypeColor(report.type),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                      <Chip 
                        label={report.status.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStatusColor(report.status) + '20',
                          color: getStatusColor(report.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                      <Typography variant="caption" color="text.secondary">
                        {report.fileType.toUpperCase()} • {report.fileSize}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {report.description}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Project
                    </Typography>
                    <Typography variant="body2">
                      {report.project}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Related Task
                    </Typography>
                    <Typography variant="body2">
                      {report.task}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Upload Date
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(report.uploadDate)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
                <Button 
                  size="small" 
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleReportDetailOpen(report)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {getFilteredReports().length === 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <DescriptionIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No reports found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters, or upload a new report.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            sx={{ mt: 2 }}
            onClick={handleUploadDialogOpen}
          >
            Upload Report
          </Button>
        </Paper>
      )}

      {/* Upload report dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={handleUploadDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload New Report</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Title"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project"
                select
                variant="outlined"
                required
              >
                {mockProjects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Related Task"
                select
                variant="outlined"
                required
              >
                <MenuItem value="1">Foundation Inspection</MenuItem>
                <MenuItem value="2">Electrical Wiring - Floor 1</MenuItem>
                <MenuItem value="3">Structural Design Review</MenuItem>
                <MenuItem value="4">Plumbing System Design</MenuItem>
                <MenuItem value="5">HVAC Installation Plan</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Report Type"
                select
                variant="outlined"
                required
              >
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="analysis">Analysis</MenuItem>
                <MenuItem value="visual">Visual</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                select
                variant="outlined"
                required
              >
                <MenuItem value="draft">Save as Draft</MenuItem>
                <MenuItem value="submitted">Submit</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center'
                }}
              >
                <UploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                <Typography variant="body1" gutterBottom>
                  Drag and drop files here or click to browse
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, DWG, ZIP (Max size: 50MB)
                </Typography>
                <Button 
                  variant="contained" 
                  component="label" 
                  sx={{ mt: 2 }}
                >
                  Browse Files
                  <input
                    type="file"
                    hidden
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleUploadDialogClose} color="primary" variant="contained">
            Upload Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report detail dialog */}
      <Dialog
        open={reportDetailOpen}
        onClose={handleReportDetailClose}
        maxWidth="md"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    mr: 2, 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.secondary
                  }}
                >
                  {getFileIcon(selectedReport.fileType)}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedReport.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip 
                      label={selectedReport.type.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getTypeColor(selectedReport.type) + '20',
                        color: getTypeColor(selectedReport.type),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }} 
                    />
                    <Chip 
                      label={selectedReport.status.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getStatusColor(selectedReport.status) + '20',
                        color: getStatusColor(selectedReport.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }} 
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedReport.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Project
                  </Typography>
                  <Typography variant="body1">
                    {selectedReport.project}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Related Task
                  </Typography>
                  <Typography variant="body1">
                    {selectedReport.task}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    File Type
                  </Typography>
                  <Typography variant="body1">
                    {selectedReport.fileType.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    File Size
                  </Typography>
                  <Typography variant="body1">
                    {selectedReport.fileSize}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Upload Date
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedReport.uploadDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {selectedReport.status}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    File Preview
                  </Typography>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      textAlign: 'center',
                      bgcolor: theme.palette.background.default
                    }}
                  >
                    {getFileIcon(selectedReport.fileType)}
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {selectedReport.title}.{selectedReport.fileType}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Preview not available. Download the file to view its contents.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReportDetailClose} color="inherit">
                Close
              </Button>
              <Button 
                color="primary" 
                variant="contained"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MainLayout>
  );
};

export default EngineerReportsPage;
