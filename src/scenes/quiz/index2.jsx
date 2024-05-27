import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import { tokens } from "../../theme";

const Result = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example static data
  const mockData = [
    {
      id: 1, user_name: "Hassen Mrakben", job_title: "flutter developer", application_score: 7917.942695081191, quiz_score: 80, interview_score: 90
    },
    {
      id: 2, user_name: "Walid Marzouk", job_title: "flutter developer", application_score: 6517.942695081191, quiz_score: 70, interview_score: 80
    },
    {
      id: 3, user_name: "Farah Torkhani", job_title: "flutter developer", application_score: 5116.216204991052, quiz_score: 60, interview_score: 70
    }
  ];

  const handleAction = (id, action) => {
    console.log(`Application ID ${id} has been ${action}.`); // This can be replaced with a real action, like an API call
  };

  const columns = [
    { field: "user_name", headerName: "User Name", flex: 1 },
    { field: "job_title", headerName: "Job Title", flex: 1 },
    { field: "application_score", headerName: "Application Score", flex: 1 },
    { field: "quiz_score", headerName: "Quiz Score", flex: 1 },
    { field: "interview_score", headerName: "Interview Score", flex: 1 },
    {
      field: "final_score",
      headerName: "Final Score",
      flex: 1,
      valueGetter: (params) =>
        ((params.row.application_score + params.row.quiz_score + params.row.interview_score) / 3).toFixed(2)
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-evenly">
          <Button variant="contained" color="success" onClick={() => handleAction(params.id, "accepted")}>
            Accept
          </Button>
          <Button variant="contained" color="error" onClick={() => handleAction(params.id, "refused")}>
            Refuse
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box m="20px">
      <Header title="AI Recruit" subtitle="Managing the Final Result" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockData} columns={columns} getRowId={(row) => row.id} />
      </Box>
    </Box>
  );
};

export default Result;
