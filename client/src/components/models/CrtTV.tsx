// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { Text3D, useGLTF } from '@react-three/drei';

const CrtTV = (props) => {
    const { nodes, materials } = useGLTF('/models/crtTV.glb');
    useEffect(() => {
        materials['Screen_glass_texture.png'].needsUpdate = true;
        materials['Screen_glass_texture.png'].transparent = true;
        //materials['Screen_glass_texture.png'].color = '#505450';
        materials['Screen_glass_texture.png'].opacity = 0.3;
    }, [materials['Screen_glass_texture.png']]);
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.937}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.TV_case_TV_case_texturepng_0.geometry}
                        material={materials['TV_case_texture.png']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.main_hoop_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Stand_texture_0.geometry}
                        material={materials.texture}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.foot_1_Dark_red_texturepng_0.geometry}
                        material={materials['Dark_red_texture.png']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.foot_2_Dark_red_texturepng_0.geometry}
                        material={materials['Dark_red_texture.png']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Screen_hoop_texture_2_0.geometry}
                        material={materials.texture_2}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.TV_screen_Screen_texturepng_0.geometry}
                        material={materials['Screen_texture.png']}
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.stereo_hoop_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.dial_hoop_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                    />

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.button_1_Button_1_texture_0.geometry}
                        material={materials.Button_1_texture}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.button_2_Button_2_texture_0.geometry}
                        material={materials.Button_2_texture}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.Logo_plane_Logo_texture_color_televisionpng_0
                                .geometry
                        }
                        material={
                            materials['Logo_texture_color_television.png']
                        }
                        position={[-0.938, 0, 0]}
                        rotation={[0, 0, Math.PI / 2]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.stereo_plane_Stereo_texturepng_0.geometry
                        }
                        material={materials['Stereo_texture.png']}
                        position={[-0.938, 0, 0]}
                        rotation={[0, 0, Math.PI / 2]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.button_plane_Button_plane_texturepng_0
                                .geometry
                        }
                        material={materials['Button_plane_texture.png']}
                        position={[-0.938, 0, 0]}
                        rotation={[0, 0, Math.PI / 2]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.top_logo_hoop_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                    />

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.dial_1_Dial_1_texture_0.geometry}
                        material={materials.Dial_1_texture}
                        rotation={[0, 0, Math.PI / 2]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.dial_2_Dial_2_texture_0.geometry}
                        material={materials.Dial_2_texture}
                        rotation={[0, 0, Math.PI / 2]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.antenna_cube_Antenna_cube_texture_0.geometry
                        }
                        material={materials.Antenna_cube_texture}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.Antenna_2_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                        rotation={[0.829, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={
                            nodes.Antenna_1_Dark_red_texturepng_0.geometry
                        }
                        material={materials['Dark_red_texture.png']}
                        rotation={[-0.829, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.top_Logo_plane_Top_logopng_0.geometry}
                        material={materials['Top_logo.png']}
                        position={[-0.938, 56.25, 70.313]}
                        rotation={[0, 0, Math.PI / 2]}
                    />

                    {/* Экран */}
                    <group
                        position={[34.375, 51.563, -23.438]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={
                                nodes.screen_glass_Screen_glass_texturepng_0
                                    .geometry
                            }
                            material={materials['Screen_glass_texture.png']}
                        />
                        <Text3D
                            font={
                                '/fonts/jsonFonts/MontserratSemiBold_Regular.json'
                            }
                            position={[5, 60, 0]}
                            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                            size={5}
                        >
                            <meshStandardMaterial color="black" />
                            Login
                        </Text3D>
                    </group>
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/models/crtTV.glb');
export default CrtTV;
