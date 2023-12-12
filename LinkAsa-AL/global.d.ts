interface UserModel {
  uid: string;
  username: string
  email: string;
  role: UserRole;
  status: UserStatus
}
interface FirebaseAdminParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

type SnackbarProps = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  role: UserRole
  timestamp: Date;
}