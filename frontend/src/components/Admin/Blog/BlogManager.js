import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../api";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import DeleteOutLineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Notification from "../layouts/Notification";

import {
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  IconButton,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";

//import Table from "../../layout/Table";

export const SearchPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled(InputBase)`
  margin-left: ${({ theme }) => theme.spacing(1.5)};
  flex: 1;
`;

export default function BlogManager() {
  const [notify, setNotify] = useState({ isOpen: false });
  const [blogItem, setBlogItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newStatus, setNewStatus] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Blog)
      .fetchAll()
      .then((res) => {
        setBlogItem(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...blogItem];
    x = x.filter((y) => {
      return y.title?.toLowerCase().includes(searchKey.toLowerCase()); // ✅ Sử dụng title thay vì name
    });
    setSearchList(x);
  }, [searchKey, blogItem]);

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.Blog)
        .delete(id)
        .then((res) => {
          setNotify({ isOpen: true, message: "Deleted successfully." });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOpenDialog = (blog) => {
    setSelectedBlog(blog);
    setNewStatus(blog.isAccept); // Lấy trạng thái hiện tại
    setReason(""); // Xóa lý do cũ
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateStatus = () => {
    if (!selectedBlog) return;

    const endpoint = newStatus === 1 ? "Accept" : "UnAccept"; // Xác định API cần gọi
    createAPIEndpoint(ENDPIONTS.Blog)
      .update(`${endpoint}?id=${selectedBlog.id}&message=${reason}`)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Updated blog status successfully.",
        });

        // Cập nhật danh sách blog sau khi thay đổi
        setBlogItem((prev) =>
          prev.map((item) =>
            item.id === selectedBlog.id
              ? { ...item, isAccept: newStatus }
              : item
          )
        );

        setOpenDialog(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SearchPaper>
        <SearchInput
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search blog items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </SearchPaper>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "190%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Title</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Content</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Image</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>User </b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Create Date</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Hashtag</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Status</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "10%",
                  whiteSpace: "nowrap",
                }}
              >
                <b></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList.length > 0 ? (
              searchList.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                      <span dangerouslySetInnerHTML={{ __html: item.content }} />
                  </TableCell>


                  <TableCell>
                    <img src={item.image} alt="Image" width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    {item.user?.userName || "Không có dữ liệu"}
                  </TableCell>
                  <TableCell>{item.createdDate}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {item.hastagOfBlog?.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={`#${tag.hashtag}`}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </TableCell>

                  <TableCell
                    onClick={() => handleOpenDialog(item)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.isAccept == 0
                      ? "Đang chờ xét duyệt"
                      : item.isAccept == 1
                      ? "Đồng ý xét duyệt"
                      : "Từ chối"}
                  </TableCell>

                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteEvent(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Notification {...{ notify, setNotify }} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cập nhật trạng thái</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value={1}>Đồng ý xét duyệt</MenuItem>
            <MenuItem value={2}>Từ chối</MenuItem>
          </Select>
          <TextField
            fullWidth
            multiline
            rows={3}
            margin="normal"
            label="Nhập lý do (nếu có)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
