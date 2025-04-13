import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, html, #root { height: 100%; }

  background: #f8f9fa;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
  height: 100vh;
  position: relative;

  .pattern {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    pointer-events: none;
    background:
      linear-gradient(45deg, #2b3a67 25%, transparent 25%) -50px 0,
      linear-gradient(-45deg, #2b3a67 25%, transparent 25%) -50px 0,
      linear-gradient(45deg, transparent 75%, #2b3a67 75%) -50px 0,
      linear-gradient(-45deg, transparent 75%, #2b3a67 75%) -50px 0;
    background-size: 100px 100px;
  }

  .scene {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    flex-direction: column;
    z-index: 2;
    position: relative;
  }

  h1 {
    font-size: 100px;
    color: #2b3a67;
    text-shadow: 2px 2px 0 #1f2937;
    animation: ${fadeUp} 1s ease-out 0.5s forwards;
    opacity: 0;
  }

  p {
    font-size: 24px;
    color: #2b3a67;
    margin-top: 10px;
    animation: ${fadeUp} 1s ease-out 0.7s forwards;
    opacity: 0;
  }

  a {
    display: inline-block;
    margin-top: 2rem;
    padding: 1rem 2.5rem;
    font-size: 18px;
    background: #e94f37;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    animation: ${fadeUp} 1s ease-out 0.9s forwards;
    opacity: 0;
  }

  .geometric {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Error = () => {
  useEffect(() => {
    const colors = ['#2b3a67', '#e94f37'];
    const scene = document.querySelector('.scene');

    for (let i = 0; i < 20; i++) {
      const shape = document.createElement('div');
      shape.className = 'geometric';
      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      shape.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        transform: scale(${Math.random() * 0.5 + 0.5});
      `;
      scene.appendChild(shape);
    }

    const updatePosition = (x, y) => {
      const mx = x / window.innerWidth - 0.5;
      const my = y / window.innerHeight - 0.5;
      document.querySelectorAll('.geometric').forEach(shape => {
        const speed = Math.random() * 30 + 10;
        shape.style.transform = `translate(${mx * speed}px, ${my * speed}px) scale(${Math.random() * 0.5 + 0.5})`;
      });
    };

    const handleMouse = (e) => updatePosition(e.clientX, e.clientY);
    const handleTouch = (e) => updatePosition(e.touches[0].clientX, e.touches[0].clientY);

    document.addEventListener('mousemove', handleMouse);
    document.addEventListener('touchmove', handleTouch);

    return () => {
      document.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return (
    <Wrapper>
      <div className="pattern" />
      <div className="scene">
        <h1>404</h1>
        <p>Không tìm thấy trang này</p>
        <a href="http://localhost:3000/">Quay về trang chủ</a>
      </div>
    </Wrapper>
  );
};

export default Error;
