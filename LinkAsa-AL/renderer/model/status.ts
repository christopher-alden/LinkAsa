export enum TrainingStatus {
  pending = "Pending",
  completed = "Completed",
}
export enum LostItemStatus {
  unclaimed = "Unclaimed",
  claimed = "Claimed",
  untrackable = "Untrackable",
}
export enum JobVacanciesStatus {
  active = "Active",
  closed = "Closed",
}

export enum UserStatus {
  active = "Active",
  pending = "Pending",
  leave = "On Leave",
  deactivated = "Deactivated",
}

export enum PlaneStatus {
  active = "Active",
  inFlight = "In Flight"
}

export enum FlightStatus{
  inFlight = "In Flight",
  delayed = "Delayed",
  cancelled = "Cancelled",
  pending = "Pending"
}

export enum IncidentStatus{
  resolved = "Resolved",
  severe = "Severe",
  moderate = "Moderate",
  light = "Light",
  pending = "Pending",
  baggage = "Baggage"
}

export enum DispatchStatus{
  patrol = "Patrol",
  incident = "Incident"
}

export enum LuggageStatus{
  loaded= "Loaded",
  unloaded="Unloaded",
  lost= "Lost"
}
export enum MaintenanceStatus{
  pending = "Pending",
  onProgress = "On Progress",
  completed = "Completed"
}