import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const style = {
  height: 300, // we can control scene size by setting container dimensions
};

export default class MeshObject extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.sceneSetup();
    this.addLights();
    this.loadTheModel(this.props);
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      500 // far plane
    );
    this.camera.position.z = 2; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.mount);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Code below is taken from Three.js OBJ Loader example
  // https://threejs.org/docs/#examples/en/loaders/OBJLoader
  loadTheModel = (props) => {
    // instantiate a loader
    const loader = new OBJLoader();
    this.scene.add(loader.parse(props.meshObject));

    // load a resource

    // loader.load(
    //   // resource URL relative to the /public/index.html of the app
    //   "cloth3.obj",
    //   // props.meshObject,
    //   // called when resource is loaded
    //   (object) => {
    //     this.scene.add(object);
    //     // console.log(this.scene);

    //     // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
    //     // you can always set console.log(this.scene) and check its children to know the name of a model
    //     const el = this.scene.getObjectByName("TexturedMesh");
    //     // const el = this.scene.getObjectByName("TexturedMesh");
    //     // change some custom props of the element: placement, color, rotation, anything that should be
    //     // done once the model was loaded and ready for display
    //     el.position.set(-0.5, 0.5, 0);
    //     // el.material.color.set(0x50c878);
    //     el.rotation.y = 20;
    //     el.rotation.x = 0;
    //     // el.rotation.x = 23.5;

    //     // make this element available inside of the whole component to do any animation later
    //     this.model = el;
    //   },
    //   // called when loading is in progresses
    //   (xhr) => {
    //     const loadingPercentage = Math.ceil((xhr.loaded / xhr.total) * 100);
    //     console.log(loadingPercentage + "% loaded");

    //     // update parent react component to display loading percentage
    //     this.props.onProgress(loadingPercentage);
    //   },
    //   // called when loading has errors
    //   (error) => {
    //     console.log("An error happened:" + error);
    //   }
    // );
  };

  // adding some lights to the scene
  addLights = () => {
    const lights = [];

    // set color and intensity of lights
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    // place some lights around the scene for best looks and feel
    lights[0].position.set(0, 2000, 0);
    lights[1].position.set(1000, 2000, 1000);
    lights[2].position.set(-1000, -2000, -1000);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    // slowly rotate an object
    // if (this.model) this.model.rotation.y += 0.005;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={(ref) => (this.mount = ref)} />;
  }
}
