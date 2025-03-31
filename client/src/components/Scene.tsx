import styles from '@styles/canvas/mainCanva.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import Amogus from '@components/models/Amogus.tsx';
import CanvasLoader from '@components/CanvasLoader.tsx';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
    AccumulativeShadows,
    Environment,
    RandomizedLight,
} from '@react-three/drei';
import DelayedSuspense from '@utils/DelayedSuspense.tsx';

const Scene = () => {
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRunning(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    function CamLerp({ vec = new THREE.Vector3() }) {
        useFrame((state) => {
            state.camera.position.lerp(
                vec.set(
                    1 + state.pointer.x * 0.3,
                    0.9 - state.pointer.y * 0.2,
                    3
                ),
                0.01
            );
            state.camera.lookAt(0, 0, 0);
        });
    }

    return (
        <div className={styles.canvas}>
            <Canvas
                id="canvas"
                camera={{ position: [0, 2, 4] }}
                shadows={{
                    type: THREE.PCFSoftShadowMap,
                    enabled: true,
                }}
                gl={{ logarithmicDepthBuffer: true, antialias: true }}
            >
                <DelayedSuspense fallback={<CanvasLoader />} minDuration={1000}>
                    <ambientLight intensity={1} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={-1}
                        penumbra={1}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />
                    <pointLight
                        position={[-5.5, 5, 5]}
                        intensity={3}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    <color attach={'background'} args={['#fce1e1']} />
                    <Amogus
                        position={[1.3, 0, 1.8]}
                        rotation={[0, -0.18, 0]}
                        scale={0.015}
                        runAnimation={isRunning}
                        castShadow
                    />

                    <AccumulativeShadows
                        temporal
                        frames={40}
                        alphaTest={0.2}
                        opacity={1}
                        scale={12}
                        toneMapped={false}
                    >
                        <RandomizedLight
                            amount={8}
                            radius={2}
                            ambient={0.5}
                            intensity={1}
                            position={[-5.5, 5, 5]}
                        />
                    </AccumulativeShadows>
                    <Environment preset="city" />
                    <CamLerp />
                </DelayedSuspense>
            </Canvas>
        </div>
    );
};

export default Scene;
