import {useEffect, useRef} from 'react';
import * as THREE from 'three';

export function ThreeDemo() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const width = host.clientWidth;
    const height = host.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05070b');
    scene.fog = new THREE.Fog('#05070b', 4, 12);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 4.2);

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    const key = new THREE.DirectionalLight(0x8ef0c5, 1.4);
    key.position.set(3, 4, 2);
    const rim = new THREE.PointLight(0x6ea8ff, 18, 20);
    rim.position.set(-2, 1, -1);
    scene.add(ambient, key, rim);

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.9, 0.28, 180, 24),
      new THREE.MeshStandardMaterial({
        color: 0x6ea8ff,
        metalness: 0.65,
        roughness: 0.25,
        emissive: 0x142038,
      }),
    );
    scene.add(torus);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.03, 12, 120),
      new THREE.MeshBasicMaterial({color: 0x8ef0c5}),
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const label = document.createElement('div');
    label.textContent = '3D mesh + lights + camera';
    label.style.cssText =
      'position:absolute;left:12px;top:12px;padding:4px 8px;border-radius:999px;background:rgba(0,0,0,.55);color:#d8e7ff;font:600 12px JetBrains Mono,monospace;';
    host.style.position = 'relative';
    host.appendChild(label);

    let frame = 0;
    let raf = 0;

    const animate = () => {
      frame += 1;
      torus.rotation.x = frame * 0.012;
      torus.rotation.y = frame * 0.018;
      ring.rotation.z = frame * 0.01;
      camera.position.x = Math.sin(frame * 0.008) * 0.8 + 2.8;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      renderer.dispose();
      torus.geometry.dispose();
      (torus.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} style={{width: '100%', height: '100%'}} />;
}
