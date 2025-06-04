import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  AlertColor,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStore } from '../../store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ProfileDetail: React.FC = () => {
  const user = useStore((state) => state.auth.user);
  const updateProfile = useStore((state) => state.updateProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactInfo: Yup.string().required('Contact info is required'),
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await updateProfile({
        username: values.username,
        gmail: values.email,
        contactInfo: values.contactInfo,
      });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please login to view your profile</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant='h5'>Profile Information</Typography>
          {/* <Button variant='outlined' startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button> */}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={
                avatar ||
                'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp'
              }
              sx={{ width: 100, height: 100 }}
            />
            {/* <input
              accept='image/*'
              style={{ display: 'none' }}
              id='avatar-upload'
              type='file'
              onChange={handleAvatarChange}
            />
            <label htmlFor='avatar-upload'>
              <IconButton
                component='span'
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label> */}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Username
            </Typography>
            <Typography variant='body1'>{user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' color='text.secondary'>
              Email
            </Typography>
            <Typography variant='body1'>{user.gmail}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='text.secondary'>
              Contact Information
            </Typography>
            <Typography variant='body1'>{user.contactInfo}</Typography>
          </Grid>
        </Grid>

        <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth='sm' fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <Formik
            initialValues={{
              username: user.username,
              email: user.gmail,
              contactInfo: user.contactInfo,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name='username'
                        label='Username'
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name='email'
                        label='Email'
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name='contactInfo'
                        label='Contact Information'
                        error={touched.contactInfo && Boolean(errors.contactInfo)}
                        helperText={touched.contactInfo && errors.contactInfo}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>

        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={'error' as AlertColor}
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={Boolean(success)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={'success' as AlertColor}
            sx={{ width: '100%' }}
          >
            {success}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ProfileDetail;
