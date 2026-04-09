import bcrypt from 'bcrypt'
export const HashingPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}
export const ComparePassword =  async(password,hashedpassword)=>{
    return await bcrypt.compare(password,hashedpassword)
}