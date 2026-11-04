import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProductSceneProps {
  type: 'plywood' | 'blockboard';
}

export default function ProductScene({ type }: ProductSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xF28C28, 0.5, 20);
    pointLight.position.set(-3, 4, 3);
    scene.add(pointLight);

    // Create product
    const product = type === 'plywood' ? createPlywood() : createBlockboard();
    scene.add(product);

    let mouseX = 0;
    let mouseY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      
      // Auto rotation + mouse influence
      product.rotation.y = elapsed * 0.3 + mouseX * 0.5;
      product.rotation.x = Math.sin(elapsed * 0.2) * 0.1 + mouseY * 0.2;
      product.position.y = Math.sin(elapsed * 0.5) * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ minHeight: '300px' }}
    />
  );
}

function createPlywood(): THREE.Group {
  const group = new THREE.Group();

  // Main panel - multiple layers for plywood effect
  const layers = 8;
  for (let i = 0; i < layers; i++) {
    const layerGeom = new THREE.BoxGeometry(3, 0.08, 2);
    const isTopLayer = i === 0 || i === layers - 1;
    const layerMat = new THREE.MeshStandardMaterial({
      color: isTopLayer ? 0xf5f0e8 : 0xc4a97d,
      roughness: isTopLayer ? 0.2 : 0.7,
      metalness: isTopLayer ? 0.3 : 0.1,
    });
    const layer = new THREE.Mesh(layerGeom, layerMat);
    layer.position.y = (i - layers / 2) * 0.1;
    layer.castShadow = true;
    group.add(layer);
  }

  // Polyester coating (top surface - glossy)
  const coatingGeom = new THREE.BoxGeometry(3.05, 0.02, 2.05);
  const coatingMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
  });
  const coating = new THREE.Mesh(coatingGeom, coatingMat);
  coating.position.y = layers * 0.05 + 0.05;
  group.add(coating);

  // Edge detail
  const edgeGeom = new THREE.BoxGeometry(0.05, layers * 0.1, 2);
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.6 });
  const edge1 = new THREE.Mesh(edgeGeom, edgeMat);
  edge1.position.set(1.52, 0, 0);
  group.add(edge1);
  const edge2 = new THREE.Mesh(edgeGeom, edgeMat);
  edge2.position.set(-1.52, 0, 0);
  group.add(edge2);

  return group;
}

function createBlockboard(): THREE.Group {
  const group = new THREE.Group();

  // Core strips (blockboard has wood strips inside)
  const stripCount = 12;
  for (let i = 0; i < stripCount; i++) {
    const stripGeom = new THREE.BoxGeometry(0.2, 0.4, 1.8);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xb8956a,
      roughness: 0.8,
    });
    const strip = new THREE.Mesh(stripGeom, stripMat);
    strip.position.x = -1.3 + i * 0.22;
    strip.position.y = 0;
    strip.castShadow = true;
    group.add(strip);
  }

  // Top veneer
  const topGeom = new THREE.BoxGeometry(3, 0.06, 2);
  const topMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8,
    roughness: 0.15,
    metalness: 0.4,
  });
  const top = new THREE.Mesh(topGeom, topMat);
  top.position.y = 0.23;
  group.add(top);

  // Bottom veneer
  const bottom = new THREE.Mesh(topGeom, topMat);
  bottom.position.y = -0.23;
  group.add(bottom);

  // Polyester coating
  const coatingGeom = new THREE.BoxGeometry(3.05, 0.02, 2.05);
  const coatingMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0.8,
    transparent: true,
    opacity: 0.85,
  });
  const coating = new THREE.Mesh(coatingGeom, coatingMat);
  coating.position.y = 0.28;
  group.add(coating);

  return group;
}