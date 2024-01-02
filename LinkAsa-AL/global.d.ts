
//======FIREBASE
interface FirebaseAdminParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}
//======MODELS
type Airport = {
  id: string;
  code:string;
  name: string;
  location: string;
};

type Plane = {
  id: string;
  code: string;
  model: PlaneModel;
  capacity: number;
  status: PlaneStatus;
};

type Flight = {
  id:string,
  flightId:string,
  planeId:string,
  departureId:string,
  arrivalId:string,
  timestamp: Date,
  price: number,
  status: FlightStatus,
}


//todo
//todo
type Passport = {
  id:string,
  code:string,
  name:string,
  dob:Date,
  country:string
}

type FlightDetail = {
  id:string
  flightId:string
  passengers:Passenger[]
}
//todo
type BoardingPass = {
  id:string,
  code:string,
  flightId:string, // from Flight
  departureId:string, //from Flight -> departureId
  arrivalId:string, //from Flight -> arrivalId
  seat:string,
  gate:string,
  timestamp:Date,
}
//todo
type Luggage = {
  id:string,
  weight:number,
  dimensions:string,
  contents:string,
  photo:string,
  status: LuggageStatus
}
//todo
type Passenger = {
  id:string
  passport: Passport,//ref to Passport
  boardingPass: BoardingPass,//ref to BoardingPass
  luggage:Luggage,//ref to Luggage
}

type UserModel =  {
  id: string;
  username: string
  email: string;
  role: UserRole;
  status: UserStatus
}

type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  role: UserRole
  timestamp: Date;
}

type LostItem = {
  id:string,
  name: string,
  description: string,
  locationFound: string,
  timestamp: Date;
  status: LostItemStatus,
  photo: string
}

type JobVacancies = {
  id:string,
  name:string;
  description:string;
  quota:number; // in app just maxQuota - quota to get left over pos
  maxQuota:number;
  role:UserRole;
  requirements: string[];
  status: JobVacanciesStatus;
}

type Training = {
  id:string
  name: string,
  description: string,
  timestamp: Date,
  traineeIds: string[],
  status: TrainingStatus
}

type IncidentLog = {
  id:string,
  name:string,
  description:string,
  location:string,
  timestamp:date,
  status:IncidentStatus
}

type Maintenance = {
  id:string,
  name:string,
  description:string,
  status:MaintenanceStatus,
  equipment: string,
  timestamp: Date,
  employeeIds: string[]//to reference to UserModel ->id
}

// type SecurityDispatch ={
//   id:string,
//   dispatchId: string | null, // this is incidentId, or if null is only patrol
//   securityIds: string[],  //this will be id of userModel with security role only
//   status: DispatchStatus //patrol | incident
//   timestamp: Date,
//   location: string
// }

//======UTILS

//---SNACKBAR START
type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

type customResult = {
  success:boolean,
  error?: string
}
//---SNACKBAR END

type DataModel = Record<string, any>;

type Column = {
  id: string;
  label: string;
  align?: "right" | "left" | "center";
  width?: string;
  minWidth?: string;
};


//======STATUS
type GlobalStatus =
 UserStatus |
 LostItemStatus | 
 TrainingStatus | 
 FlightStatus | 
 PlaneStatus
