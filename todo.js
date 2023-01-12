// Tüm elementleri seçme

const form = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter"); 
const clearButton =document.getElementById("clear-todos");
let kontrol;
 eventListenners();



function eventListenners() { // Bu fonsiyon tün event listenerler' lar
    form.addEventListener("submit",addTodo); 
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo);
    clearButton.addEventListener("click",allTodoDelete);
    filter.addEventListener("keyup",filterTodos)
}


function allTodoDelete(e) {
    if (confirm("Tümünü Silmek istediğinize emin misiniz ?")){
        //  Yöntem 1 Ama Yavaş olduğu için Kullanma
            // todoList.innerHTML=""
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)

        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e) {
    const deger = e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listitem){
        const text=listitem.textContent.toLocaleLowerCase();
        if(text.indexOf(deger)=== -1){
            // Bulamadı...

            listitem.setAttribute("style","display:none !important")

        }
        else{
            listitem.setAttribute("style","display:block")
        }
    })


}



function deleteTodoFromStorage(deleteetodo) {
    let todos= getTodotosFromstorage();
    todos.forEach(function(todo,index) {
        if(todo === deleteetodo){
            todos.splice(index,1);

        }
    });


    localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteTodo(e) {
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showalert("success","Başarı ile Silindi")

    }
}

function loadAllTodosUI() {
    let todos=getTodotosFromstorage();

    // todos.forEach(function(todo) {
    //     addTodoToUI(todo);
    // });
    
    
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}
function addTodo(e) {
    const newTodo= todoInput.value.trim() ;
    if (newTodo===""){
 



        showalert("danger","Lütfen bir Todo giriniz...");
    }
    else{
            // 
            let todos= getTodotosFromstorage();
            todos.forEach(function(todo) {
            if(todo === newTodo){
        
                 kontrol="1"
         }
});
            // 
    console.log(kontrol)
        if(kontrol === "1"){
            showalert("danger","Böyle Bir Todo Var zaten")
        }
        else{
            addTodoToUI(newTodo);
        
            showalert("success","Todo Başarılı bir şekilde kaydedildi...") 
            addTodotostorage(newTodo);
        }
         kontrol="2"
    }
   
    
    
    e.preventDefault();
    
}
function getTodotosFromstorage() { // Storagee dan bütün todoları alıyor...
     let todos;

    if (localStorage.getItem("todos") === null) {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
function addTodotostorage(newTodo) {
   let todos = getTodotosFromstorage()

   todos.push(newTodo)
   
   localStorage.setItem("todos",JSON.stringify(todos));
}

function showalert(type,message){
const alert = document.createElement("div")
alert.className=`alert alert-${type}`;
alert.textContent=message;

firstCardBody.appendChild(alert)
// Settimeout methodu ile belirli bir süre sonra sileceğiz asağıda

setTimeout(() => {
    alert.remove();
}, 1000);


}

function addTodoToUI(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" >
                                
                            </a>

                        </li>
    
*/
 
// Listitem oluştuma
const listItem=document.createElement("li");
// Liink oluşturma
const link = document.createElement("a");
link.href="#";
link.className="delete-item";
//link.innerHTML="<i class = 'fa fa-remove'></i>";    ----- Çalışmadı O Yüzden Uzun Yoldan Yapacağız
const xremove=document.createElement("i");
xremove.className="fa fa-remove";
link.appendChild(xremove)

listItem.className="list-group-item d-flex justify-content-between";

// TextNote eklemee
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link)
// 



// todolist e List İteme ekleme
todoList.appendChild(listItem)

//  Ekleme işlemi bitti burada sonraki adım da ise 
//   ekleme yapılan inputu boşaltacağız

todoInput.value="";


}

