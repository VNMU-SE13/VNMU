// src/components/GLBViewer.js
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const GLBModel = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const GLBViewer = ({ url }) => (
  <Canvas style={{ width: "100%", height: "100%" }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[3, 5, 5]} intensity={1} />
    <Suspense fallback={null}>
      <GLBModel url={url} />
    </Suspense>
    <OrbitControls />
  </Canvas>
);

export default GLBViewer;
