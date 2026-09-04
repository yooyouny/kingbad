'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 200;

// Generate petal data with randomness outside of render
const generateInitialPetalsData = () => {
  const data = [];
  for (let i = 0; i < COUNT; i++) {
    data.push({
      x: (Math.random() - 0.5) * 40,
      y: Math.random() * 40 - 20,
      z: (Math.random() - 0.5) * 30,
      speedY: 0.08 + Math.random() * 0.08,
      speedX: (Math.random() - 0.5) * 0.03,
      swaySpeed: 1 + Math.random() * 1.5,
      swayAmplitude: 0.03 + Math.random() * 0.05,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.015,
      rotSpeedZ: (Math.random() - 0.5) * 0.015,
      scale: 0.4 + Math.random() * 0.4,
    });
  }
  return data;
};

function RosePetalsScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.6, 0.6, 1.2, 0.8, 1.0, 1.8);
    shape.bezierCurveTo(0.8, 2.6, -0.8, 2.6, -1.0, 1.8);
    shape.bezierCurveTo(-1.2, 0.8, -0.6, 0.6, 0, 0);
    return shape;
  }, []);

  const petalsData = useMemo(() => generateInitialPetalsData(), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    petalsData.forEach((data, i) => {
      data.y -= data.speedY;
      data.x += data.speedX + Math.sin(time * data.swaySpeed) * data.swayAmplitude;

      data.rotX += data.rotSpeedX;
      data.rotY += data.rotSpeedY;
      data.rotZ += data.rotSpeedZ;

      if (data.y < -20) {
        data.y = 20;
        data.x = (Math.random() - 0.5) * 40;
      }

      dummy.position.set(data.x, data.y, data.z);
      dummy.rotation.set(data.rotX, data.rotY, data.rotZ);
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT] as any}>
      <shapeGeometry args={[petalShape]} />
      <meshStandardMaterial color="#d11a2a" side={THREE.DoubleSide} roughness={0.3} />
    </instancedMesh>
  );
}

export default function RosePetals() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <RosePetalsScene />
      </Canvas>
    </div>
  );
}
