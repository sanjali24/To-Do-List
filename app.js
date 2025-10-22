
document.addEventListener('DOMContentLoaded', () =>//this line ensures that only afte the entire html is loaded, the code inside this block will execute 
     {
        const taskInput = document.getElementById('input');
        const addTaskButton = document.getElementById('add-button');
        const taskList = document.getElementById('tasks-list');



        //This function handles the process of adding new task in the to-do list.
        const addTask = (event) => {
            event.preventDefault();
            const taskText = taskInput.value.trim();//removes any white spaces from the begening and the end of a string, making sure that the string is clean 
            if(!taskText) {
                return;
            }

            //dynamically creates a new li - task list
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            taskInput.value = '';
        };

        addTaskButton.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) =>{
            if(e.key === 'Enter'){
                addTask(e);
            }
        });    
     }); 