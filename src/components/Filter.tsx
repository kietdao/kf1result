import React from "react";
import { Select } from "antd";
import { useQuery } from "react-query";

type propList = {
  setSeason: (value: string) => void;
  season: string;
  setRound: (value: string) => void;
};
export default function Filter({ setSeason, season, setRound }: propList) {
  const fecthSeasons = async () => {
    try {
      const data = await fetch(
        `http://ergast.com/api/f1/seasons.json?limit=74`
      ).then((res) => res.json());
      const listSeason: {
        value: string;
        label: string;
      } = data?.MRData?.SeasonTable?.Seasons?.map((item: any) => {
        return {
          value: item.season,
          label: item.season,
        };
      });
      return listSeason;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRound = async () => {
    try {
      const data = await fetch(`https://ergast.com/api/f1/${season}.json`).then(
        (res) => res.json()
      );
      const listRound: {
        value: string;
        label: string;
      } = data?.MRData?.RaceTable?.Races.map((item) => {
        return {
          value: item.round,
          label: item.round,
        };
      });
      return listRound;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: listSeason } = useQuery("seasons", () => fecthSeasons());
  const { data: listRound } = useQuery(["rounds", season], () => fetchRound());
  const onChange = (value: string) => {
    setSeason(value);
  };
  const onChangeRound = (value: string) => {
    setRound(value);
  };
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <h2 className="font-bold mb-2">Select season:</h2>
        <Select
          className="w-50"
          placeholder="1950"
          optionFilterProp="children"
          onChange={onChange}
          options={listSeason}
        />
      </div>
      <div>
        <h2 className="font-bold mb-2">Select round:</h2>
        <Select
          className="w-50"
          placeholder="1"
          optionFilterProp="children"
          onChange={onChangeRound}
          options={listRound}
        />
      </div>
    </div>
  );
}
