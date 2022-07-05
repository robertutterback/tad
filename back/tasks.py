from celery import Celery
from pathlib import Path
import time

from src import readers


app = Celery('hello', backend='redis://localhost', broker='redis://localhost')


@app.task(name="hello")
def hello(details):
    print(type(details))
    print(details)
    return 'Hello, world!'


# Should I just have one wrangle task that also handles preview, or separate
# tasks?
@app.task(name="wranglePreview")
def wranglePreview(details):
    # {id, name, path, owner, readers, files: {origPath: {dirPath, filename, encoding, asplit, msplit OR just column-name}}}
    home = Path(details.path)
    for file_detail in details['files']:
        full_path = home / file_detail['dirPath'] / file_detail['filename']
    time.sleep(5)
    return 'Wrangled one!'
