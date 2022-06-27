from celery import Celery
import time

app = Celery('hello', backend='redis://localhost', broker='redis://localhost')

@app.task(name="hello")
def hello(details):
    print(type(details))
    print(details)
    return 'Hello, world!'

@app.task(name="wranglePreview")
def wranglePreview(details):
    print(details)
    time.sleep(5)
    return 'Wrangled one!'
