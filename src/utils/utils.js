import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  SphereGeometry,
  DoubleSide,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  BoxGeometry,
  ConeGeometry,
  Mesh,
  DirectionalLight
} from 'three';

const createGeometry = () => {
  const materials = [
    new MeshLambertMaterial({
      side: DoubleSide,
      color: Math.random() * 0x7fc5f9,
      emissive: Math.random() * 0x25673d,
      emissiveIntensity: 0.5
    }),
    new MeshPhongMaterial({
      side: DoubleSide,
      color: Math.random() * 0x7fc5f9,
      emissive: Math.random() * 0x25673d,
      emissiveIntensity: 0.5,
      shininess: 100,
      specular: 0x9d0a00
    }),
    new MeshStandardMaterial({
      side: DoubleSide,
      color: Math.random() * 0x7fc5f9,
      emissive: Math.random() * 0x25673d,
      emissiveIntensity: 0.4,
      metalness: 0,
      roughness: 0.5
    })
  ];
  const geometryBox = new BoxGeometry(3, 3, 3);
  const geometrySphere = new SphereGeometry(3, 30, 30);
  const geometryCone = new ConeGeometry(3, 4, 20, 1, true);
  const shapes = [];
  for (let i = 0; i < 3; i += 1) {
    const currIndex = i * 3;
    shapes.push(new Mesh(geometryBox, materials[i]));
    shapes.push(new Mesh(geometrySphere, materials[i]));
    shapes.push(new Mesh(geometryCone, materials[i]));
    shapes[currIndex].position.x = -7;
    shapes[currIndex + 2].position.x = 7;
    for (let j = currIndex; j < currIndex + 3; j += 1) {
      shapes[j].position.y = 7 - 7 * i;
    }
  }
  return shapes;
};

const init = (shapes, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new DirectionalLight(0xffffff, 0.5);
  scene.add(light);

  Object.entries(shapes).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

export { init, createGeometry };
