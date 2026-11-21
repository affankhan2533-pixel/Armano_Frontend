'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Luxury Textile Micro-Texture Generator
 * Synthesizes a high-definition tactile bump map simulating:
 * - Fine-grain diagonal twill weave
 * - Organic soft-goods micro-creases
 * - Tactile fiber stippling
 * - Recessed stitching thread indentations along the 5x4 grid
 * Uses pure in-memory DataTexture to avoid canvas DOM fingerprint blocking (Brave Shields safe)
 */
function createFabricMicroTexture() {
  try {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    const cols = 5;
    const rows = 4;

    for (let y = 0; y < size; y++) {
      const v = y / size;
      for (let x = 0; x < size; x++) {
        const u = x / size;
        const idx = (y * size + x) * 4;

        // 1. Diagonal twill weave (ultra-fine textile cross-hatch)
        const twill = Math.sin((x + y) * 1.8) * Math.cos((x - y) * 1.8) * 6.5;

        // 2. High-frequency tactile fiber stippling
        const stipple = (Math.sin(x * 3.4) + Math.cos(y * 3.4)) * 3.0;

        // 3. Organic soft-goods micro-creases
        const crease1 = Math.sin((x * 0.35 + y * 0.15) * 0.12) * 5.0;
        const crease2 = Math.cos((x * 0.15 - y * 0.45) * 0.1) * 4.5;

        // 4. Seam stitch thread depressions along 5x4 grid
        const cellU = (u * cols) % 1;
        const cellV = (v * rows) % 1;
        const distU = Math.min(cellU, 1 - cellU);
        const distV = Math.min(cellV, 1 - cellV);
        const seamDist = Math.min(distU, distV);

        let stitchImpression = 0;
        if (seamDist < 0.024) {
          // Recessed trench along the seam line
          const trench = (1 - seamDist / 0.024) * 18.0;
          // Periodic needle stitch punctuation dashes
          const stitchFreq = (distU < distV ? y : x) * 0.18;
          const stitchPunctuation = Math.sin(stitchFreq * Math.PI * 2) > 0 ? 6.0 : -6.0;
          stitchImpression = -trench + stitchPunctuation;
        }

        const noise = (Math.random() - 0.5) * 7.0;

        const val = Math.min(
          255,
          Math.max(0, 128 + twill + stipple + crease1 + crease2 + stitchImpression + noise)
        );

        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 4);
    texture.needsUpdate = true;
    return texture;
  } catch (err) {
    console.warn('Procedural textile texture unavailable, falling back:', err?.message || err);
    return null;
  }
}

/**
 * Realistic 3D Quilted Cosmetic Pouch Mesh (V7.2.1 Refined Model)
 * Directly referenced from authentic ARMANO Master SKU AR-009 photograph:
 * - Natural soft standing trapezoidal wedge: wider sturdy base (2.48) tapering smoothly to top crest (2.24).
 * - Gentle central crest sag with soft rounded shoulder corners.
 * - 5x4 pillowed quilted cushions with realistic down-filled loft, stitch trenches, and radiating corner tension.
 * - Continuous perimeter piping welts framing front and back panels.
 * - Structured side gussets with natural organic thickness and subtle top-pinch taper.
 * - Three-quarter resting viewing angle clearly showcasing front panel, side gusset, body thickness, and base.
 * - Authentic left-anchored champagne gold zipper slider and slotted rectangular puller tab.
 * - Tactile satin-matte PBR material with soft-touch sheen.
 */
export function QuiltedPouchMesh({
  theme = null,
  color = '#F6F1EA',
  roughness = 0.54,
  metalness = 0.01,
  clearcoat = 0.06,
  clearcoatRoughness = 0.50,
  sheen = 0.82,
  sheenColor = '#FFFFFF',
  prefersReducedMotion = false,
}) {
  const groupRef = useRef(null);
  const pullTabRef = useRef(null);

  // Generate procedural fabric bump texture once
  const fabricTexture = useMemo(() => createFabricMicroTexture(), []);

  // Compute all pouch geometries based on authentic AR-009 physical proportions
  const geometries = useMemo(() => {
    const baseWidth = 2.48;
    const topWidth = 2.24;
    const height = 1.58;
    const bottomDepth = 0.88; // Standing base thickness
    const topDepth = 0.22; // Slender zipper crest thickness
    const cols = 5;
    const rows = 4;
    const segX = 84;
    const segY = 64;
    const colsCount = segX + 1;

    // Width as a function of vertical height (natural cosmetic pouch trapezoid taper)
    function getWidthAtV(v) {
      return baseWidth * (1 - v) + topWidth * v;
    }

    // Organic top crest curve: gentle center sag with soft rounded shoulder slope
    function getTopY(normX) {
      // Natural fabric gravity sag in the center along the zipper track
      const centerSag = (1 - Math.pow(normX, 2)) * 0.028;
      // Soft rounded shoulder falloff at outer edges
      const shoulderFall = 0.13 * Math.pow(normX, 2.8);
      return (height / 2) * (1 - shoulderFall) - centerSag;
    }

    // Organic standing base: sturdy flat floor with gentle corner curve
    function getBottomY(normX) {
      const cornerRadius = 0.038 * Math.pow(normX, 4.2);
      return -(height / 2) * (1 - cornerRadius);
    }

    // Helper to calculate pouch depth and quilting displacement at any normalized (u, v)
    function calculatePanelDisplacement(u, v, x, y, normX) {
      // Wedge depth profile: wide at base, tapering smoothly towards the top zipper crest
      const localDepth = (bottomDepth * (1 - v) + topDepth * v) * 0.5;

      // Whole-pouch volumetric convex bow (natural internal stuffed volume)
      const bow =
        (1 - Math.pow(normX, 2) * 0.26) *
        (1 - Math.pow((v - 0.36) / 0.64, 2) * 0.30) *
        0.078;

      // Edge seam falloff: ensures the quilting cushions blend smoothly into the outer perimeter welt
      const edgeDist = Math.min(u, 1 - u, v, 1 - v);
      const edgeTaper = Math.min(1, Math.max(0, edgeDist * 13.0));

      // 5 cols x 4 rows quilted cushions
      const gu = u * cols;
      const gv = (1 - v) * rows; // top-to-bottom grid coordinate
      const cellU = gu - Math.floor(gu);
      const cellV = gv - Math.floor(gv);

      // Distance from center of each cushion square [-1, 1]
      const cu = Math.abs(cellU - 0.5) * 2;
      const cv = Math.abs(cellV - 0.5) * 2;

      // Realistic cushion dome: gentle pillow curve with soft center plateau
      const domeU = Math.cos(cu * Math.PI * 0.5);
      const domeV = Math.cos(cv * Math.PI * 0.5);

      // Center cushions have deeper loft than perimeter cushions
      const colIdx = Math.floor(gu);
      const rowIdx = Math.floor(gv);
      const isCenterCol = colIdx >= 1 && colIdx <= 3;
      const isCenterRow = rowIdx >= 1 && rowIdx <= 2;
      const loftScale = isCenterCol && isCenterRow ? 0.058 : 0.046;

      const cushionPuff = Math.pow(Math.max(0, domeU * domeV), 0.70) * loftScale;

      // Recessed stitching groove where horizontal and vertical seams run
      const distToUSeam = 1 - cu;
      const distToVSeam = 1 - cv;
      const distToSeam = Math.min(distToUSeam, distToVSeam);
      // Sharp distinct stitch valley
      const stitchTrench = Math.exp(-Math.pow(distToSeam * 15.0, 2)) * 0.024;

      // Delicate fabric tension micro-creases radiating near stitch intersections
      const cornerDist = Math.hypot(1 - cu, 1 - cv);
      const tensionCrease =
        cornerDist < 0.40
          ? Math.sin(cornerDist * 36.0) * 0.0035 * Math.exp(-cornerDist * 5.0)
          : 0;

      // Subtle organic hand-crafted fabric asymmetry
      const organicMicro =
        (Math.sin(u * 14.8 + v * 10.4) + Math.cos(u * 8.6 - v * 12.8)) * 0.0022;

      const zDisplacement = (cushionPuff - stitchTrench + tensionCrease + organicMicro) * edgeTaper;

      return localDepth + bow * edgeTaper + zDisplacement;
    }

    // 1. FRONT QUILTED PANEL
    const frontGeo = new THREE.PlaneGeometry(1, 1, segX, segY);
    const fPos = frontGeo.attributes.position;

    for (let i = 0; i < fPos.count; i++) {
      const u = fPos.getX(i) + 0.5; // [0, 1]
      const v = fPos.getY(i) + 0.5; // [0, 1]

      const localW = getWidthAtV(v);
      const normX = Math.abs(u - 0.5) * 2; // [0, 1]
      const x = (u - 0.5) * localW;

      const topY = getTopY(normX);
      const bottomY = getBottomY(normX);
      const y = bottomY + (topY - bottomY) * v;

      fPos.setX(i, x);
      fPos.setY(i, y);

      const z = calculatePanelDisplacement(u, v, x, y, normX);
      fPos.setZ(i, z);
    }
    frontGeo.computeVertexNormals();

    // 2. BACK QUILTED PANEL (Mirrored coordinates)
    const backGeo = new THREE.PlaneGeometry(1, 1, segX, segY);
    const bPos = backGeo.attributes.position;

    for (let i = 0; i < bPos.count; i++) {
      const u = bPos.getX(i) + 0.5;
      const v = bPos.getY(i) + 0.5;

      const localW = getWidthAtV(v);
      const normX = Math.abs(u - 0.5) * 2;
      const x = (u - 0.5) * localW;

      const topY = getTopY(normX);
      const bottomY = getBottomY(normX);
      const y = bottomY + (topY - bottomY) * v;

      bPos.setX(i, x);
      bPos.setY(i, y);

      const z = calculatePanelDisplacement(u, v, x, y, normX);
      bPos.setZ(i, -z);
    }

    // Flip index winding so back panel faces outward
    const bIdx = backGeo.index;
    for (let i = 0; i < bIdx.count; i += 3) {
      const tmp = bIdx.getX(i);
      bIdx.setX(i, bIdx.getX(i + 1));
      bIdx.setX(i + 1, tmp);
    }
    backGeo.computeVertexNormals();

    // 3. CONTINUOUS PIPING WELTS (Tailored seam bead framing front & back panels)
    const perimeterIndices = [];
    for (let ix = 0; ix <= segX; ix++) perimeterIndices.push(ix);
    for (let iy = 1; iy <= segY; iy++) perimeterIndices.push(iy * colsCount + segX);
    for (let ix = segX - 1; ix >= 0; ix--) perimeterIndices.push(segY * colsCount + ix);
    for (let iy = segY - 1; iy >= 1; iy--) perimeterIndices.push(iy * colsCount);

    const loopLen = perimeterIndices.length;

    const frontPipingPoints = [];
    const backPipingPoints = [];
    for (let k = 0; k < loopLen; k++) {
      const idx = perimeterIndices[k];
      frontPipingPoints.push(new THREE.Vector3(fPos.getX(idx), fPos.getY(idx), fPos.getZ(idx)));
      backPipingPoints.push(new THREE.Vector3(bPos.getX(idx), bPos.getY(idx), bPos.getZ(idx)));
    }
    frontPipingPoints.push(frontPipingPoints[0].clone());
    backPipingPoints.push(backPipingPoints[0].clone());

    const frontPipingCurve = new THREE.CatmullRomCurve3(frontPipingPoints, true);
    const backPipingCurve = new THREE.CatmullRomCurve3(backPipingPoints, true);

    const frontPipingGeo = new THREE.TubeGeometry(frontPipingCurve, loopLen, 0.013, 8, true);
    const backPipingGeo = new THREE.TubeGeometry(backPipingCurve, loopLen, 0.013, 8, true);

    // 4. CONTINUOUS WRAP-AROUND GUSSET & STRUCTURED STANDING BASE
    const gussetPositions = [];
    const gussetUVs = [];
    const gussetIndices = [];
    const rings = 8;

    for (let r = 0; r <= rings; r++) {
      const t = r / rings;
      // Natural outward fullness in the middle of the side/bottom gusset
      const gussetBulge = Math.sin(t * Math.PI) * 0.028;

      for (let k = 0; k < loopLen; k++) {
        const idx = perimeterIndices[k];
        const fx = fPos.getX(idx);
        const fy = fPos.getY(idx);
        const fz = fPos.getZ(idx);
        const bz = bPos.getZ(idx);

        // Directional normal for organic side/base bulge
        const isSide = Math.abs(fx) > (baseWidth * 0.35);
        const isBottom = fy < -(height * 0.38);

        let dx = 0;
        let dy = 0;
        if (isSide) {
          dx = fx > 0 ? gussetBulge * 0.5 : -gussetBulge * 0.5;
        }
        if (isBottom) {
          dy = -gussetBulge * 0.4;
        }

        const x = fx + dx;
        const y = fy + dy;
        const z = fz * (1 - t) + bz * t;

        gussetPositions.push(x, y, z);
        gussetUVs.push(k / loopLen, t);
      }
    }

    for (let r = 0; r < rings; r++) {
      for (let k = 0; k < loopLen; k++) {
        const nextK = (k + 1) % loopLen;
        const i0 = r * loopLen + k;
        const i1 = r * loopLen + nextK;
        const i2 = (r + 1) * loopLen + k;
        const i3 = (r + 1) * loopLen + nextK;

        gussetIndices.push(i0, i1, i2);
        gussetIndices.push(i1, i3, i2);
      }
    }

    const gussetGeo = new THREE.BufferGeometry();
    gussetGeo.setAttribute('position', new THREE.Float32BufferAttribute(gussetPositions, 3));
    gussetGeo.setAttribute('uv', new THREE.Float32BufferAttribute(gussetUVs, 2));
    gussetGeo.setIndex(gussetIndices);
    gussetGeo.computeVertexNormals();

    // 5. METALLIC ZIPPER TRACK ALONG TOP CREST
    const zipperWidth = topWidth * 0.94;
    const zipperSegments = 54;
    const topCurvePoints = [];
    for (let i = 0; i <= zipperSegments; i++) {
      const t = i / zipperSegments;
      const x = (t - 0.5) * zipperWidth;
      const normX = Math.abs(x) / (topWidth / 2);
      const y = getTopY(normX) + 0.016;
      topCurvePoints.push(new THREE.Vector3(x, y, 0));
    }
    const zipperPath = new THREE.CatmullRomCurve3(topCurvePoints);
    const zipperGeo = new THREE.TubeGeometry(zipperPath, 54, 0.019, 10, false);

    // 6. REALISTIC ZIPPER SLIDER & PULLER (Anchored on the LEFT edge, matching AR-009 photograph)
    const sliderNormX = 0.88;
    const sliderX = -(topWidth / 2) * sliderNormX;
    const sliderY = getTopY(sliderNormX) + 0.014;

    // Puller tab shape: rectangular body with debossed center slot
    const pullerShape = new THREE.Shape();
    const pw = 0.044;
    const ph = 0.28;
    const pr = 0.008;

    pullerShape.moveTo(-pw / 2 + pr, 0);
    pullerShape.lineTo(pw / 2 - pr, 0);
    pullerShape.quadraticCurveTo(pw / 2, 0, pw / 2, -pr);
    pullerShape.lineTo(pw / 2, -ph + pr);
    pullerShape.quadraticCurveTo(pw / 2, -ph, pw / 2 - pr, -ph);
    pullerShape.lineTo(-pw / 2 + pr, -ph);
    pullerShape.quadraticCurveTo(-pw / 2, -ph, -pw / 2, -ph + pr);
    pullerShape.lineTo(-pw / 2, -pr);
    pullerShape.quadraticCurveTo(-pw / 2, 0, -pw / 2 + pr, 0);

    const holePath = new THREE.Path();
    holePath.absellipse(0, -0.042, 0.012, 0.018, 0, Math.PI * 2, true);
    pullerShape.holes.push(holePath);

    const pullerGeo = new THREE.ExtrudeGeometry(pullerShape, {
      depth: 0.014,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.003,
      bevelThickness: 0.003,
    });
    pullerGeo.center();

    return {
      frontGeo,
      backGeo,
      frontPipingGeo,
      backPipingGeo,
      gussetGeo,
      zipperGeo,
      sliderX,
      sliderY,
      pullerGeo,
    };
  }, []);

  // Idle floating and gentle organic breathing
  useFrame((state) => {
    if (prefersReducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.position.y = Math.sin(t * 0.65) * 0.020;
    groupRef.current.rotation.z = Math.sin(t * 0.32) * 0.006;
    groupRef.current.rotation.x = 0.05 + Math.cos(t * 0.42) * 0.006;

    if (pullTabRef.current) {
      // Natural gentle pendulum sway under gravity
      pullTabRef.current.rotation.z = -0.15 + Math.sin(t * 0.75) * 0.022;
    }
  });

  const activeColor = theme ? theme.colorHex : color;
  const activeRoughness = theme ? Math.max(0.50, theme.pouchRoughness) : roughness;
  const activeMetalness = theme ? theme.pouchMetalness : metalness;
  const activeClearcoat = theme ? Math.min(0.08, theme.pouchClearcoat) : clearcoat;
  const activeClearcoatRoughness = theme ? theme.pouchClearcoatRoughness : clearcoatRoughness;
  const activeSheen = theme ? Math.max(0.75, theme.pouchSheen) : sheen;
  const activeSheenColor = theme ? theme.pouchSheenColor : sheenColor;

  return (
    <group
      ref={groupRef}
      position={[0, 0.02, 0]}
      rotation={[0.06, -0.50, 0]} /* Refined Three-Quarter Viewing Angle (~29 degrees) */
      scale={0.92}
    >
      {/* 1. Front Quilted Panel */}
      <mesh geometry={geometries.frontGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={activeColor}
          roughness={activeRoughness}
          metalness={activeMetalness}
          clearcoat={activeClearcoat}
          clearcoatRoughness={activeClearcoatRoughness}
          sheen={activeSheen}
          sheenColor={new THREE.Color(activeSheenColor)}
          bumpMap={fabricTexture}
          bumpScale={0.014} /* Visible tactile textile grain */
        />
      </mesh>

      {/* 2. Back Quilted Panel */}
      <mesh geometry={geometries.backGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={activeColor}
          roughness={activeRoughness}
          metalness={activeMetalness}
          clearcoat={activeClearcoat}
          clearcoatRoughness={activeClearcoatRoughness}
          sheen={activeSheen}
          sheenColor={new THREE.Color(activeSheenColor)}
          bumpMap={fabricTexture}
          bumpScale={0.014}
        />
      </mesh>

      {/* 3. Tailored Perimeter Piping Welts (Front & Back) */}
      <mesh geometry={geometries.frontPipingGeo} castShadow>
        <meshPhysicalMaterial
          color={activeColor}
          roughness={Math.max(0.38, activeRoughness - 0.06)}
          metalness={activeMetalness}
          clearcoat={activeClearcoat + 0.02}
          clearcoatRoughness={activeClearcoatRoughness}
          sheen={activeSheen}
          sheenColor={new THREE.Color(activeSheenColor)}
        />
      </mesh>

      <mesh geometry={geometries.backPipingGeo} castShadow>
        <meshPhysicalMaterial
          color={activeColor}
          roughness={Math.max(0.38, activeRoughness - 0.06)}
          metalness={activeMetalness}
          clearcoat={activeClearcoat + 0.02}
          clearcoatRoughness={activeClearcoatRoughness}
          sheen={activeSheen}
          sheenColor={new THREE.Color(activeSheenColor)}
        />
      </mesh>

      {/* 4. Structured Wrap-Around Side Gusset & Standing Base */}
      <mesh geometry={geometries.gussetGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={activeColor}
          roughness={Math.min(1, activeRoughness + 0.04)}
          metalness={activeMetalness}
          clearcoat={activeClearcoat}
          clearcoatRoughness={activeClearcoatRoughness}
          sheen={activeSheen}
          sheenColor={new THREE.Color(activeSheenColor)}
          bumpMap={fabricTexture}
          bumpScale={0.010}
        />
      </mesh>

      {/* 5. Champagne Gold Metallic Zipper Track */}
      <mesh geometry={geometries.zipperGeo} castShadow>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.94}
          roughness={0.22}
        />
      </mesh>

      {/* 6. Champagne Gold Zipper Slider & Puller Assembly (Authentic Left Edge Placement) */}
      <group position={[geometries.sliderX, geometries.sliderY, 0.012]}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.068, 0.052, 0.054]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.94}
            roughness={0.20}
          />
        </mesh>

        <mesh position={[0, -0.028, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.016, 0.0042, 8, 16]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.94}
            roughness={0.20}
          />
        </mesh>

        <group ref={pullTabRef} position={[0, -0.046, 0.018]} rotation={[0, 0, -0.15]}>
          <mesh
            geometry={geometries.pullerGeo}
            castShadow
            position={[0, -0.10, 0]}
          >
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.94}
              roughness={0.20}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
