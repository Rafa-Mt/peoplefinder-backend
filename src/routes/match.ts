import { Router } from "express";
import { RouteParams } from "../types/api";
import { getPeople, sendLike } from "../controllers/match";
import { buildRouter } from "../services/router";
import { chatSchema } from "../body_schemas/messages";

const router = Router()
export default router;

const routes: RouteParams[] = [
    {
        path: "/get/:page",
        method: "GET",
        successMessage: "Found users!",
        callback: getPeople,
        returnData: true
    },
    {
        path: "/like",
        method: "POST",
        bodySchema: chatSchema,
        callback: sendLike,
        successMessage: "Like sent successfully!"
    }
]

buildRouter(router, routes)