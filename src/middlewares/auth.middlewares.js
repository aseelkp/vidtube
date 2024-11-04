import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const   verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  req.user = user;
  next();
});
