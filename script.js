// Обработка инпутов

document.forms.tasks.elements.name.addEventListener("input",inputName);
function inputName(){
    if(this.validity.valueMissing){
        this.nextElementSibling.innerText = "Уважаемый, вам необходимо что либо ввести!"
    };
    if(this.validity.tooShort){
        this.nextElementSibling.innerText = `Значение должно быть в диапозоне от ${this.minLength} до ${this.maxLength}`
    }
    if(this.value.length > 3){
        this.nextElementSibling.innerText = " ";
    }
    document.forms.tasks.firstElementChild.innerText = " "
};

document.forms.tasks.elements.date.addEventListener("input",inputDate);
function inputDate(){
    let usDate = new Date(this.value);
    let todayDate = new Date();
    if(usDate.getTime() < todayDate.getTime()){
        this.nextElementSibling.innerText = "Дата не может быть в прошлом";
    }
    else  this.nextElementSibling.innerText = " ";
};
// ________________________________________________________________________________________________________________________________________________

document.forms.tasks.addEventListener("submit", pushForm);
function pushForm(event){
    event.preventDefault();
    this.firstElementChild.innerText = "Задача успешно добавлена!";
    this.firstElementChild.style.textAlign = "center"
    this.firstElementChild.style.display = "block"
    this.firstElementChild.style.color = "red"
    let users = document.getElementsByName("users");
    let usersAdd = [];
    for(let i of users){
        usersAdd.push(i.value)
    };
    let tasksInfo = {};
    tasksInfo.nameTasks = this.elements.name.value;
    tasksInfo.descriptionTasks = this.elements.description.value;
    tasksInfo.dateTasks = this.elements.date.value;
    tasksInfo.UsersTasks = usersAdd;
    if(this.elements.name.value.length < 3)return
    let pushInfo = localStorage.getItem("tasks");
    let idTasks = 1;
    if(pushInfo !== null){
        pushInfo = JSON.parse(pushInfo);
        idTasks = pushInfo[pushInfo.length - 1].id + 1;
    } else pushInfo = [];
    tasksInfo.id = idTasks;
    pushInfo.push(tasksInfo);
    this.elements.name.value = " ";
    this.elements.description.value = " ";
    this.elements.date.value = " ";
    document.querySelector(".Wrap_us").innerHTML = " ";
    localStorage.setItem("tasks",JSON.stringify(pushInfo));
    console.log(JSON.stringify(pushInfo));
};

// ________________________________________________________________________________________________________________________________________________
let divWrap = document.createElement("div");
divWrap.classList.add("Wrap_us")
document.forms.tasks.append(divWrap)
document.querySelector(".addUs").addEventListener("click", addUsers);
let clickAddUs = [];
function addUsers(event){
    event.preventDefault();
    let div = document.createElement("div");
    div.classList.add("users_tab")
    div.style.marginTop = "10px"
    let input = document.createElement("input");
    input.setAttribute("name", "users");
    input.placeholder = "Введите имя участника"
    let btn = document.createElement("button");
    btn.innerHTML = "X";
    if(clickAddUs.length >= 4)return
    divWrap.append(div)
    div.append(input, btn);
    clickAddUs.push(div);
    console.log(clickAddUs);
    btn.addEventListener("click", function(){
        div.remove();
        clickAddUs.pop()
    });
}