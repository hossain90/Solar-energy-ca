import React, { useEffect, useRef } from 'react';

interface EnergyAnimationProps {
  solarProduction: number;
  consumption: number;
  batteryCapacity?: number;
  isCharging?: boolean;
}

export const EnergyAnimation: React.FC<EnergyAnimationProps> = ({
  solarProduction,
  consumption,
  batteryCapacity = 0,
  isCharging = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let animationFrame: number;
    let particles: Array<{
      x: number;
      y: number;
      speed: number;
      path: 'solar' | 'battery' | 'grid';
    }> = [];

    // Calculate flow rates
    const solarFlow = Math.min(solarProduction, 20);
    const batteryFlow = isCharging ? Math.min(5, batteryCapacity) : 0;
    const gridFlow = Math.max(0, consumption - solarProduction - (isCharging ? -batteryFlow : batteryFlow));

    const createParticle = () => {
      const path = Math.random() < 0.7 ? 'solar' : (batteryCapacity > 0 ? 'battery' : 'grid');
      return {
        x: path === 'solar' ? width * 0.2 : (path === 'battery' ? width * 0.5 : width * 0.8),
        y: height * 0.2,
        speed: 2 + Math.random() * 2,
        path
      };
    };

    const drawParticle = (p: typeof particles[0]) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.path === 'solar' ? '#fbbf24' : (p.path === 'battery' ? '#34d399' : '#60a5fa');
      ctx.fill();
    };

    const updateParticle = (p: typeof particles[0]) => {
      // Update particle position based on its path
      switch (p.path) {
        case 'solar':
          p.y += p.speed;
          if (p.y > height * 0.8) {
            p.y = height * 0.2;
          }
          break;
        case 'battery':
          if (isCharging) {
            p.y += p.speed;
            if (p.y > height * 0.8) {
              p.y = height * 0.2;
            }
          } else {
            p.y -= p.speed;
            if (p.y < height * 0.2) {
              p.y = height * 0.8;
            }
          }
          break;
        case 'grid':
          p.y -= p.speed;
          if (p.y < height * 0.2) {
            p.y = height * 0.8;
          }
          break;
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Draw system components
      const drawComponent = (x: number, y: number, label: string, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x - 30, y - 15, 60, 30);
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 5);
      };

      drawComponent(width * 0.2, height * 0.15, 'Solar', '#fbbf24');
      drawComponent(width * 0.5, height * 0.15, 'Home', '#1f2937');
      if (batteryCapacity > 0) {
        drawComponent(width * 0.5, height * 0.85, 'Battery', '#34d399');
      }
      drawComponent(width * 0.8, height * 0.15, 'Grid', '#60a5fa');

      // Add new particles based on flow rates
      if (Math.random() < 0.1) {
        if (solarFlow > 0 && particles.length < solarFlow) {
          particles.push(createParticle());
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [solarProduction, consumption, batteryCapacity, isCharging]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Energy Flow Visualization</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full"
      />
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-medium">Solar Production</div>
          <div className="text-yellow-500">{solarProduction} kW</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Consumption</div>
          <div className="text-gray-900">{consumption} kW</div>
        </div>
        {batteryCapacity > 0 && (
          <div className="text-center">
            <div className="font-medium">Battery</div>
            <div className="text-green-500">
              {isCharging ? 'Charging' : 'Discharging'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};