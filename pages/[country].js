import React from "react";
import Stats from "../components/Stats";

const Country = ({ stats, countries, country, days, timeLineStats }) => {
  return (
    <div>
      <Stats
        country={country}
        stats={stats}
        countries={countries}
        days={days}
        timeLineStats={timeLineStats}
      />
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://corona-api.com/countries");
  const { data } = await res.json();
  const countries = data.map(({ name, code }) => ({
    name,
    code,
  }));

  // Get the paths we want to pre-render based on posts
  const paths = countries
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((country) => typeof country.code !== "undefined")
    .map(({ code }) => ({
      params: { country: code },
    }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  let { country } = params;

  const timeLineRes = await fetch(
    `https://corona-api.com/countries/${country}`
  );
  const {
    data: { timeline, latest_data },
  } = await timeLineRes.json();

  let stats;
  if (timeline.length !== 0)
    //first element of array
    [stats] = timeline;
  else {
    stats = latest_data;
    stats.active = stats.confirmed - stats.recovered - stats.deaths;
  }

  const days = timeline.map(({ date }) => date);

  //total
  const confirmed = timeline.map(({ confirmed }) => confirmed);
  const recovered = timeline.map(({ recovered }) => recovered);
  const deaths = timeline.map(({ deaths }) => deaths);
  //daily
  const new_confirmed = timeline.map(({ new_confirmed }) => new_confirmed);
  const new_recovered = timeline.map(({ new_recovered }) => new_recovered);
  const new_deaths = timeline.map(({ new_deaths }) => new_deaths);
  const active = timeline.map(({ active }) => active);

  //get all countries
  const res = await fetch("https://corona-api.com/countries");
  const { data: countries } = await res.json();

  // Pass post data to the page via props
  return {
    revalidate: 5,
    props: {
      stats,
      countries,
      country,
      days,
      timeLineStats: {
        new_confirmed,
        new_recovered,
        new_deaths,
        active,
        confirmed,
        recovered,
        deaths,
      },
    },
  };
}

export default Country;
