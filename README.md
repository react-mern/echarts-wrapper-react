# React ECharts Wrapper

React ECharts Wrapper is a React component for embedding ECharts charts in a React application. This component provides a React-friendly interface for working with the ECharts library.

## Usage

Import the ReactECharts component and use it within your React application. Here's an example:

```sh
import React from 'react';
import ReactECharts from '@your-scope/react-echarts-wrapper';

const MyChartComponent = () => {
  const option = {
    // ECharts option configuration
    // See: https://echarts.apache.org/en/option.html
    title: {
      text: 'My Chart',
    },
    // Add your chart options here
  };

  return (
    <div>
      <h1>My Chart</h1>
      <ReactECharts
        option={option}
        theme="light"
        width="500px"
        height="300px"
      />
    </div>
  );
};

export default MyChartComponent;
```
