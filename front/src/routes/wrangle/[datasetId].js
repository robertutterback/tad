import { getDatasetInfo } from '$lib/db';
import { hello } from '$lib/tasks';

// Loaded before the page, passing `rawInfo` prop.
export async function get({params, locals}) {
  const username = locals.user?.username;
  const id = params.datasetId;
  const info = await getDatasetInfo(id);
  if (info.owner !== username && !info.readers.includes(username)) {
    return {
      body: { rawInfo: {error: "Dataset not found or not accessible to you."}}
    };
  }
  return {
    body: {
      rawInfo: info
    }
  };
}

export async function post({request, locals}) {
  console.log("post wrangle!");
  const data = await request.json();
  const handle = hello.applyAsync([data]);

  console.log(handle.taskId)

  const result = await handle.get();
  console.log(result);

  return {
    status: 200,
    body: {"taskId": handle.taskId, result }
  };
}