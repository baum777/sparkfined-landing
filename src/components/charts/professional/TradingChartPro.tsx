import { useEffect, useMemo, useRef } from 'react';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
  type HistogramData,
  type LineData,
} from 'lightweight-charts';
import { calculateBollingerBands } from '../../../lib/trading/indicators/bollingerBands';
import { calculateRSI } from '../../../lib/trading/indicators/rsi';
import { calculateSMA } from '../../../lib/trading/indicators/movingAverages';
import type { OHLCData } from '../../../lib/trading/types';
import type { PatternMatch, SRLevel } from '../../../lib/trading/patterns/types';
import { PatternOverlay } from './PatternOverlay';

interface TradingChartProProps {
  data: OHLCData[];
  height?: number;
  showVolume?: boolean;
  showRSI?: boolean;
  showSMA?: boolean;
  showBollinger?: boolean;
  srLevels?: SRLevel[];
  patterns?: PatternMatch[];
}

export function TradingChartPro({
  data,
  height = 420,
  showVolume = true,
  showRSI = false,
  showSMA = false,
  showBollinger = false,
  srLevels = [],
  patterns = [],
}: TradingChartProProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const rsiContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const rsiChartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const smaSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bollingerUpperRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bollingerLowerRef = useRef<ISeriesApi<'Line'> | null>(null);
  const rsiSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  const priceTimes = useMemo(() => data.map((candle) => Math.floor(candle.timestamp / 1000) as Time), [data]);
  const smaValues = useMemo(() => calculateSMA(data.map((candle) => candle.close), 20), [data]);
  const bollinger = useMemo(() => calculateBollingerBands(data.map((candle) => candle.close), 20, 2).bands, [data]);
  const rsiValues = useMemo(() => calculateRSI(data.map((candle) => candle.close)).values, [data]);

  useEffect(() => {
    if (!chartContainerRef.current || !wrapperRef.current) return undefined;
    const chart = createChart(chartContainerRef.current, {
      width: wrapperRef.current.clientWidth,
      height,
      layout: {
        background: { color: '#0a0a0a' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#1c1f2b' },
        horzLines: { color: '#1c1f2b' },
      },
      timeScale: {
        timeVisible: true,
        borderColor: '#2a2d3c',
      },
    });

    chartRef.current = chart;
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00cc88',
      downColor: '#ff4976',
      borderVisible: false,
      wickUpColor: '#00cc88',
      wickDownColor: '#ff4976',
    });
    candleSeriesRef.current = candleSeries;

    const histogram = chart.addHistogramSeries({
      color: '#3a99fc',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
      visible: showVolume,
    });
    histogram.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    volumeSeriesRef.current = histogram;

    const handleResize = () => {
      if (wrapperRef.current && chartRef.current) {
        const width = wrapperRef.current.clientWidth;
        chartRef.current.applyOptions({ width });
      }
      if (wrapperRef.current && rsiChartRef.current) {
        rsiChartRef.current.applyOptions({ width: wrapperRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;
    const formattedCandles: CandlestickData[] = data.map((candle, idx) => ({
      time: priceTimes[idx],
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));
    candleSeriesRef.current.setData(formattedCandles);

    const formattedVolume: HistogramData[] = data.map((candle, idx) => ({
      time: priceTimes[idx],
      value: candle.volume,
      color: candle.close >= candle.open ? '#00cc88' : '#ff4976',
    }));
    volumeSeriesRef.current.setData(formattedVolume);
    volumeSeriesRef.current.applyOptions({ visible: showVolume });
  }, [data, priceTimes, showVolume]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (showSMA) {
      if (!smaSeriesRef.current) {
        smaSeriesRef.current = chartRef.current.addLineSeries({
          color: '#fbbf24',
          lineWidth: 2,
          priceLineVisible: false,
        });
      }
      const smaData: LineData[] = smaValues
        .map((value, idx) => ({ time: priceTimes[idx], value }))
        .filter((point) => Number.isFinite(point.value));
      smaSeriesRef.current.setData(smaData);
    } else if (smaSeriesRef.current) {
      chartRef.current.removeSeries(smaSeriesRef.current);
      smaSeriesRef.current = null;
    }
  }, [priceTimes, showSMA, smaValues]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (showBollinger) {
      if (!bollingerUpperRef.current) {
        bollingerUpperRef.current = chartRef.current.addLineSeries({
          color: 'rgba(0, 212, 255, 0.6)',
          lineWidth: 1,
          priceLineVisible: false,
        });
      }
      if (!bollingerLowerRef.current) {
        bollingerLowerRef.current = chartRef.current.addLineSeries({
          color: 'rgba(0, 212, 255, 0.6)',
          lineWidth: 1,
          priceLineVisible: false,
        });
      }

      const upperData: LineData[] = [];
      const lowerData: LineData[] = [];
      bollinger.forEach((band, idx) => {
        if (Number.isFinite(band.upper)) {
          upperData.push({ time: priceTimes[idx], value: band.upper });
        }
        if (Number.isFinite(band.lower)) {
          lowerData.push({ time: priceTimes[idx], value: band.lower });
        }
      });

      bollingerUpperRef.current.setData(upperData);
      bollingerLowerRef.current.setData(lowerData);
    } else {
      if (bollingerUpperRef.current) {
        chartRef.current.removeSeries(bollingerUpperRef.current);
        bollingerUpperRef.current = null;
      }
      if (bollingerLowerRef.current) {
        chartRef.current.removeSeries(bollingerLowerRef.current);
        bollingerLowerRef.current = null;
      }
    }
  }, [bollinger, priceTimes, showBollinger]);

  useEffect(() => {
    if (!showRSI) {
      if (rsiChartRef.current) {
        rsiChartRef.current.remove();
      }
      rsiChartRef.current = null;
      rsiSeriesRef.current = null;
      return;
    }
    if (!rsiContainerRef.current || !wrapperRef.current) return;
    const rsiChart = createChart(rsiContainerRef.current, {
      width: wrapperRef.current.clientWidth,
      height: 180,
      layout: { background: { color: '#0a0a0a' }, textColor: '#d1d4dc' },
      grid: { vertLines: { color: '#1c1f2b' }, horzLines: { color: '#1c1f2b' } },
      timeScale: { timeVisible: true, borderColor: '#2a2d3c' },
      rightPriceScale: { borderColor: '#2a2d3c' },
    });
    rsiChartRef.current = rsiChart;
    const rsiLine = rsiChart.addLineSeries({ color: '#8b5cf6', lineWidth: 2, priceLineVisible: false });
    rsiLine.createPriceLine({ price: 70, color: 'rgba(255, 99, 132, 0.6)', lineStyle: 2, axisLabelVisible: false });
    rsiLine.createPriceLine({ price: 30, color: 'rgba(34, 197, 94, 0.6)', lineStyle: 2, axisLabelVisible: false });
    rsiSeriesRef.current = rsiLine;

    return () => {
      rsiChart.remove();
      rsiChartRef.current = null;
      rsiSeriesRef.current = null;
    };
  }, [showRSI]);

  useEffect(() => {
    if (!showRSI || !rsiSeriesRef.current) return;
    const rsiData: LineData[] = rsiValues
      .map((value, idx) => ({ time: priceTimes[idx], value }))
      .filter((point) => Number.isFinite(point.value));
    rsiSeriesRef.current.setData(rsiData);
  }, [priceTimes, rsiValues, showRSI]);

  return (
    <div className="pro-chart-wrapper" ref={wrapperRef}>
      <div className="pro-chart-shell">
        <div ref={chartContainerRef} className="pro-chart" style={{ height }} />
        {srLevels.length || patterns.length ? (
          <PatternOverlay candles={data} srLevels={srLevels} patterns={patterns} />
        ) : null}
      </div>
      {showRSI ? <div ref={rsiContainerRef} className="pro-chart rsi-chart" /> : null}
    </div>
  );
}
