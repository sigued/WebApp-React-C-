import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import shortid from "shortid";
import { Equation } from "src/features/correlations/state/types";
import { Parameter } from "src/features/orders/state/types";

type ParametersTableProps = {
  title: string;
  headers: string[];
  parameters?: Parameter[];
  equations?: Equation[];
};
export function CorrelationTables({
  title,
  headers,
  parameters,
  equations,
}: ParametersTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} square>
      <Typography
        variant="h6"
        sx={{
          marginLeft: "8px",
          marginTop: "16px",
          marginBottom: "8px",
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={shortid()}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters?.map((param) => (
            <TableRow key={param.id}>
              <TableCell>{param.category}</TableCell>
              <TableCell>
                {param.name} {param.unit ? `(${param.unit})` : `(-)`}
              </TableCell>
              <TableCell>{param.symbole}</TableCell>
            </TableRow>
          ))}
          {equations?.map((eq) => (
            <TableRow key={eq.id}>
              <TableCell>{eq.equation}</TableCell>
              <TableCell>{eq.applicability}</TableCell>
              <TableCell>{eq.reference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
