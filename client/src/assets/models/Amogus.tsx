// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Amogus = (props) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/models/Amogus2.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (materials.personnage) {
            materials.personnage.color.set('red');
            materials['Material.001'].color.set('red');
        }
    }, []);

    useEffect(() => {
        if (props.runAnimation) {
            actions['ArmatureAction']?.play();
        } else {
            actions['ArmatureAction']?.stop();
        }
    }, [animations, actions, props.runAnimation]);

    return (
        <group ref={group} {...props}>
            <group name="Scene">
                <group name="Armature" castShadow>
                    <group name="Cube">
                        <skinnedMesh
                            name="Cube001"
                            geometry={nodes.Cube001.geometry}
                            material={materials.personnage}
                            skeleton={nodes.Cube001.skeleton}
                            castShadow
                        />
                        <skinnedMesh
                            name="Cube001_1"
                            geometry={nodes.Cube001_1.geometry}
                            material={materials.ecran}
                            skeleton={nodes.Cube001_1.skeleton}
                            castShadow
                        />
                        <skinnedMesh
                            name="Cube001_2"
                            geometry={nodes.Cube001_2.geometry}
                            material={materials.pourtour}
                            skeleton={nodes.Cube001_2.skeleton}
                            castShadow
                        />
                    </group>
                    <skinnedMesh
                        name="Cube002"
                        geometry={nodes.Cube002.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Cube002.skeleton}
                        castShadow
                    />
                    <primitive object={nodes.Bone} />
                    <primitive object={nodes.Bone001} />
                    <primitive object={nodes.Bone002} />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/models/Amogus2.glb');
export default Amogus;
