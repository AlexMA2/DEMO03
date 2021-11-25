import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postAlumnos } from '../services/alumnosService';

const Alumnos = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nombre: 'Juan Gabriel Marcos Ramos',
      colegio: 'Alexander Von Humboldt '
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()       
        .max(255)
        .required(
          'Nombre del Alumno necesario'),
      colegio: Yup
        .string()
        .max(255)
        .required(
          'Colegio Necesario')
    }),
    onSubmit: () => {
      postAlumnos(formik.values)
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Alumnos | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Nombre del Alumno"
              margin="normal"
              name="nombre"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Colegio"
              margin="normal"
              name="colegio"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registrar Alumno
              </Button>
            </Box>
            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Alumnos;
