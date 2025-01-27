import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../state';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object().shape({
  identifier: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(loginStart());
    setError(null);
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: values.identifier,
          password: values.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ 
          user: data.user, 
          token: data.jwt 
        }));
        navigate('/');
      } else {
        setError(data.error?.message || 'Login failed');
        dispatch(loginFailure(data.error));
      }
    } catch (error) {
      setError('Network error occurred');
      dispatch(loginFailure(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box width="80%" m="100px auto">
      <Typography variant="h3" textAlign="center" mb="30px">
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap="30px"
              maxWidth="400px"
              margin="auto"
            >
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.identifier && !!errors.identifier}
                helperText={touched.identifier && errors.identifier}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "LOGIN"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;