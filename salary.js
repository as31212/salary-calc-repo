//declaring all of the DOM variables
const annual=document.getElementById('annual');
const monthly=document.getElementById('monthly');
const weekly=document.getElementById('weekly');
const daily=document.getElementById('daily');
const hourly=document.getElementById('hourly');
const hours=document.getElementById('hours-per-week');
const checkbtn=document.getElementById('check-btn');
const resetbtn=document.getElementById('reset-btn');

//setting the value of the hours to a default of 40(most people work 40 hours a week).
hours.value=40;

//this is more of a number convertor than a validinput checker. this will turn all the input strings that are returned into numbers that can be arithmatically manipulated.
function validInput(userInput){
    const userValue=userInput.value
    const parsedString=userValue.trim();
    return parseFloat(parsedString);
}



//this is the most complex portion of the code so i will make comments throughout it
function calculate(){

    //this is an object i have created in order to store the formulas for obtaining the different salary values. it uses the validInput function as a varible to denote the user inputed base case salary. Some of the formulas are off due to overtime and other factors
    const formulas = [
        {
            name: 'annual',
            annual: validInput(annual),
            monthly: validInput(annual) / 12,
            weekly: validInput(annual) / 52,
            daily: validInput(annual) / 365,
            hourly: validInput(annual) / (365 * (validInput(hours)/5))
        },
        {
            name: 'monthly',
            annual: validInput(monthly) * 12,
            monthly: validInput(monthly),
            weekly: validInput(monthly) / 4,
            daily: validInput(monthly) / 30, 
            hourly: validInput(monthly) / (30 * (validInput(hours)/5))
        },
        {
            name: 'weekly',
            annual: validInput(weekly) * 52,
            monthly: validInput(weekly) * 4,
            weekly: validInput(weekly),
            daily: validInput(weekly) / 7,
            hourly: validInput(weekly) / (7 * (validInput(hours)/5))
        },
        {
            name: 'daily',
            annual: validInput(daily) * 365,
            monthly: validInput(daily) * 30, 
            weekly: validInput(daily) * 7,
            daily: validInput(daily),
            hourly: validInput(daily) / (validInput(hours)/5)
        },
        {
            name: 'hourly',
            annual: validInput(hourly) * 365 * (validInput(hours)/5),
            monthly: validInput(hourly) * 30 * (validInput(hours)/5), 
            weekly: validInput(hourly) * 7 * (validInput(hours)/5),
            daily: validInput(hourly) * (validInput(hours)/5),
            hourly:validInput(hourly)
        }
    ];

//I have assigned a class to each of the inputs in my dom caled inputs. this block of code will take the inputs class and put them all in a nodelist. I will then take the node list and turn it into an array so i can manipulate it with array methods. from there i use the map method to return the value of each element into a new array. this will give me an array of user inputs. based on the intention of the web application, it will return an array looking simlar to this ['',5000,'','','']. This means the user has inputed only one value which is the intention.
const inputNodeList=document.querySelectorAll('.inputs');
const inputArrValues=Array.from(inputNodeList).map((element)=>{
   return element.value
});

//I will now itterate through the array and determine which of the following does not have a empty string value. then once i find which one it is i will execute some logic. since the html elements are ordered in the same way that the object indecies are ordered, this means that the looping varible will be in alligment with the array of objects. So if this is the case, I can go to formuals of i and find the corresponding values to input into all of the input boxes.
for(let i=0;i<inputArrValues.length;i++){
    if(inputArrValues[i]!==''){
        annual.value=Math.floor(formulas[i].annual);
        monthly.value=Math.floor(formulas[i].monthly);
        weekly.value=Math.floor(formulas[i].weekly);
        daily.value=Math.floor(formulas[i].daily);
        hourly.value=Math.floor(formulas[i].hourly);    
        return;
    }
}
}

//this is the event listner that once clicked will calculate the salaries
checkbtn.addEventListener('click',calculate);

//returns all the values to empty strings and returns hours to the defualt 40 hours per week
function reset(){
    annual.value='';
    monthly.value='';
    weekly.value='';
    daily.value='';
    hourly.value='';
    hours.value=40;
}

//event listener for the reset button to call the reset function when clicked
resetbtn.addEventListener('click',reset);

