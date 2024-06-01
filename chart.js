import { Chart, Tooltip, CategoryScale, LinearScale, BarController, BarElement, ArcElement, PieController, LineElement, LineController, PointElement } from 'chart.js';

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
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 132, 0.2)'
];

// Função para obter uma cor da paleta predefinida
const getPredefinedColor = (index) => {
  return predefinedColors[index % predefinedColors.length];
};

// Função para gerar um array de cores da paleta predefinida
const generatePredefinedColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getPredefinedColor(i));
  }
  return colors;
};

export const renderChart = (readings) => {
  // Registro dos componentes necessários
  Chart.register(
    Tooltip,
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
  const backgroundColors = generatePredefinedColors(values.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor:backgroundColors,
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
          type: 'linear', // Especificar o tipo de escala
          grid: {
            display: false,
          },
        },
        x: {
          type: 'category', // Especificar o tipo de escala
          grid: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
    },
  });

  pieChart = new Chart("usageChart2", {
    type: "pie",
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
              const label = pieChart.data.labels[tooltipItems.dataIndex];
              return `${tooltipItems.formattedValue} kWh`;
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
