import { useEffect, useState } from "react";
import { stock_data } from "./data/data";
import {Chart} from 'react-google-charts'
import { min5Data } from "./types";

export const options1 = {
  legend: "none",
  bar: { groupWidth: "90%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
};


export const options2 = {
  // chart: {
  //   title: "Company Performance",
  //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
  // },
};

function App() {
  const [stockInfo, setStockInfo] = useState('')
  const [min5Data, setMin5Data] = useState()
  const [min5Volume, setMin5Volume] = useState()
  useEffect(()=>{
    const timeSeriesData = stock_data['Time Series (5min)']
    
    const result = Object.entries(timeSeriesData)
    let minute5Data: any  = [["Date", "", "", "", ""]]
    let minute5Volume: any  = [["Date", "Volume"]]
    result.forEach(entry  => {
      let chartData = []
      let volData = []
      chartData.push(entry[0])
      chartData.push(parseFloat(entry[1]['1. open']))
      chartData.push(parseFloat(entry[1]['2. high']))
      chartData.push(parseFloat(entry[1]['3. low']))
      chartData.push(parseFloat(entry[1]['4. close']))
      // chartData.push(parseFloat(entry[1]['5. volume']))
      minute5Data.push(chartData)
      volData.push(entry[0])
      volData.push(parseInt(entry[1]['5. volume']))
      minute5Volume.push(volData)

      setStockInfo(stock_data['Meta Data']["2. Symbol"])
      setMin5Data(minute5Data)
      setMin5Volume(minute5Volume)
    })
    
  },[])
  return (
    
    <div className="flex flex-col">
    <h1 className="text-9xl font-bold underline">
      {stockInfo} 5-min Monitoring
    </h1>
    <Chart 
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data =  {min5Data}
      options={options1}
/>
<Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={min5Volume}
      options={options2}
    /> 
    </div>
  );
}

export default App;
