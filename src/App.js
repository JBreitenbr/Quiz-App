import { useEffect, useState } from "react";
import "./index.css";
import {shuffle} from "./shuffle.js";


/* ********************************
 * Helper function to get questions from The Trivia API
 * @returns an array of questions
 ******************************** */
const getQuestions = async () => {
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?limit=10&difficulty=hard"
  );

  const questions = await response.json();

  return questions;
};

function App() {
  let [questions, setQuestions] = useState([]);
  let [current, setCurrent] = useState(0);
  let [score,setScore]=useState(0);
  let [showResult, setShowResult]=useState(false);

  useEffect(() => {
    getQuestions().then((res) => {setQuestions(res); });
  }, []);


let qArr=[];
for(let i=0; i<10; i++){

qArr.push({});
if(questions[i]!=undefined){
  qArr[i].question=questions[i].question;

let hlp=[];
hlp.push(questions[i]["incorrectAnswers"][0]);
hlp.push(questions[i]["incorrectAnswers"][1]);
hlp.push(questions[i]["incorrectAnswers"][2]);

  hlp.push(questions[i]["correctAnswer"]);

  let shuffled=shuffle(hlp);

  qArr[i]["choices"]=shuffled;
  qArr[i]["optA"]=shuffled[0];
  qArr[i]["optB"]=shuffled[1];
  qArr[i]["optC"]=shuffled[2];
  qArr[i]["optD"]=shuffled[3];
  let ans=(qArr[i]["optA"]==questions[i]["correctAnswer"])?"optA":(qArr[i]["optB"]==questions[i]["correctAnswer"])?"optB":(qArr[i]["optC"]==questions[i]["correctAnswer"])?"optC":"optD";
  qArr[i]["answer"]=ans;
    }
}
const quiz = {
} 
quiz.perguntas=qArr
const { perguntas } = quiz
 const { question,optA,optB,optC,optD,answer } = perguntas[current]
let a=document.getElementById('a');
let b=document.getElementById('b');
let c=document.getElementById('c');
let d=document.getElementById('d');

function refreshPage() {
    window.location.reload(false);
  }
const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
 const handleClick1 = () => {
    if(answer=="optA"){
    a.className="answer-right";
    }
    else{a.className="answer-red";
        if(answer=="optB"){
          b.className="answer-green"
        }        if(answer=="optC"){
          c.className="answer-green"
    }        if(answer=="optD"){
          d.className="answer-green"
        }
      }
  }

  const handleClick2 = () => {
    if(answer=="optB"){
    b.className="answer-right";
    }
    else{b.className="answer-red";
        if(answer=="optA"){
          a.className="answer-green"
        }        if(answer=="optC"){
          c.className="answer-green"
    }        if(answer=="optD"){
          d.className="answer-green"
        }
      }
  }

  const handleClick3 = () => {
    if(answer=="optC"){
    c.className="answer-right";
    }
    else{c.className="answer-red";
        if(answer=="optB"){
          b.className="answer-green"
        }        if(answer=="optA"){
          a.className="answer-green"
    }        if(answer=="optD"){
          d.className="answer-green"
        }
      }
  }
  const handleClick4 = () => {
    if(answer=="optD"){
    d.className="answer-right";
    }
    else{d.className="answer-red";
        if(answer=="optB"){
          b.className="answer-green"
        }        if(answer=="optC"){
          c.className="answer-green"
    }        if(answer=="optA"){
          a.className="answer-green"
        }
      }
  }
  const onClickNext = () => {
    if(current !== perguntas.length - 1) {
      setCurrent((prev) => prev + 1)
    } else {
      setCurrent(0)
      setShowResult(true)
    }
    
    if(a.className=="answer-right"){
      setScore(score+1)
    }
    if(b.className=="answer-right"){
      setScore(score+1)
    }
    if(c.className=="answer-right"){
      setScore(score+1)
    }
    if(d.className=="answer-right"){
      setScore(score+1)
    }
    a.className=null
    b.className=null
    c.className=null
    d.className=null
}

  
  return (

    <div className="quiz-container">
      {!showResult?(
  <main>
    <div>
        <span className="question-no">{addLeadingZero(current + 1)}</span>
        <span className="question-no">/{addLeadingZero(questions.length)}</span>
      </div>
  <h2>{question}</h2>
  
  <ul>
  
  <li id="a" onClick={()=>handleClick1()}>{optA}</li>
  <li id="b" onClick={()=>handleClick2()}>{optB}</li>
  <li id="c" onClick={()=>handleClick3()}>{optC}</li>
  <li id="d" onClick={()=>handleClick4()}>{optD}</li>
   </ul>
                <div className="flex-right">
            <button
              onClick={onClickNext}
            >
              {current === perguntas.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
            
    </main>):(
  <section>
  <div>Your Score: {score}/10</div>
    <div>
    <button onClick={refreshPage}>Start another quiz</button></div>
  </section>)}
    </div>
  );
}

export default App;
