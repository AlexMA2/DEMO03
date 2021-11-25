import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";

export const LatestOrders = (props) => {
  const estudiantes = props.estudiantes
  return (
    <Card {...props}>
      <CardHeader title="Alumnos con mejor puntaje" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Colegio</TableCell>
                <TableCell>Estudiante</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Fecha
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Promedio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estudiantes.map((es, index) => (
                <TableRow hover key={index}>
                  <TableCell>{es.colegio}</TableCell>
                  <TableCell>{es.alumno}</TableCell>
                  <TableCell>{es.fecha}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(es.nota > 15 && "success") || (es.nota > 11 && "warning") || "error"}
                    >
                      {es.nota}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  );
};
