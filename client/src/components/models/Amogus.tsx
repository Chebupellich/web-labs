// @ts-nocheck

import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

const Amogus = (props) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF('/models/Amogus2.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Печать всех анимаций, содержащихся в модели
        console.log('Список анимаций в модели:', animations);

        // Если нужно получить имя анимации
        animations.forEach((anim, index) => {
            console.log(`Анимация ${index + 1}: ${anim.name}`);
        });

        // Например, проиграть анимацию с именем 'Walk'
        if (!actions) {
            actions['ArmatureAction']?.play(); // Замените 'Walk' на имя нужной анимации
        }
    }, [animations, actions]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature">
                    <group name="Cube">
                        <skinnedMesh
                            name="Cube001"
                            geometry={nodes.Cube001.geometry}
                            material={materials.personnage}
                            skeleton={nodes.Cube001.skeleton}
                        />
                        <skinnedMesh
                            name="Cube001_1"
                            geometry={nodes.Cube001_1.geometry}
                            material={materials.ecran}
                            skeleton={nodes.Cube001_1.skeleton}
                        />
                        <skinnedMesh
                            name="Cube001_2"
                            geometry={nodes.Cube001_2.geometry}
                            material={materials.pourtour}
                            skeleton={nodes.Cube001_2.skeleton}
                        />
                    </group>
                    <skinnedMesh
                        name="Cube002"
                        geometry={nodes.Cube002.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.Cube002.skeleton}
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
