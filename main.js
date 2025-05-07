window.addEventListener('DOMContentLoaded', () => {

  // 1) Obtiene el canvas existente
  const canvas = document.getElementById('scene');

  // 2) Crea escena y cámara
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 30);

  // 3) Renderizador, pasando el canvas
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 4) Fondo de estrellas
  const loader = new THREE.TextureLoader();
  scene.background = loader.load('textures/stars.jpg');

  // 5) Luz
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(50, 50, 50);
  scene.add(light);

  // 6) Júpiter
  const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({ map: loader.load('textures/jupiter.jpg') })
  );
  scene.add(jupiter);

  // 7) Ganímedes
  const ganimedes = new THREE.Mesh(
    new THREE.SphereGeometry(2, 64, 64),
    new THREE.MeshStandardMaterial({ map: loader.load('textures/ganimedes.jpeg') })
  );
  ganimedes.position.set(8, 0, 0);
  scene.add(ganimedes);

  // 8) Animación de cámara con GSAP
  gsap.to(camera.position, {
    duration: 4,
    z: 10,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(camera.position, {
        duration: 3,
        x: 8,
        y: 0,
        z: 6,
        onComplete: () => {
          document.getElementById('text').style.opacity = 1;
          document.getElementById('qr').style.display = 'block';
        }
      });
    }
  });

  // 9) Loop de renderizado
  function animate() {
    requestAnimationFrame(animate);
    jupiter.rotation.y += 0.002;
    ganimedes.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  // 10) Ajuste responsivo
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

});