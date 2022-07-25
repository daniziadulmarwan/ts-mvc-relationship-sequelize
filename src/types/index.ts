import "express-session";

class User {
  id?: number;
  name?: string;
  role?: string;
}

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

export default User;
