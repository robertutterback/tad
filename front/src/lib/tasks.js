import celery from 'celery-node';

const client = celery.createClient("redis://", "redis://");

export const hello = client.createTask("hello");
export const wranglePreview = client.createTask("wranglePreview");

export function checkProgress(taskId) {
  return client.asyncResult(taskId);
}