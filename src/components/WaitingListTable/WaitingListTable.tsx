import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";
import deleteImg from "../../static/delete.png";
import { IconButton } from "@mui/material";
import { WaitingListData } from "../../global/types";

interface Column {
  id: "delete" | "queuePosition" | "fullName" | "phoneNumber";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

type WaitingListTableProps = {
  waitingList: WaitingListData[];
  onRowClick: (data: WaitingListData) => void;
  onRowDeleteClick: (data: WaitingListData) => void;
};

export default function WaitingListTable({
  waitingList,
  onRowClick,
  onRowDeleteClick,
}: WaitingListTableProps) {
  const { t } = useTranslation();

  const columns: readonly Column[] = [
    { id: "delete", label: "" },
    { id: "queuePosition", label: "#" },
    { id: "fullName", label: t("register.table.name") },
    { id: "phoneNumber", label: t("register.table.phone") },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: Column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {waitingList.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        onClick={
                          column.id !== "delete"
                            ? () => onRowClick(row)
                            : undefined
                        }
                        style={{ cursor: "pointer" }}
                        key={column.id}
                        align={column.align}
                      >
                        {column.id !== "delete" ? (
                          row[column.id]
                        ) : (
                          <IconButton
                            onClick={() => onRowDeleteClick(row)}
                            aria-label="delete"
                            style={{ padding: 0 }}
                          >
                            <img
                              style={{ padding: 3 }}
                              alt={"delete"}
                              src={deleteImg}
                              height={30}
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
