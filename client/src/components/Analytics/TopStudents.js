import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from "victory";

const TopStudents = (props) => {
  const token = localStorage.getItem('token');
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);

  const fetchStudentData = async () => {
    const res = await fetch("/results/"+props.vari+"/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    setStudents(data);
  }

  useEffect(() => {
    fetchStudentData();
  }, [props.vari]);

  useEffect(() => {
    const sortedData = students
      .sort((a, b) => b.marks - a.marks)
      .slice(0, 3)
      .map((item) => {
        return { x: item.email_name.replace(/@.*$/, ""), y: item.marks };
      });
    setData(sortedData);
  }, [students]);

  return (
    <div style={{ 
      background: "rgb(225, 248, 220)", 
      width: "40rem", 
      height: "25rem", 
      marginBottom: "2rem", 
      padding: "1.5rem",
      boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
      borderRadius: "10px"
    }}>
      {data.length > 0 &&
        <VictoryChart
          width={500} 
          height={400}
          theme={VictoryTheme.material}
          domainPadding={{ x: 60 }}
          responsive={true}
        >
          <VictoryAxis
            label="Student Name"
            tickValues={data.map(item => item.x)}
            style={{
              tickLabels: { fontSize: 20, padding: 3 },
              axisLabel: { fontSize: 24, padding: 100 }
            }}
          />
          <VictoryAxis dependentAxis
            label="Marks"
            tickCount={10}
            style={{
              tickLabels: { fontSize: 18, padding: 3 },
              axisLabel: { fontSize: 20, padding: 25 }
            }}
            tickFormat={(t) => parseInt(t)}
            domain={[0, 30]}
          />
          <VictoryBar
            data={data}
            x="x"
            y="y"
            style={{ 
              data: { 
                fill: "tomato",
                borderRadius: "5px"
              } 
            }}
            animate={{ duration: 500, easing: "bounce" }}
            labels={({ datum }) => `Student Name: ${datum.x}, Marks: ${datum.y}`}
            labelComponent={<VictoryTooltip />}
            horizontal={true}
          />
        </VictoryChart>
      }
      <p style={{textAlign:"center", marginTop:"-.5rem", fontWeight: "bold"}}>Top 3 students by marks</p>
    </div>
  );
};

export default TopStudents;
