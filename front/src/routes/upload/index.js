export async function post({ request }) {
  // console.log(request);
  // console.log(await request.text());

  const data = await request.formData();
  
  const name = data.get('datasetName');
  data.delete('datasetName');
  console.log(name);
  
  const pathInfo = JSON.parse(data.get('pathInfo'));
  data.delete('pathInfo');
  console.log(pathInfo);

  for (const [origPath, file] of data) {
    str = file.toString();
    if (str !== "[object File]") {
      console.log(`[WARNING] Unexpected non-file in FormData: ${str}`);
      continue;
    }
    
    console.log(`---------- <${origPath}> [${pathInfo[origPath].type}] ----------`);
    console.log(await file.text());
    console.log(`---------- </${origPath}> ----------`);
  }

  return {
    status: 200,
    body: {"text": "hello"}
  };
}
