import { getDatasetInfo, getUser } from '$lib/db';

export async function get({params, locals}) {
  const datasets = (await getUser(locals.user?.username))?.accessibleDatasets;
  const id = params.datasetId;
  if (!datasets || !datasets.includes(id))
    return {
      body: { rawInfo: {error: "Dataset not found or not accessible to you."}}
    };
  
  const info = await getDatasetInfo(id);
  return {
    body: {
      rawInfo: info
    }
  };
}

export async function post({request, locals}) {
  console.log("post wrangle!");
  const data = await request.json();
  console.log(data);

  return {
    status: 200,
    body: {"taskid": "hello"}
  };
}