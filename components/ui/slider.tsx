import React from "react";
import { Label } from "./label";
import { cn } from "../../lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function Slider({
  min,
  max,
  step,
  value,
  onChange,
  label,
  formatValue,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="text-sm font-semibold text-[#006400] tabular-nums">
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input w-full h-2 rounded-full appearance-none cursor-pointer bg-muted outline-none"
          style={{
            background: `linear-gradient(to right, #006400 0%, #006400 ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
          }}
        />
      </div>
      <style>{`
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #006400;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: transform 0.15s ease;
        }
        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .slider-input::-webkit-slider-thumb:active {
          transform: scale(1.1);
        }
        .slider-input::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #006400;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: transform 0.15s ease;
        }
        .slider-input::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
        .slider-input::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}