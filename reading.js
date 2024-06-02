// Função para gerar valores aleatórios para cada dispositivo
const generateDeviceValues = () => ({
  AirConditioner: Math.random() * 0.1 + 0.2,
  WiFiRouter: Math.random() * 0.01 + 0.001,
  Humidifier: Math.random() * 0.1,
  SmartTV: Math.random() * 0.2,
  Diffuser: Math.random() * 0.05,
  Refrigerator: Math.random() * 0.1,
});

// Função para somar valores de dispositivos
const sumDeviceValues = (values1, values2) => {
  return {
    AirConditioner: values1.AirConditioner + values2.AirConditioner,
    WiFiRouter: values1.WiFiRouter + values2.WiFiRouter,
    Humidifier: values1.Humidifier + values2.Humidifier,
    SmartTV: values1.SmartTV + values2.SmartTV,
    Diffuser: values1.Diffuser + values2.Diffuser,
    Refrigerator: values1.Refrigerator + values2.Refrigerator,
  };
};

export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => {
    const deviceValues = generateDeviceValues();
    const totalValue = Object.values(deviceValues).reduce((a, b) => a + b, 0);
    return {
      time: current - index * hour,
      value: totalValue,
      details: deviceValues,
    };
  });
};

export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value, details }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();

    if (!curr[day]) {
      curr[day] = { value: 0, details: generateDeviceValues() };
      for (const key in curr[day].details) {
        curr[day].details[key] = 0;
      }
    }
    curr[day].value += value;
    curr[day].details = sumDeviceValues(curr[day].details, details);
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, { value, details }]) => ({
    time: Number(day),
    value,
    details,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};
