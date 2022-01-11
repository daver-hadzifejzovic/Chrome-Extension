let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("okej"));
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

function render(){
    let listItems = "";
    for(let i = 0; i < myLeads.length;i++){
        if('link' in myLeads[i]){
        listItems += 
            `<li class="listinput" id="li-input">
                <a target='_blank' href='${myLeads[i].link}'>
                    ${myLeads[i].name} - Link
                </a>
                <button id="btn-delete-item">Delete</button>
            </li>`;
        } else {
            listItems += 
            `<li class="listinput" id="li-input">
                ${myLeads[i].name}
                <button id="btn-delete-item">Delete</button>
            </li>`
        }
    }
    console.log(myLeads);
    ulEl.innerHTML = listItems;
    let btsnDelete = document.querySelectorAll("#btn-delete-item");
    btsnDelete.onclick = deleteItem();
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render();
})
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
            objectMyLeads = {};
        } else {
            alert("Name your link!");
        }
    })
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
        objectMyLeads = {};
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
            objectMyLeads = {};
        } else {
            alert("Input field empty!")
        }
    }
});

inputEl.addEventListener('keydown', (e) => {
    if(e.ctrlKey){
        e.preventDefault();
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
                objectMyLeads = {};
            } else {
                alert("Name your link!");
            }
        })
    }
});

function deleteItem(){
    let items = document.querySelectorAll("#ul-el li"),
    tab = [], index;
        
    for(var i = 0; i < items.length; i++){
        tab.push(items[i].textContent);
    }
        
    for(var i = 0; i < items.length; i++){
        items[i].addEventListener("dblclick", function(){
            if(confirm("Do you wish to delete your input? (HINT: It will be deleted)")){
            index = tab.indexOf(this.textContent);
            console.log(this.textContent + " Index = " + index);
            myLeads.splice(index, 1);
            localStorage.setItem("okej", JSON.stringify(myLeads));
            myLeads = leadsFromLocalStorage;
            render();
            } else {

            }
        });
    }       
}

    // Minor Bug fix
    // USPESNO DODAT KEYLISTNER NA ENTER
    // USPESNO DODATO CTRL LINKOVE
    // USPESNO DODATO IME ZA LINK
    // USPESNO DODAT DELETE BTN ZA POSEBNE ITEME
    // Miner Bugs fixed