import React, { useMemo } from 'react';

interface SolarPanelProps {
  tiltAngle: number;
  azimuthAngle: number;
  width?: number;
  height?: number;
  className?: string;
}

export const SolarPanel: React.FC<SolarPanelProps> = ({
  tiltAngle,
  azimuthAngle,
  width = 200,
  height = 120,
  className = ''
}) => {
  const transformStyle = useMemo(() => {
    // Convert angles to radians
    const tiltRad = (tiltAngle * Math.PI) / 180;
    const azimuthRad = (azimuthAngle * Math.PI) / 180;

    // Calculate perspective transformations
    const matrix = [
      Math.cos(azimuthRad),
      Math.sin(tiltRad) * Math.sin(azimuthRad),
      Math.cos(tiltRad) * Math.sin(azimuthRad),
      0,
      0,
      Math.cos(tiltRad),
      -Math.sin(tiltRad),
      0,
      -Math.sin(azimuthRad),
      Math.sin(tiltRad) * Math.cos(azimuthRad),
      Math.cos(tiltRad) * Math.cos(azimuthRad),
      0,
      0,
      0,
      0,
      1
    ];

    return `matrix3d(${matrix.join(',')})`;
  }, [tiltAngle, azimuthAngle]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        perspective: '1000px'
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-gray-800 rounded-lg shadow-lg"
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Panel grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/20"
            />
          ))}
        </div>

        {/* Glare effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
          style={{
            mixBlendMode: 'overlay'
          }}
        />

        {/* Compass indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium">
          {azimuthAngle}°
        </div>

        {/* Tilt indicator */}
        <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-sm font-medium">
          {tiltAngle}°
        </div>
      </div>
    </div>
  );
};