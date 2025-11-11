// src/frameworks/http/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../services/JWTService";
import { UserRole } from "../../../entities/enums";

export interface AuthRequest extends Request {
  user?: { userId: string; username: string; role: string };
}

const jwtService = new JWTService();

export const requireAuth = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header)
        return res.status(401).json({ success: false, message: "Missing Authorization header" });

      const [type, token] = header.split(" ");
      if (type !== "Bearer" || !token)
        return res.status(401).json({ success: false, message: "Invalid Authorization header" });

      const payload = jwtService.verifyToken<{ userId: string; username: string; role: string }>(token);
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
};

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!roles.includes(user.role as UserRole))
      return res.status(403).json({ success: false, message: "Forbidden: Insufficient role" });

    next();
  };
};
