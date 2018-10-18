import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'professor', loadChildren: './professor/professor.module#ProfessorPageModule' },
  { path: 'configuracao', loadChildren: './configuracao/configuracao.module#ConfiguracaoPageModule' },
  { path: 'sair', loadChildren: './sair/sair.module#SairPageModule' },
  { path: 'turma', loadChildren: './turma/turma.module#TurmaPageModule' },
  { path: 'turma-detail', loadChildren: './turma-detail/turma-detail.module#TurmaDetailPageModule' },
  { path: 'turma-edit', loadChildren: './turma-edit/turma-edit.module#TurmaEditPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
