import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { useStore } from '@/store/store';

interface ChartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chart({ isOpen, onClose }: ChartProps) {
  const { calculator: { history } } = useStore();

  // Basit fonksiyon grafiği çizimi için verileri hazırla
  const prepareChartData = () => {
    if (history.length === 0) return [];

    // Son 10 işlemi al
    const lastOperations = history.slice(-10);

    // Her işlemi x ve y değerlerine dönüştür
    return lastOperations.map((entry, index) => {
      const parts = entry.split(' ');
      const x = index + 1;
      const y = parseFloat(parts[parts.length - 1]); // Sonuç değeri
      return { x, y };
    });
  };

  const chartData = prepareChartData();

  // Grafik çizimi için SVG oluştur
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-[var(--text-muted)]">Grafik çizmek için yeterli veri yok</p>
        </div>
      );
    }

    // Grafik boyutları
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Veri için min/max değerleri bul
    const xValues = chartData.map(d => d.x);
    const yValues = chartData.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Ölçekleme fonksiyonları
    const xScale = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * (width - margin.left - margin.right);
    const yScale = (y: number) => height - margin.bottom - ((y - yMin) / (yMax - yMin)) * (height - margin.top - margin.bottom);

    // Çizgi noktalarını oluştur
    const points = chartData.map(d => `${xScale(d.x)},${yScale(d.y)}`).join(' ');

    return (
      <svg width={width} height={height} className="w-full h-full">
        {/* X ekseni */}
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Y ekseni */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Çizgi */}
        <polyline
          points={points}
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="2"
        />
        {/* Noktalar */}
        {chartData.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            r="4"
            fill="var(--brand-500)"
          />
        ))}
      </svg>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fonksiyon Grafiği</h3>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Kapat
            </button>
          </div>
          <div className="h-80">
            {renderChart()}
          </div>
          <div className="mt-4 text-sm text-[var(--text-muted)]">
            <p>Son 10 işlemin grafiği gösteriliyor.</p>
            <p>Her nokta bir işlemin sonucunu temsil eder.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
