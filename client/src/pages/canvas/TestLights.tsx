import { Environment } from '@react-three/drei';
import { useControls } from 'leva';

const TestLights = () => {
    const dirCtl = useControls('Directional Light', {
        visible: true,
        x: { value: -3.0, min: -10, max: 10 },
        y: { value: -3.0, min: -10, max: 10 },
        z: { value: -3.0, min: -10, max: 10 },
    });

    const ambientCtl = useControls('Ambient Light', {
        visible: true,
        intensity: {
            value: 1.0,
            min: 0,
            max: 1.0,
            step: 0.1,
        },
    });

    return (
        <>
            <ambientLight
                visible={ambientCtl.visible}
                intensity={ambientCtl.intensity}
            />
            <directionalLight
                visible={dirCtl.visible}
                position={[dirCtl.x, dirCtl.y, dirCtl.z]}
                castShadow
            />

            <Environment preset="city" />
        </>
    );
};

export default TestLights;
