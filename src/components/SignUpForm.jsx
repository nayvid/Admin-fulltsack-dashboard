import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../state';

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().required("required").email("invalid email"),
  password: yup.string().required("required").min(6, "Password must be at least 6 characters"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    dispatch(registerStart());
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.jwt) {
        dispatch(registerSuccess({ user: data.user, token: data.jwt }));
        onSubmitProps.resetForm();
      } else {
        dispatch(registerFailure(data.error));
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <Box width="80%" m="100px auto">
      <Typography variant="h3" textAlign="center" mb="30px">
        Sign Up
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
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
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <TextField
                fullWidth
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                SIGN UP
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;