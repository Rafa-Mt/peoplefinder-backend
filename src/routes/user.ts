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
        path: "/:_id",
        returnData: false,
        successMessage: "User deleted successfully",
        callback: deleteUser
    },
    {
        method: "PUT",
        path: '/:user_id/change-email',
        returnData: false,
        successMessage: "Email changed successfully!",
        bodySchema: resetRequestSchema,
        callback: changeUserEmail
    },
    {
        method: "GET",
        path: "/:_id",
        returnData: true,
        successMessage: "User found!",
        callback: getUserData
    },
    {
        method: "POST",
        path: "/:user_id/profile-pic",
        returnData: false,
        successMessage: "Profile picture changed successfully!",
        bodySchema: profilePicChangeSchema,
        callback: setProfilePic
    }
];

buildRouter(router, routes);
export default router;
