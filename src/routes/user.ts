import express from 'express'
import { resetRequestSchema } from "../body_schemas/auth";
import { buildRouter } from "../services/router";
import { RouteParams } from "../types/api";
import { changeUserEmail, deleteUser, getUserData, setProfilePic, updateProfileData } from "../controllers/user";
import { profileInfoChangeSchema, profilePicChangeSchema } from '../body_schemas/user';

const router = express.Router();

const routes: RouteParams[] = [
    {
        method: "DELETE",
        path: "/",
        returnData: false,
        successMessage: "User deleted successfully",
        callback: deleteUser
    },
    {
        method: "PUT",
        path: '/change-email',
        returnData: false,
        successMessage: "Email changed successfully!",
        bodySchema: resetRequestSchema,
        callback: changeUserEmail
    },
    {
        method: "GET",
        path: "/",
        returnData: true,
        successMessage: "User found!",
        callback: getUserData
    },
    {
        method: "PUT",
        path: "/profile-pic",
        returnData: false,
        successMessage: "Profile picture changed successfully!",
        bodySchema: profilePicChangeSchema,
        callback: setProfilePic
    },
    {
        method: "PUT",
        path: "/info",
        returnData: false,
        successMessage: "Profile info changed successfully!",
        bodySchema: profileInfoChangeSchema,
        callback: updateProfileData
    }
];

buildRouter(router, routes);
export default router;
