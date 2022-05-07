let pushInfo = localStorage.getItem("tasks");
pushInfo = JSON.parse(pushInfo);
console.log(pushInfo);

let wrapDiv = document.createElement("div");
wrapDiv.classList.add("wrap_out");
document.body.append(wrapDiv);
let btn = document.createElement("button");
btn.innerText = "Удалить задачу";
btn.style.display = "block";
btn.style.margin = " 0 auto"
wrapDiv.append(btn);

for(let i of pushInfo){
    let div = document.createElement('div');
    div.setAttribute("id", i.id )
    div.classList.add("inner")
    wrapDiv.append(div);
    let p = document.createElement('p');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p.innerHTML = `Название задачи: ${i.nameTasks}`;
    p1.innerHTML = `Описание задачи: ${i.descriptionTasks}`;
    p2.innerHTML =`Выполнить к:  ${i.dateTasks} ` ;
    for(let j of i.UsersTasks){
        let p3 = document.createElement('p');
        p3.innerHTML = `Участники: ${j}`;
        div.append(p3)
    }
    div.append(p,p1,p2);
    div.addEventListener('click', function(){
        div.classList.toggle("checked")
    })
}

// удаление элемента
btn.addEventListener("click", clearUs)
function clearUs(){
    let del = document.getElementsByClassName("checked");
    for(let u of del){
        for(let loc = pushInfo.length-1; loc >= 0; loc--){
            if(u.id == pushInfo[loc].id){
                u.remove();
                pushInfo.splice(loc, 1);
            }
        }
    }
    if(pushInfo.length == 0){
        localStorage.clear()
    } else {localStorage.setItem("tasks",JSON.stringify(pushInfo))};
}
