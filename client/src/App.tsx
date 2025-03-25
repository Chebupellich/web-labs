import Amogus from '@components/models/Amogus.tsx';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls, Leva } from 'leva';
import { Canvas } from '@react-three/fiber';
import styles from '@styles/canvas/mainCanva.module.scss';

const App = () => {
    const p = useControls('Amogus', {
        posX: { value: 0, min: -10, max: 10 },
        posY: { value: -2, min: -10, max: 10 },
        posZ: { value: -10, min: -10, max: 10 },
        resize: { value: 0.03, min: 0.0001, max: 1 },

        lightX: { value: 0, min: -10, max: 10 },
        lightY: { value: -2, min: -10, max: 10 },
        lightZ: { value: 10, min: -10, max: 10 },
    });
    return (
        <div className={styles.canvas}>
            <Leva />
            <Canvas
                id="canvas"
                camera={{ position: [0, 2, 0], rotation: [0, 0, 0] }}
            >
                <color attach={'background'} args={['#FFE8E8']} />
                <OrbitControls target={[p.posX, p.posY, p.posZ]} />

                <Amogus scale={p.resize} position={[p.posX, p.posY, p.posZ]} />
                <ambientLight intensity={1.5} />
                <directionalLight
                    position={[p.lightX, p.lightY, p.lightZ]}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
            </Canvas>
        </div>
    );
};

export default App;
