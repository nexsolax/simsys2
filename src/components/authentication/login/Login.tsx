import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid2 } from '@mui/material';

import useAuthStore from '../../../store/authStore';

const Login: React.FC = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Too short').required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted', values);
      const fakeToken = 'mockAccessToken123';
      setAccessToken(fakeToken);
      navigate('/dashboard/overview');
    },
  });

  return (
    <Grid2 container minHeight={'100vh'} alignItems={'center'}>
      <Grid2 container minHeight={'100vh'} alignItems={'center'} bgcolor={'#fbfafa'} size={4}>
        <Container sx={{ textAlign: 'center' }} maxWidth='sm'>
          <Typography variant='h3'>Hi, Welcome back</Typography>
          <Typography sx={{ mt: 2, mb: 4 }} variant='subtitle1'>
            More effectively with optimized workflows.
          </Typography>
          <img width={'100%'} src='/images/login-illustration.webp' alt='' />
        </Container>
      </Grid2>
      <Grid2 size={8}>
        <Container maxWidth='xs'>
          <Box>
            <Typography variant='h4' gutterBottom>
              Sign in to your account
            </Typography>
            <Typography sx={{ mt: 2, mb: 3 }} variant='subtitle2' gutterBottom>
              Don’t have an account? Get started
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                sx={{ mb: 1, mt: 2 }}
                label='Email address'
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                sx={{ mb: 1, mt: 2 }}
                label='Password'
                type='password'
                placeholder='6+ characters'
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                sx={{
                  display: 'flex',
                  justifySelf: 'flex-end',
                  p: 0,
                  mt: 1,
                  mb: 2,
                }}
                variant='text'
              >
                <Typography
                  fontWeight={600}
                  sx={{ color: 'var(--palette-text-primary)' }}
                  variant='caption'
                >
                  Forgot password?
                </Typography>
              </Button>
              <Button
                sx={{
                  bgcolor: 'var(--palette-grey-800)',
                  color: 'var(--palette-common-white)',
                  py: 2,
                  px: 1,
                }}
                type='submit'
                variant='contained'
                fullWidth
              >
                Sign in
              </Button>
            </form>
          </Box>
        </Container>
      </Grid2>
    </Grid2>
  );
};

export default Login;
