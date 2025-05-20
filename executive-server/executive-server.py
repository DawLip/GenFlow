import time
from redis import Redis
from rq import Worker, Queue

redis_conn = Redis()

def generate_image(prompt):
    print(f"Generating image for prompt: {prompt}")
    time.sleep(5)
    return f"Image generated for prompt: {prompt}"

if __name__ == '__main__':
    worker = Worker(queues=['default'], connection=redis_conn)
    worker.work()
