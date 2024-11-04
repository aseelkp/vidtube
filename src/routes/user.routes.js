import { Router } from "express";
import {
  changePassword,
  deleteUser,
  fetchUsers,
  getchannelProfile,
  getCurrentUser,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Unsecured routes

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("refresh-token").post(refreshAccessToken);
// Secured routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/channel/:username").get(verifyJWT, getchannelProfile);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single("cover"), updateCoverImage);
router.route("/history").get(verifyJWT , getWatchHistory);

router.route("/all-users").get(verifyJWT,fetchUsers);
router.route("/delete-user").delete(verifyJWT,deleteUser);



export default router;
