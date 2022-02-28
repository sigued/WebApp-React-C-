import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { RequestedAccountTableRow } from "src/features/requestedAccount/components/RequestedAccountTableRow";
import { EmailInvitation } from "src/features/requestedAccount/state/types";

export function RequestedAccountTable() {
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/admin/emails",
    "GET"
  );
  const [emailInvitations, setEmailInvitations] = useState<EmailInvitation[]>(
    []
  );

  useEffect(() => {
    const handleGetAllInvitations = async () => {
      if (response?.ok) {
        var content: EmailInvitation[] = await response.json();
        setEmailInvitations(content);
      }
    };

    handleGetAllInvitations();
  }, [response]);

  return (
    <Paper elevation={8} square>
      <TableContainer component={Paper} elevation={0} square>
        <Table size="medium" aria-label="a medium table">
          <TableHead>
            <TableRow>
              <TableCell key={shortid()}>Courriel</TableCell>
              <TableCell key={shortid()}>Satut du courriel</TableCell>
              <TableCell key={shortid()}>Type du courriel</TableCell>
              <TableCell key={shortid()}>Description</TableCell>
              <TableCell key={shortid()}>Date de création</TableCell>
              <TableCell key={shortid()}>Date de fin</TableCell>
              <TableCell key={shortid()}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emailInvitations.map((requestedElement) => (
              <RequestedAccountTableRow
                key={shortid()}
                requestedElement={requestedElement}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
