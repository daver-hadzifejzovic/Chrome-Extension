let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("okej"));
let objectMyLeads = {};

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render();
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(inputEl.value.length > 0){
            objectMyLeads = clone(objectMyLeads);
            objectMyLeads.name = inputEl.value;
            objectMyLeads.link = tabs[0].url;
            objectMyLeads.key = "okej";
            inputEl.value = "";
            myLeads.push(objectMyLeads);
            localStorage.setItem(objectMyLeads.key, JSON.stringify(myLeads));
            render();
        } else {
            alert("Name your link!");
        }
    })
})

function render(){
    let listItems = "";
    for(let i = 0; i < myLeads.length;i++){
        if('link' in myLeads[i]){
        listItems += 
            `<li class="listinput" id="li-link">
                <a target='_blank' href='${myLeads[i].link}'>
                    ${myLeads[i].name} - Link
                </a>
            </li>`;
        } else {
            listItems += 
            `<li class="listinput" id="li-input">
                ${myLeads[i].name}
            </li>`
        }    
        console.log(myLeads)
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render();
})

inputBtn.addEventListener("click", () => {
    if(inputEl.value.length>0){
        objectMyLeads = clone(objectMyLeads);
        objectMyLeads.name = inputEl.value
        objectMyLeads.key = "okej"
        myLeads.push(objectMyLeads);
        inputEl.value = "";
        localStorage.setItem(objectMyLeads.key, JSON.stringify(myLeads));
        render(myLeads);
    } else {
        alert("Input field empty!")
    }
})
inputEl.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
        if(inputEl.value.length>0){
            objectMyLeads = clone(objectMyLeads);
            objectMyLeads.name = inputEl.value
            objectMyLeads.key = "okej"
            myLeads.push(objectMyLeads);
            inputEl.value = "";
            localStorage.setItem(objectMyLeads.key, JSON.stringify(myLeads));
            render(myLeads);
        } else {
            alert("Input field empty!")
        }
    }
    // USPESNO DODAT KEYLISTNER NA ENTER
    // USPESNO DODATO IME ZA LINK
});
