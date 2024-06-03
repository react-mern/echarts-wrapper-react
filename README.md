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
import { EChartsReact, EChartsOption } from 'echarts-wrapper-react';

const BasicLineChart = () => {
    const option: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
            },
        ],
    };

    return
    (
      <div style={{ width: "50vw", height: "50vh" }}>
        <EChartsReact option={option} />
      </div>
    );
};

export default BasicLineChart;
```

## Usage

Import the EChartsReact component and use it within your React application:

```bash
import { EChartsReact, EChartsOption, EChartsReactComponentProps } from 'echarts-wrapper-react';
import { useLoaderData } from 'react-router-dom';

const RadialTree = () => {
    const data: any = useLoaderData();

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'tree',
                data: [data],
                top: '18%',
                bottom: '14%',
                layout: 'radial',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750,
                emphasis: {
                    focus: 'descendant',
                },
            },
        ],
    };

    const opts: EChartsReactComponentProps['opts'] = {
        devicePixelRatio: 2,
        renderer: 'svg',
    };

    const onEvents: EChartsReactComponentProps['onEvents'] = {
        click: ({ event, chartInstance }) => {
            console.log('Chart clicked:', event, chartInstance);
        },
        legendselectchanged: ({ event, chartInstance }) => {
            console.log('Legend selection changed:', event, chartInstance);
        },
    };

    return (
        <EChartsReact
            option={option}
            theme={'dark'}
            opts={opts}
            autoResize={false}
            onEvents={onEvents}
            // chart height and width
            width="500px"
            height="500px"
        />
    );
};

export default RadialTree;

export async function RadialTreeLoader() {
    const response = await fetch('/api/examples/data/asset/data/flare.json');
    const data = await response.json();
    return data;
}
```

### Note:

To ensure proper rendering of the chart, make sure to set the height and width of the parent container appropriately. The `EChartsReact` component will inherit these dimensions, allowing for responsive chart rendering. otherwise assign chart's height and width in pixel value.

## Props

| Prop              | Type                                                                                                             | Description                                                                                                                             | Default Value |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| option (required) | EChartsOption                                                                                                    | The ECharts option configuration object. refer [here](https://echarts.apache.org/en/option.html#title) for more details.                | N/A           |
| theme             | string \| object                                                                                                 | Theme configuration for ECharts. This can be either a string representing the theme name or an object defining the theme.               | N/A           |
| opts              | EChartsInitOpts                                                                                                  | Additional options for initializing ECharts, such as devicePixelRatio and renderer.                                                     | N/A           |
| autoResize        | boolean                                                                                                          | Determines whether the chart should automatically resize when the window is resized.                                                    | true          |
| onEvents          | Partial<Record<ElementEvent['type'], (params: { event: EChartEventType; chartInstance: EChartsType; }) => void>> | Event handlers for ECharts events. Each key represents an event type, and the corresponding value is a function that handles the event. | N/A           |
| width             | PixelValue                                                                                                       | Width of the chart. Accepts a string representing a CSS pixel value.                                                                    | N/A           |
| height            | PixelValue                                                                                                       | Height of the chart. Accepts a string representing a CSS pixel value.                                                                   | N/A           |
| loadingType       | string                                                                                                           | Type of loading animation for ECharts like 'default'.                                                                                   | N/A           |
| loadingOption     | object                                                                                                           | Configuration options for the loading inside showLoading, such as text, color, and maskColor.                                           | N/A           |
| notMerge          | boolean                                                                                                          | Config for ECharts, default is false.                                                                                                   | false         |
| lazyUpdate        | boolean                                                                                                          | Config for ECharts, default is false.                                                                                                   | false         |

## Registering Custom Themes

To register a custom theme with ECharts Wrapper React, you can define custom theme or fetch json data and then register it using the registerTheme function from ECharts.
atlast pass the name of the theme to EchartsReact theme props.

```bash
import { EChartsReact, EChartsOption } from 'echarts-wrapper-react'
import { registerTheme } from 'echarts';

const BasicLineChart = () => {

    const purpleOrangeTheme = {
        color: [
            '#7B68EE', // Purple
            '#FF8C00', // Dark Orange
            '#9370DB', // Medium Purple
            '#FFA500', // Orange
            '#8A2BE2', // Blue Violet (Purple)
            '#FF4500', // Orange Red
            '#BA55D3', // Medium Orchid (Purple)
            '#FF6347'  // Tomato (Orange)
        ],
        backgroundColor: '#FFFFFF', // White background
        textStyle: {
            color: '#7B68EE' // Purple
        }
    };

    // Register the theme
    registerTheme('purpleOrange', purpleOrangeTheme);

    const option: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };

    return (
        <EChartsReact theme="purpleOrange" option={option} />
    )
}

export default BasicLineChart

```

## Echarts API

to use API on chart instance, pass ref to the component and then use it wherever needed.

- The **getEchartsInstance** method returns ECharts instance, allowing you to call instance's methods such as getWidth, getHeight, resize, setOption, and more.

```sh
import { EChartsReact, EChartsReactRef } from "echarts-wrapper-react";
import { useRef } from "react";

const App = () => {

  const chartRef = useRef<EChartsReactRef>(null);

  const getChartWidth = () => {
    // get chart Instance
    const chartInstance = chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      // use any instance API
      console.log(chartInstance.getWidth());
    }
  };

  return (
    <div style={{ height: '50vh', width: '50vw' }}>
      <EChartsReact
        ref={chartRef}
        option={{}}
        // Example chart option configuration
      />
      <button onClick={getChartWidth}>Get Chart Width</button>
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
