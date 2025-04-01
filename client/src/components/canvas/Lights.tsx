import {
    AccumulativeShadows,
    Environment,
    RandomizedLight,
} from '@react-three/drei';
import { memo } from 'react';

const Lights = () => {
    return (
        <>
            <ambientLight visible={true} intensity={1} />
            <directionalLight
                visible={true}
                position={[-10, -4.2, 8.2]}
                castShadow
            />

            <Environment preset="city" />
        </>
    );
};

const Shadows = memo(() => (
    <AccumulativeShadows
        temporal
        frames={100}
        color="#9d4b4b"
        colorBlend={0.6}
        alphaTest={0.75}
        scale={10}
    >
        <RandomizedLight amount={8} radius={4} position={[-8.5, 5, 5.4]} />
    </AccumulativeShadows>
));

export { Lights, Shadows };
