import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthSigninCoverComponent } from './auth-signin-cover/auth-signin-cover.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsWizardComponent } from './forms-wizard/forms-wizard.component';
import { AuthAdminGuard } from './shared/guards/auth-admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './auth-signin-cover/login/login.component';
import { VehicleListComponent } from './pages/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './pages/vehicle/vehicle-details/vehicle-details.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { NewVehicleComponent } from './pages/vehicle/new-vehicle/new-vehicle.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';

import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { CustomerDetailsComponent } from './pages/customers/customer-details/customer-details.component';
import { DriversListComponent } from './pages/drivers/drivers-list/drivers-list.component';
import { DriverDetailsComponent } from './pages/drivers/driver-details/driver-details.component';
import { BookingListComponent } from './pages/trips/booking-list/booking-list.component';
import { BookingDetailsComponent } from './pages/trips/booking-details/booking-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './pages/review/review/review.component';
import { EmergencyListComponent } from './pages/emergency/emergency-list/emergency-list.component';
import { EmergencyDetailsComponent } from './pages/emergency/emergency-details/emergency-details.component'
import { ConfirmationService, MessageService } from 'primeng/api';
import { OffersListComponent } from './pages/offers/offers-list/offers-list.component';
import { OfferDetailsComponent } from './pages/offers/offer-details/offer-details.component';
import { VehicleTypesComponent } from './pages/vehicle-types/VehicleTypes-List/vehicle-types.component';
import { VehicleTypeDetailsComponent } from './pages/vehicle-types/vehicle-type-details/vehicle-type-details.component';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthSigninCoverComponent,
    DashboardComponent,
    FormsWizardComponent,
    LoginComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    AppLayoutComponent,
    NewVehicleComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    DriversListComponent,
    DriverDetailsComponent,
    BookingListComponent,
    BookingDetailsComponent,
    ReviewComponent,
    EmergencyListComponent,
    EmergencyDetailsComponent,
    OffersListComponent,
    OfferDetailsComponent,
    VehicleTypesComponent,
    VehicleTypeDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TableModule,
    SidebarModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    TooltipModule,
    DropdownModule
  ],
  providers: [AuthGuard, AuthAdminGuard, MessageService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

