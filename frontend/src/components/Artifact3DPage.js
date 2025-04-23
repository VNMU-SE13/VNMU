import React from "react";
import { useParams } from "react-router-dom";
import GLBViewer from "../components/GLBViewer";

const Artifact3DPage = () => {
  const { id } = useParams();

  // url 3D model dựa theo id (tuỳ chỉnh theo backend bạn lưu)
  const modelUrl = `${process.env.REACT_APP_API_URL}/uploads/artifacts/${id}.glb`;

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#eee" }}>
      <GLBViewer url={modelUrl} />
    </div>
  );
};

export default Artifact3DPage;
