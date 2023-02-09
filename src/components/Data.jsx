import React, { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Data() {
  const [posts, setPosts] = useState([]);

  const columns = [
    { field: "userId", headerName: "ID", type: "number", width: 90 },
    {
      field: "id",
      headerName: "id",
      type: "number",
      width: 70,
      editable: true,
    },
    {
      field: "title",
      headerName: "title",
      width: 350,
      editable: true,
    },
    {
      field: "body",
      headerName: "body",
      type: "string",
      width: 350,
      editable: true,
    },
  ];

  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then((data) => setPosts(data));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        //   m: 4,
      }}
    >
      <Card sx={{ minWidth: 1000, mt: 15 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={posts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Card>
    </Box>
  );
}
