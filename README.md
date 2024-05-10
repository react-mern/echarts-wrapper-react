# echarts-wrapper-react

It is a React wrapper for embedding [Apache ECharts](https://echarts.apache.org/en/index.html) charts in a React application.

## Installation

You can install the ECharts Wrapper for React and the ECharts library via npm:

```bash
npm install echarts-wrapper-react
npm install echarts
```

then use it

```sh
import React from 'react';
import { ReactECharts } from 'echarts-wrapper-react';

const MyChartComponent = () => {
  const option = {
    // Your ECharts option configuration
  };

  return
  (
    <div style={{ width: "50vw", height: "50vh" }}>
      <ReactEcharts option={option} />
    </div>
  );
};

export default MyChartComponent;
```

## Usage

Import the ReactECharts component and use it within your React application:

```bash
import { EChartsOption } from 'echarts';
import { ReactEcharts, ReactEchartsComponentProps } from 'echarts-wrapper-react';

const App = () => {
  const option: EChartsOption = {
    // Your ECharts configuration
  };

  const opts: ReactEchartsComponentProps["opts"] = {
    devicePixelRatio: 2,
    renderer: 'svg',
    ...
  };

  const onEvents: ReactEchartsComponentProps["onEvents"] = {
    click: ({ event, chartInstance }) => {
      console.log('Chart clicked:', event, chartInstance);
    },
    legendselectchanged: ({ event, chartInstance }) => {
      console.log('Legend selection changed:', event, chartInstance);
    },
    ...
  };

  return (
    <ReactEcharts
      option={option}
      theme={"dark"}
      opts={opts}
      autoResize={false}
      onEvents={onEvents}
      // chart height and width
      width="500px"
      height="500px"
    />
  );
};

export default App;

```

## Props

### - option (required)

**Type**: EChartsOption

The ECharts option configuration object, refer https://echarts.apache.org/en/option.html#title

### - theme

**Type**: string | Record<string, unknown>

**Description**: Theme configuration for ECharts. This can be either a string representing the theme name or an object defining the theme.

### - opts

**Type**: EChartsInitOpts

**Description**: Additional options for initializing ECharts, such as devicePixelRatio and renderer.

### - autoResize

**Type**: boolean

Default: true

**Description**: Determines whether the chart should automatically resize when the window is resized.

### - onEvents

**Type**: Partial<Record<ElementEvent['type'], (params: { event: EChartEventType; chartInstance: EChartsType; }) => void>>

**Description**: Event handlers for ECharts events. Each key represents an event type, and the corresponding value is a function that handles the event.

### - width

**Type**: PixelValue

**Description**: Width of the chart. Accepts a string representing a CSS pixel value.

### - height

**Type**: PixelValue
**Description**: Height of the chart. Accepts a string representing a CSS pixel value.

### - loadingType

**Type**: string

**Description**: Type of loading animation for ECharts like 'default'.

### - loadingOption

**Type**: object

**Description**: Configuration options for the loading inside showLoading, such as text, color, and maskColor.

## Echarts API

to use API on chart instance, pass ref to the component and then use it wherever needed.

```sh
import React, { useRef } from 'react';
import { EChartsType } from 'echarts';
import { ReactEcharts } from 'echarts-wrapper-react';

const App = () => {
  const chartRef = useRef<EChartsType>(null);

  const updateChartData = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      // use any instance API
      chartInstance.getWidth()
      };
    }
  };

  return (
    <div>
      <ReactEcharts
        ref={chartRef}
        option={{
          // Example chart configuration
      />
      <button onClick={updateChartData}>Update Chart Data</button>
    </div>
  );
};

export default App;
```

## FAQ

### How to resolve "Component series.scatter3D not exists. Load it first." error?

If you encounter this error, it means that you are trying to use a component or feature (e.g., scatter3D) that requires the echarts-gl module.
To resolve this error, you need to install the echarts-gl package and import it into your project. Here's how:

- Install echarts-gl package:

```bash
npm install --save echarts-gl
```

- Import echarts-gl module in your code:

```sh
import 'echarts-gl';
```

After installing echarts-gl and importing it into your project, you should be able to use the GL components without encountering the error.
