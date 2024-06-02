import { renderChart } from "./chart.js";
import { getReadings, groupByDay, sortByTime } from "./reading";

var daysPast = 0;
const readings = await getReadings();
export const loadDataByDays = (days) => {
    renderChart(sortByTime(groupByDay(readings)).slice(-days));
    document.getElementById('daysLabel').textContent = ": last " + days + ' days';

    return days;
}


window.loadDataByDays = loadDataByDays;

