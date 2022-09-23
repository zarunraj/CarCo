export class Driver {
  ID: number
  Name: string
  Phone: string
  Email: string
  Address: string
  DrivingLicenseExpiryDate: Date
  DrivingLicenseNumber: string
  DrivingLicenseImage:string
  IsActive: boolean

  ProfileImage:string
  IsOnline:boolean
  CurrentLocation:string
  constructor(){
    this.ID =0
  }
}
