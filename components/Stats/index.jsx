import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Select from "react-select";
import { Doughnut, Line } from "react-chartjs-2";
import metricPrefix from "../../common/helpers/metricPrefix";
import NumberFormat from "react-number-format";
import ReactCountryFlag from "react-country-flag";

import {
  Wrapper,
  CasesWrapper,
  ChartsWraper,
  Countries,
  Card,
  Country,
  Tabs,
  Tab,
  NewCases,
} from "./styles";

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
  const router = useRouter();

  ///State handling
  const [chartsData, setChartsData] = useState({
    filter: "daily",
    confActLabel: "Confirmed",
    doughnutData: [currentNewConfirmed, currentNewRecovered, currentNewDeaths],
    lineData: [new_confirmed, new_recovered, new_deaths],
  });

  const noTimeLine =
    confirmed.length + recovered.length + deaths.length > 0 ? false : true;

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

  useEffect(() => {
    if (noTimeLine) getTotaleData();
    else getDailyData();
  }, [country]);

  return (
    <Wrapper>
      {country ? (
        <Country>
          <Link href="/[country]" as={`/${country}`}>
            <a>
              <ReactCountryFlag
                countryCode={country}
                svg
                style={{
                  width: "2em",
                  height: "1.5em",
                }}
              />
            </a>
          </Link>
        </Country>
      ) : null}
      <CasesWrapper>
        <Card color="#FFA500">
          <h1>Confirmed</h1>
          <NewCases color="#ffbc40">
            <NumberFormat
              value={currentNewConfirmed}
              displayType={"text"}
              thousandSeparator={true}
              defaultValue={0}
              prefix={"( + "}
              suffix={" )"}
            />
          </NewCases>
          <p>
            <NumberFormat
              value={currentConfirmed}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        </Card>
        <Card color="#31B2F2">
          <h1>Active</h1>
          <NewCases />
          <p>
            <NumberFormat
              value={currentActive}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        </Card>
        <Card color="#4CAF50">
          <h1>Recovered</h1>
          <NewCases color="#6cb46f">
            <NumberFormat
              value={currentNewRecovered}
              displayType={"text"}
              thousandSeparator={true}
              defaultValue={0}
              prefix={"( + "}
              suffix={" )"}
            />
          </NewCases>
          <p>
            <NumberFormat
              value={currentRecovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        </Card>
        <Card color="#FF0000">
          <h1>Deaths</h1>
          <NewCases color="#fa6464">
            <NumberFormat
              value={currentNewDeaths}
              displayType={"text"}
              thousandSeparator={true}
              defaultValue={0}
              prefix={"( + "}
              suffix={" )"}
            />
          </NewCases>
          <p>
            <NumberFormat
              value={currentDeaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        </Card>
      </CasesWrapper>
      <Countries>
        <label>Select country :</label>
        <Select
          onChange={(e) => router.push(`/${e.value}`)}
          instanceId="countries"
          options={countries
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((country) => ({
              label: country.name,
              value: country.code,
            }))}
        />
      </Countries>
      {!noTimeLine ? (
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
      ) : null}
      <ChartsWraper>
        {!noTimeLine ? (
          <div className="chart-container-1">
            <Line
              data={{
                labels: days,
                datasets: [
                  {
                    label: chartsData.confActLabel,
                    data: [...chartsData.lineData[0]],
                    fill: true,
                    backgroundColor:
                      chartsData.confActLabel === "Active"
                        ? "rgba(75,192,192,0.2)"
                        : "#FFE1AB",
                    borderColor:
                      chartsData.confActLabel === "Active"
                        ? "rgba(75,192,192,0.2)"
                        : "#FFE1AB",
                    borderWidth: 1,
                    pointHoverBorderColor:
                      chartsData.confActLabel === "Active"
                        ? "#31B2F2"
                        : "#FFAA00",
                    pointHoverBackgroundColor: "rgba(75,192,192,0.2)",
                  },
                  {
                    label: "Recovered",
                    data: [...chartsData.lineData[1]],
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "#4CAF50",
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
        ) : null}
        <div className="chart-container-2">
          <Doughnut
            data={{
              datasets: [
                {
                  data: [...chartsData.doughnutData],
                  backgroundColor: [
                    chartsData.confActLabel === "Active"
                      ? "#31B2F2"
                      : "#FFA500",
                    "#4CAF50",
                    "#FF0000",
                  ],
                  hoverBackgroundColor: [
                    chartsData.confActLabel === "Active"
                      ? "#79CAF2"
                      : "#FCC86A",
                    "#A5D6A7",
                    "#ff5151",
                  ],
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
