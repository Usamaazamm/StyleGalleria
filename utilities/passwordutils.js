import bcrypt from 'bcrypt';
const hashpassword = async(password)=>{
    try{

        const saltRounds = 10;
        const hashed = await bcrypt.hash(password,saltRounds);
        return hashed
    }
    catch(error){
        console.log(error)
    }
};

const comparepassword = async(password,hashed)=>{
   return bcrypt.compare(password,hashed)
};

export {comparepassword,hashpassword};