import { Text3D, RoundedBox } from '@react-three/drei';

const CustomCube = () => {
    return (
        <group>
            <RoundedBox args={[3, 2, 1]} radius={0.2} smoothness={4}>
                <meshStandardMaterial color="royalblue" />
            </RoundedBox>

            <Text3D
                font={'Helvetica'}
                size={0.4}
                height={0.1}
                position={[-1, 0.5, 0.51]}
            >
                Привет!
                <meshStandardMaterial color="white" />
            </Text3D>
        </group>
    );
};

export default CustomCube;
