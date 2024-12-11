import { Router } from "express";
import { getCountries } from "../controllers/misc";
import { buildRouter } from "../services/router";
import { RouteParams } from "../types/api";

const router = Router()

const routes: RouteParams[] = [
    {
        path: "/countries",
        method: "GET",
        successMessage: "Found Countries!",
        returnData: true,
        callback: getCountries
    }
] 

buildRouter(router, routes);
export default router;