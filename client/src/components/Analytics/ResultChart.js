import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryZoomContainer, VictoryTooltip } from "victory";

const ResultChart = () => {
    var token = localStorage.getItem('token');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([{ x: 0, y: 0 }]);

    function countResultsByDate(results) {
        if (!Array.isArray(results)) {
            return [];
        }
        const countByDate = results.reduce((count, result) => {
            const date = new Date(result.attempted_on).toLocaleDateString();
            if (count[date]) {
                count[date]++;
            } else {
                count[date] = 1;
            }
            return count;
        }, {});
        const data = Object.keys(countByDate).map((date) => {
            return { x: date, y: countByDate[date] };
        });
        return data.sort((a, b) => new Date(a.x) - new Date(b.x));
    }

    const fetchResultData = async () => {
        const res = await fetch("/results", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        setResults(data);
    }

    useEffect(() => {
        fetchResultData();
    }, []);

    useEffect(() => {
        const newCounts = countResultsByDate(results);
        setData(newCounts);
    }, [results]);

    console.log(data);

    return (
        <div style={{ 
            background: "rgb(218, 222, 231)",
            width: "40rem", 
            height: "25rem", 
            marginBottom: "2rem", 
            padding: "1.5rem",
            boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
            borderRadius: "10px" 
            }}>
            <VictoryChart
                width={900} height={400}
                theme={VictoryTheme.material}
                domainPadding={{ x: 60 }}
                animate={{ duration: 500, easing: "bounce" }}
                // containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 5], y: [0, 10]}}/>
            // }
            >
                <VictoryAxis
                    label="Date"
                    tickFormat={(date) => new Date(date).toLocaleDateString()}
                    style={{
                        tickLabels: { fontSize: 20, padding: 3 },
                        axisLabel: { fontSize: 22, padding: 30 }
                    }}
                />
                <VictoryAxis dependentAxis
                    label="Attempts"
                    tickCount={10}
                    style={{
                        tickLabels: { fontSize: 18, padding: 3 },
                        axisLabel: { fontSize: 22, padding: 30 }
                    }}
                    tickFormat={(t) => parseInt(t)}
                    domain={[0, 10]}
                />
                <VictoryLine
                    data={data}
                    x="x"
                    y="y"
                    style={{ data: { stroke: "#c43a31" } }}
                    animate={{ duration: 500, easing: "bounce" }}
                    labels={({ datum }) => `Date: ${datum.x}, Attempts: ${datum.y}`}
                    
                  />
                  
            </VictoryChart>
            <p style={{textAlign:"center", marginTop:"-2rem", fontWeight: "bold"}}>No. of submissions according to dates</p>
        </div>
    );
};

export default ResultChart;
