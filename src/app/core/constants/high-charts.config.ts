export const WIND_ROSE_CONFIG = {
  chart: {
    polar: true, // Polar chart to make the wind rose
    type: 'column',
  },
  title: {
    text: 'Wind Rose',
  },
  pane: {
    size: '85%', // Adjust the size of the polar chart
  },
  xAxis: {
    categories: [], // Directions
    tickmarkPlacement: 'on',
    lineWidth: 0,
  },
  yAxis: {
    min: 0,
    endOnTick: false,
    showLastLabel: true,
    title: {
      text: 'Wind Speed (m/s)',
    },
    labels: {
      format: '{value} m/s',
    },
    reversedStacks: false, // Ensure each stack is drawn upwards
  },
  tooltip: {
    valueSuffix: ' m/s',
    shared: true,
  },
  plotOptions: {
    series: {
      stacking: 'normal', // Stack the columns to represent wind speed ranges
      shadow: false,
      groupPadding: 0,
      pointPlacement: 'on',
    },
  },
};

export const LINE_CHART_CONFIG = {
  rangeSelector: {
    selected: 1, // Default range selector to 1 day
  },
  navigator: {
    enabled: true, // Enable the navigator to allow zooming in the chart
  },
  chart: {
    zooming: {
      // Enable zooming in the chart
      type: 'x', // Zooming in the x-axis
      enabled: true, // Enable zooming in the x-axis
    },
    backgroundColor: '#f5f5f5',
  },
  title: {
    text: 'Weather Data',
  },
  xAxis: {
    type: 'datetime', // X-axis type is datetime
    minRange: 5 * 3600 * 1000,
  },
  yAxis: [
    {
      // Primary Y-Axis (Temperature)
      title: {
        text: 'Temperature (°C)',
      },
      labels: {
        format: '{value}°C',
      },
      opposite: false, // This will be the left Y-axis
    },
    {
      // Secondary Y-Axis (Humidity)
      title: {
        text: 'Humidity (%)',
      },
      labels: {
        format: '{value} %',
      },
      opposite: true, // This will be the right Y-axis
    },
  ],
  series: [
    {
      type: 'line',
    },
    {
      type: 'line',
    },
    {
      name: 'Max Temp',
      type: 'flags',
    },
    {
      name: 'Min Temp',
      type: 'flags',
    },
  ],
};
