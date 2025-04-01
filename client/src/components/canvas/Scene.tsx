import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';

import Amogus from '@components/models/Amogus.tsx';
import CanvasLoader from '@components/canvas/CanvasLoader.tsx';
import * as THREE from 'three';
import { Lights, Shadows } from '@components/canvas/Lights.tsx';
import styles from '@styles/canvas/mainCanva.module.scss';

const Scene = () => {
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRunning(false);
        }, 2750);
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
        return <></>;
    }
    // function Postpro() {
    //     const ref = useRef<{ intensity: number } | null>(null);
    //
    //     useFrame((state) => {
    //         if (ref.current) {
    //             ref.current.intensity =
    //                 0.0001 + Math.sin(state.clock.elapsedTime * 0.5) * 0.00005; // Очень слабый шум
    //         }
    //     });
    //
    //     return (
    //         <EffectComposer>
    //             <Noise
    //                 ref={ref}
    //                 premultiply
    //                 blendFunction={BlendFunction.SOFT_LIGHT}
    //             />
    //         </EffectComposer>
    //     );
    // }

    return (
        <div className={styles.canvas}>
            <CanvasLoader />
            <Canvas camera={{ position: [0, 2, 4] }} shadows>
                <Suspense fallback={null}>
                    <color attach={'background'} args={['#fce1e1']} />
                    <Lights />

                    <group>
                        <Center top position={[1.3, 0, 1.8]}>
                            <Amogus
                                position={[1.3, 0, 1.8]}
                                rotation={[0, -0.18, 0]}
                                scale={0.015}
                                runAnimation={isRunning}
                            />
                        </Center>

                        <Shadows />
                    </group>

                    <CamLerp />
                    {/*<Postpro />*/}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
