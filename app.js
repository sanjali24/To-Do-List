
document.addEventListener('DOMContentLoaded', () =>//this line ensures that only afte the entire html is loaded, the code inside this block will execute 
     {
        const taskInput = document.getElementById('input');
        const addTaskButton = document.getElementById('add-button');
        const taskList = document.getElementById('tasks-list');
        const emptyImage = document.querySelector('.empty-image');
        const taskArea = document.querySelector('.tasks');



        const toggleEmptyState = () => {
            if (emptyImage && taskArea) {
                emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
                taskArea.style.width = taskList.children.length === 0 ? '50%' : '100%';
            }            
        }




        //This function handles the process of adding new task in the to-do list.
        const addTask = (text, completed = false) => {
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
            })

            editBtn.addEventListener('click', () => {
                if(!checkbox.checked) {
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    toggleEmptyState();
                }
            });

            li.querySelector('.trash-btn').addEventListener('click', () => {
                li.remove();
                toggleEmptyState();
            });

            
            taskList.appendChild(li);
            taskInput.value = '';
            toggleEmptyState();
        };
        

        addTaskButton.addEventListener('click', () => addTask());
        taskInput.addEventListener('keypress', (e) =>{
            if(e.key === 'Enter'){
            e.preventDefault();
                addTask();
            }
        });    
     }); 