function adminCheck(req,res,next) {
    if (req.email === `${process.env.ADMIM_EMAIL}`) {
        next()
    } else {
      console.log('hello')
      res.status(401).json({msg:'Unauthorized access'})  
    }
}

export default adminCheck