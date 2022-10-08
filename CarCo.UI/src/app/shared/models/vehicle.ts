export class vehicle {
    C_Id: number;
    Registration_Number: string;
    Model_Name: string;
    Brand: string;
    Color: string;
    No_of_Pas: number
    Fueltype: string;

    VehicleTypeID?: number;
    Image?: string | null;
    Insurance_Image?: string | null;
    RC_Book_Image?: string | null;
    DriverID: number;
    Insurance_Expiry?: string;
    RC_Book_ValidityDate?: string;
    Pollution_Certificate?: string | null;
    Pollution_Expiry?: string;
    Permit_Image?: string | null;
    Tax_Image?: string | null;
    Tax_Expiry?: string;
    constructor() {
        this.Color = "Black",
            this.Fueltype = "Petrol"
    }
}