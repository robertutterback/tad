import { getUser } from '$lib/db';
import { wranglePreview, checkProgress } from '$lib/tasks';

async function isValid(user, datasetId) {
  const datasets = (await getUser(user?.username))?.accessibleDatasets;
  if (!datasets || !datasets.includes(datasetId))
    return false;
  return true;
}

export async function post({request, locals}) {
  const data = await request.json();
  console.log(`preview start: ${data.id}`);

  const datasets = (await getUser(locals.user?.username))?.accessibleDatasets;
  if (!isValid(locals.user, data.id))
    return {
      status: 403,
      body: { error: "Dataset not found or not accessible to you."}
    };

  const handle = wranglePreview.applyAsync([data]);
  console.log(`Preview task id: ${handle.taskId}`);

  return {
    status: 200,
    body: {"taskId": handle.taskId}
  };
}

export async function get({url, locals}) {
  const datasetId = url.searchParams.get('datasetId');
  const taskId = url.searchParams.get('taskId');

  if (!isValid(locals.user, datasetId))
    return {
      status: 403,
      body: { error: "Dataset not found or not accessible to you."}
    };

  console.log(`Checking status of ${taskId}`);
  const response = checkProgress(taskId);
  console.log(response);

  const status = await response.status();
  console.log(`Status: ${status}`);
  if (status === 'SUCCESS') {
    const result = await response.get();
    console.log(`Done: ${result}`);

    return {
      status: 200,
      body: {status: "done", result}
    };
  } else if (status === 'FAILURE') {
    const result = await response.get();
    console.log(`Failed: ${result}`);

    return {
      status: 500,
      body: {status: "failed", result}
    };
  }

  return {
    status: 202,
    body: { status: "in-progress" }
  }
  
}