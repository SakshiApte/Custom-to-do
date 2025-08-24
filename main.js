import { addActivity } from './activityService.js';
import { renderActivities } from './activityList.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('activity-form');
  const input = document.getElementById('activity-input');
  const priority = document.getElementById('priority-select');
  const searchInput = document.getElementById('search-input');

  form.addEventListener('submit', e => {
    e.preventDefault();
    addActivity(input.value, priority.value);
    input.value = '';
    renderActivities(searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    renderActivities(searchInput.value);
  });

  renderActivities();
});
