import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0F2A1D, 0.008);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 8, 20);
    camera.lookAt(0, 2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 100;
    mainLight.shadow.camera.left = -30;
    mainLight.shadow.camera.right = 30;
    mainLight.shadow.camera.top = 30;
    mainLight.shadow.camera.bottom = -30;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x174A72, 0.8);
    fillLight.position.set(-10, 5, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xF28C28, 1, 50);
    rimLight.position.set(-5, 10, 15);
    scene.add(rimLight);

    // Ground
    const groundGeom = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a3a2a, 
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Road markings
    const roadGeom = new THREE.PlaneGeometry(8, 60);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2a4a3a, roughness: 0.6 });
    const road = new THREE.Mesh(roadGeom, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 0);
    road.receiveShadow = true;
    scene.add(road);

    // Road lines
    for (let i = -25; i < 25; i += 4) {
      const lineGeom = new THREE.PlaneGeometry(0.2, 2);
      const lineMat = new THREE.MeshStandardMaterial({ color: 0x4ADE80, emissive: 0x4ADE80, emissiveIntensity: 0.3 });
      const line = new THREE.Mesh(lineGeom, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.02, i);
      scene.add(line);
    }

    // Create Truck
    const truck = createTruck();
    truck.position.set(30, 0, 0);
    scene.add(truck);

    // Create Container on truck
    const container3D = createContainer();
    container3D.position.set(0, 3.5, 0);
    truck.add(container3D);

    // Create Crane
    const crane = createCrane();
    crane.position.set(-8, 0, 0);
    scene.add(crane);

    // Industrial buildings background
    createIndustrialBackground(scene);

    // Particles
    const particles = createParticles();
    scene.add(particles);

    const clock = new THREE.Clock();
    let animationId: number;

    // Animation
    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      
      updateAnimation(truck, container3D, elapsed, delta);

      // Camera cinematic movement
      camera.position.x = 15 + Math.sin(elapsed * 0.1) * 2;
      camera.position.y = 8 + Math.sin(elapsed * 0.15) * 0.5;
      camera.lookAt(0, 2, 0);

      // Rotate particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
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
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="three-canvas" />
  );
}

function createTruck(): THREE.Group {
  const truck = new THREE.Group();

  // Cabin
  const cabinGeom = new THREE.BoxGeometry(3, 3, 2.8);
  const cabinMat = new THREE.MeshStandardMaterial({ 
    color: 0x1F5F3E, 
    metalness: 0.6, 
    roughness: 0.3 
  });
  const cabin = new THREE.Mesh(cabinGeom, cabinMat);
  cabin.position.set(4, 2.5, 0);
  cabin.castShadow = true;
  truck.add(cabin);

  // Cabin window
  const windowGeom = new THREE.BoxGeometry(0.1, 1.5, 2.2);
  const windowMat = new THREE.MeshStandardMaterial({ 
    color: 0x87CEEB, 
    metalness: 0.9, 
    roughness: 0.1,
    transparent: true,
    opacity: 0.7
  });
  const windowMesh = new THREE.Mesh(windowGeom, windowMat);
  windowMesh.position.set(5.5, 3, 0);
  truck.add(windowMesh);

  // Trailer bed
  const bedGeom = new THREE.BoxGeometry(12, 0.5, 3);
  const bedMat = new THREE.MeshStandardMaterial({ color: 0x2a4a3a, metalness: 0.7, roughness: 0.4 });
  const bed = new THREE.Mesh(bedGeom, bedMat);
  bed.position.set(-2, 1.5, 0);
  bed.castShadow = true;
  truck.add(bed);

  // Chassis
  const chassisGeom = new THREE.BoxGeometry(16, 0.8, 2.5);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.8, roughness: 0.3 });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  chassis.position.set(0, 0.8, 0);
  chassis.castShadow = true;
  truck.add(chassis);

  // Wheels
  const wheelGeom = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  
  const wheelPositions = [
    [4.5, 0.6, 1.5], [4.5, 0.6, -1.5],
    [-1, 0.6, 1.5], [-1, 0.6, -1.5],
    [-3, 0.6, 1.5], [-3, 0.6, -1.5],
    [-5, 0.6, 1.5], [-5, 0.6, -1.5],
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheel = new THREE.Mesh(wheelGeom, wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, y, z);
    wheel.castShadow = true;
    truck.add(wheel);

    // Hub
    const hubGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.45, 8);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 });
    const hub = new THREE.Mesh(hubGeom, hubMat);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(x, y, z);
    truck.add(hub);
  });

  // Headlights
  const lightGeom = new THREE.SphereGeometry(0.2, 8, 8);
  const lightMat = new THREE.MeshStandardMaterial({ 
    color: 0xFFFF00, 
    emissive: 0xFFFF00, 
    emissiveIntensity: 0.5 
  });
  const headlight1 = new THREE.Mesh(lightGeom, lightMat);
  headlight1.position.set(5.5, 2, 1);
  truck.add(headlight1);
  const headlight2 = new THREE.Mesh(lightGeom, lightMat);
  headlight2.position.set(5.5, 2, -1);
  truck.add(headlight2);

  // Exhaust pipe
  const exhaustGeom = new THREE.CylinderGeometry(0.1, 0.12, 2, 8);
  const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.9 });
  const exhaust = new THREE.Mesh(exhaustGeom, exhaustMat);
  exhaust.position.set(5, 4.5, 1.2);
  truck.add(exhaust);

  return truck;
}

function createContainer(): THREE.Group {
  const container = new THREE.Group();

  // Main container body
  const bodyGeom = new THREE.BoxGeometry(10, 3, 2.8);
  const bodyMat = new THREE.MeshStandardMaterial({ 
    color: 0x4ADE80, 
    metalness: 0.4, 
    roughness: 0.5 
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.castShadow = true;
  container.add(body);

  // Container ridges
  for (let i = -4; i <= 4; i += 1) {
    const ridgeGeom = new THREE.BoxGeometry(0.05, 2.8, 2.85);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x22C55E, metalness: 0.5 });
    const ridge = new THREE.Mesh(ridgeGeom, ridgeMat);
    ridge.position.set(i, 0, 0);
    container.add(ridge);
  }

  // Container door (back)
  const doorGeom = new THREE.BoxGeometry(0.1, 2.8, 2.6);
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x16A34A, metalness: 0.5 });
  const door = new THREE.Mesh(doorGeom, doorMat);
  door.position.set(-5, 0, 0);
  container.add(door);

  // Door handles
  const handleGeom = new THREE.BoxGeometry(0.15, 1.5, 0.1);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 });
  const handle1 = new THREE.Mesh(handleGeom, handleMat);
  handle1.position.set(-5.1, 0, 0.5);
  container.add(handle1);
  const handle2 = new THREE.Mesh(handleGeom, handleMat);
  handle2.position.set(-5.1, 0, -0.5);
  container.add(handle2);

  // Logo/label area
  const labelGeom = new THREE.BoxGeometry(3, 1, 0.05);
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.1 });
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.position.set(0, 0.5, 1.43);
  container.add(label);

  return container;
}

function createCrane(): THREE.Group {
  const crane = new THREE.Group();

  // Base
  const baseGeom = new THREE.BoxGeometry(3, 1, 3);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x4ADE80, metalness: 0.6, roughness: 0.4 });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.position.set(0, 0.5, 0);
  base.castShadow = true;
  crane.add(base);

  // Vertical tower
  const towerGeom = new THREE.BoxGeometry(1, 12, 1);
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x4ADE80, metalness: 0.5 });
  const tower = new THREE.Mesh(towerGeom, towerMat);
  tower.position.set(0, 7, 0);
  tower.castShadow = true;
  crane.add(tower);

  // Horizontal boom
  const boomGeom = new THREE.BoxGeometry(12, 0.6, 0.6);
  const boomMat = new THREE.MeshStandardMaterial({ color: 0x22C55E, metalness: 0.5 });
  const boom = new THREE.Mesh(boomGeom, boomMat);
  boom.position.set(5, 13, 0);
  boom.castShadow = true;
  crane.add(boom);

  // Cable
  const cableGeom = new THREE.CylinderGeometry(0.05, 0.05, 8, 8);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.9 });
  const cable = new THREE.Mesh(cableGeom, cableMat);
  cable.position.set(8, 9, 0);
  crane.add(cable);

  // Hook
  const hookGeom = new THREE.TorusGeometry(0.3, 0.08, 8, 16, Math.PI);
  const hookMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 });
  const hook = new THREE.Mesh(hookGeom, hookMat);
  hook.position.set(8, 5, 0);
  hook.rotation.x = Math.PI;
  crane.add(hook);

  // Counter weight
  const cwGeom = new THREE.BoxGeometry(2, 1.5, 1.5);
  const cwMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7 });
  const cw = new THREE.Mesh(cwGeom, cwMat);
  cw.position.set(-2, 12, 0);
  crane.add(cw);

  return crane;
}

function createIndustrialBackground(scene: THREE.Scene) {
  // Warehouse buildings
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0x1a3a2a, roughness: 0.7, metalness: 0.3 });
  
  // Large warehouse
  const warehouse1Geom = new THREE.BoxGeometry(20, 8, 12);
  const warehouse1 = new THREE.Mesh(warehouse1Geom, buildingMat);
  warehouse1.position.set(-20, 4, -15);
  warehouse1.castShadow = true;
  scene.add(warehouse1);

  // Warehouse roof
  const roofGeom = new THREE.BoxGeometry(21, 0.5, 13);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x2a4a3a, metalness: 0.5 });
  const roof = new THREE.Mesh(roofGeom, roofMat);
  roof.position.set(-20, 8.25, -15);
  scene.add(roof);

  // Second building
  const building2Geom = new THREE.BoxGeometry(15, 10, 10);
  const building2 = new THREE.Mesh(building2Geom, buildingMat);
  building2.position.set(20, 5, -20);
  building2.castShadow = true;
  scene.add(building2);

  // Smokestacks
  for (let i = 0; i < 3; i++) {
    const stackGeom = new THREE.CylinderGeometry(0.5, 0.7, 15, 8);
    const stackMat = new THREE.MeshStandardMaterial({ color: 0x82909D, metalness: 0.6 });
    const stack = new THREE.Mesh(stackGeom, stackMat);
    stack.position.set(-25 + i * 3, 12, -20);
    stack.castShadow = true;
    scene.add(stack);
  }

  // Storage containers in background
  for (let i = 0; i < 5; i++) {
    const contGeom = new THREE.BoxGeometry(5, 2.5, 2);
    const contMat = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color().setHSL(0.05 + i * 0.02, 0.6, 0.4),
      metalness: 0.4
    });
    const cont = new THREE.Mesh(contGeom, contMat);
    cont.position.set(-15 + i * 6, 1.25, -8);
    cont.castShadow = true;
    scene.add(cont);
  }

  // Loading dock
  const dockGeom = new THREE.BoxGeometry(10, 1.5, 6);
  const dockMat = new THREE.MeshStandardMaterial({ color: 0x2a4a3a, roughness: 0.6 });
  const dock = new THREE.Mesh(dockGeom, dockMat);
  dock.position.set(-10, 0.75, 5);
  dock.receiveShadow = true;
  scene.add(dock);
}

function createParticles(): THREE.Points {
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 60;
    positions[i + 1] = Math.random() * 20;
    positions[i + 2] = (Math.random() - 0.5) * 60;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x4ADE80,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Points(geom, mat);
}

function updateAnimation(
  truck: THREE.Group,
  container: THREE.Group,
  _elapsed: number,
  delta: number
) {
  const phaseTime = _elapsed;
  
  // Animation phases
  // Phase 0: Truck enters from right (0-4s)
  // Phase 1: Truck stops at position (4-5s)
  // Phase 2: Container lifts up (5-9s)
  // Phase 3: Truck leaves (9-13s)
  // Phase 4: Container moves to storage (13-17s)
  // Phase 5: Reset (17-18s)

  const cycleTime = 18;
  const t = phaseTime % cycleTime;

  if (t < 4) {
    // Phase 0: Truck drives in
    const progress = t / 4;
    const eased = 1 - Math.pow(1 - progress, 3);
    truck.position.x = 30 - eased * 25;
    truck.position.x = Math.max(truck.position.x, 5);
  } else if (t < 5) {
    // Phase 1: Truck stopped
    truck.position.x = 5;
  } else if (t < 9) {
    // Phase 2: Container lifts
    truck.position.x = 5;
    const liftProgress = (t - 5) / 4;
    const eased = liftProgress < 0.5 
      ? 2 * liftProgress * liftProgress 
      : 1 - Math.pow(-2 * liftProgress + 2, 2) / 2;
    container.position.y = 3.5 + eased * 8;
    
    // Slight swing
    container.rotation.z = Math.sin(t * 2) * 0.02 * (1 - liftProgress);
  } else if (t < 13) {
    // Phase 3: Truck leaves
    truck.position.x = 5;
    const leaveProgress = (t - 9) / 4;
    const eased = leaveProgress * leaveProgress;
    truck.position.x = 5 - eased * 40;
    container.position.y = 11.5;
  } else if (t < 17) {
    // Phase 4: Container moves to storage
    truck.position.x = -35;
    const moveProgress = (t - 13) / 4;
    const eased = moveProgress < 0.5
      ? 2 * moveProgress * moveProgress
      : 1 - Math.pow(-2 * moveProgress + 2, 2) / 2;
    container.position.x = eased * -15;
    container.position.y = 11.5 - eased * 6;
    container.position.z = eased * -5;
  } else {
    // Phase 5: Reset
    truck.position.x = 30;
    container.position.set(0, 3.5, 0);
    container.rotation.z = 0;
  }

  // Wheel rotation when truck is moving
  if (t < 5 || (t > 9 && t < 13)) {
    truck.children.forEach((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry) {
        if ((child.geometry as THREE.CylinderGeometry).parameters.radiusTop === 0.6) {
          child.rotation.z += delta * 5;
        }
      }
    });
  }
}