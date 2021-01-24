import Head from "next/head";
import Stats from "../components/Stats";

export default function Home({ days, countries, stats, timeLineStats }) {
  return (
    <div>
      <Head>
        <title>covid-19-next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stats
        stats={stats}
        countries={countries}
        timeLineStats={timeLineStats}
        days={days}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  //get all cases stats
  const resStats = await fetch("https://corona-api.com/timeline");

  const { data: timeline } = await resStats.json();
  //first element of array
  const [stats] = timeline;
  // const timeLineRes = await fetch("https://corona-api.com/countries/MA");
  // const {data: { timeline } } = await timeLineRes.json();

  const days = timeline.map(({ date }) => date);

  const new_confirmed = timeline.map(({ new_confirmed }) => new_confirmed);
  const new_recovered = timeline.map(({ new_recovered }) => new_recovered);
  const new_deaths = timeline.map(({ new_deaths }) => new_deaths);

  //get all counties
  const res = await fetch("https://corona-api.com/countries");
  const { data: countries } = await res.json();

  // console.log(new_confirmed);
  return {
    revalidate: 5,
    props: {
      stats,
      countries,
      days,
      timeLineStats: { new_confirmed, new_recovered, new_deaths },
    },
  };
};
