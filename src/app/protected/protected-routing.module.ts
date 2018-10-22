import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'professor', loadChildren: './professor/professor.module#ProfessorPageModule' },
  { path: 'configuracao', loadChildren: './configuracao/configuracao.module#ConfiguracaoPageModule' },
  { path: 'sair', loadChildren: './sair/sair.module#SairPageModule' },
  { path: 'professor-detail', loadChildren: './professor-detail/professor-detail.module#ProfessorDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
