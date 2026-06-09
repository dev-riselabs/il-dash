import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGlobalMapCountries, useInvestors, useHeatmapSectors } from "@/lib/api/hooks";
import { fmtNumber } from "@/lib/api/format";

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

// Country positioning for bubble chart
const COUNTRY_POSITIONS: Record<string, { x: number; y: number }> = {
  "USA": { x: 15, y: 55 },
  "Nigeria": { x: 50, y: 65 },
  "UK": { x: 38, y: 75 },
  "South Africa": { x: 48, y: 35 },
  "India": { x: 85, y: 28 },
  "Canada": { x: 20, y: 70 },
  "France": { x: 40, y: 70 },
  "Germany": { x: 42, y: 68 },
  "China": { x: 80, y: 50 },
  "Singapore": { x: 75, y: 40 },
  "Kenya": { x: 55, y: 30 },
  "Ethiopia": { x: 58, y: 25 },
  "Ghana": { x: 45, y: 28 },
  "Egypt": { x: 50, y: 40 },
  "UAE": { x: 65, y: 45 },
};

const InvestmentHeatmap = () => {
  const countriesQ = useGlobalMapCountries();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const chartRef = useRef<any>(null);
  
  const investorsQ = useInvestors({ country: selectedCountry || undefined });
  const sectorsQ = useHeatmapSectors();

  const totalInvestors = useMemo(
    () => (countriesQ.data ?? []).reduce((sum, c) => sum + c.investors_count, 0),
    [countriesQ.data]
  );

  // Generate dynamic datasets from country data
  const datasets = useMemo(() => {
    return (countriesQ.data ?? []).map((country, idx) => {
      const pos = COUNTRY_POSITIONS[country.country] || {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      };
      
      // Map investor count to bubble radius (10-30)
      const radius = Math.max(10, Math.min(30, (country.investors_count / (totalInvestors / 20)) || 15));
      
      return {
        label: country.country,
        data: [{ x: pos.x, y: pos.y, r: radius }],
        backgroundColor: "rgba(168, 85, 247, 0.35)",
        borderColor: "#A855F7",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(168, 85, 247, 0.55)",
      };
    });
  }, [countriesQ.data, totalInvestors]);

  const data = {
    datasets,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#050816",
        borderColor: "#2A2D3E",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#D1D5DB",
        padding: 12,
        callbacks: {
          label: (context: any) => {
            const country = context.dataset.label;
            const countryData = (countriesQ.data ?? []).find(c => c.country === country);
            return `${country}: ${countryData?.investors_count ?? 0} Investors`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  // Handle bubble clicks
  useEffect(() => {
    if (!chartRef.current) return;
    
    const chart = chartRef.current;
    const canvas = chart.canvas;
    
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Convert pixel coordinates to chart coordinates
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      
      if (!xScale || !yScale) return;
      
      const chartX = xScale.getValueForPixel(x);
      const chartY = yScale.getValueForPixel(y);
      
      // Check which bubble was clicked
      datasets.forEach((dataset: any, datasetIndex: number) => {
        const bubble = dataset.data[0];
        if (!bubble) return;
        
        const bubblePixelX = xScale.getPixelForValue(bubble.x);
        const bubblePixelY = yScale.getPixelForValue(bubble.y);
        const bubblePixelR = bubble.r * (canvasWidth / 400); // Approximate radius in pixels
        
        const distance = Math.sqrt(
          Math.pow(x - bubblePixelX, 2) + Math.pow(y - bubblePixelY, 2)
        );
        
        if (distance <= bubblePixelR) {
          const country = dataset.label;
          setSelectedCountry(country);
          setShowModal(true);
        }
      });
    };
    
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [datasets, chartRef]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/55 p-6">
      {/* Top Buttons */}
      <div className="mb-6 flex items-center gap-0">
        <button className="rounded-l-md bg-[#0039B8] px-6 py-2 text-sm text-white">
          Map View
        </button>

        <button className="rounded-r-md border border-[#2A2D3E] bg-transparent px-6 py-2 text-sm text-white">
          List View
        </button>
      </div>

      <img
        src="/map-bg.svg"
        alt="world map"
        className="absolute inset-0 h-full w-full object-contain "
      />

      {/* Bubble Chart */}
      <div className="relative h-125 w-full">
        <Bubble ref={chartRef} data={data} options={options} />
      </div>

      {/* Info Card - Dynamic based on selection */}
      {showModal && selectedCountry && (
        <div className="absolute bottom-16 left-1/2 w-70 -translate-x-1/2 rounded-2xl border border-[#2A2D3E] bg-[#020817]/95 p-5 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#A855F7]" />
              <p className="text-sm text-white">{selectedCountry}</p>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setSelectedCountry(null);
              }}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Investors</span>
              <span className="text-white font-semibold">
                {(countriesQ.data ?? []).find(c => c.country === selectedCountry)?.investors_count ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280]">Region</span>
              <span className="text-white font-semibold">
                {(countriesQ.data ?? []).find(c => c.country === selectedCountry)?.region ?? "—"}
              </span>
            </div>
          </div>

          {/* Dynamic top sectors for this country */}
          <div className="mt-5">
            <p className="mb-3 text-sm text-[#6B7280]">Top Sectors (Global)</p>

            <div className="space-y-3">
              {(sectorsQ.data ?? [])
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item.sector_id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.sector?.color ?? "#A855F7" }}
                      />
                      <span className="text-[#D1D5DB]">{item.sector?.name ?? `Sector ${item.sector_id}`}</span>
                    </div>

                    <span className="text-white">
                      {item.total_value_naira ? `₦${(item.total_value_naira / 1e9).toFixed(1)}B` : "—"}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="mt-5 w-full rounded-lg bg-cyan-600/30 py-2 text-sm font-medium text-[#00C2FF] hover:bg-cyan-600/50"
          >
            Close
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-8 left-8 rounded-2xl border border-[#2A2D3E] bg-[#020817]/90 p-4 backdrop-blur-md">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white">
          Investor Count
        </p>

        <div className="space-y-3">
          {[
            { label: "1 - 10", color: "#1D4ED8" },
            { label: "11 - 50", color: "#06B6D4" },
            { label: "51 - 100", color: "#22C55E" },
            { label: "101 - 250", color: "#EAB308" },
            { label: "250+", color: "#C026D3" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-xs text-[#D1D5DB]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentHeatmap;
