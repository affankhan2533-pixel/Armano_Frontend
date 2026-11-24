'use client';

import { useRef, useState, useEffect, Suspense, useSyncExternalStore, Component } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { QuiltedPouchMesh } from './QuiltedPouchMesh';
import { BlenderPouchModel, BLENDER_MODEL_PATH } from './BlenderPouchModel';
import { HERO_THEMES } from '@/data/heroThemes';
import { Check, Sparkles } from 'lucide-react';
import { HeroProductPhoto } from '@/components/hero/HeroProductPhoto';

function ReadyNotifier({ onReady }) {
  const notified = useRef(false);
  useFrame(() => {
    if (!notified.current) {
      notified.current = true;
      onReady();
    }
  });
  return null;
}

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

/**
 * Dynamic Studio Lighting Rig
 * Updates lighting warmth, intensity, and color temperature synchronized with active theme.
 * Diffused softbox key + gentle fill + rim light delineating silhouette contours.
 */
function StudioLighting({ theme }) {
  const keyLightRef = useRef(null);
  const fillLightRef = useRef(null);
  const rimLightRef = useRef(null);

  useFrame(() => {
    if (!theme) return;
    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(new THREE.Color(theme.keyLightColor), 0.1);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        theme.keyLightIntensity,
        0.1
      );
    }
    if (fillLightRef.current) {
      fillLightRef.current.color.lerp(new THREE.Color(theme.fillLightColor), 0.1);
      fillLightRef.current.intensity = THREE.MathUtils.lerp(
        fillLightRef.current.intensity,
        theme.fillLightIntensity,
        0.1
      );
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.lerp(new THREE.Color(theme.rimLightColor), 0.1);
      rimLightRef.current.intensity = THREE.MathUtils.lerp(
        rimLightRef.current.intensity,
        theme.rimLightIntensity,
        0.1
      );
    }
  });

  return (
    <>
      <ambientLight intensity={theme?.isDarkTheme ? 0.9 : 0.75} color="#FAF7F2" />

      {/* Large Diffused Softbox Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[3.8, 5.0, 4.0]}
        intensity={theme?.keyLightIntensity || 1.9}
        color={theme?.keyLightColor || '#FFFDF8'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Gentle Studio Fill Light */}
      <directionalLight
        ref={fillLightRef}
        position={[-4.0, 2.2, 2.2]}
        intensity={theme?.fillLightIntensity || 0.85}
        color={theme?.fillLightColor || '#EDE4D6'}
      />

      {/* Champagne Rim Light highlighting the top zipper ridge & silhouette edges */}
      <directionalLight
        ref={rimLightRef}
        position={[0, 4.2, -4.0]}
        intensity={theme?.rimLightIntensity || 2.2}
        color={theme?.rimLightColor || '#E8D5B7'}
      />

      {/* Gentle upward bounce light illuminating bottom gusset & tailored welt */}
      <directionalLight
        position={[0, -2.5, 1.8]}
        intensity={theme?.isDarkTheme ? 0.45 : 0.6}
        color={theme?.fillLightColor || '#EDE4D6'}
      />
    </>
  );
}

/**
 * Adaptive Aspect-Ratio Camera Controller
 * Guarantees zero clipping across desktop, tablet, and mobile portrait viewports.
 * Dynamically calculates camera distance to maintain optimal visual presence.
 */
function AdaptiveCameraRig({ prefersReducedMotion }) {
  const isInitialized = useRef(false);

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    // Detect mobile or narrow aspect viewport
    const width = state.size.width;
    const height = Math.max(1, state.size.height);
    const aspect = width / height;
    const isMobile = width < 640 || (typeof window !== 'undefined' && window.innerWidth < 1024);

    // If viewport aspect is narrow (portrait or split columns), scale distance gracefully so zero clipping occurs
    const aspectFactor = aspect < 1.15 ? Math.min(1.25, 1.15 / Math.max(0.75, aspect)) : 1.0;
    const baseZ = isMobile ? 3.9 : 4.6;
    const targetZ = baseZ * aspectFactor;
    const targetY = isMobile ? 0.0 : 0.08;

    if (!isInitialized.current) {
      state.camera.position.set(0, targetY + 0.1, targetZ + 0.2);
      isInitialized.current = true;
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, Math.min(1, delta * 3));
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, Math.min(1, delta * 2.5));
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, Math.min(1, delta * 2.5));
  });

  return null;
}

/**
 * Interactive Mouse Parallax & Proximity Zoom Controller (V6.3)
 * When the desktop pointer approaches the 3D pouch:
 * - Smoothly zooms in by a controlled amount (scale 0.98 -> 1.045)
 * - Applies gentle X/Y parallax tracking
 * - Applies subtle 3-4 degree rotation
 * - Smoothly damps back to rest pose when pointer leaves
 * - Disables parallax on touch/mobile and prefers-reduced-motion
 */
function InteractiveParallaxStage({ theme, prefersReducedMotion, useBlenderModel = false }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (prefersReducedMotion) {
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.scale.set(1, 1, 1);
      return;
    }

    const isMobile = state.size.width < 640 || (typeof window !== 'undefined' && window.innerWidth < 1024);

    if (isMobile) {
      // On mobile: stable rest pose with optimal visual presence (scale 0.94) and centered vertical balance
      // to guarantee full zipper bar, puller tab, side gussets, quilted body, and ground shadow are 100% visible
      const lerpSpeed = Math.min(1, delta * 3.0);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, lerpSpeed);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.0, lerpSpeed);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, lerpSpeed);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, lerpSpeed);
      groupRef.current.scale.set(0.94, 0.94, 0.94);
      return;
    }

    // Pointer coordinates normalized [-1, 1]
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Distance from center of pouch
    const dist = Math.sqrt(px * px + py * py);
    // Proximity factor: 1 when directly over pouch, 0 when far away
    const proximity = Math.max(0, 1 - dist / 1.35);

    // Controlled zoom: 0.98 rest scale up to 1.045 close zoom
    const targetScale = 0.98 + proximity * 0.065;

    // Gentle X/Y parallax shift (max +-0.08 units X, +-0.05 units Y)
    const targetX = px * 0.08;
    const targetY = py * 0.05;

    // Subtle 3-4 degree rotation tilt (max 0.065 rad)
    const targetRotY = px * 0.06;
    const targetRotX = -py * 0.04;

    // Smooth exponential damping
    const lerpSpeed = Math.min(1, delta * 3.0);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      lerpSpeed
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      lerpSpeed
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      lerpSpeed
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      lerpSpeed
    );

    const newScale = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      lerpSpeed
    );
    groupRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group ref={groupRef}>
      {useBlenderModel ? (
        <Suspense
          fallback={
            <QuiltedPouchMesh
              theme={theme}
              color={theme.colorHex}
              prefersReducedMotion={prefersReducedMotion}
            />
          }
        >
          <BlenderPouchModel
            theme={theme}
            color={theme.colorHex}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      ) : (
        <QuiltedPouchMesh
          theme={theme}
          color={theme.colorHex}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </group>
  );
}

const noopSubscribe = () => () => {};

function getWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
    );
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Graceful fallback for browsers where WebGL is blocked or hardware acceleration is disabled
    console.warn('WebGL Studio Fallback Active:', error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Borderless Transparent 3D Studio Canvas (V6.3 Restored Right-Side Hero)
 * Mounted inside the 58% right column (visual center ~72% viewport width).
 * Pure transparent WebGL canvas: zero card backgrounds, zero borders, zero clipped containers.
 */
export function Hero3DCanvas({ activeTheme, onSelectTheme }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getPrefersReducedMotion,
    () => false
  );
  const webglSupported = useSyncExternalStore(
    noopSubscribe,
    getWebGLSupport,
    () => true
  );
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [is3DReady, setIs3DReady] = useState(false);
  const [useBlenderModel, setUseBlenderModel] = useState(false);
  const theme = activeTheme || HERO_THEMES[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Check if armano-pouch.glb is available in /models/
    fetch(BLENDER_MODEL_PATH, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.status === 200) {
          const type = res.headers.get('content-type') || '';
          const len = parseInt(res.headers.get('content-length') || '0', 10);
          if (!type.includes('text/html') && (len > 1000 || type.includes('model') || type.includes('octet-stream'))) {
            setUseBlenderModel(true);
          }
        }
      })
      .catch(() => {
        setUseBlenderModel(false);
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none bg-transparent"
      style={{ background: 'transparent' }}
    >
      {/* Product Display Stage: Progressive 3D WebGL Studio with Resilient Photo Fallback */}
      <div
        className="relative w-full h-[180px] xs:h-[205px] sm:h-[270px] md:h-[350px] lg:h-[min(430px,49vh)] xl:h-[550px] bg-transparent flex items-center justify-center overflow-visible"
        style={{ background: 'transparent' }}
      >
        {webglSupported ? (
          <>
            {/* Print Fallback (Always crisp authentic photograph in PDF/print exports) */}
            <div className="hidden print:block w-full h-full">
              <HeroProductPhoto priority />
            </div>

            {/* Instant Photographic Backdrop until 3D Canvas delivers first rendered frame */}
            {!is3DReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 z-0 print:hidden">
                <HeroProductPhoto priority />
              </div>
            )}

            {/* Interactive 3D WebGL Canvas */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent print:hidden flex items-center justify-center relative z-10">
              <CanvasErrorBoundary
                fallback={
                  <HeroProductPhoto
                    priority
                    className="relative w-full h-full"
                  />
                }
              >
                <Canvas
                  shadows
                  camera={{ position: [0, 0.08, 4.6], fov: 35 }}
                  dpr={[1, 1.75]}
                  frameloop="always"
                  gl={{
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.05,
                  }}
                  onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                    const canvasDom = gl.domElement;
                    if (canvasDom) {
                      canvasDom.addEventListener(
                        'webglcontextlost',
                        (e) => {
                          e.preventDefault();
                          console.warn('WebGL context lost, awaiting restoration...');
                        },
                        false
                      );
                    }
                  }}
                  style={{ background: 'transparent' }}
                  className="w-full h-full bg-transparent"
                >
                  <AdaptiveCameraRig prefersReducedMotion={prefersReducedMotion} />
                  <StudioLighting theme={theme} />
                  <ReadyNotifier onReady={() => setIs3DReady(true)} />

                  <Suspense fallback={null}>
                    <InteractiveParallaxStage
                      theme={theme}
                      prefersReducedMotion={prefersReducedMotion}
                      useBlenderModel={useBlenderModel}
                    />

                    {/* Seamless Soft Ground Contact Shadow */}
                    <ContactShadows
                      position={[0, -0.88, 0]}
                      opacity={theme.shadowOpacity || 0.36}
                      scale={6.8}
                      blur={2.4}
                      far={2.4}
                      color={theme.shadowColor || '#2B241C'}
                    />
                  </Suspense>

                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 3.8}
                    maxPolarAngle={Math.PI / 1.75}
                    minAzimuthAngle={-Math.PI / 2.2}
                    maxAzimuthAngle={Math.PI / 2.2}
                    dampingFactor={0.06}
                    rotateSpeed={0.8}
                  />
                </Canvas>
              </CanvasErrorBoundary>
            </div>
          </>
        ) : (
          <HeroProductPhoto priority />
        )}
      </div>

      {/* Floating Swatch Controller & Concept Badging:
          Always visible, reachable, and interactive */}
      <div className="w-full max-w-[290px] xs:max-w-[320px] sm:max-w-md mt-1 sm:mt-2 lg:mt-3 z-20 print:hidden">
        <div
          className="px-3.5 py-1.5 sm:py-2.5 rounded-full backdrop-blur-md border shadow-md flex items-center justify-between gap-2.5 transition-colors duration-700"
          style={{
            backgroundColor: theme.isDarkTheme
              ? 'rgba(25, 30, 32, 0.85)'
              : 'rgba(255, 255, 255, 0.88)',
            borderColor: theme.borderMuted,
          }}
        >
          {/* Active Concept Label */}
          <div className="flex flex-col text-left min-w-0 pr-1">
            <span
              className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest truncate transition-colors duration-700"
              style={{ color: theme.textMuted }}
            >
              Colour Concept
            </span>
            <span
              className="text-xs sm:text-sm font-serif font-medium truncate transition-colors duration-700"
              style={{ color: theme.textPrimary }}
            >
              {theme.name}
            </span>
          </div>

          {/* Interactive Swatch Selection Radios */}
          <div
            role="radiogroup"
            aria-label="Cosmetic Pouch Colour Concept Previews"
            className="flex items-center gap-1.5 sm:gap-2.5 shrink-0"
          >
            {HERO_THEMES.map((swatch) => {
              const isSelected = theme.id === swatch.id;
              return (
                <button
                  key={swatch.id}
                  id={`swatch-${swatch.id}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Preview ${swatch.name} shade and environment`}
                  onClick={() => onSelectTheme && onSelectTheme(swatch)}
                  className={`group relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                    isSelected
                      ? 'scale-115 shadow-md ring-2 ring-offset-2'
                      : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: swatch.colorHex,
                    borderColor: swatch.isDarkTheme ? '#555B60' : '#D8C3AC',
                    '--tw-ring-color': swatch.swatchRing,
                    '--tw-ring-offset-color': theme.bgPrimary,
                  }}
                  title={`${swatch.name} (${swatch.conceptLabel})`}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        swatch.isDarkTheme ? 'text-white' : 'text-[#17372E]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transparent Concept Disclaimer Footnote */}
        <p
          className="text-center text-[8px] xs:text-[8.5px] sm:text-[10px] font-mono tracking-wide mt-1 sm:mt-1.5 transition-colors duration-700"
          style={{ color: theme.textMuted }}
        >
          <Sparkles className="w-2.5 h-2.5 inline mr-1 text-[#C5A059]" />
          Visual Concept Model • Production materials verified during physical sampling
        </p>
      </div>
    </div>
  );
}

export default Hero3DCanvas;
