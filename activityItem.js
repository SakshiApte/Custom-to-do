import {
  deleteActivity,
  toggleActivityCompletion,
  editActivity
} from './activityService.js';
import { renderActivityList } from './activityList.js';

export function createActivityItem(activity) {
  const li = document.createElement('li');
  li.classList.add('activity-item');
  if (activity.completed) li.classList.add('completed');

  let color = '';
  if (activity.priority === 'High') color = 'red';
  else if (activity.priority === 'Medium') color = 'orange';
  else color = 'green';

  li.innerHTML = `
    <span style="color:${color}; font-weight:bold;">[${activity.priority}]</span>
    <span class="title" contenteditable="true">${activity.title}</span>
    <button class="toggleBtn">✅</button>
    <button class="deleteBtn">🗑️</button>
  `;

  li.querySelector('.toggleBtn').onclick = () => {
    toggleActivityCompletion(activity.id);
    renderActivityList();
  };

  li.querySelector('.deleteBtn').onclick = () => {
    deleteActivity(activity.id);
    renderActivityList();
  };

  li.querySelector('.title').addEventListener('blur', (e) => {
    editActivity(activity.id, e.target.textContent.trim());
    renderActivityList();
  });

  return li;
}
