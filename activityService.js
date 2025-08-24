export function getActivities() {
  return JSON.parse(localStorage.getItem('activities') || '[]');
}

export function saveActivities(activities) {
  localStorage.setItem('activities', JSON.stringify(activities));
}

export function addActivity(title, priority) {
  const activities = getActivities();
  const newActivity = {
    id: Date.now(),
    title,
    completed: false,
    priority
  };
  activities.push(newActivity);
  saveActivities(activities);
}

export function deleteActivity(id) {
  const activities = getActivities().filter(a => a.id !== id);
  saveActivities(activities);
}

export function toggleActivityCompletion(id) {
  const activities = getActivities().map(a =>
    a.id === id ? { ...a, completed: !a.completed } : a
  );
  saveActivities(activities);
}

export function editActivity(id, newTitle) {
  const activities = getActivities().map(a =>
    a.id === id ? { ...a, title: newTitle } : a
  );
  saveActivities(activities);
}
