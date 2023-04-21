import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictorySharedEvents, VictoryTooltip, VictoryZoomContainer } from "victory";

const SubjectChart = () => {
    var token = localStorage.getItem('token');
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState([]);

    function countQuestionsBySubject(questions) {
        if (!Array.isArray(questions)) {
            return [];
        }
        const countBySubject = questions.reduce((count, question) => {
            const subject = question.subject_name;
            if (count[subject]) {
                count[subject]++;
            } else {
                count[subject] = 1;
            }
            return count;
        }, {});
        const data = Object.keys(countBySubject).map((subject) => {
            return { x: subject, y: countBySubject[subject] };
        });
        return data;
    }
    const fetchQuestionData = async () => {
        const res = await fetch("/questions", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        setQuestions(data)
    }
    useEffect(() => {
        fetchQuestionData()
    }, [])
    useEffect(() => {
        const newCounts = countQuestionsBySubject(questions);
        setData(newCounts);
    }, [questions]);

    console.log(data)

    return (
                <div style={{ 
                    background: "rgb(255,255,200)", width: "40rem", 
                    height: "25rem", 
                    marginBottom: "2rem", 
                    padding: "1.5rem",
                    boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
                    borderRadius: "10px"
                    }}>
                        <VictoryChart name="bar"
                            width={900} height={400}
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 60 }}
                            animate={{ duration: 500, easing: "bounce" }}
                            containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 5], y: [0, 5]}}/>}
                        >
                            <VictoryAxis
                                tickFormat={data.map(item => item.x)}
                                label="Quiz Title"

                                style={{
                                    tickLabels: { fontSize: 16, padding: 3 },
                                    axisLabel: { fontSize: 20, padding: 30 },

                                }}
                            />
                            <VictoryAxis dependentAxis
                                label="No. of Questions"
                                tickCount={5}
                                tickValues={data.map(item => item.y)}

                                style={{
                                    tickLabels: { fontSize: 16, padding: 3 },
                                    axisLabel: { fontSize: 20, padding: 30 },
                                }}
                                tickFormat={(t) => parseInt(t)}
                            />
                            <VictoryBar
                                data={data}
                                x="x"
                                y="y"
                                style={{ data: { fill: "#c43a31" } }}
                                animate={{ duration: 500, easing: "bounce" }}
                                labelComponent={<VictoryTooltip />}
                                labels={({ datum }) => `Subject: ${datum.x}, Count: ${datum.y}`}
                            />
                        </VictoryChart>
                        <p style={{textAlign:"center", marginTop:"-2rem", fontWeight: "bold"}}>No of Questions in Each subject</p>
                </div >
    );
};

export default SubjectChart;
