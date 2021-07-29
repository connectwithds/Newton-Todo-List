
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const completedtaskdisplay = document.querySelector(".completedTask")
const savebuttontop = document.getElementById("savebtn");
inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
     if(userData.trim() != 0){
         addBtn.classList.add("active");
         //savebuttontop.classList.add("active");
     }
     else{
        addBtn.classList.remove("active");
        //savebuttontop.classList.remove("active");
     }
}
savebuttontop.classList.remove("active");
addBtn.classList.remove("active");
showTasks();

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    if(userData.trim()!=0){
        let getLocalStorage = localStorage.getItem("New Todo");
        if(getLocalStorage == null){
            listArr =[];
        }
        else{
            listArr = JSON.parse(getLocalStorage);
        }
        listArr.push(userData);
        localStorage.setItem("New Todo",JSON.stringify(listArr));
    }
    
    showTasks();
}

function showTasks(){
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr =[];
    }
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    let newLiTag = '' ;
    listArr.forEach((element,index) => {
    //  newLiTag += `<li>${element}<span onclick="deleteTask(${index})"; ><button><i class="fas fa-trash"></i></button>
    //               <button><i class="fas fa-check"></i></button></span></li>`;
    newLiTag += `<li>${element}<button onclick="deleteTask(${index})"; id="delete"><i class="fas fa-trash"></i></button>
                 <button onclick="edittask(${index})"; id="right"><i class="fas fa-edit"></i></button></li>`;
   });
   todoList.innerHTML = newLiTag;  
   inputBox.value = "";

}


function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addbutton = document.getElementById("addbtn");
    let savebutton = document.getElementById("savebtn");
    
    saveindex.value = index;
    let getLocalStorage = localStorage.getItem("New Todo");
    let tasktoedit = JSON.parse(getLocalStorage);
    inputBox.value = tasktoedit[index];  
    
    //addbutton.style.display="none";
    //savebutton.style.display="block";
    savebuttontop.classList.add("active");
    addBtn.classList.remove("active");
}

//save task
let savebutton = document.getElementById("savebtn");
savebutton.addEventListener('click',function(){
    //alert('hi');
    let getLocalStorage = localStorage.getItem("New Todo");
    let tasktoedit = JSON.parse(getLocalStorage);
    let saveindex = document.getElementById("saveindex").value;
    tasktoedit[saveindex] = inputBox.value;
    localStorage.setItem("New Todo",JSON.stringify(tasktoedit));
    showTasks();

    savebuttontop.classList.remove("active");
    addBtn.classList.remove("active");
    
});

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");   
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks();
}