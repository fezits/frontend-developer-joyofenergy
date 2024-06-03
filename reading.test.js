import { getReadings, groupByDay, sortByTime } from "./reading";

describe("#reading", function () {
  describe("#getReadings", () => {
    it("should generate readings with specified length", async () => {
      const length = 100;
      expect(await getReadings(length)).toHaveLength(length);
    });

    it("should generate readings with timestamps and random values", async () => {
      const reading = (await getReadings(1))[0];

      expect(typeof reading.time).toBe("number");
      expect(typeof reading.value).toBe("number");
    });

    it("should generate readings by hours and ordered by time descending", async () => {
      const readings = await getReadings(4);

      expect(readings).toHaveLength(4);
      const OneHourInMilliseconds = 60 * 60 * 1000;
      expect(readings[0].time - readings[1].time).toBe(OneHourInMilliseconds);
      expect(readings[1].time - readings[2].time).toBe(OneHourInMilliseconds);
      expect(readings[2].time - readings[3].time).toBe(OneHourInMilliseconds);
    });
  });

  describe("#groupedByDay", () => {
    it("should get readings with timestamps and values", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50, 
          details: 
          {
            AirConditioner: 0.444,
            WiFiRouter: 0.222,
            Humidifier: 0.777,
            SmartTV: 1.888,
            Diffuser: 0.888,
            Refrigerator: 2.2
          } 
        },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          } 
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          } 
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveLength(2);
      expect(typeof groupedReadings[0].time).toBe("number");
      expect(typeof groupedReadings[0].value).toBe("number");
    });

    it("should get readings grouped by day", async () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), 
          value: 50,
          details: 
          {
            AirConditioner: 0.444,
            WiFiRouter: 0.222,
            Humidifier: 0.777,
            SmartTV: 1.888,
            Diffuser: 0.888,
            Refrigerator: 2.2
          }  
        },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          }
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
          details: 
          {
            AirConditioner: 2.444,
            WiFiRouter: 3.222,
            Humidifier: 4.777,
            SmartTV: 5.888,
            Diffuser: 6.888,
            Refrigerator: 2.2
          }
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
          details: 
          {
            AirConditioner: 3.444,
            WiFiRouter: 4.222,
            Humidifier: 5.777,
            SmartTV: 6.888,
            Diffuser: 7.888,
            Refrigerator: 1.2
          }
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveLength(3);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 17).getTime()
        ).value
      ).toBe(90);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 16).getTime()
        ).value
      ).toBe(35);
    });
  });

  describe("#sortByTime", () => {
    it("should put latest reading to the last", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), 
          value: 50,
          details: 
          {
            AirConditioner: 0.444,
            WiFiRouter: 0.222,
            Humidifier: 0.777,
            SmartTV: 1.888,
            Diffuser: 0.888,
            Refrigerator: 2.2
          }
         },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          }
        },
        {
          time: new Date(2021, 12, 17, 11, 34).getTime(),
          value: 35,
          details: 
          {
            AirConditioner: 2.444,
            WiFiRouter: 3.222,
            Humidifier: 4.777,
            SmartTV: 5.888,
            Diffuser: 6.888,
            Refrigerator: 2.2
          }
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
          details: 
          {
            AirConditioner: 3.444,
            WiFiRouter: 4.222,
            Humidifier: 5.777,
            SmartTV: 6.888,
            Diffuser: 7.888,
            Refrigerator: 1.2
          }
        },
      ];

      const sortedReading = sortByTime(readings);
      expect(sortedReading).toHaveLength(4);
      expect(sortedReading[0]).toMatchObject({
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
        details: 
        {
          AirConditioner: 3.444,
          WiFiRouter: 4.222,
          Humidifier: 5.777,
          SmartTV: 6.888,
          Diffuser: 7.888,
          Refrigerator: 1.2
        }
      });
      expect(sortedReading[3]).toMatchObject({
        time: new Date(2021, 12, 17, 11, 34).getTime(),
        value: 35,
        details: 
        {
          AirConditioner: 2.444,
          WiFiRouter: 3.222,
          Humidifier: 4.777,
          SmartTV: 5.888,
          Diffuser: 6.888,
          Refrigerator: 2.2
        }
      });
    });

    it("should not change original array", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), 
          value: 50, 
          details:  
          {
            AirConditioner: 2.444,
            WiFiRouter: 3.222,
            Humidifier: 4.777,
            SmartTV: 5.888,
            Diffuser: 6.888,
            Refrigerator: 2.2
          }
        },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          }
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
          details: 
          {
            AirConditioner: 3.444,
            WiFiRouter: 4.222,
            Humidifier: 5.777,
            SmartTV: 6.888,
            Diffuser: 7.888,
            Refrigerator: 1.2
          }
        },
      ];

      sortByTime(readings);
      expect(readings).toHaveLength(3);
      expect(readings).toEqual([
        { time: new Date(2021, 12, 17, 10, 24).getTime(), 
          value: 50,
          details:{
            AirConditioner: 2.444,
            WiFiRouter: 3.222,
            Humidifier: 4.777,
            SmartTV: 5.888,
            Diffuser: 6.888,
            Refrigerator: 2.2
          }
        
        },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
          details: 
          {
            AirConditioner: 1.444,
            WiFiRouter: 2.222,
            Humidifier: 3.777,
            SmartTV: 4.888,
            Diffuser: 5.888,
            Refrigerator: 3.2
          }
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
          details: 
          {
            AirConditioner: 3.444,
            WiFiRouter: 4.222,
            Humidifier: 5.777,
            SmartTV: 6.888,
            Diffuser: 7.888,
            Refrigerator: 1.2
          }
        },
      ]);
    });
  });
});
