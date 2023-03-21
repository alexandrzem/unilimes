
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

import Object from '../components/Object';
import './Three.css'

extend({ OrbitControls })

function Controls() {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} />;
}

function Light(){
  const { scene } = useThree()
  useEffect(() => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 2, 1).normalize();
    light.intensity = 10;
    scene.add(light);
  }, [])

  return <ambientLight color={0xffffff} intensity={10}/>
}

function Three() {
  const [objects, setObjects] = useState([]);
  const [geometryType, setGeometryType] = useState('cube');
  const [scale, setScale] = useState('1, 1, 1');

  const handleCreateClick = () => {
    const uuid = THREE.MathUtils.generateUUID();
    const position = new THREE.Vector3(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
    let geometry;
    switch (geometryType) {
      case 'cube':
        geometry = new THREE.BoxGeometry();
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry();
        break;
      case 'pyramid':
        geometry = new THREE.ConeGeometry(1, 2, 4);
        break;
      default:
        return;
    }

    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0, 0, 0) });

    setObjects([...objects, { uuid, geometry, material, position }]);
  };

  const handleObjectClick = (uuid) => {
    setObjects(objects.filter((obj) => obj.uuid !== uuid));
  };

  return (
    <>
      <div className='geometry-select'>
        <select value={geometryType} onChange={(e) => setGeometryType(e.target.value)}>
          <option value="cube">Cube</option>
          <option value="sphere">Sphere</option>
          <option value="pyramid">Pyramid</option>
        </select>
        <input className='scaleInput' type='text' value={scale} onChange={(e) => setScale(e.target.value)} />
        <button disabled={false} onClick={handleCreateClick}>Create</button>
      </div>
      <Canvas style={{ widht: '100%', height: '100vh' }}>
        <Light/>
        {objects.map(({ uuid, geometry, material, position }) => (
          <Object key={uuid} scale={scale} geometry={geometry} material={material} position={position} />
        ))}
        <Controls />
      </Canvas>
      <ul className="uuid-list">
        {objects.map(({ uuid }) => (
          <li key={uuid}>
            <p>{uuid} </p><button onClick={() => handleObjectClick(uuid)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Three;
