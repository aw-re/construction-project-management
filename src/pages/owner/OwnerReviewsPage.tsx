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
  Rating,
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  Star as StarIcon,
  Add as AddIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for reviews
const mockReviews = [
  { 
    id: 1, 
    project: 'Skyline Tower Construction',
    reviewedUser: 'Jane Smith',
    userRole: 'engineer',
    rating: 5,
    comment: 'Excellent work on the structural design. Very detailed and professional approach to all challenges.',
    date: '2025-03-15T14:30:00Z'
  },
  { 
    id: 2, 
    project: 'Skyline Tower Construction',
    reviewedUser: 'Mike Johnson',
    userRole: 'contractor',
    rating: 4,
    comment: 'Good quality work and adherence to timeline. Some minor issues with material management but overall satisfied.',
    date: '2025-03-20T11:15:00Z'
  },
  { 
    id: 3, 
    project: 'Riverside Apartments Renovation',
    reviewedUser: 'Robert Brown',
    userRole: 'engineer',
    rating: 3,
    comment: 'Adequate technical skills but communication could be improved. Had to follow up multiple times for updates.',
    date: '2025-02-28T16:45:00Z'
  },
  { 
    id: 4, 
    project: 'Central Park Office Building',
    reviewedUser: 'Emily Davis',
    userRole: 'contractor',
    rating: 5,
    comment: 'Outstanding work quality and excellent communication. Completed all tasks ahead of schedule with great attention to detail.',
    date: '2025-03-10T09:20:00Z'
  },
  { 
    id: 5, 
    project: 'Harbor View Hotel',
    reviewedUser: 'David Wilson',
    userRole: 'engineer',
    rating: 4,
    comment: 'Very knowledgeable and responsive. Provided innovative solutions to complex design challenges.',
    date: '2025-03-25T13:40:00Z'
  },
  { 
    id: 6, 
    project: 'Greenfield Residential Community',
    reviewedUser: 'Lisa Taylor',
    userRole: 'engineer',
    rating: 5,
    comment: 'Exceptional attention to detail and sustainable design principles. A pleasure to work with.',
    date: '2025-03-05T15:30:00Z'
  },
  { 
    id: 7, 
    project: 'Industrial Park Warehouses',
    reviewedUser: 'Alex Turner',
    userRole: 'contractor',
    rating: 2,
    comment: 'Significant delays and quality issues. Required constant supervision and multiple corrections.',
    date: '2025-02-20T10:15:00Z'
  }
];

// Mock data for projects and team members
const mockProjects = [
  { id: 1, name: 'Skyline Tower Construction' },
  { id: 2, name: 'Riverside Apartments Renovation' },
  { id: 3, name: 'Central Park Office Building' },
  { id: 4, name: 'Harbor View Hotel' },
  { id: 5, name: 'Metro City Hospital Extension' }
];

const mockTeamMembers = [
  { id: 1, name: 'Jane Smith', role: 'engineer', company: 'Smith Engineering' },
  { id: 2, name: 'Robert Brown', role: 'engineer', company: 'Brown Engineering' },
  { id: 3, name: 'Lisa Taylor', role: 'engineer', company: 'Taylor Engineering' },
  { id: 4, name: 'David Wilson', role: 'engineer', company: 'Wilson Engineering' },
  { id: 5, name: 'Mike Johnson', role: 'contractor', company: 'Johnson Contractors' },
  { id: 6, name: 'Emily Davis', role: 'contractor', company: 'Davis Construction' },
  { id: 7, name: 'Alex Turner', role: 'contractor', company: 'Turner Builders' }
];

const OwnerReviewsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    project: '',
    teamMember: '',
    rating: 0,
    comment: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleReviewDialogOpen = () => {
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleSubmitReview = () => {
    // Handle submit review logic here
    console.log('Submitting review:', newReview);
    setReviewDialogOpen(false);
  };

  const handleReviewChange = (field: string, value: any) => {
    setNewReview({
      ...newReview,
      [field]: value
    });
  };

  const getFilteredReviews = () => {
    let filtered = mockReviews.filter(review => 
      review.reviewedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(review => review.userRole === 'engineer');
    } else if (tabValue === 2) {
      filtered = filtered.filter(review => review.userRole === 'contractor');
    }

    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'engineer':
        return theme.palette.success.main;
      case 'contractor':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <MainLayout title="Reviews" userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and submit reviews for engineers and contractors
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <TextField
          placeholder="Search reviews..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleReviewDialogOpen}
        >
          Submit New Review
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Reviews" />
          <Tab label="Engineers" />
          <Tab label="Contractors" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredReviews()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getRoleColor(review.userRole) + '30',
                          color: getRoleColor(review.userRole),
                          width: 40,
                          height: 40,
                          mr: 2
                        }}
                      >
                        {review.reviewedUser.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {review.reviewedUser}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            label={review.userRole.charAt(0).toUpperCase() + review.userRole.slice(1)} 
                            size="small" 
                            sx={{ 
                              backgroundColor: getRoleColor(review.userRole) + '20',
                              color: getRoleColor(review.userRole),
                              fontWeight: 'bold',
                              textTransform: 'capitalize',
                              mr: 1
                            }} 
                          />
                          <Typography variant="body2" color="text.secondary">
                            {review.project}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(review.date)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" />}
                    />
                  </Box>
                  
                  <Typography variant="body1">
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TablePagination
          component="div"
          count={getFilteredReviews().length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

      {getFilteredReviews().length === 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No reviews found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters, or submit a new review.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={handleReviewDialogOpen}
          >
            Submit New Review
          </Button>
        </Paper>
      )}

      {/* Submit review dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={handleReviewDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit New Review</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project"
                select
                variant="outlined"
                value={newReview.project}
                onChange={(e) => handleReviewChange('project', e.target.value)}
                required
              >
                {mockProjects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Team Member"
                select
                variant="outlined"
                value={newReview.teamMember}
                onChange={(e) => handleReviewChange('teamMember', e.target.value)}
                required
              >
                {mockTeamMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name} ({member.role}) - {member.company}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Rating
              </Typography>
              <Rating
                name="rating"
                value={newReview.rating}
                onChange={(event, newValue) => {
                  handleReviewChange('rating', newValue);
                }}
                precision={0.5}
                size="large"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Review Comments"
                variant="outlined"
                multiline
                rows={4}
                value={newReview.comment}
                onChange={(e) => handleReviewChange('comment', e.target.value)}
                placeholder="Provide detailed feedback about the team member's performance"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSubmitReview} 
            color="primary" 
            variant="contained"
            disabled={!newReview.project || !newReview.teamMember || !newReview.rating || !newReview.comment}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default OwnerReviewsPage;
