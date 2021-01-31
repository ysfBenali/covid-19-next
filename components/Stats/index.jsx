import React from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { Doughnut, Line } from "react-chartjs-2";
import metricPrefix from "../../common/helpers/metricPrefix";
import {
  Wrapper,
  CasesWrapper,
  ChartsWraper,
  Countries,
  Card,
  Country,
} from "./styles";

const Stats = ({
  stats: { confirmed, recovered, deaths, active },
  country,
  countries,
  days,
  timeLineStats: { new_confirmed, new_recovered, new_deaths },
}) => {
  //calc active cases
  const activeCases = confirmed - deaths - recovered;

  const chartData = {
    datasets: [
      {
        data: [activeCases, recovered, deaths],
        backgroundColor: ["#31B2F2", "#4CAF50", "#FF0000"],
        hoverBackgroundColor: ["#79CAF2", "#A5D6A7", "#FF8787"],
      },
    ],

    labels: ["Active", "Recovered", "Deaths"],
  };

  const data = {
    labels: days,
    datasets: [
      {
        label: "Confirmed",
        data: new_confirmed,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,0.2)",
        borderWidth: 1,
      },
      {
        label: "Recovered",
        data: new_recovered,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(76, 175, 80)",
        borderWidth: 1,
      },
      {
        label: "Deaths",
        data: new_deaths,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(255, 0, 0)",
        borderWidth: 1,
      },
    ],
  };
  const router = useRouter();

  return (
    <Wrapper>
      {country ? <Country>{country}</Country> : null}
      <CasesWrapper>
        <Card>
          <h1>Confirmed</h1>
          <p>{confirmed}</p>
        </Card>
        <Card>
          <h1>Active Cases</h1>
          <p>{activeCases}</p>
        </Card>
        <Card>
          <h1>Recovered</h1>
          <p>{recovered}</p>
        </Card>
        <Card>
          <h1>Deaths</h1>
          <p>{deaths}</p>
        </Card>
      </CasesWrapper>
      <Countries>
        <label>Select country :</label>
        <Select
          onChange={(e) => router.push(`/${e.value}`)}
          instanceId="countries"
          options={countries?.map((country) => ({
            label: country.name,
            value: country.code,
          }))}
        />
      </Countries>
      <ChartsWraper>
        <div className="chart-container-1">
          <Line
            data={data}
            // width={400}
            height={270}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                position: "bottom",
              },
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "ddd",
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      // max: 10000
                      callback: (value) => metricPrefix(value),
                    },
                  },
                ],
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
            }}
          />
        </div>
        <div className="chart-container-2">
          <Doughnut
            data={chartData}
            // width={50}
            height={270}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: "bottom",
              },
            }}
          ></Doughnut>
        </div>
      </ChartsWraper>
    </Wrapper>
  );
};

export default Stats;
