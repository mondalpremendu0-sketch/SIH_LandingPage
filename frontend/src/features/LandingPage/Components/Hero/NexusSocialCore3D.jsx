import { useEffect, useRef } from "react";
import * as THREE from "three";

export function NexusSocialCore3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // --- 1. Scene, Perspective Camera & Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 8.4 : 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- 2. Color Palette Management ---
    const getColors = () => {
      const theme = document.documentElement.dataset.theme;
      const isDark =
        theme === "dark" ||
        (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);

      return {
        primary: isDark ? 0x818cf8 : 0x4f46e5,
        secondary: isDark ? 0x38bdf8 : 0x0284c7,
        accent: isDark ? 0xc084fc : 0x7c3aed,
        emerald: isDark ? 0x34d399 : 0x059669,
        wireframe: isDark ? 0x6366f1 : 0x4f46e5,
        wireframeOpacity: isDark ? 0.45 : 0.55,
        particles: isDark ? 0xa5b4fc : 0x818cf8,
        coreGlow: isDark ? 0x312e81 : 0xe0e7ff,
        pulseNode: isDark ? 0x38bdf8 : 0x06b6d4,
      };
    };

    let colors = getColors();

    // --- 3. Master Groups ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const coreRadius = isMobile ? 1.7 : 2.05;

    // --- A. Morphing Dynamic Vertex Icosahedron Core ---
    const baseCoreGeom = new THREE.IcosahedronGeometry(coreRadius, 2);
    const corePositions = baseCoreGeom.attributes.position.array;
    const initialPositions = new Float32Array(corePositions);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: colors.wireframe,
      wireframe: true,
      transparent: true,
      opacity: colors.wireframeOpacity,
    });
    const coreMesh = new THREE.Mesh(baseCoreGeom, coreWireMat);
    masterGroup.add(coreMesh);

    // --- B. Vertex Nodes Points ---
    const vertexPointsGeom = new THREE.BufferGeometry();
    vertexPointsGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(corePositions), 3));

    const vertexPointsMat = new THREE.PointsMaterial({
      color: colors.primary,
      size: isMobile ? 0.09 : 0.12,
      transparent: true,
      opacity: 0.95,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeom, vertexPointsMat);
    masterGroup.add(vertexPoints);

    // --- C. Inner Resonant Prismatic Octahedron ---
    const innerGeom = new THREE.OctahedronGeometry(coreRadius * 0.65, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: colors.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    masterGroup.add(innerMesh);

    // --- D. Triple Gyroscopic Spatial Rings ---
    const createGimbalRing = (radius, tube, rotX, rotY, color) => {
      const ringGeom = new THREE.TorusGeometry(radius, tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      masterGroup.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createGimbalRing(coreRadius * 1.34, 0.012, Math.PI / 4, 0, colors.secondary);
    const ring2 = createGimbalRing(coreRadius * 1.54, 0.01, -Math.PI / 3, Math.PI / 6, colors.primary);
    const ring3 = createGimbalRing(coreRadius * 1.72, 0.009, Math.PI / 6, -Math.PI / 4, colors.accent);

    // --- E. Orbiting Satellite Pulses ---
    const satelliteCount = 8;
    const satellites = [];
    const satGeom = new THREE.SphereGeometry(0.065, 12, 12);

    for (let i = 0; i < satelliteCount; i++) {
      const isAlt = i % 2 === 0;
      const satMat = new THREE.MeshBasicMaterial({
        color: isAlt ? colors.secondary : colors.emerald,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(satGeom, satMat);
      masterGroup.add(mesh);

      satellites.push({
        mesh,
        ring: i % 3 === 0 ? ring1 : i % 3 === 1 ? ring2 : ring3,
        radius: i % 3 === 0 ? coreRadius * 1.34 : i % 3 === 1 ? coreRadius * 1.54 : coreRadius * 1.72,
        speed: (0.55 + i * 0.12) * (i % 2 === 0 ? 1 : -1),
        offset: (i * Math.PI * 2) / satelliteCount,
      });
    }

    // --- F. Ambient Cosmic Particle Galaxy ---
    const particleCount = isMobile ? 160 : 380;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pOriginalRadius = new Float32Array(particleCount);
    const pThetas = new Float32Array(particleCount);
    const pPhis = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = coreRadius * 1.15 + Math.random() * 4.2;

      pOriginalRadius[i] = r;
      pThetas[i] = theta;
      pPhis[i] = phi;

      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }

    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particleCloud = new THREE.Points(pGeom, pMat);
    masterGroup.add(particleCloud);

    // --- G. Interactive Click Shockwave Burst ---
    let shockwave = {
      active: false,
      radius: 0,
      maxRadius: coreRadius * 3.5,
      speed: 0.08,
      intensity: 0,
    };

    const triggerShockwave = () => {
      shockwave.active = true;
      shockwave.radius = 0.2;
      shockwave.intensity = 1.0;
    };

    container.addEventListener("click", triggerShockwave);

    // --- 4. Interactive Pointer Physics & Drag-to-Rotate ---
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = -(clientY / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerPosition.x;
        const deltaY = e.clientY - previousPointerPosition.y;
        dragVelocity.x = deltaX * 0.008;
        dragVelocity.y = deltaY * 0.008;
        previousPointerPosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // --- 5. Resize & Visibility Management ---
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // --- 6. Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Inertial drag momentum
      masterGroup.rotation.y += dragVelocity.x;
      masterGroup.rotation.x += dragVelocity.y;
      dragVelocity.x *= 0.92;
      dragVelocity.y *= 0.92;

      if (!reduceMotion) {
        // Continuous ambient rotation + mouse parallax
        masterGroup.rotation.y += 0.0025;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.12 - mouse.y * 0.28;

        // Dynamic vertex organic pulsation
        const pos = baseCoreGeom.attributes.position.array;
        const vPos = vertexPointsGeom.attributes.position.array;
        const len = pos.length / 3;

        for (let i = 0; i < len; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          const ox = initialPositions[ix];
          const oy = initialPositions[iy];
          const oz = initialPositions[iz];

          const wave = Math.sin(elapsedTime * 2.2 + ox * 2.0 + oy * 1.5) * 0.045;
          const scale = 1 + wave;

          pos[ix] = ox * scale;
          pos[iy] = oy * scale;
          pos[iz] = oz * scale;

          vPos[ix] = pos[ix];
          vPos[iy] = pos[iy];
          vPos[iz] = pos[iz];
        }

        baseCoreGeom.attributes.position.needsUpdate = true;
        vertexPointsGeom.attributes.position.needsUpdate = true;

        // Inner core counter-spin
        innerMesh.rotation.y = -elapsedTime * 0.35;
        innerMesh.rotation.z = elapsedTime * 0.2;

        // Gyroscopic Ring Rotations
        ring1.rotation.z = elapsedTime * 0.26;
        ring2.rotation.z = -elapsedTime * 0.22;
        ring3.rotation.z = elapsedTime * 0.18;

        // Satellite movement
        satellites.forEach((sat) => {
          const angle = elapsedTime * sat.speed + sat.offset;
          const px = Math.cos(angle) * sat.radius;
          const py = Math.sin(angle) * sat.radius;

          const vec = new THREE.Vector3(px, py, 0);
          vec.applyEuler(sat.ring.rotation);
          sat.mesh.position.copy(vec);
        });

        // Ambient particles floating
        particleCloud.rotation.y = -elapsedTime * 0.035;

        // Dynamic Shockwave physical push on ambient particles
        if (shockwave.active) {
          shockwave.radius += shockwave.speed;
          shockwave.intensity = Math.max(0, 1 - shockwave.radius / shockwave.maxRadius);

          const pPos = pGeom.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            const dist = pOriginalRadius[i];
            const diff = dist - shockwave.radius;
            let push = 0;
            if (Math.abs(diff) < 0.8) {
              push = Math.sin((1 - Math.abs(diff) / 0.8) * Math.PI) * 0.6 * shockwave.intensity;
            }

            const currentR = pOriginalRadius[i] + push;
            const theta = pThetas[i];
            const phi = pPhis[i];

            pPos[i * 3] = currentR * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = currentR * Math.sin(phi) * Math.sin(theta);
            pPos[i * 3 + 2] = currentR * Math.cos(phi);
          }
          pGeom.attributes.position.needsUpdate = true;

          if (shockwave.radius > shockwave.maxRadius) {
            shockwave.active = false;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Theme Change Observer
    const themeObserver = new MutationObserver(() => {
      colors = getColors();
      coreWireMat.color.setHex(colors.wireframe);
      coreWireMat.opacity = colors.wireframeOpacity;
      vertexPointsMat.color.setHex(colors.primary);
      innerMat.color.setHex(colors.accent);
      pMat.color.setHex(colors.particles);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("click", triggerShockwave);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();

      baseCoreGeom.dispose();
      coreWireMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      vertexPointsGeom.dispose();
      vertexPointsMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      satGeom.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="nexus-3d-core-container"
      title="Click or drag core to interact in 3D"
      aria-label="Interactive 3D Social Intelligence Core"
    />
  );
}
