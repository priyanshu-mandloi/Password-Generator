const inputslider = document.querySelector("[data-lengthSlider]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const passwordDisplay  = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generateButton");
const allCheckBox= document.querySelectorAll("input[type=checkbox]");

const symbols="~!@#$%^&*_+-=:\;|/?,";


let password = "" ;
let passwordLength=10;
let checkCount=0;
handSlider();

setIndicator("#ccc");
// set password length
function handSlider(){
    inputslider.value=passwordLength;
    lengthNumber.innerText=passwordLength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize =((passwordLength-min)*100/(max-min))+"% 100%";
    inputslider.style.backgroundColor="#14022B";
}

// set indicator
function setIndicator(color){
  indicator.style.backgroundColor=color;
  // Add shadow
  indicator.style.boxShadow='0px 0px 12px 1px ${color}';
}

function getRndInteger(min ,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generatetoLowerCase(){
  return String.fromCharCode(getRndInteger(97,123));
}

function generatetoUpperCase(){
  return String.fromCharCode(getRndInteger(65,91));
}


function generateSymbol(){
 const randNum = getRndInteger(0,symbols.length)
 return symbols.charAt(randNum);
}

function calcStrength(){
     let hasUpper = false;    
     let hasLower = false;    
     let hasNum = false;    
     let hasSym = false;
     
     if(uppercaseCheck.checked) hasUpper=true;
     if(lowercaseCheck.checked) hasLower=true;
     if(numbersCheck.checked) hasNum=true;
     if(symbolsCheck.checked) hasSym=true;

     if(hasUpper && hasLower && (hasNum||hasSym)&& passwordLength>=8){
        setIndicator("#0f0");
     }else if(
        (hasLower||hasUpper)&&
        (hasNum||hasSym)&&
        passwordLength>=6
     ){
        setIndicator("#ff0");
     }else{
        setIndicator("#f00");
     }
}
     async function copyContent(){
        try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText="copied";
        }catch(e){
            copyMsg.innerText="Failed";
        }

        copyMsg.classList.add("active");
      setTimeout(() => {
          copyMsg.classList.remove("active");
      },2000);
    }


    // Shuffle wala function 
    function shufflePassword(array){
        // The fisher Yates method to shuffle the array
        for(let i=array.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i]=array[j];
            array[j]=temp;
        }
       let str="";
       array.forEach((el)=>(str += el));
       return str;
    }

    function handleCheckBoxChange(){
      checkCount=0;
      allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
      });
      if(passwordLength<checkCount){
        passwordLength=checkCount;
        handSlider();
      }
    }
 
    allCheckBox.forEach((checkbox)=>{
        checkbox.addEventListener("change",handleCheckBoxChange);
    });

    // Adding  event listner to the slider
    inputslider.addEventListener('input',(e)=>{
       passwordLength=e.target.value;
       handSlider();
    });

    copyBtn.addEventListener('click',()=>{
        if(passwordDisplay.value){
            copyContent();
        }
    });

     generateBtn.addEventListener('click',()=>{
         // none of the checkbox is selected
         if(checkCount==0) return;
         if(password.length<checkCount){
            password=checkCount;
            handSlider();
         }


         console.log("starting the journey");
         // remove password
           password="";
        //  if(uppercaseCheck.checked){
        //     password+=generatetoUpperCase();
        //  }
        //  if(lowercaseCheck.checked){
        //     password+=generatetoLowerCase();
        //  }
        //  if(numbersCheck.checked){
        //     password+=generateRandomNumber();
        //  }
        //  if(symbolsCheck.checked){
        //     password+=generateSymbol();
        //  }
          
         let funcArr=[];
         if(uppercaseCheck.checked){
             funcArr.push(generatetoUpperCase);
         }
         if(lowercaseCheck.checked){
             funcArr.push(generatetoLowerCase);
         }
         if(numbersCheck.checked){
             funcArr.push(generateRandomNumber);
         }
         if(symbolsCheck.checked){
             funcArr.push(generateSymbol);
         }


         // compulsory Addition
         for(let i=0;i<funcArr.length;i++){
            password+= funcArr[i]();
         }

         console.log("Compulsory addition done");
         //remaining addition
         for(let i=0;i<passwordLength-funcArr.length;i++){
            let randIndex = getRndInteger(0,funcArr.length);
            password+= funcArr[randIndex]();
         }
          
         console.log("Remaning additiom done");
         // shuffle the password
         password=shufflePassword(Array.from(password));
         console.log("shuffling done");
         // show this in the dispalay 
           passwordDisplay.value=password;
           console.log("Remaining addition done");
           calcStrength();
     });
 

