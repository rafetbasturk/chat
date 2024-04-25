export interface ServerToClientEvents {
  getOnlineUsers: (data: string[]) => void;
  newServerMessage: () => void;
  displayTyping: (data: string) => void;
  userConnected: (name: string) => void;
  notification: (count: number) => void;
}

export interface ClientToServerEvents {
  newClientMessage: () => void;
  typing: ({ id, value }: { id: string; value: string }) => void;
}

export interface ErrorResponse {
  statusCode: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  confirm: string;
}

interface IAuthenticated {
  isAuthenticated: boolean;
  currentUser: IUser | null;
}

export interface AuthState extends IAuthenticated {
  login: (user: ILogin) => Promise<void>;
  register: (user: IRegister) => Promise<void>;
  getCurrentUser: () => Promise<IAuthenticated>;
  logout: () => Promise<void>;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role?: string;
  avatar?: string;
  lastname: string;
  bio: string;
  active?: boolean;
  friends?: Types.ObjectId[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}

export interface UserResponse {
  user: IUser;
}

interface IMessage {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
