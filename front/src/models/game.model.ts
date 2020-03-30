import { Quiz } from './quiz.model';
import { Question, Answer } from './question.model';

export interface Game{

    currentStep:number;
    stepsGame:StepGame[];
    isFinished:boolean;
    name:string;
    right:number;
}

export interface StepGame{

    userAnswer:Answer;
    question:Question;
    done:boolean;
}