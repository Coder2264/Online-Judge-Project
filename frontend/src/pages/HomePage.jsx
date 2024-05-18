import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemCard from '../components/ProblemCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage(){

    let problemArray = [
    {
        name: "Array reversal",
        statement: "Write a function that takes an array of integers as input and returns the array reversed.",
        constraints: [
            "1 <= n <=1000",
            "-1000 <= a[i] <= 1000"
        ],
        format: ["Input","n","a[1] a[2] a[3] a[4] .....","Output","b[1] b[2] b[3] ....."],
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
    },
    {
        name: "Takahashi and 7",
        statement: "Write a function that takes an array of integers as input and count of 7 in it.",
        constraints: [
            "1 <= n <=1000",
            "-1000 <= a[i] <= 1000"
        ],
        format: ["Input","n","a[1] a[2] a[3] a[4] .....","Output","count of 7"],
        testcases: [
            {
                input: "1 -2 7 14 5 7 9 1 -2 7",
                output: "3"
            },
            {
                input: "-1, -2, -3, -4, -5 ",
                output: "0 "
            }
        ],
        tag: ["Math","Hashing"]
    },
    {
        name: "Chef and subarrays",
        statement: "Write a function that takes an array of integers as input and returns number of subarrays with sum 6.",
        constraints: [
            "1 <= n <=1000",
            "-1000 <= a[i] <= 1000"
        ],
        format: ["Input","n","a[1] a[2] a[3] a[4] .....","Output","b[1] b[2] b[3] ....."],
        testcases: [
            {
                input: "1 2 3 4 5 ",
                output: "1"
            },
            {
                input: "-1, -2, -3, -4, -5 ",
                output: "0"
            }
        ],
        tag: ["DP"]
    }
];
    return (
        <div>
            <Navbar/>
            <h1>Problems</h1>
            <div className="flex flex-wrap">
                {problemArray.map((task)=>(
                    <ProblemCard problem={task}/>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;