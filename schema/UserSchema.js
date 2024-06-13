const {z}=require('zod');

exports.registerSchema=z.object({
    username:z.string(),
    firstname:z.string(),
     lastname:z.string(), 
     email:z.string().email(), 
     phone:z.string().length(10),
      password:z.string().min(5)
})