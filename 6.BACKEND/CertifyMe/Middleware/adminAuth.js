function adminCheck(req,res,next) {
    if (req.email === `${process.env.ADMIM_EMAIL}`) {
        next()
    } else {
      res.status(401).json({msg:'Unauthorized access'})  
    }
}

export default adminCheck