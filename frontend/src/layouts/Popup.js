import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

// Tạo styled component
const DialogWrapper = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
}));

const DialogTitleStyled = styled(DialogTitle)({
  paddingRight: "0px",
});

// export default function Popup({ title, children, openPopup, setOpenPopup }) {
//   return (
//     <DialogWrapper
//       open={openPopup}
//       maxWidth="xl" // Mở rộng tối đa
//       fullWidth
//       sx={{
//         width: "90vw",
//         maxHeight: "95vh",
//         height: "90vh",
//         overflow: "auto",
//       }}
//     >
//       <DialogTitleStyled>
//         <div style={{ display: "flex" }}>
//           <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
//             {title}
//           </Typography>
//           <IconButton onClick={() => setOpenPopup(false)}>
//             <CloseIcon />
//           </IconButton>
//         </div>
//       </DialogTitleStyled>
//       <DialogContent dividers>{children}</DialogContent>
//     </DialogWrapper>
//   );
// }

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  return (
    <Dialog
      open={openPopup}
      maxWidth="xl"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: "90vw",
          height: "auto", // Đặt chiều cao ở đây
          maxHeight: "95vh",
        },
      }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={() => setOpenPopup(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          maxHeight: "80vh", // Giới hạn chiều cao nội dung
          overflowY: "auto", // Cuộn nếu nội dung quá dài
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
