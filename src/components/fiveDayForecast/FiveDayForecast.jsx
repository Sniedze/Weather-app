import React from "react";

const FiveDayForecast = props => {
  const { dailyData } = props;
  return (
    <section>
      <h1>This is 5 days</h1>
      {dailyData.map((reading, index) => (
        <article key={index}>
          {reading.name}
          {reading.main.temp}
          {reading.weather[0].description}
        </article>
      ))}
    </section>
  );
};

export default FiveDayForecast;
