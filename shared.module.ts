import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { IqLoadingSpinnerComponent, IqLoadingHttpInterceptor, IqLoadingService } from './iq-loading-spinner/';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoutingModule } from './routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DynamicService } from "./dynamic/dynamic.service";
import { IqModalComponent } from './iq-modal/iq-modal.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FluentFormActionComponent, ModalFormComponent, FluentFormService, FluentFormComponentControlDirective, FluentFormControlComponent } from './fluent-form/';

import { IqSelectPickerComponent } from './iq-select-picker/iq-select-picker.component';
import { FluentTableComponent } from './fluent-table/fluent-table.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DynamicComponent } from './dynamic/dynamic.component';

import { FileUploadModule } from 'ng2-file-upload';
import { IqUploaderComponent } from './iq-uploader/iq-uploader.component';
import { IqMenuComponent } from './iq-menu/iq-menu.component';
import { IqMenuTemplateDirective } from './iq-menu/iq-menu-template.directive';
import { ApplicationService } from "./application/application.service";
import { HelpersService } from "./helpers/helpers.service";
import { GlobalErrorHandler } from "./global-error-handler/global-error-handler";

//LOCALIZATION
export function httpLoaderFactory(http: HttpClient) {
    if (location.port) {
        //angular cli
        return new TranslateHttpLoader(http, '/bundles/assets/locales/', '.json');
    } else {
        //iis
        return new TranslateHttpLoader(http, '../../bundles/assets/locales/', '.json');
    }
}

@NgModule({
    imports: [
        HttpClientModule,
        LoadingModule,
        RoutingModule,
        NgbModule.forRoot(),
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
            //loader: { provide: TranslateLoader, useClass: CustomLoader }
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FileUploadModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        IqLoadingSpinnerComponent,
        PageNotFoundComponent,
        IqModalComponent,
        ModalFormComponent,
        FormsModule,
        ReactiveFormsModule,
        FluentFormControlComponent,
        NgSelectModule,
        IqSelectPickerComponent,
        NgxDatatableModule,
        FluentTableComponent,
        TranslateModule,
        FileUploadModule,
        IqUploaderComponent,
        DynamicComponent,
        IqMenuComponent,
        IqMenuTemplateDirective
    ],
    declarations: [IqLoadingSpinnerComponent, PageNotFoundComponent, IqModalComponent, ModalFormComponent, FluentFormControlComponent, FluentFormComponentControlDirective, IqSelectPickerComponent, FluentFormActionComponent, FluentTableComponent, IqUploaderComponent, DynamicComponent, IqMenuComponent, IqMenuTemplateDirective],
    providers: [
        IqLoadingService,
        DynamicService,
        HelpersService,
        ApplicationService,
        FluentFormService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: IqLoadingHttpInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initContext,
            deps: [ ApplicationService ],
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class SharedModule { }

// Add this function
function initContext(applicationService: ApplicationService) {
    return () => applicationService.init();
}
