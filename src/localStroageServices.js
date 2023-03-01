 export const setUid=(uid)=>{
localStorage.setItem("uid",uid)
}
export const getUid=()=>{
 const uid= localStorage.getItem("uid")
 return uid
  }