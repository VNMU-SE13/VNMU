import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "./api";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock"; // Biểu tượng khóa (đóng)
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Biểu tượng mở khóa
import Notification from "./layouts/Notification";
import { Pagination, Stack } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";

export default function UserManager() {
  const [userItem, setUserItem] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    createAPIEndpoint(ENDPIONTS.User)
      .fetchAll()
      .then((res) => {
        setUserItem(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setNewRole(user.roles[0] || "User");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  // const handleUpdateRole = () => {
  //   if (!selectedUser) return;
  //   createAPIEndpoint(ENDPIONTS.Role)
  //     .update("updateRole", { userId: selectedUser.id, newRole: newRole })
  //     .then(() => {
  //       fetchUsers();
  //       handleCloseDialog();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const lockUser = (userId) => {
    if (window.confirm("Are you sure you want to lock this user?")) {
      createAPIEndpoint(ENDPIONTS.User)
        .lockUser(userId)
        .then(() => fetchUsers())
        .catch((err) => console.log(err));
      setNotify({ isOpen: true, message: "The user has been locked." });
    }
  };

  const unlockUser = (userId) => {
    if (window.confirm("Are you sure you want to unlock this user?")) {
      createAPIEndpoint(ENDPIONTS.User)
        .unlockUser(userId)
        .then(() => fetchUsers())
        .catch((err) => console.log(err));
      setNotify({ isOpen: true, message: "The user has been unlocked." });
    }
  };

  const paginatedUsers = userItem.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell>
                <b>Premium</b>
              </TableCell>
              <TableCell>
                <b>Lock</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userItem.length > 0 ? (
              paginatedUsers.map((item) => {
                const isLocked = item.lockoutEnd !== null;
                const isAdmin = item.roles.includes("admin");
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.roles.join(", ")}</TableCell>
                    <TableCell>{item.isPremium ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          isLocked ? unlockUser(item.id) : lockUser(item.id)
                        }
                        color={isLocked ? "error" : "primary"}
                        disabled={isAdmin}
                      >
                        {isLocked ? <LockIcon /> : <LockOpenIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} mt={3} alignItems="center">
        <Pagination
          count={Math.ceil(userItem.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Stack>


      {/* Dialog Update Role */}
      <Dialog open={open} onClose={handleCloseDialog}>
        {/* <DialogTitle>Update User Role</DialogTitle> */}
        <DialogContent>
          {selectedUser && (
            <>
              <Typography variant="subtitle1">
                <b>User:</b> {selectedUser.userName}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <b>Current Role:</b> {selectedUser.roles.join(", ")}
              </Typography>
              <Select
                fullWidth
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                sx={{ mt: 2 }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateRole}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions> */}
      </Dialog>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}
