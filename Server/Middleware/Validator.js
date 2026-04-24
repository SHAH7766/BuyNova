import express from 'express'
import jwt from 'jsonwebtoken'
export const VerifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ Message: "Access Denied: No Token Provided", success: false });
        }

        // Verify the token
        // Ensure process.env.SECRET_KEY is exactly the same as the one used to SIGN the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Attach user info to the request object for use in other routes
        req.user = decoded; 
        
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message); // This will tell you if it's "expired" or "invalid signature"
        return res.status(401).json({ Message: "Invalid or Expired Token", success: false });
    }
}