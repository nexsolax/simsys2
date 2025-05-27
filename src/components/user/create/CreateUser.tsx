import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { useStore } from '../../../store';
import { UserCreateRequest, Users, UserUpdateRequest } from '../../../shared/models/user';
import { Roles } from '../../../shared/models/role';

interface Props {
  open: boolean;
  isEdit?: boolean;
  user?: Users | null;
  onClose: () => void;
}

const CreateUserDialog: React.FC<Props> = ({ open, isEdit, user, onClose }) => {
  const roles = useStore((state) => state.roles.rolesList);
  const fetchAllUsers = useStore((state) => state.fetchAllUsers);
  const createUser = useStore((state) => state.createUser);
  const updateUser = useStore((state) => state.updateUser);

  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState<Users | null>(null);
  useEffect(() => {
    if (isEdit && user) {
      setUserData(user);
      // setAvatar(user.avatar);
    } else {
      setUserData(null);
    }
  }, [isEdit, user]);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactInfo: Yup.string().required('Contact info is required'),
    role: Yup.string(),
  });

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit User' : 'New User'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            username: userData ? userData.username : '',
            email: userData ? userData.email : '',
            contactInfo: userData ? userData.contactInfo : '',
            password: '',
            roleGuid: userData ? userData.roleGuid : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const userCreate: UserCreateRequest = {
                ...values,
                isActive: true,
              };
              await createUser(userCreate);
            } else {
              const userUpdate: UserUpdateRequest = {
                ...values,
                isActive: true,
              };
              console.log(userUpdate);
              await updateUser(userData!.id, userUpdate);
            }
            await fetchAllUsers();
            setAvatar(null);
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
                <input
                  accept='image/*'
                  type='file'
                  id='avatar-upload'
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor='avatar-upload'>
                  <Button component='span'>
                    <PhotoCamera />
                    Upload Avatar
                  </Button>
                </label>
              </Box> */}

              <Grid container spacing={3} mt={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='username'
                    label='Username'
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='email'
                    label='Email address'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='contactInfo'
                    label='Contact Info'
                    value={values.contactInfo}
                    onChange={handleChange}
                    error={touched.contactInfo && Boolean(errors.contactInfo)}
                    helperText={touched.contactInfo && errors.contactInfo}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Field
                      as={Select}
                      name='roleGuid'
                      label='Role'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.roleGuid}
                    >
                      {roles?.map((role: Roles, index: number) => (
                        <MenuItem key={index} value={role.guid}>
                          {role.roleName}
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='roleGuid' />
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' mt={2}>
                <Button
                  sx={{
                    color: 'var(--palette-grey-800)',
                    bg: 'var(--palette-common-white)',
                    borderColor: 'transparent',
                    mr: 2,
                  }}
                  onClick={onClose}
                  variant='outlined'
                >
                  Cancel
                </Button>
                <Button
                  sx={{ bgcolor: 'var(--palette-grey-800)', color: 'var(--palette-common-white)' }}
                  type='submit'
                  variant='contained'
                >
                  {isEdit ? 'Save' : 'Create'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
