import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postEscuelas} from '../services/alumnosService';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Escuela = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nombre: '',
      director: '',
      direccion: '',
      cantidad: '',
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()        
        .max(255)
        .required(
          'Nombre necesario'),
      director: Yup
        .string()
        .max(255)
        .required(
          'Director Necesario'),
      direccion: Yup
        .string()
        .max(255)
        .required(
          'Direccion necesaria'),
      cantidad: Yup
        .string()
        .max(255)
        .required(
          'Cantidad de Alumnos necesario'),     
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>
          Escuela | Material Kit
        </title>
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
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Registra una nueva escuela
              </Typography>         
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Nombre del colegio"
              margin="normal"
              name="nombre"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Director"
              margin="normal"
              name="director"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Direccion"
              margin="normal"
              name="direccion"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}             
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Cantidad de Alumnado"
              margin="normal"
              name="cantidad"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}          
              value={formik.values.password}
              variant="outlined"
            />
            
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registra escuela
              </Button>
            </Box>
           
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Escuela;
