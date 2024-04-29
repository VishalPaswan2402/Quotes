// For Sign in Page...
let a=document.querySelector(".uName");
let b=document.querySelector(".uEmail");
let c=document.querySelector(".uDob");
let d=document.querySelector(".uCntry");
let e=document.querySelector(".uMob");
let f=document.querySelector(".uPass");
let g=document.querySelector(".uPassRep");
let sub=document.querySelector(".submit");

sub.addEventListener("click",function(){
    let p1=document.querySelector(".pass1");
    let p2=document.querySelector(".pass2");
    // console.log(p1.value);
    // console.log(p2.value);
    if(p1.value!=p2.value){
        alert("Password Not Matched Recheck And Try Again...");
    }
    // else if(a.value=="" || b.value=="" || c.value=="" || d.value=="" || e.value=="" || f.value=="" || g.value==""){
    //     alert("Fill All The Required Information To Sign In");
    // }
});
