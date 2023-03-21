import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Object({ geometry, material,position,scale }) {
  const mesh = useRef();
  const numberScale = scale.split(',')

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