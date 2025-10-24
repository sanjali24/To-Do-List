
document.addEventListener('DOMContentLoaded', () =>//this line ensures that only afte the entire html is loaded, the code inside this block will execute 
     {


        const taskInput = document.getElementById('input');
        const addTaskButton = document.getElementById('add-button');
        const taskList = document.getElementById('tasks-list');
        const emptyImage = document.querySelector('.empty-image');
        const taskArea = document.querySelector('.tasks');
        const progressBar = document.getElementById('progress');
        const progressNum = document.getElementById('numbers')



        const toggleEmptyState = () => {
            if (emptyImage && taskArea) {
                emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
                taskArea.style.width = taskList.children.length === 0 ? '50%' : '100%';
            }            
        }

        const updateProgress = (checkCompletion = true) => {
            const totalTasks = taskList.children.length;
            const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

            progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
            progressNum.textContent = `${completedTasks} / ${totalTasks}`;

            if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
                Confetti();
            }

        };



        const saveTaskToLocalStorage = () => {
            const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('.checkbox').checked
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        const loadTasksFromLocalStorage = () => {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            savedTasks.forEach(({ text, completed}) => addTask(text, completed, false));
            toggleEmptyState();
            updateProgress();
        };


        //This function handles the process of adding new task in the to-do list.
        const addTask = (text, completed = false, checkCompletion = true) => {
            const taskText = text || taskInput.value.trim();//removes any white spaces from the begening and the end of a string, making sure that the string is clean 
            if(!taskText) {
                return;
            }

            //dynamically creates a new li - task list
            const li = document.createElement('li');
            li.innerHTML =`
            <input type = "checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i>
                <button class="trash-btn"><i class="fa-solid fa-trash"></i>
            </div>
            `;

            const checkbox = li.querySelector('.checkbox');
            const editBtn = li.querySelector('.edit-btn');

            if(completed) {
                li.classList.add('completed');
                editBtn.disabled = true;
                editBtn.style.opacity = '0.5';
                editBtn.style.pointerEvents = 'none';
            }

            checkbox.addEventListener('change', () => {
                const isChecked = checkbox.checked;
                li.classList.toggle('completed', isChecked);
                editBtn.disabled = isChecked;
                editBtn.style.opacity = isChecked ? '0.5' : '1';
                editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
                updateProgress();
                saveTaskToLocalStorage();
            })

            editBtn.addEventListener('click', () => {
                if(!checkbox.checked) {
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    toggleEmptyState();
                    updateProgress(false);
                    saveTaskToLocalStorage();
                }
            });

            li.querySelector('.trash-btn').addEventListener('click', () => {
                li.remove();
                toggleEmptyState();
                updateProgress();
                saveTaskToLocalStorage();
            });

            
            taskList.appendChild(li);
            taskInput.value = '';
            toggleEmptyState();
            updateProgress(checkCompletion);
            saveTaskToLocalStorage();
        };

        addTaskButton.addEventListener('click', () => addTask());
        taskInput.addEventListener('keypress', (e) =>{
            if(e.key === 'Enter'){
            e.preventDefault();
                addTask();
            }
        });
        
        loadTasksFromLocalStorage();
      
    });

    

     const Confetti = () => {
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["star"],
            colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
          };
          
          function shoot() {
            Confetti({
              ...defaults,
              particleCount: 40,
              scalar: 1.2,
              shapes: ["star"],
            });
          
            Confetti({
              ...defaults,
              particleCount: 10,
              scalar: 0.75,
              shapes: ["circle"],
            });
          }
          
          setTimeout(shoot, 0);
          setTimeout(shoot, 100);
          setTimeout(shoot, 200);
     }