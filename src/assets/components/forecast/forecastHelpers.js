// forecastHelpers.js

export const degreesToCompass = (deg) => {
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };
  
  export const getSurfSummary = (forecast) => {
    if (!forecast) return null;
  
    const { waveHeight, swellPeriod, windSpeed, windDirection } = forecast;
  
    let quality = "Fair";
    let icon = "🌊";
    let color = "bg-yellow-100 text-yellow-800 border-yellow-200";
  
    if (waveHeight >= 2 && swellPeriod >= 12 && windSpeed < 6) {
      quality = "Excellent conditions";
      icon = "🔥";
      color = "bg-green-100 text-green-800 border-green-200";
    } else if (waveHeight >= 1.2 && swellPeriod >= 9 && windSpeed < 8) {
      quality = "Decent surf";
      icon = "🌤️";
      color = "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (windSpeed > 12) {
      quality = "Windy";
      icon = "🌬️";
      color = "bg-red-100 text-red-800 border-red-200";
    } else {
      quality = "Poor surf";
      icon = "🌫️";
      color = "bg-gray-100 text-gray-700 border-gray-200";
    }
  
    const windDir = degreesToCompass(windDirection);
  
    return {
      summary: `${icon} ${quality}: ${waveHeight.toFixed(1)}m @ ${swellPeriod.toFixed(
        0
      )}s with ${windSpeed.toFixed(1)} m/s ${windDir} wind`,
      color,
    };
  };
  