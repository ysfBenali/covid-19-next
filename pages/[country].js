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

  const resStats = await fetch(`https://corona-api.com/countries/${country}`);
  const {
    data: { latest_data: stats },
  } = await resStats.json();

  const res = await fetch("https://corona-api.com/countries");
  const { data: countries } = await res.json();

  const timeLineRes = await fetch(
    `https://corona-api.com/countries/${country}`
  );
  const {
    data: { timeline },
  } = await timeLineRes.json();

  const days = timeline.map(({ date }) => date);

  const new_confirmed = timeline.map(({ new_confirmed }) => new_confirmed);
  const new_recovered = timeline.map(({ new_recovered }) => new_recovered);
  const new_deaths = timeline.map(({ new_deaths }) => new_deaths);

  // Pass post data to the page via props
  return {
    revalidate: 5,
    props: {
      country,
      stats,
      countries,
      days,
      timeLineStats: { new_confirmed, new_recovered, new_deaths },
    },
  };
}

export default Country;
