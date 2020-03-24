import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/quiz-edit/quiz-edit.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
    {path:'', component: AccueilComponent},
    {path:'quiz-list', component: QuizListComponent},
    {path:'edit-quiz/:id', component: EditQuizComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}