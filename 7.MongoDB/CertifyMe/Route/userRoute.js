import { Router } from "express";
import { authenticate } from '../Middleware/auth.js';
import { certificate } from "../Model/certiSchema.js";

const userRoute = Router();

userRoute.get('/getCertificate', authenticate, async(req, res) => {
    try {
        const key = req.query.CertificateId;
        console.log("CertificateId:", key);

        const result = await certificate.findOne({ certificateId: key });
        console.log(result);
        

        if (!result) {
            return res.status(404).json({ msg: 'Certificate not found' });
        }
        console.log(req.name)
        console.log(result.candidateName);
        
        if (req.name === result.candidateName) {
            res.status(200).json({ result });
        } else {
            res.status(401).json({ msg: 'Unauthorized access' });
        }
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { userRoute };