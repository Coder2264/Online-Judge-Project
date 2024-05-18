import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskPage(){

    /*let task={
        name: "Array reversal",
        statement: "Write a function that takes an array of integers as input and returns the array reversed.",
        constraints: [
            "1 <= n <=1000",
            "-1000 <= a[i] <= 1000"
        ],
        format: ["Input","n","a[1] a[2] a[3] a[4] .....","Output","b[1] b[2] b[3] ....."]        
        ,
        testcases: [
            {
                input: "1 2 3 4 5 ",
                output: "5 4 3 2 1 "
            },
            {
                input: "-1, -2, -3, -4, -5 ",
                output: "-5, -4, -3, -2, -1 "
            }
        ],
        tag: ["Array", "Reversal"]
    }*/

    let task=localStorage.getItem("problem");
    task=JSON.parse(task);
    

    return(
        <>
        <Navbar/>
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">

        <div className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-4">
            <h1 className="font-bold text-3xl mb-4">{task.name}</h1>
            <h2 className="font-bold text-2xl mb-2">Problem Statement</h2>
            <p className="mb-4">{task.statement}</p>
            <h2 className="font-bold text-2xl mb-2">Constraints</h2>
            <ul className="list-disc pl-5 mb-4">
                {task.constraints.map((constraint)=>(
                    <li className="mb-1">{constraint}</li>
                ))}
            </ul>
            <h2 className="font-bold text-2xl mb-2">Format</h2>
            <div className="mb-4">
                {task.format.map((formatElement)=>(
                    <p className="mb-2">{formatElement}</p>
                ))}
            </div>
            <h2 className="font-bold text-2xl mb-2">Test Cases</h2>
            <div>
                {task.testcases.map((testcase)=>(
                    <div className="mb-4">
                        <h2 className="font-bold text-xl mb-2">Input</h2>
                        <p className="mb-2">{testcase.input}</p>
                        <h2 className="font-bold text-xl mb-2">Output</h2>
                        <p className="mb-2">{testcase.output}</p>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
    </div>
    </>
    )
}

export default TaskPage;