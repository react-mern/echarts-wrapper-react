import {
  EChartsOption,
  EChartsInitOpts,
  EChartsType,
  ElementEvent,
  ECElementEvent,
} from 'echarts';

/**
 * Represents a CSS pixel value.
 */
export type PixelValue = `${number}px`;

/**
 * ECharts event
 */
export type EchartEventType = ElementEvent['event'] | ECElementEvent;

export type EchartEventName =
  | ElementEvent['type']
  | 'brushSelected'
  | 'rendered'
  | 'finished'
  | 'dataZoom'
  | 'legendselectchanged';

export interface ReactEchartsRef {
  getEchartsInstance: () => EChartsType | undefined;
}

export interface ReactEchartsComponentProps {
  /**
   * `className` for container
   */
  readonly className?: string;
  /**
   * Height of the Chart
   * @type {PixelValue}
   */
  readonly height?: PixelValue;
  /**
   * Width of the Chart
   * @type {PixelValue}
   */
  readonly width?: PixelValue;
  /**
   * Theme configuration for ECharts.
   * This can be either:
   * 1. A string representing the theme name.
   * 2. An object defining the theme.
   * @type {string | Record<string, unknown>}
   */
  readonly theme?: string | Record<string, unknown>;
  /**
   * echarts opts config
   */
  readonly opts?: EChartsInitOpts;
  /**
   * echarts option
   */
  readonly option: EChartsOption;
  /**
   * notMerge config for echarts, default is `false`
   */
  readonly notMerge?: boolean;
  /**
   * lazyUpdate config for echarts, default is `false`
   */
  readonly lazyUpdate?: boolean;
  /**
   * Type of loading for ECharts.
   */
  readonly loadingType?: string;
  /**
   * loadingOption config for echarts, default is `null`
   */
  readonly loadingOption?: object;
  /**
   * Whether to automatically resize the chart on window resize.
   * @type {boolean}
   */
  readonly autoResize?: boolean;
  /**
   * Event handlers for ECharts events, default is `{}`
   */
  readonly onEvents?: Partial<
    Record<
      EchartEventName,
      ({
        event,
        chartInstance,
      }: {
        event: EchartEventType;
        chartInstance: EChartsType;
      }) => void
    >
  >;
}
