import { getInstanceByDom, init, ElementEvent, EChartsType } from 'echarts';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { EchartEventType, ReactEchartsComponentProps } from '../types';

/**
 * React component for embedding ECharts charts in a React application.
 * This component provides a React-friendly interface for working with ECharts library.
 */
export const ReactEcharts = forwardRef(
    /**
     * @param {ReactChartsComponentProps} props - Props for ReactECharts component
     * @param {RefObject<{ getEchartsInstance: () => EChartsType | null }>} ref - Ref for accessing ECharts instance
     */
    (
        {
            className,
            autoResize = true,
            onEvents,
            opts,
            theme,
            loadingType,
            loadingOption,
            height,
            width,
            option,
            notMerge = false,
            lazyUpdate = false,
        }: ReactEchartsComponentProps,
        ref
    ) => {
        /**
         * echarts render container
         */
        const chartRef = useRef<HTMLDivElement>(null);

        // Expose a method to get the ECharts instance through ref
        useImperativeHandle(
            ref,
            () => {
                return {
                    /**
                     * Returns the ECharts instance associated with this chart.
                     * @returns {EChartsType|null} - ECharts instance or null if not available.
                     */
                    getEchartsInstance: () => {
                        if (chartRef.current) return getInstanceByDom(chartRef.current);
                        return null;
                    },
                };
            },
            []
        );

        // Initialize the chart when the component mounts
        useEffect(() => {
            const chartDiv = chartRef.current;
            if (chartDiv) {
                init(chartRef.current, theme, { ...opts, height, width });
            }
            return () => {
                if (chartDiv) {
                    const chartInstance = getInstanceByDom(chartDiv);
                    chartInstance?.dispose();
                }
            };
        }, [theme, width, height, opts]);

        // Auto-resize the chart on window resize if enabled
        useEffect(() => {
            const resizeChart = () => {
                if (chartRef.current) {
                    const echartsInstance = getInstanceByDom(chartRef.current);
                    echartsInstance?.resize({
                        width: 'auto',
                        height: 'auto',
                    });
                }
            };
            if (autoResize) {
                window.addEventListener('resize', resizeChart);
            }
            return () => {
                if (autoResize) {
                    window.removeEventListener('resize', resizeChart);
                }
            };
        }, [autoResize]);

        // Update chart options when they change
        useEffect(() => {
            if (chartRef.current) {
                const echartsInstance = getInstanceByDom(chartRef.current);
                if (echartsInstance) {
                    echartsInstance.showLoading(loadingType, loadingOption);
                    echartsInstance.setOption(option, notMerge, lazyUpdate);
                    echartsInstance.hideLoading();
                }
            }
        }, [option, lazyUpdate, notMerge, loadingOption, loadingType]);

        // Bind event handlers to ECharts events
        useEffect(() => {
            const bindEvents = (
                chartInstance: EChartsType,
                events: ReactEchartsComponentProps['onEvents']
            ) => {
                if (!events) return;
                const values = Object.keys(events) as ElementEvent['type'][];
                values.forEach((event) => {
                    const handler = (e: EchartEventType) =>
                        events?.[event]?.({ event: e, chartInstance });
                    if (!handler) return;
                    chartInstance.on(event, handler);
                });
            };
            if (chartRef.current) {
                const chartInstance = getInstanceByDom(chartRef.current);
                if (chartInstance) {
                    bindEvents(chartInstance, onEvents || {});
                }
            }
        }, [onEvents]);

        return (
            <div
                className={className}
                ref={chartRef}
                style={{ height: '100%', width: '100%' }}
            />
        );
    }
);
