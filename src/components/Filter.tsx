import React from "react";
import { Select } from "antd";
import { useQuery } from "react-query";

type propList = {
    setSeason: (value: string) => void
}
export default function Filter({ setSeason }: propList) {
    const fecthSeasons = async () => {
        try {
            const data = await fetch(`http://ergast.com/api/f1/seasons.json?limit=74`).then(res => res.json())
            const listSeason: {
                value: string,
                label: string
            } = data?.MRData?.SeasonTable?.Seasons?.map((item: any) => {
                return {
                    value: item.season,
                    label: item.season
                }
            }) 
            return listSeason
        } catch(err) {
            console.log(err)
        }
    }
    const {data: listSeason} = useQuery('seasons', () => fecthSeasons())
  const onChange = (value: string) => {
    setSeason(value)
  };

  const onSearch = (value: string) => {
    setSeason(value)
  };
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="font-bold mb-2">Select season:</h2>
        <Select
        className="w-50"
          showSearch
          placeholder="1950"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          options={listSeason}
        />
      </div>
    </div>
  );
}
