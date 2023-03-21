import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Object({ geometry, material,position,scale }) {
  const mesh = useRef();
  const {scene} = useThree()

  const numberScale = scale.split(',')

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 2, 1).normalize();
  light.intensity = 2;
  light.color = new THREE.Color(0xffffff);
  scene.add(light);

  useEffect(() => {
    mesh.current.scale.set(+numberScale[0], +numberScale[1], +numberScale[2]);
  }, []);

  return (
    <>
    
      <mesh ref={mesh} position={position} geometry={geometry} material={material}/>
    </>
  );
}

export default Object