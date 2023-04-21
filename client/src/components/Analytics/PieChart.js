  import React, { useEffect, useState } from "react";
  import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryPie,VictoryZoomContainer, VictoryTooltip } from "victory";
import TopStudents from "./TopStudents";

  const PieChart = () => {
      var token = localStorage.getItem('token');
      const [subjects, setSubjects] = useState([]);
      const [selectedSubject, setSelectedSubject] = useState("");
      const [selectedSubjectId, setSelectedSubjectId] = useState();
      const [results, setResults] = useState([]);
      const [data, setData] = useState([{ x: 0, y: 0 }]);
      const fetchSubjectData = async () => {
          const response = await fetch('/subjects', {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }).then((response) => {
              return response.json();
          });
          setSubjects(response);
          // setSelectedSubject(response[0].subject_name);
          setSelectedSubjectId(response[0].id);
      };
      const fetchResultData = async (id) => {
          const res = await fetch("/results/"+id+"/", {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          const data = await res.json();
          setResults(data);
      }

      useEffect(() => {
          fetchSubjectData();
      }, []);
      useEffect(() => {
          fetchResultData(selectedSubjectId);
      }, [selectedSubjectId]);

      useEffect(() => {
        const averageScore = results.reduce((sum, result) => sum + result.marks, 0) / results.length;
        const lowestScore = Math.min(...results.map(result => result.marks));
        const highestScore = Math.max(...results.map(result => result.marks));
        const range1 = lowestScore + (averageScore - lowestScore) / 2;
        const range2 = averageScore + (highestScore - averageScore) / 2;
        
        const gradeA = results.filter(result => result.marks >= lowestScore && result.marks < range1).length;
        const gradeB = results.filter(result => result.marks >= range1 && result.marks < averageScore).length;
        const gradeC = results.filter(result => result.marks >= averageScore && result.marks < range2).length;
        const gradeD = results.filter(result => result.marks >= range2 && result.marks <= highestScore).length;
      
        setData([
          { x: "A", y: gradeA },
          { x: "B", y: gradeB },
          { x: "C", y: gradeC },
          { x: "D", y: gradeD },
        ]);
      }, [results]);
      
        const handleSelectChange = (event) => {
          const newSelectedSubjectId = parseInt(event.target.value);
          const newSelectedSubject = subjects&&subjects.find((subject) => subject.id === newSelectedSubjectId);
          if (newSelectedSubject) {
            setSelectedSubjectId(newSelectedSubjectId);
            fetchResultData(newSelectedSubjectId);
            setSelectedSubject(newSelectedSubject.subject_name);
          }else{
            console.log("not present");
          }
        }

      console.log(data);

      return (
        <div className="area" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{
               background: "rgb(225, 248, 220)", 
               width: "40rem", 
               height: "25rem", 
               marginBottom: "2rem", 
               padding: "1.5rem",
               boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
               borderRadius: "10px"
             }}>
              <select value={selectedSubjectId} onChange={(event) => handleSelectChange(event)}>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
          ))}
        </select>
  
        <VictoryPie
          data={data}
          colorScale={["#00FF00", "	#FFFF00", "	#ff8c00", "#FF0000"]}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          style={{ labels: { fontSize: 16, padding: 7} }}
          />
        
           
            <p style={{textAlign:"center", marginTop:"-2rem", fontWeight: "bold"}}>No. of students according to grades</p>
            
          </div>
            <div>
            {
                (selectedSubjectId !== undefined)?
                 <TopStudents vari={selectedSubjectId}/>:""
                
              }
              </div>
          </div>
      );
  };

  export default PieChart;
