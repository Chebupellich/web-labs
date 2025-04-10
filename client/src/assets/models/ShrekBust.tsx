// @ts-nocheck

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Shrek(props) {
    const { nodes, materials } = useGLTF('/models/ShrekBust.glb');
    return (
        <group {...props} dispose={null} castShadow>
            <mesh
                geometry={nodes.shrek.geometry}
                material={materials['mini simple material primary']}
                scale={100}
                castShadow
                receiveShadow
            />
        </group>
    );
}

useGLTF.preload('/models/ShrekBust.glb');
