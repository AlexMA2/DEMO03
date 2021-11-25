import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

import { useState, useEffect } from "react";

import { getAlumnos } from '../services/alumnosService.js'
import { getEscuelas } from '../services/escuelasService.js'
import { es } from "date-fns/locale";

const Dashboard = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [valores, setValores] = useState({totalAlumnos: 0, totalEscuelas: 0, porcentaje: 0, popular: [], estudiantes: []});
  
  useEffect(() => {
    getAlumnos()
      .then(data => {
        setAlumnos(data);
    })
    getEscuelas()
      .then(data => {
        setEscuelas(data);
    })
    
  }, []);

  useEffect(() => {
    
    const alumnosSinColegio = alumnos ? alumnos.filter(alumno => alumno.school === '') : []
    const colegios = escuelas ? escuelas : []
    colegios.sort((a, b) => (a.estudiantes > b.estudiantes) ? -1 : 1);
    const estudiantes = alumnos ? alumnos : []
    estudiantes.sort((a, b) => (a.promedio > b.promedio) ? -1 : 1);
    const popularColegios = colegios.slice(0, 3);

    const totalAlumnos = alumnos ? alumnos.length : 1 
    const totalEscuelas = escuelas ? escuelas.length : 1   
    const porc = (alumnosSinColegio.length / totalAlumnos) * 100;
    setValores({...valores, totalAlumnos: totalAlumnos, totalEscuelas: totalEscuelas, porcentaje: porc, popular: popularColegios, estudiantes: estudiantes});
  }, [alumnos, escuelas]);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget studentsTotal={valores.totalAlumnos}/>
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers schoolTotal={valores.totalEscuelas} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress percentage={valores.porcentaje}  />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice popular={valores.popular} sx={{ height: "100%" }} />
            </Grid>

            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders estudiantes={valores.estudiantes}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
    
  );
  
  
};
Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Dashboard;
