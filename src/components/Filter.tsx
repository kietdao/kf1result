import React from "react";
import { Select, Tag, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from "react-query";

type propList = {
  setSeason: (value: string) => void;
  season: string;
  setRound: (value: string) => void;
  setType: (value: string) => void;
  typeResult: string;
  setDriver: (value: string) => void;
  setFullName: (value: string) => void;
};
export default function Filter({
  setSeason,
  season,
  setRound,
  setType,
  typeResult,
  setDriver,
  setFullName
}: propList) {
  // fetch list of seasons
  const fecthSeasons = async () => {
    try {
      const data = await fetch(
        `http://ergast.com/api/f1/seasons.json?limit=74`
      ).then((res) => res.json());
      const listSeason: [{
        value: string;
        label: string;
      }] = data?.MRData?.SeasonTable?.Seasons?.map((item: {
        season: string
      }) => {
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
  // fetch list of rounds following season
  const fetchRound = async () => {
    try {
      const data = await fetch(`https://ergast.com/api/f1/${season}.json`).then(
        (res) => res.json()
      );
      const listRound: [{
        value: string;
        label: string;
      }] = data?.MRData?.RaceTable?.Races.map((item: {
        round: string
      }) => {
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
  // fetch list of drivers following season
  const fetchDrivers = async () => {
    try {
      const data = await fetch(`http://ergast.com/api/f1/${season}/drivers.json`).then((res) => res.json())
      const listDriver: [{
        value: string,
        label: string
      }] = data?.MRData?.DriverTable?.Drivers?.map((item: {
        givenName: string,
        familyName: string
      }) => {
        return {
          value: `${item.givenName} ${item.familyName}`,
          label: `${item.givenName} ${item.familyName}`
        }
      })
      return listDriver
    }catch(err) {
      console.log(err)
    }
  }
  const { data: listSeason } = useQuery("seasons", () => fecthSeasons());
  const { data: listRound } = useQuery(["rounds", season], () => fetchRound());
  const { data: listDriver } = useQuery(["drivers", season], () => fetchDrivers());
  const onChange = (value: string) => {
    setSeason(value);
  };
  const onChangeRound = (value: string) => {
    setRound(value);
  };
  const onChangeDriver = (value: string) => {
    setFullName(value)
    const familyName: string = value.split(' ').slice(-1).join('').toLowerCase()
    setDriver(familyName)
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;
  return (
    <>
      <div className="flex justify-center items-center gap-8 m-8">
        <span className="font-bold">Choose your favorite type of result: </span>
        <Tag
          color="#cd201f"
          className="cursor-pointer"
          onClick={() => setType("races")}
          icon={typeResult === 'races' && <Spin indicator={antIcon} />}
        >
          Races
        </Tag>
        <Tag
          color="#3b5999"
          className="cursor-pointer"
          onClick={() => setType("drivers")}
          icon={typeResult === 'drivers' && <Spin indicator={antIcon}/>}
        >
          Drivers
        </Tag>
      </div>
      <div className="flex justify-center items-center gap-8">
        <div>
          <h2 className="font-bold mb-2">Select season:</h2>
          <Select
            className="w-50"
            placeholder="2023"
            optionFilterProp="children"
            onChange={onChange}
            options={listSeason}
          />
        </div>
        {typeResult === "races" && (
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
        )}
        {typeResult === "drivers" && (
          <div>
            <h2 className="font-bold mb-2">Your favourite driver:</h2>
            <Select
              className="w-50"
              placeholder="Fernando Alonso"
              optionFilterProp="children"
              onChange={onChangeDriver}
              options={listDriver}
            />
          </div>
        )}
      </div>
    </>
  );
}
