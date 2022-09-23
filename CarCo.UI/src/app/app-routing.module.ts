import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthSigninCoverComponent } from './auth-signin-cover/auth-signin-cover.component'
import { CustomerDetailsComponent } from './pages/customers/customer-details/customer-details.component'
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FormsWizardComponent } from './forms-wizard/forms-wizard.component'
import { AppLayoutComponent } from './layout/app-layout/app-layout.component'
import { AuthAdminGuard } from './shared/guards/auth-admin.guard'
import { AuthGuard } from './shared/guards/auth.guard'
import { NewVehicleComponent } from './pages/vehicle/new-vehicle/new-vehicle.component'
import { VehicleDetailsComponent } from './pages/vehicle/vehicle-details/vehicle-details.component'
import { VehicleListComponent } from './pages/vehicle/vehicle-list/vehicle-list.component'
import { DriversListComponent } from './pages/drivers/drivers-list/drivers-list.component'
import { DriverDetailsComponent } from './pages/drivers/driver-details/driver-details.component'
import { BookingListComponent } from './pages/trips/booking-list/booking-list.component'
import { BookingDetailsComponent } from './pages/trips/booking-details/booking-details.component'
import { ReviewComponent } from './pages/review/review/review.component'
import { EmergencyListComponent } from './pages/emergency/emergency-list/emergency-list.component'
import { EmergencyDetailsComponent } from './pages/emergency/emergency-details/emergency-details.component'
import { OffersListComponent } from './pages/offers/offers-list/offers-list.component'
import { OfferDetailsComponent } from './pages/offers/offer-details/offer-details.component'

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, //,canActivate:[AuthAdminGuard]
      },
      {
        path: 'wizard',
        component: FormsWizardComponent, //,canActivate:[AuthGuard]
      },
      {
        path: 'vehicles',
        component: VehicleListComponent,
      },
      {
        path: 'vehicles/:id',
        component: VehicleDetailsComponent,
      },
      {
        path: 'newvehicles',
        component: NewVehicleComponent,
      },
      {
        path: 'customers',
        component: CustomerListComponent,
      },
      {
        path: 'customers/:id',
        component: CustomerDetailsComponent,
      },
      {
        path: 'drivers',
        component: DriversListComponent,
      },
      {
        path: 'drivers/:id',
        component: DriverDetailsComponent,
      },
      {
        path: 'trips',
        component: BookingListComponent,
      },
      {
        path: 'trips/:id',
        component: BookingDetailsComponent,
      },
      {
        path: 'reviews',
        component: ReviewComponent,
      },
      {
        path: 'emergency',
        component: EmergencyListComponent,
      },
      {
        path: 'emergency/:id',
        component: EmergencyDetailsComponent,
      },
      
      {
        path: 'offers',
        component: OffersListComponent,
      },
      {
        path: 'offers/:id',
        component: OfferDetailsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: AuthSigninCoverComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
