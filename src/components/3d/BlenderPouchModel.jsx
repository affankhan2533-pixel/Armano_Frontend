'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const BLENDER_MODEL_PATH = '/models/armano-pouch.glb';

/**
 * ARMANO V9.0 — Blender 3D Pouch Model Component
 * - Loads the final Blender-authored GLB model (/models/armano-pouch.glb).
 * - Applies theme colour selection across compatible body fabrics/leathers.
 * - Intelligently preserves metallic hardware, zipper sliders, teeth, and pullers without unwanted tinting.
 * - Preserves native normal maps, roughness maps, micro-stitching, and PBR textures from Blender.
 */
export function BlenderPouchModel({
  theme = null,
  color = '#F6F1EA',
  prefersReducedMotion = false,
}) {
  const { scene } = useGLTF(BLENDER_MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const modelRef = useRef();

  useEffect(() => {
    if (!clonedScene) return;

    const targetColor = new THREE.Color(color || theme?.colorHex || '#F6F1EA');

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach((mat) => {
          // Identify metallic hardware components to preserve metallic luster
          const isHardware =
            (mat.metalness && mat.metalness > 0.5) ||
            (mat.name && /(metal|zipper|hardware|gold|brass|puller|slider|ring|teeth|chain)/i.test(mat.name)) ||
            (child.name && /(metal|zipper|hardware|gold|brass|puller|slider|ring|teeth|chain)/i.test(child.name));

          if (!isHardware) {
            // Apply swatch colour to fabric/leather body while keeping roughness and normal maps intact
            mat.color.copy(targetColor);
            mat.needsUpdate = true;
          } else {
            // Ensure hardware maintains champagne gold or metallic luster
            mat.metalness = Math.max(mat.metalness || 0, 0.8);
            mat.roughness = Math.min(mat.roughness || 1, 0.28);
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [clonedScene, color, theme]);

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      dispose={null}
    />
  );
}
