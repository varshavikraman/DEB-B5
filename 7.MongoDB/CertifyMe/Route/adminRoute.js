import { Router } from "express";
import { certificate } from "../Model/certiSchema.js";

const adminRoute = Router();

adminRoute.post('/issueCertificate', async(req,res)=>{
    try {
        const { Course,CertificateId,CandidateName,Grade,IssueDate } = req.body;
        const result = await certificate.findOne({ certificateId: CertificateId });
        if(result){
            res.status(400).json({msg:'This Certificate already exist'})
        } else{
            const newCertificate = new certificate({
            course:Course,
            certificateId:CertificateId,
            candidateName:CandidateName,
            grade:Grade,
            issueDate:IssueDate
        });

        await newCertificate.save();
            res.status(201).json({msg:'Certificate successfully added'})
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }    
});

adminRoute.put('/updateCertificate', async(req,res)=>{
    try {
        const { Course,CertificateId,CandidateName,Grade,IssueDate } = req.body;
        const result = await certificate.findOne({ certificateId: CertificateId });
        if (result) {
            result.course = Course,
            result.certificateId = CertificateId,
            result.candidateName = CandidateName,
            result.grade = Grade,
            result.issueDate = IssueDate
            
            await result.save();
            res.status(200).json({msg:'Certificate successfully updated'})
        } else {
            res.status(404).json({msg:'This Certificate not found' })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

adminRoute.delete('/deleteCertificate', async(req,res)=>{
    try {
        const { CertificateId } = req.body;
        const result = await certificate.findOne({ certificateId: CertificateId });
        if (result) {
            certificate.findOneAndDelete(CertificateId);
            res.status(200).json({msg:'Certificate deleted Successfully'});
        } else {
            res.status(404).json({msg:'Certificate not found' });
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
});

export { adminRoute }