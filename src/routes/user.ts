import express from 'express'
import { resetRequestSchema } from "../body_schemas/auth";
import { buildRouter } from "../services/router";
import { RouteParams } from "../types/api";
import { changeUserEmail, deleteUser, getUserData, setProfilePic } from "../controllers/user";
import { profilePicChangeSchema } from '../body_schemas/user';

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
        method: "POST",
        path: "/profile-pic",
        returnData: false,
        successMessage: "Profile picture changed successfully!",
        bodySchema: profilePicChangeSchema,
        callback: setProfilePic
    }
];

buildRouter(router, routes);
export default router;
