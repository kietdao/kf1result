import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query'

interface Items {
  key: string,
  position: string;
  number: number;
  name: string;
  constructor: string;
  laps: number,
  time: string,
  points: number
}

const columns: ColumnsType<Items> = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'No',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Driver',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Constructor',
    key: 'constructor',
    dataIndex: 'constructor',
  },
  {
    title: 'Laps',
    key: 'laps',
    dataIndex: 'laps',
  },
  {
    title: 'Time/Retired',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: 'Points',
    key: 'points',
    dataIndex: 'points',
  },
];

type propList = {
  season: string,
}

export default function RaceResult({ season }: propList) {
  const [date, setDate] = useState<string>('')
  const fetchResult = async () => {
    try {
      const res = await fetch(`https://ergast.com/api/f1/${season}/3/results.json`).then(res => res.json())
      const data = res.MRData.RaceTable.Races[0]
      const formattedItems = data.Results.map((item: any) => {
       return {
        key: uuidv4(),
        position: item.positionText,
        number: item.number,
        name: `${item.Driver.givenName} ${item.Driver.familyName}`,
        constructor: item.Constructor.name,
        laps: item.laps,
        time: item?.Time?.time || item.status.toLowerCase(),
        points: item.points
       }
      })
      const dateString = new Date(data.date)
      const formatDate = `${dateString.getDate()}-${dateString.getMonth() + 1}-${dateString.getFullYear()}`
      formattedItems.push({date: formatDate})
      setDate(formatDate)
      return formattedItems
    } catch(err) {
      console.log(err)
    }
  }
  const { data: items } = useQuery(['result', season], () => fetchResult())
  useEffect(() => {
    setDate(items?.[items?.length - 1]?.date)
  }, [items])
  return (
    <div className='p-4'>
      <h1 className='font-bold text-center text-xl'>Race Result Of F1</h1>
      <div className='font-bold text-center m-4'>
        <span>Date: </span>
        <span>
          {date}
        </span>
      </div>
      <Table columns={columns} dataSource={items?.slice(0, -1)} />;
    </div>
  )
}
