'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { useMemo } from 'react';

const WaveMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uAspect;
    varying vec2 vUv;

    #define PI 3.14159265359

    float createCurvedLine(vec2 uv, float frequency, float width, float curveAmount) {
      // Add a curve based on y position
      float curve = sin((uv.y - 0.5) * PI) * curveAmount;
      float adjustedX = uv.x + curve;
      
      float line = sin(adjustedX * frequency) * 0.5 + 0.5;
      return smoothstep(0.5 - width, 0.5 + width, line);
    }

    void main() {
      // Scale UV coordinates for aspect ratio
      vec2 uv = vUv;
      uv.x *= uAspect;
      
      // Calculate distance to mouse for wave effect
      vec2 adjustedMouse = uMouse;
      adjustedMouse.x *= uAspect;
      float dist = distance(adjustedMouse, uv);

      // Create wave distortion from mouse
      float mouseInfluence = exp(-dist * 4.0) * 0.05;
      float mouseWave = sin(dist * 15.0 - uTime * 2.0) * mouseInfluence;

      // Create vertical waves with curves
      float wave1 = sin(uv.x * 120.0 + uTime * 0.5 + sin(uv.y * PI) * 0.3) * 0.005;
      float wave2 = sin(uv.x * 80.0 - uTime * 0.3 + sin(uv.y * PI) * 0.2) * 0.003;

      // Apply distortion to x-coordinate for vertical movement
      vec2 distortedUv = uv;
      distortedUv.x += mouseWave + wave1 + wave2;

      // Create curved vertical lines with different frequencies
      float mainLine = createCurvedLine(distortedUv, 240.0, 0.008, 0.04);
      float detailLine = createCurvedLine(distortedUv, 360.0, 0.005, 0.02) * 0.5;

      // Add subtle flowing movement to the curves
      float timeOffset = sin(uTime * 0.5) * 0.01;
      mainLine = createCurvedLine(distortedUv, 240.0, 0.008, 0.04 + timeOffset);
      detailLine = createCurvedLine(distortedUv, 360.0, 0.005, 0.02 + timeOffset) * 0.5;

      // Combine lines
      float linePattern = mainLine + detailLine;

      // Pure white background with dark navy lines
      vec3 backgroundColor = vec3(1.0, 1.0, 1.0);  // Pure white
      vec3 lineColor = vec3(0.0, 0.016, 0.208);    // Dark navy (#000435)
      
      // Blend the colors with adjusted opacity for better contrast
      float opacity = linePattern * 0.7;  // Increased opacity for better visibility
      vec3 finalColor = mix(backgroundColor, lineColor, opacity);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight,
      };
    };

    const handleResize = () => {
      if (materialRef.current) {
        const aspect = window.innerWidth / window.innerHeight;
        materialRef.current.uniforms.uAspect.value = aspect;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.75;
      materialRef.current.uniforms.uMouse.value.set(
        mousePosition.current.x,
        mousePosition.current.y
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[4, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const WaveBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, background: '#ffffff' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 1] }}
      >
        <WaveMaterial />
      </Canvas>
    </div>
  );
};

export default WaveBackground; 