const Base_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCodes in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCodes;
        newOptions.value = currCodes;

        if(select.name == "from" && currCodes == "USD"){
            newOptions.selected ="selected";
        }
        else if(select.name == "To" && currCodes === "INR"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchnageRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
    // console.log(response);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalRate = amtVal * rate;
    // console.log(finalRate);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    updateExchnageRate();
});

window.addEventListener("load", () =>{
    updateExchnageRate();
});