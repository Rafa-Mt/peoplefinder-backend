import { loginSchema, passwordResetSchema, registerSchema, resetRequestSchema, tokenCheckSchema } from "../body_schemas/auth";
import { Router } from "express";
import { authMiddleware, changePassword, checkToken, login, register, sendToken } from "../services/auth";
import { FormatError, getErrorMessage } from "../services/errors";
import { config as dotenv } from 'dotenv'
import {z} from 'zod'
import { User } from "../models/user";
import { hash } from "bcrypt";

const router = Router();
export default router;

dotenv();

router.post('/test', (req, res) => {
    res.status(200).send(req.body)
})

router.post('/login', async (req, res) => {
    try {
        const body = loginSchema.safeParse(req.body);
        if (!body.success) 
            throw new FormatError(JSON.stringify(body.error.flatten()))
        const foundUser = await login(body.data);
        res.status(200).json({ success: "Logged in succesfully!", data: foundUser });
    } 
    catch (error) {
        console.error(error);
        res.status(401).json(getErrorMessage(error));
        return;
    }
});

router.post('/register', async (req, res) => {
    try {
        const body = registerSchema.safeParse(req.body);
        if (!body.success) 
            throw new FormatError(JSON.stringify(body.error.flatten()));
            
        await register(body.data);
        res.status(200).json({success: "User created successfully!"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json(getErrorMessage(error));
        return;
    }
});

router.post('/send-reset-token', async (req, res) => {
    try {
        const body = resetRequestSchema.safeParse(req.body);

        if (!body.success) 
            throw new FormatError(JSON.stringify(body.error.flatten()))
        
        await sendToken(body.data.email);
        res.status(200).json({success: "Token sent to user email"})
    } 
    catch (error) {
        console.error(error);
        res.status(500).json(getErrorMessage(error));
        return;
    }

})

router.put('/reset-password', async (req, res) => {
    try {
        // console.log(req.body)
        const body = passwordResetSchema.safeParse(req.body);

        if (!body.success) 
            throw new FormatError(JSON.stringify(body.error.flatten()))

        const success = await changePassword(body.data);
        if (!success) throw new Error('Failed to change password');

        res.status(200).json({success: "Password changed successfully"})
    }
    catch (error) {
        console.error(error);
        res.status(500).json(getErrorMessage(error));
        return
    }
})

router.post('/check-reset-token', async (req, res) => {
    try {
        // console.log(req.body)
        const body = tokenCheckSchema.safeParse(req.body);

        if (!body.success) 
            throw new FormatError(JSON.stringify(body.error.flatten()))

        const success = await checkToken(body.data.token);

        if (!success) throw new Error('Invalid Token');

        res.status(200).json({success: "Valid Token"})
    }
    catch (error) {
        console.error(`${(error as Error).name}: ${(error as Error).message} `);
        res.status(500).json(getErrorMessage(error));
        return
    }
});

// Terrorist move, we know it.
router.put("/instant-password-change", authMiddleware, async (req, res) => {
    try {
        const schema = z.object({ 
            email: z.string().email(),
            newPassword: z.string().min(8) 
        })
        const body = schema.safeParse(req.body);

        if (!body.success)
            throw new Error("Invalid data");

        const { email, newPassword } = body.data;

        const userToChange = await User.findOne({ $and: [{ email }, {deleted: false}]});
        if (!userToChange) throw new Error('User not found'); 

        const hashedPassword = await hash(newPassword, 8);
        userToChange.password = hashedPassword;
        await userToChange.save();
        res.status(200).json({sucess: "Password changed succesfully"})
    }
    catch( error ) {
        res.status(500).json({error: "Failed to change password"})
    }
})