import { IData, IGraphData } from 'commons/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { formatDateYYYYMMDD } from 'commons/utils';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface GraphProps {
  data: IData[];
}

const Graph = ({ data }: GraphProps) => {
  const [filteredData, setFilteredData] = useState<IGraphData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  let minDate = useRef<string>();
  let maxDate = useRef<string>();

  useEffect(() => {
    minDate.current = formatDateYYYYMMDD(data[data.length - 1].timestamp);
    maxDate.current = formatDateYYYYMMDD(data[0].timestamp);

    setStartDate(formatDateYYYYMMDD(data[data.length - 1].timestamp));
    setEndDate(formatDateYYYYMMDD(data[0].timestamp));
  }, [data]);

  useEffect(() => {
    if (startDate && endDate) {
      var tempData = [] as IGraphData[];
      let count = 1;
      data
        .filter((dataItem) => {
          return (
            new Date(dataItem.timestamp) >=
              new Date(startDate + 'T00:00:00Z') &&
            new Date(dataItem.timestamp) <= new Date(endDate + 'T24:00:00Z')
          );
        })
        .forEach((dataItem, i, arr) => {
          if (arr.length === 1) {
            tempData.push({
              timestamp: new Date(arr[i - 1].timestamp).toDateString(),
              count: count,
            });
          }
          if (i > 0) {
            if (
              new Date(dataItem.timestamp).toDateString() ===
              new Date(arr[i - 1].timestamp).toDateString()
            ) {
              count++;
            } else {
              tempData.push({
                timestamp: new Date(arr[i - 1].timestamp).toDateString(),
                count: count,
              });
              count = 1;
            }
          }
        });
      console.log(tempData);
      setFilteredData(tempData);
    }
  }, [startDate, endDate, data]);

  return (
    <div>
      <label>
        Start Date
        <input
          type='date'
          min={minDate.current}
          max={maxDate.current}
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStartDate(e.target.value);
          }}
          style={{ margin: '16px 8px' }}
        />
      </label>
      <label style={{ margin: '0px 24px' }}>
        End Date
        <input
          type='date'
          min={minDate.current}
          max={maxDate.current}
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEndDate(e.target.value);
          }}
          style={{ margin: '0px 8px' }}
        />
      </label>

      {filteredData.length > 0 && (
        <LineChart
          width={1040}
          height={460}
          data={filteredData}
          margin={{ top: 32, right: 0, bottom: 5, left: 0 }}
        >
          <Line
            type='monotone'
            width={400}
            height={400}
            dataKey='count'
            stroke='#8884d8'
          />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
        </LineChart>
      )}
    </div>
  );
};

export default Graph;
