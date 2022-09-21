import React, { Component } from "react";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraFov: 40,
            lightColor: 0xffffff,
            cameraPositionX: 4,
            cameraPositionY: 2,
            cameraPositionZ: 4,
        }
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(this.state.cameraFov, window.innerWidth / window.innerHeight);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
    }

    componentDidMount() {
        this.setScene();
    }

    setScene = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);
        this.camera.position.z = this.state.cameraPositionX;
        this.camera.position.y = this.state.cameraPositionY;
        this.camera.position.x = this.state.cameraPositionZ;
        const avatar = this.props.avatar;
        this.loadAvatarFile(avatar.avatar_link, (glb) => this.buildScene(glb));
    }

    loadAvatarFile = (file, callback) => {
        const loader = new GLTFLoader();
        this.scene = new THREE.Scene();
        loader.load(file, (glb) => {
            callback(glb);
        });
    }

    buildScene = (glb) => {
        new OrbitControls(this.camera, this.renderer.domElement);
        this.scene.add(glb.scene);
        const light = new THREE.DirectionalLight(this.state.lightColor, 1);
        light.position.set(2, 2, 5);
        this.scene.add(light);
        this.renderer.render(this.scene, this.camera);
        this.animation();
        window.addEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div className="model-container" ref={mount => {
                this.mount = mount;
            }}>
            </div>
        );
    }
}