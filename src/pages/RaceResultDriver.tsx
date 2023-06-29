import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";

interface Items {
  key: string;
  granprix: string;
  date: string;
  constructor: string;
  time: string;
  position: string;
  points: string;
}

const columns: ColumnsType<Items> = [
  {
    title: "Grand Prix",
    dataIndex: "grandprix",
    key: "grandprix",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Constructor",
    key: "constructor",
    dataIndex: "constructor",
  },
  {
    title: "Time/Retired",
    key: "time",
    dataIndex: "time",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Points",
    key: "points",
    dataIndex: "points",
  },
];

type propList = {
  season: string;
  driver: string;
  fullname: string,
};

export default function RaceResultDriver({ season, driver, fullname }: propList) {
  const [driverName, setDriverName] = useState<string>("");
  const fetchResult = async () => {
    try {
      const res = await fetch(
        `http://ergast.com/api/f1/${season}/drivers/${driver}/results.json`
      ).then((res) => res.json());
      const data = res.MRData.RaceTable.Races;
      const formattedItems = data.map((item: any) => {
        const dateString = new Date(item.date);
        const formatDate = `${dateString.getDate()}-${
          dateString.getMonth() + 1
        }-${dateString.getFullYear()}`;
        return {
          key: uuidv4(),
          grandprix: item.raceName,
          date: formatDate,
          constructor: item.Results[0].Constructor.name,
          time: item.Results[0]?.Time?.time || item.Results[0].status,
          position: item.Results[0].positionText,
          points: item.Results[0].points,
        };
      });
      return formattedItems;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: items } = useQuery(["raceResultDriver", season, driver], () =>
    fetchResult()
  );
  return (
    <div className="p-4">
      <h1 className="font-bold text-center text-xl mb-8">Race Result Of {fullname}</h1>
      <Table columns={columns} dataSource={items} />;
    </div>
  );
}
