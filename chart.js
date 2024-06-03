import { Chart, Tooltip, CategoryScale, LinearScale, BarController, BarElement, ArcElement, PieController, LineElement, LineController, PointElement, Legend, Filler } from 'chart.js';

let barChart;
let pieChart;
let lineChart;

export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();

  const formatPart = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return `${formatPart(day)}/${formatPart(month + 1)}`;
};

const predefinedColors = [
  
  'rgba(100, 100, 100, 0.2)', // gray
  'rgba(255, 0, 0, 0.2)',     // red
  'rgba(0, 255, 0, 0.2)',     // green
  'rgba(0, 0, 255, 0.2)',     // blue
  'rgba(255, 255, 0, 0.2)',   // yellow
  'rgba(255, 0, 255, 0.2)',   // Magenta
  'rgba(0, 255, 255, 0.2)',   // cyan
  'rgba(128, 0, 128, 0.2)',   // purple
  'rgba(128, 128, 0, 0.2)',   // Olive
  'rgba(0, 128, 128, 0.2)',   // Teal
];

export const getPredefinedColor = (index) => {
  return predefinedColors[index % predefinedColors.length];
};

export const generatePredefinedColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getPredefinedColor(i));
  }
  return colors;
};

export const renderChart = (readings) => {

  Chart.register(
    Legend,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    LineElement,
    LineController,
    BarController,
    PointElement,
    BarElement,
    ArcElement,
    PieController
  );

  const labels = readings.map(({ time }) => formatDateLabel(time));
  const values = readings.map(({ value }) => value);
  const details = readings.map(({ details }) => details);
  const backgroundColors = generatePredefinedColors(values.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage per day",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: [ '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400', '#CB4335' ],
        borderRadius: 1,
      },
    ],
  };

  if (barChart) {
    barChart.destroy();
  }

  if (pieChart) {
    pieChart.destroy();
  }

  if (lineChart) {
    lineChart.destroy();
  }

  barChart = new Chart("usageChart", {
    type: "bar",
    data: data,
    options: {
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItems) => {
              return `${tooltipItems.formattedValue} kWh`;
            },
          },
        },
      },
      scales: {
        y: {
          type: 'linear', 
          grid: {
            display: false,
          },
        },
        x: {
          type: 'category', 
          grid: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const firstElement = elements[0];
          const label = barChart.data.labels[firstElement.index];
          const value = barChart.data.datasets[firstElement.datasetIndex].data[firstElement.index];
          const details = readings[firstElement.index].details;

          updatePieChart(label, details);
        }
      }
    },
  });

  pieChart = new Chart("usageChart2", {
    type: "pie",
    data: {
      datasets: [{
        data: [],
        backgroundColor: [],
      }]
    },
    options: {
      interaction: {
        intersect: false,
        mode: 'index',
       
      },
      plugins: {
       
        
        tooltip: {
          
          callbacks: {
            label: (tooltipItems) => {
              const label = pieChart.data.labels[tooltipItems.dataIndex];
              return `${label}: ${tooltipItems.formattedValue} kWh`;
            },
          },
        },
      },
      maintainAspectRatio: false,
    },
  });
  

  lineChart = new Chart("usageChart3", {
    type: "line",
    data: data,
    options: {
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItems) => {
              const label = lineChart.data.labels[tooltipItems.dataIndex];
              return `${tooltipItems.formattedValue} kWh`;
            },
          },
        },
      },
      maintainAspectRatio: false,
    },
  });
};

const updatePieChart = (label, details) => {
  const deviceLabels = Object.keys(details);
  const deviceValues = Object.values(details);

  const data = {
    labels: deviceLabels,
    datasets: [{
      label: `Details for ${label}`,
      data: deviceValues,
      backgroundColor: generatePredefinedColors(deviceValues.length),
    }]
  };

  if (pieChart) {
    pieChart.data = data;
    pieChart.update();
  }
};

