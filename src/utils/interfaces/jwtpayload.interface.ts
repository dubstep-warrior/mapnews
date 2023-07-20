import { JwtPayload as JwtPL } from "jsonwebtoken";

export interface JwtPayload extends JwtPL{
    _id: string,
    email: string
  } 