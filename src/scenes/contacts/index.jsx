import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataRecruitment } from "../../data/mockDataApplications";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../constants/config'

const Recruitment = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job-applicationss`);
        console.log("Response:", response.data); // Log the response data
        setApplications(response.data); // Set the state with response data
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "user_name", headerName: "User Name", flex: 1, },
    { field: "job", headerName: "Job Title", flex: 1, },

    { field: "score_cv", headerName: "CV Score", flex: 1, },

    { field: "score_skills", headerName: "Skills Score", flex: 1, },
    { field: "score_cover_letter", headerName: "Cover Letter Score", flex: 1, },

    { field: "final_score", headerName: "Final Score", flex: 1, },
    {
      field: "status", headerName: "Status", flex: 1, renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "refused"
                ? colors.redAccent[600]
                : status === "accepted"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[800]
            }
            borderRadius="4px"
          >

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    }
    ,


  ];

  return (
    <Box m="20px">
      <Header title="AI Recruit" subtitle="Managing the Applications Process" />
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
        <DataGrid checkboxSelection rows={applications} pageSize={5}
          rowsPerPageOptions={[5]} columns={columns} getRowId={(row) => row._id} />
      </Box>
    </Box>
  );
};

export default Recruitment;
