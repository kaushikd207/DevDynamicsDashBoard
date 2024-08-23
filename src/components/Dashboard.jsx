// Dashboard.js

import React from "react";
import {
  Card,
  Title,
  BarChart,
  LineChart,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  ProgressBar,
} from "@tremor/react";
import data from "./data"; // Assuming your data is in data.json file

const Dashboard = () => {
  const authorData = data.data.AuthorWorklog.rows;
  const totalPR = authorData.reduce(
    (acc, author) => acc + parseInt(author.totalActivity[2].commits)
  );
  console.log(totalPR);
  const totalIncidentAlerts = authorData.reduce(
    (acc, author) => acc + parseInt(author.incidentAlerts),
    0
  );
  const totalIncidentsResolved = authorData.reduce(
    (acc, author) => acc + parseInt(author.incidentsResolved),
    0
  );

  const barChartData = authorData.map((author) => {
    return {
      name: author.name,
      Commits: author?.totalActivity?.find(
        (activity) => activity.name === "Commits"
      ).value,
      "PR Open": author?.totalActivity?.find(
        (activity) => activity.name === "PR Open"
      ).value,
      "PR Merged": author?.totalActivity?.find(
        (activity) => activity.name === "PR Merged"
      ).value,
      "PR Reviewed": author?.totalActivity?.find(
        (activity) => activity.name === "PR Reviewed"
      ).value,
      "PR Comments": author?.totalActivity?.find(
        (activity) => activity.name === "PR Comments"
      ).value,
      "Incident Alerts": author?.totalActivity?.find(
        (activity) => activity.name === "Incident Alerts"
      ).value,
      "Incidents Resolved": author?.totalActivity?.find(
        (activity) => activity.name === "Incidents Resolved"
      ).value,
    };
  });

  const lineChartData = authorData.flatMap((author) =>
    author.dayWiseActivity.map((day) => ({
      date: day.date,
      Commits: parseInt(
        day.items.children.find((item) => item.label === "Commits").count
      ),
      "PR Open": parseInt(
        day.items.children.find((item) => item.label === "PR Open").count
      ),
      "PR Merged": parseInt(
        day.items.children.find((item) => item.label === "PR Merged").count
      ),
      "PR Reviewed": parseInt(
        day.items.children.find((item) => item.label === "PR Reviewed").count
      ),
      "PR Comments": parseInt(
        day.items.children.find((item) => item.label === "PR Comments").count
      ),
      "Incident Alerts": parseInt(
        day.items.children.find((item) => item.label === "Incident Alerts")
          .count
      ),
      "Incidents Resolved": parseInt(
        day.items.children.find((item) => item.label === "Incidents Resolved")
          .count
      ),
    }))
  );

  const colors = {
    "PR Open": "#EF6B6B",
    "PR Merged": "#61CDBB",
    Commits: "#FAC76E",
    "PR Reviewed": "#C2528B",
    "PR Comments": "#0396A6",
    "Incident Alerts": "#5F50A9",
    "Incidents Resolved": "#8F3519",
  };

  return (
    <div>
      {" "}
      <div className=" border-b-2 h-[50px]">
        <img
          className="ml-2"
          src="https://cdn.prod.website-files.com/642535c7875ea6e60927dd49/65cb115f23533388f1d0b7e2_DevDynamics_Logo.svg"
          alt=""
        />
      </div>
      <div className="container flex justify-center items-center m-auto border-black">
        <div className="dashBoardBox w-11/12">
          {/* Activity Trends Over Time */}
          <h1 className="my-7 font-bold text-xl w-80">
            Discover Your Team Highlights
          </h1>
          <div className="cardContainer flex justify-between items-center h-52">
            <Card
              className="mx-auto max-w-xs"
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Commits
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                99
              </p>
            </Card>
            <Card
              className="mx-auto max-w-xs"
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total PR Open
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                15
              </p>
            </Card>
            <Card
              className="mx-auto max-w-xs"
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total PR Merged
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                13
              </p>
            </Card>
            <Card
              className="mx-auto max-w-xs"
              decoration="top"
              decorationColor="indigo"
            >
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total PR Reviewed
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                19
              </p>
            </Card>
          </div>
          <div className="flex justify-between items-center ">
            <Card className="w-[95%] rounded-none">
              <Title>Activity Trends Over Time</Title>
              <LineChart
                data={lineChartData}
                index="date"
                categories={[
                  "Commits",
                  "PR Open",
                  "PR Merged",
                  "PR Reviewed",
                  "PR Comments",
                  "Incident Alerts",
                  "Incidents Resolved",
                ]}
              />
            </Card>

            {/* Daily Activity Summary */}
            <Card className="w-6/12 rounded-none">
              <Title>Daily Activity Summary</Title>
              <BarChart
                data={barChartData}
                index="name"
                categories={Object.keys(colors)}
              />
            </Card>
          </div>
          {/* Author Performance Table */}
          <Card className="my-4">
            <Title>Author Performance</Title>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Author</TableHeaderCell>
                  <TableHeaderCell>Commits</TableHeaderCell>
                  <TableHeaderCell>PRs Opened</TableHeaderCell>
                  <TableHeaderCell>PRs Merged</TableHeaderCell>
                  <TableHeaderCell>PRs Reviewed</TableHeaderCell>
                  <TableHeaderCell>PR Comments</TableHeaderCell>
                  <TableHeaderCell>Incident Alerts</TableHeaderCell>
                  <TableHeaderCell>Incidents Resolved</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authorData.map((author) => (
                  <TableRow key={author.name}>
                    <TableCell>{author.name}</TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "Commits"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "PR Open"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "PR Merged"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "PR Reviewed"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "PR Comments"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "Incident Alerts"
                        ).value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        author?.totalActivity?.find(
                          (activity) => activity.name === "Incidents Resolved"
                        ).value
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          {/* Progress on Incident Resolution */}
          <Card className="mb-4">
            <Title>Incident Resolution Progress</Title>
            <ProgressBar
              percentage={
                (totalIncidentsResolved /
                  (totalIncidentAlerts + totalIncidentsResolved)) *
                100
              }
              color="green"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
