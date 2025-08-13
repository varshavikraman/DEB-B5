import { Router } from "express";

const adminRoute = Router();
const certificate = new Map();

adminRoute.post('/issueCertificate', (req,res)=>{
    try {
        const { Course,CertificateId,CandidateName,Grade,IssueDate } = req.body;
        const result = certificate.get(CertificateId);
        if(result){
            res.status(400).json({msg:'This Certificate already exist'})
        } else{
            certificate.set(CertificateId,{ Course,CandidateName,Grade,IssueDate })
            res.status(201).json({msg:'Certificate successfully added'})
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }    
});

adminRoute.put('/updateCertificate', (req,res)=>{
    try {
        const { Course,CertificateId,CandidateName,Grade,IssueDate } = req.body;
        const result = certificate.get(CertificateId);
        if (result) {
            certificate.set(CertificateId,{ Course,CandidateName,Grade,IssueDate })
            res.status(200).json({msg:'Certificate successfully updated'})
        } else {
            res.status(404).json({msg:'This Certificate not found' })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

adminRoute.delete('/deleteCertificate', (req,res)=>{
    try {
        const { CertificateId } = req.body;
        const result = certificate.get(CertificateId);
        if (result) {
            certificate.delete(CertificateId);
            res.status(200).json({msg:'Certificate deleted Successfully'});
    } else {
        res.status(404).json({msg:'Certificate not found' });
    }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
});

export { adminRoute, certificate }