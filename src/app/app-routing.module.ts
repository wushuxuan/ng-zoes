import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TableTesterComponent } from './routes/table-tester/table-tester.component';
import { UploadTesterComponent } from './routes/upload-tester/upload-tester.component';
import { DroppableTesterComponent } from './routes/droppable-tester/droppable-tester.component';
import { CardTesterComponent } from './routes/card-tester/card-tester.component';
import { LoadingTesterComponent } from './routes/loading-tester/loading-tester.component';
import { FileCheckTesterComponent } from './routes/file-check-tester/file-check-tester.component';
import { CropperTesterComponent } from './routes/cropper-tester/cropper-tester.component';


const routes: Routes = [
  { path: '', redirectTo: 'cropper', pathMatch: 'full' },
  { path: 'table', component: TableTesterComponent },
  { path: 'drop', component: DroppableTesterComponent },
  { path: 'upload', component: UploadTesterComponent },
  { path: 'card', component: CardTesterComponent },
  { path: 'loading', component: LoadingTesterComponent },
  { path: 'file-check', component: FileCheckTesterComponent },
  { path: 'cropper', component: CropperTesterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
