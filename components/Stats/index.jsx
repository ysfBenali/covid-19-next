import React, { useState, useEffect } from "react";
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
  Tabs,
  Tab,
} from "./styles";
import { sign } from "crypto";

const Stats = ({
  stats: {
    //current stats
    confirmed: currentConfirmed,
    recovered: currentRecovered,
    deaths: currentDeaths,
    active: currentActive,
    new_confirmed: currentNewConfirmed,
    new_recovered: currentNewRecovered,
    new_deaths: currentNewDeaths,
  },
  country,
  countries,
  days,
  timeLineStats: {
    //arrays props
    confirmed,
    recovered,
    deaths,
    active,
    new_confirmed,
    new_recovered,
    new_deaths,
  },
}) => {
  ///State handling
  const [chartsData, setChartsData] = useState({
    filter: "daily",
    confActLabel: "Confirmed",
    doughnutData: [currentNewConfirmed, currentNewRecovered, currentNewDeaths],
    lineData: [new_confirmed, new_recovered, new_deaths],
  });

  const router = useRouter();
  
  useEffect(() => {
    setChartsData({
      filter: "daily",
      confActLabel: "Confirmed",
      doughnutData: [
        currentNewConfirmed,
        currentNewRecovered,
        currentNewDeaths,
      ],
      lineData: [new_confirmed, new_recovered, new_deaths],
    });
  }, [country]);

  const getTotaleData = () => {
    setChartsData({
      filter: "cumulative",
      confActLabel: "Active",
      doughnutData: [currentActive, currentRecovered, currentDeaths],
      lineData: [active, recovered, deaths],
    });
  };

  const getDailyData = () => {
    setChartsData({
      filter: "daily",
      confActLabel: "Confirmed",
      doughnutData: [
        currentNewConfirmed,
        currentNewRecovered,
        currentNewDeaths,
      ],
      lineData: [new_confirmed, new_recovered, new_deaths],
    });
  };

  return (
    <Wrapper>
      {country ? <Country>{country}</Country> : null}
      <CasesWrapper>
        <Card>
          <h1>Confirmed</h1>
          <p>{currentConfirmed}</p>
        </Card>
        <Card>
          <h1>Active</h1>
          <p>{currentActive}</p>
        </Card>
        <Card>
          <h1>Recovered</h1>
          <p>{currentRecovered}</p>
        </Card>
        <Card>
          <h1>Deaths</h1>
          <p>{currentDeaths}</p>
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
      <Tabs>
        <Tab onClick={getDailyData} clicked={chartsData.filter === "daily"}>
          <h4>Daily</h4>
        </Tab>
        <Tab
          onClick={getTotaleData}
          clicked={chartsData.filter === "cumulative"}
        >
          <h4>Cumulative</h4>
        </Tab>
      </Tabs>
      <ChartsWraper>
        <div className="chart-container-1">
          <Line
            data={{
              labels: days,
              datasets: [
                {
                  label: chartsData.confActLabel,
                  data: [...chartsData.lineData[0]],
                  fill: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,0.2)",
                  borderWidth: 1,
                },
                {
                  label: "Recovered",
                  data: [...chartsData.lineData[1]],
                  fill: false,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgb(76, 175, 80)",
                  borderWidth: 1,
                },
                {
                  label: "Deaths",
                  data: [...chartsData.lineData[2]],
                  fill: false,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgb(255, 0, 0)",
                  borderWidth: 1,
                },
              ],
            }}
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
            data={{
              datasets: [
                {
                  data: [...chartsData.doughnutData],
                  backgroundColor: ["#31B2F2", "#4CAF50", "#FF0000"],
                  hoverBackgroundColor: ["#79CAF2", "#A5D6A7", "#FF8787"],
                },
              ],

              labels: [chartsData.confActLabel, "Recovered", "Deaths"],
            }}
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
