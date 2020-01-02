import React from 'react';
import { init, createGeometry } from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.02,
      renderer: null,
      scene: null,
      camera: null,
      shapes: null
    };
  }

  componentDidMount = () => {
    this.createShapes();
  };

  createShapes = () => {
    const shapes = createGeometry();
    const start = init(shapes, { z: 20 });
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      shapes
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, shapes } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      shapes !== null
    ) {
      shapes.forEach((shape) => {
        shape.rotation.x += ADD;
        shape.rotation.y += ADD;
      });
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
