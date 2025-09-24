const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filters button');

    let tasks = [];

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });

    function addTask() {
      const text = taskInput.value.trim();
      if (text === '') return;

      tasks.push({ text, completed: false });
      taskInput.value = '';
      renderTasks();
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function editTask(index) {
      const newText = prompt('Edit your task:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText;
        renderTasks();
      }
    }

    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        if (filter === 'pending' && task.completed) return;
        if (filter === 'completed' && !task.completed) return;

        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.textContent = task.text;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Done';
        completeBtn.classList.add('complete-btn');
        completeBtn.onclick = () => toggleComplete(index);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);

        taskList.appendChild(li);
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.id.replace('Btn', ''));
      });
    });