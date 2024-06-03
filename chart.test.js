import { formatDateLabel, getPredefinedColor, generatePredefinedColors } from "./chart";

describe("#chart formatDateLabel", () => {
  it("should format date label", () => {
    expect(formatDateLabel(new Date(2021, 0, 1).getTime())).toBe("01/01");
    expect(formatDateLabel(new Date(2021, 1, 1).getTime())).toBe("01/02");
    expect(formatDateLabel(new Date(2021, 5, 1).getTime())).toBe("01/06");
    expect(formatDateLabel(new Date(2021, 11, 1).getTime())).toBe("01/12");
    expect(formatDateLabel(new Date(2021, 11, 25).getTime())).toBe("25/12");
    expect(formatDateLabel(new Date(2021, 11, 31).getTime())).toBe("31/12");
  });
});


describe('getPredefinedColor', () => {
  it('should return the correct color for a given index', () => {
    expect(getPredefinedColor(0)).toBe('rgba(100, 100, 100, 0.2)'); // gray
    expect(getPredefinedColor(1)).toBe('rgba(255, 0, 0, 0.2)');     // red
    expect(getPredefinedColor(2)).toBe('rgba(0, 255, 0, 0.2)');     // green
    expect(getPredefinedColor(3)).toBe('rgba(0, 0, 255, 0.2)');     // blue
    expect(getPredefinedColor(4)).toBe('rgba(255, 255, 0, 0.2)');   // yellow
    expect(getPredefinedColor(5)).toBe('rgba(255, 0, 255, 0.2)');   // magenta
    expect(getPredefinedColor(6)).toBe('rgba(0, 255, 255, 0.2)');   // cyan
    expect(getPredefinedColor(7)).toBe('rgba(128, 0, 128, 0.2)');   // purple
    expect(getPredefinedColor(8)).toBe('rgba(128, 128, 0, 0.2)');   // olive
    expect(getPredefinedColor(9)).toBe('rgba(0, 128, 128, 0.2)');   // teal
  });

  it('should cycle through colors if index exceeds predefined colors length', () => {
    expect(getPredefinedColor(10)).toBe('rgba(100, 100, 100, 0.2)'); // gray
    expect(getPredefinedColor(11)).toBe('rgba(255, 0, 0, 0.2)');     // red
    expect(getPredefinedColor(12)).toBe('rgba(0, 255, 0, 0.2)');     // green
    expect(getPredefinedColor(13)).toBe('rgba(0, 0, 255, 0.2)');     // blue
  });
});

describe('generatePredefinedColors', () => {
  it('should generate an array of predefined colors of the specified length', () => {
    expect(generatePredefinedColors(3)).toEqual([
      'rgba(100, 100, 100, 0.2)', // gray
      'rgba(255, 0, 0, 0.2)',     // red
      'rgba(0, 255, 0, 0.2)'      // green
    ]);
    expect(generatePredefinedColors(5)).toEqual([
      'rgba(100, 100, 100, 0.2)', // gray
      'rgba(255, 0, 0, 0.2)',     // red
      'rgba(0, 255, 0, 0.2)',     // green
      'rgba(0, 0, 255, 0.2)',     // blue
      'rgba(255, 255, 0, 0.2)'    // yellow
    ]);
  });

  it('should return an empty array if numColors is 0', () => {
    expect(generatePredefinedColors(0)).toEqual([]);
  });

  it('should return correct colors even for large numbers', () => {
    const result = generatePredefinedColors(12);
    expect(result).toEqual([
      'rgba(100, 100, 100, 0.2)', // gray
      'rgba(255, 0, 0, 0.2)',     // red
      'rgba(0, 255, 0, 0.2)',     // green
      'rgba(0, 0, 255, 0.2)',     // blue
      'rgba(255, 255, 0, 0.2)',   // yellow
      'rgba(255, 0, 255, 0.2)',   // magenta
      'rgba(0, 255, 255, 0.2)',   // cyan
      'rgba(128, 0, 128, 0.2)',   // purple
      'rgba(128, 128, 0, 0.2)',   // olive
      'rgba(0, 128, 128, 0.2)',   // teal
      'rgba(100, 100, 100, 0.2)', // gray
      'rgba(255, 0, 0, 0.2)'      // red
    ]);
  });
});
