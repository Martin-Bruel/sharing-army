import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    label: 'Jean Gabin a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};

export const QUESTION_SPORT: Question = {
    label: 'Le sport avec un volant est le...',
    answers: [
        {
            value: 'Le volley',
            isCorrect: false,
        },
        {
            value: 'Le Badbinton',
            isCorrect: true,
        },
        {
            value: 'Le Biathlon',
            isCorrect: false,
        }
    ]
}

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les OUI', // What's happening if I change this value..?
        theme: 'Acteur',
        questions: [QUESTION_ACTOR],
        id: 1
    },
    {
        name: 'Les Sports',
        theme: 'sport',
        questions: [QUESTION_SPORT],
        id: 2
    }
];
