import { __decorate } from "tslib";
import { NgModule, } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NzIconModule, NzCardModule, NzTabsModule, NzButtonModule, NzDividerModule, NzTableModule, NzSpinModule, NzCheckboxModule, NzRadioModule, NzProgressModule, NzModalService, NzEmptyModule } from 'ng-zorro-antd';
import { DroppableComponent } from './lib/components/droppable/droppable.component';
import { CardComponent } from './lib/components/card/card.component';
import { TableColumnsButtonsComponent } from './lib/components/table/table-columns-buttons/table-columns-buttons.component';
import { TableComponent } from './lib/components/table/table.component';
import { UploadBtnComponent } from './lib/components/upload/upload-btn.component';
import { UploadListComponent } from './lib/components/upload/upload-list.component';
import { UploadComponent } from './lib/components/upload/upload.component';
import { LoadingComponent } from './lib/components/loading/loading.component';
import { FileCheckComponent } from './lib/components/file-check/file-check.component';
const thirdComponents = [
    DroppableComponent,
    CardComponent,
    TableColumnsButtonsComponent,
    TableComponent,
    UploadBtnComponent,
    UploadListComponent,
    UploadComponent,
    LoadingComponent,
    FileCheckComponent
];
const thirdModule = [
    NzCardModule,
    NzIconModule,
    NzTabsModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzSpinModule,
    NzCheckboxModule,
    NzRadioModule,
    NzProgressModule,
    NzEmptyModule
];
import { RenderPipe } from './lib/pipe/table/render.pipe';
import { TablePipe } from './lib/pipe/table/table.pipe';
var pipe_lists = [
    RenderPipe,
    TablePipe,
];
import { OverlayModule } from '@angular/cdk/overlay';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
/** 配置 ng-zorro-antd 国际化 **/
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { LocaleModule } from './lib/theme/locale.module';
//拖拽
import { SortablejsModule } from 'ngx-sortablejs';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
const icons = [AccountBookFill, AlertOutline, AlertFill];
let NgZoesModule = class NgZoesModule {
};
NgZoesModule = __decorate([
    NgModule({
        declarations: [...thirdComponents, ...pipe_lists,],
        imports: [
            CommonModule,
            NzI18nModule,
            LocaleModule,
            HttpClientModule,
            OverlayModule,
            BrowserAnimationsModule,
            FormsModule,
            NzIconModule.forRoot(icons),
            SortablejsModule.forRoot({ animation: 150 }),
            ...thirdModule,
        ],
        providers: [NzModalService],
        entryComponents: [LoadingComponent, FileCheckComponent],
        exports: [...thirdComponents]
    })
], NgZoesModule);
export { NgZoesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctem9lcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9wcm9qZWN0cy9uZy16b2VzL25nLXpvZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRXhOLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUE7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUE7QUFDbkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFBO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBR3RGLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0NBQ25CLENBQUE7QUFFRCxNQUFNLFdBQVcsR0FBRztJQUNsQixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGFBQWE7SUFDYixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsYUFBYTtDQUNkLENBQUE7QUFFRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhELElBQUksVUFBVSxHQUFHO0lBQ2YsVUFBVTtJQUNWLFNBQVM7Q0FDVixDQUFBO0FBR0QsT0FBTyxFQUFFLGFBQWEsRUFBZ0QsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRyxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1QyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsNEJBQTRCO0FBQzVCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQsSUFBSTtBQUNKLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBS2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTNGLE1BQU0sS0FBSyxHQUFxQixDQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFFLENBQUM7QUFxQjdFLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBSSxDQUFBO0FBQWhCLFlBQVk7SUFsQnhCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLEdBQUcsVUFBVSxFQUFFO1FBQ2xELE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsdUJBQXVCO1lBQ3ZCLFdBQVc7WUFDWCxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMzQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDNUMsR0FBRyxXQUFXO1NBQ2Y7UUFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDM0IsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLEVBQUMsa0JBQWtCLENBQUM7UUFDdEQsT0FBTyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7S0FDOUIsQ0FBQztHQUNXLFlBQVksQ0FBSTtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUsIE56Q2FyZE1vZHVsZSwgTnpUYWJzTW9kdWxlLCBOekJ1dHRvbk1vZHVsZSwgTnpEaXZpZGVyTW9kdWxlLCBOelRhYmxlTW9kdWxlLCBOelNwaW5Nb2R1bGUsIE56Q2hlY2tib3hNb2R1bGUsIE56UmFkaW9Nb2R1bGUsIE56UHJvZ3Jlc3NNb2R1bGUsIE56TW9kYWxTZXJ2aWNlLCBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZCdcblxuaW1wb3J0IHsgRHJvcHBhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy9kcm9wcGFibGUvZHJvcHBhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlQ29sdW1uc0J1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuL2xpYi9jb21wb25lbnRzL3RhYmxlL3RhYmxlLWNvbHVtbnMtYnV0dG9ucy90YWJsZS1jb2x1bW5zLWJ1dHRvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXBsb2FkQnRuQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLWJ0bi5jb21wb25lbnQnXG5pbXBvcnQgeyBVcGxvYWRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLWxpc3QuY29tcG9uZW50J1xuaW1wb3J0IHsgVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbXBvbmVudCdcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL2xpYi9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQnXG5pbXBvcnQgeyBGaWxlQ2hlY2tDb21wb25lbnQgfSBmcm9tICcuL2xpYi9jb21wb25lbnRzL2ZpbGUtY2hlY2svZmlsZS1jaGVjay5jb21wb25lbnQnO1xuXG5cbmNvbnN0IHRoaXJkQ29tcG9uZW50cyA9IFtcbiAgRHJvcHBhYmxlQ29tcG9uZW50LFxuICBDYXJkQ29tcG9uZW50LFxuICBUYWJsZUNvbHVtbnNCdXR0b25zQ29tcG9uZW50LFxuICBUYWJsZUNvbXBvbmVudCxcbiAgVXBsb2FkQnRuQ29tcG9uZW50LFxuICBVcGxvYWRMaXN0Q29tcG9uZW50LFxuICBVcGxvYWRDb21wb25lbnQsXG4gIExvYWRpbmdDb21wb25lbnQsXG4gIEZpbGVDaGVja0NvbXBvbmVudFxuXVxuXG5jb25zdCB0aGlyZE1vZHVsZSA9IFtcbiAgTnpDYXJkTW9kdWxlLFxuICBOekljb25Nb2R1bGUsXG4gIE56VGFic01vZHVsZSxcbiAgTnpCdXR0b25Nb2R1bGUsXG4gIE56RGl2aWRlck1vZHVsZSxcbiAgTnpUYWJsZU1vZHVsZSxcbiAgTnpTcGluTW9kdWxlLFxuICBOekNoZWNrYm94TW9kdWxlLFxuICBOelJhZGlvTW9kdWxlLFxuICBOelByb2dyZXNzTW9kdWxlLFxuICBOekVtcHR5TW9kdWxlXG5dXG5cbmltcG9ydCB7IFJlbmRlclBpcGUgfSBmcm9tICcuL2xpYi9waXBlL3RhYmxlL3JlbmRlci5waXBlJztcbmltcG9ydCB7IFRhYmxlUGlwZSB9IGZyb20gJy4vbGliL3BpcGUvdGFibGUvdGFibGUucGlwZSc7XG5cbnZhciBwaXBlX2xpc3RzID0gW1xuICBSZW5kZXJQaXBlLFxuICBUYWJsZVBpcGUsXG5dXG5cblxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSwgT3ZlcmxheUNvbnRhaW5lciwgRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgZW4gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvZW4nO1xucmVnaXN0ZXJMb2NhbGVEYXRhKGVuKTtcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqIOmFjee9riBuZy16b3Jyby1hbnRkIOWbvemZheWMliAqKi9cbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5cbmltcG9ydCB7IExvY2FsZU1vZHVsZSB9IGZyb20gJy4vbGliL3RoZW1lL2xvY2FsZS5tb2R1bGUnO1xuXG4vL+aLluaLvVxuaW1wb3J0IHsgU29ydGFibGVqc01vZHVsZSB9IGZyb20gJ25neC1zb3J0YWJsZWpzJ1xuXG4vL2ljb27lm77moIdcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5cbmltcG9ydCB7IEFjY291bnRCb29rRmlsbCwgQWxlcnRGaWxsLCBBbGVydE91dGxpbmUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyL2ljb25zJztcblxuY29uc3QgaWNvbnM6IEljb25EZWZpbml0aW9uW10gPSBbIEFjY291bnRCb29rRmlsbCwgQWxlcnRPdXRsaW5lLCBBbGVydEZpbGwgXTtcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsuLi50aGlyZENvbXBvbmVudHMsIC4uLnBpcGVfbGlzdHMsXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgTG9jYWxlTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOekljb25Nb2R1bGUuZm9yUm9vdChpY29ucyksXG4gICAgU29ydGFibGVqc01vZHVsZS5mb3JSb290KHsgYW5pbWF0aW9uOiAxNTAgfSksXG4gICAgLi4udGhpcmRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW056TW9kYWxTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTG9hZGluZ0NvbXBvbmVudCxGaWxlQ2hlY2tDb21wb25lbnRdLFxuICBleHBvcnRzOiBbLi4udGhpcmRDb21wb25lbnRzXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1pvZXNNb2R1bGUgeyB9XG4iXX0=