import {
  getActivities,
  deleteActivity,
  toggleActivityCompletion,
  editActivity
} from './activityService.js';

export function renderActivities(searchTerm = '') {
  const list = document.getElementById('activity-list');
  list.innerHTML = '';
  let activities = getActivities();

  if (searchTerm) {
    activities = activities.filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  activities.forEach(activity => {
    const li = document.createElement('li');
    li.className = 'activity-item';
    if (activity.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = activity.title;

    const badge = document.createElement('span');
    badge.className = `priority-badge priority-${activity.priority}`;
    badge.textContent = activity.priority;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = activity.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => {
      toggleActivityCompletion(activity.id);
      renderActivities(searchTerm);
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newTitle = prompt('Edit activity:', activity.title);
      if (newTitle) {
        editActivity(activity.id, newTitle);
        renderActivities(searchTerm);
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      deleteActivity(activity.id);
      renderActivities(searchTerm);
    };

    const left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'center';
    left.appendChild(badge);
    left.appendChild(span);

    li.appendChild(left);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}
