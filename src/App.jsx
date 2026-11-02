import { useState } from "react";
import "./App.css";

const practicals = [
  {
    id: 1,
    title: "Practical 1 – Security Goals",
    topics: [
      "Confidentiality – Fernet Encryption",
      "Integrity – SHA-256 Hashing",
      "Availability – File Backup",
      "Authentication – Login System",
      "Non-Repudiation – Signature Verification",
      "Accountability – Audit Logging",
    ],
  },
  {
    id: 2,
    title: "Practical 2 – OS Security",
    topics: [
      "User Authentication – Password Hashing",
      "Role-Based File Access",
      "File Encryption using AES (Fernet)",
      "File Integrity Checker",
      "Basic IP Firewall Simulation",
      "Activity Logging",
      "Simulate Memory Allocation",
      "Monitor Memory Usage",
      "Garbage Collection",
      "Paging Simulation",
      "Memory Leak Simulation",
      "Buffer Overflow Simulation",
    ],
  },
  {
    id: 3,
    title: "Practical 3 – Public Key Cryptography (RSA)",
    topics: [
      "Generate Sender and Receiver Keys",
      "Sender Encryption and Signing",
      "Receiver Decryption and Verification",
    ],
  },
  {
    id: 4,
    title: "Practical 4 – Database Security",
    topics: [
      "SQL Injection and Prevention",
      "Password Hashing using bcrypt",
      "Role-Based Access Control",
      "Encrypted Data Storage",
    ],
  },
  {
    id: 6,
    title: "Practical 6 – Cloud Security",
    topics: [
      "Time-Limited Secure File Access",
      "Client-Side Encrypted Cloud Backup",
      "Intrusion Detection System for Cloud Logs",
      "Invisible Watermarking",
    ],
  },
  {
    id: 7,
    title: "Practical 7 – IoT Security",
    topics: [
      "AES Encryption for IoT Sensor Data",
      "HMAC for Data Integrity",
      "MQTT Communication with TLS",
      "Packet Sniffing in IoT Traffic",
    ],
  },
  {
    id: 8,
    title: "Practical 8 – Hashing, Collision and HMAC",
    topics: [
      "Toy Hash Collision Demonstration",
      "SHA-256 Hash and Avalanche Effect",
      "MAC / HMAC Example",
      "Another HMAC Example",
    ],
  },
];

const practical1Codes = [
`# TOPIC 1: CONFIDENTIALITY - FERNET ENCRYPTION

from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

message = "Top Secret Message!"

encrypted = cipher.encrypt(message.encode())
decrypted = cipher.decrypt(encrypted).decode()

print("Key:", key.decode())
print("Encrypted:", encrypted)
print("Decrypted:", decrypted)`,

`# TOPIC 2: INTEGRITY - SHA-256 HASHING

import hashlib

data = "This is important"

hash1 = hashlib.sha256(data.encode()).hexdigest()

tampered = "This is IMPORTANT"
hash2 = hashlib.sha256(tampered.encode()).hexdigest()

print("Hash1:", hash1)
print("Hash2:", hash2)
print("Integrity Verified?", hash1 == hash2)`,

`# TOPIC 3: AVAILABILITY - FILE BACKUP

import shutil

with open("data.txt", "w") as f:
    f.write("This is some important data.")

original_file = "data.txt"
backup_file = "backup_data.txt"

shutil.copyfile(original_file, backup_file)

print("Backup completed!")`,

`# TOPIC 4: AUTHENTICATION - LOGIN SYSTEM

users = {
    "admin": "Manasvi21",
    "user1": "123"
}

username = input("Enter username: ")
password = input("Enter password: ")

if users.get(username) == password:
    print("Access granted")
else:
    print("Access denied")`,

`# TOPIC 5: NON-REPUDIATION - SIGNATURE VERIFICATION

import hashlib

message = "Approve $5000 transfer"

signature = hashlib.sha256(message.encode()).hexdigest()

received_message = "Approve $5000 transfer"

received_signature = hashlib.sha256(
    received_message.encode()
).hexdigest()

print("Signature Verified:", signature == received_signature)`,

`# TOPIC 6: ACCOUNTABILITY - AUDIT LOGGING

import datetime

def log_action(user, action):
    timestamp = datetime.datetime.now()

    with open("audit_log.txt", "a") as log:
        log.write(f"{timestamp} - {user}: {action}\\n")

    print(f"{timestamp} - {user}: {action}")

log_action("admin", "Logged In")
log_action("user1", "Viewed Report")`,
];

const practical2Codes = [
`# TOPIC 1: USER AUTHENTICATION - PASSWORD HASHING

import hashlib

users = {}

def hash_pass(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register(username, password):
    users[username] = hash_pass(password)
    print("Registered Successfully!")

def login(username, password):
    if users.get(username) == hash_pass(password):
        print("Access Granted!")
    else:
        print("Access Denied!")

register("admin", "securepass")
login("admin", "securepass")
login("admin", "wrongpass")`,

`# TOPIC 2: ROLE-BASED FILE ACCESS

permissions = {
    "admin": ["read", "write"],
    "guest": ["read"]
}

def access_file(role, action):
    if action in permissions.get(role, []):
        print(f"{role} can {action} the file")
    else:
        print(f"{role} cannot {action} the file")

access_file("admin", "write")
access_file("guest", "write")`,

`# TOPIC 3: FILE ENCRYPTION USING AES (FERNET)

from cryptography.fernet import Fernet
import os

print("========== FILE ENCRYPTION ==========")

if not os.path.exists("example.txt"):
    with open("example.txt", "w") as f:
        f.write("This is a sample file for encryption.")

key = Fernet.generate_key()

with open("filekey.key", "wb") as filekey:
    filekey.write(key)

def encrypt_file(filename):
    with open("filekey.key", "rb") as filekey:
        key = filekey.read()

    fernet = Fernet(key)

    with open(filename, "rb") as file:
        data = file.read()

    encrypted = fernet.encrypt(data)

    with open(filename, "wb") as file:
        file.write(encrypted)

    print("File Encrypted Successfully!")

encrypt_file("example.txt")`,

`# TOPIC 4: FILE INTEGRITY CHECKER

import hashlib

def get_fhash(filename):
    with open(filename, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

original_hash = get_fhash("example.txt")
current_hash = get_fhash("example.txt")

if original_hash == current_hash:
    print("File is intact")
else:
    print("File has been changed")`,

`# TOPIC 5: BASIC IP FIREWALL SIMULATION

blocked_ips = [
    "192.168.1.100",
    "10.0.0.5"
]

def check_access(ip):
    if ip in blocked_ips:
        print(f"Access Denied for {ip}")
    else:
        print(f"Access Granted for {ip}")

check_access("192.168.1.100")
check_access("8.8.8.8")`,

`# TOPIC 6: ACTIVITY LOGGING

import datetime

def log_activity(user, action):
    with open("access_log.txt", "a") as logfile:
        current_time = datetime.datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        logfile.write(
            f"[{current_time}] {user} -> {action}\\n"
        )

log_activity("admin", "Accessed settings")
log_activity("guest", "Tried to delete files")

print("Activities Logged Successfully!")
print("Check access_log.txt file.")`,

`# TOPIC 7: SIMULATE MEMORY ALLOCATION

memory = [None] * 100

def allocate(process_id, size):
    for i in range(len(memory) - size + 1):
        if all(block is None for block in memory[i:i + size]):
            for j in range(i, i + size):
                memory[j] = process_id
            return f"Allocated {size} blocks to {process_id} at position {i}"

    return "No sufficient memory"

def deallocate(process_id):
    count = memory.count(process_id)

    for i in range(len(memory)):
        if memory[i] == process_id:
            memory[i] = None

    return f"Deallocated {count} blocks from {process_id}"

print(allocate("P1", 10))
print(allocate("P2", 20))
print(deallocate("P1"))`,

`# TOPIC 8: MONITOR MEMORY USAGE

import os
import psutil

process = psutil.Process(os.getpid())

print(
    f"Current Memory Usage: "
    f"{process.memory_info().rss / (1024 ** 2):.2f} MB"
)`,

`# TOPIC 9: GARBAGE COLLECTION

import gc
import sys

a = [1] * (10 ** 6)

print("Memory used:", sys.getsizeof(a), "bytes")

del a
gc.collect()

print("Garbage collected")`,

`# TOPIC 10: PAGING SIMULATION

import math

def paging_simulator(process_size, page_size):
    num_pages = math.ceil(process_size / page_size)

    page_table = {
        f"Page {i}": f"Frame {i}"
        for i in range(num_pages)
    }

    return page_table

table = paging_simulator(1024, 256)

for page, frame in table.items():
    print(f"{page} -> {frame}")`,

`# TOPIC 11: MEMORY LEAK SIMULATION

import tracemalloc

tracemalloc.start()

def leak_memory():
    leaky_list = []

    for _ in range(100000):
        leaky_list.append("leak" * 1000)

    return leaky_list

leak_memory()

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics("lineno")

print("Memory Leak Detected at:")

for stat in top_stats[:3]:
    print(stat)`,

`# TOPIC 12: BUFFER OVERFLOW SIMULATION

def safe_array_write(array, index, value):
    if index < len(array):
        array[index] = value
        return "Value written"
    else:
        return "Buffer Overflow Attempt!"

arr = [0] * 5

print(safe_array_write(arr, 2, 10))
print(safe_array_write(arr, 10, 10))`,
];

const practical3Codes = [
`# PRACTICAL 3: GENERATE SENDER AND RECEIVER RSA KEYS

from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

sender_private = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)
sender_public = sender_private.public_key()

with open("sender_private_key.pem", "wb") as f:
    f.write(sender_private.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

with open("sender_public_key.pem", "wb") as f:
    f.write(sender_public.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ))

receiver_private = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)
receiver_public = receiver_private.public_key()

with open("receiver_private_key.pem", "wb") as f:
    f.write(receiver_private.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

with open("receiver_public_key.pem", "wb") as f:
    f.write(receiver_public.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ))

print("All RSA keys generated and saved successfully!")`,

`# PRACTICAL 3: SENDER ENCRYPTION AND SIGNING

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

with open("receiver_public_key.pem", "rb") as f:
    receiver_public_key = serialization.load_pem_public_key(f.read())

with open("sender_private_key.pem", "rb") as f:
    sender_private_key = serialization.load_pem_private_key(
        f.read(), password=None
    )

user_input = input("Enter the message you want to encrypt and sign: ")
message = user_input.encode("utf-8")

encrypted_message = receiver_public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

signature = sender_private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)

with open("encrypted_message.bin", "wb") as f:
    f.write(encrypted_message)

with open("signature.bin", "wb") as f:
    f.write(signature)

print("Message encrypted and signed successfully.")`,

`# PRACTICAL 3: RECEIVER DECRYPTION AND VERIFICATION

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

with open("receiver_private_key.pem", "rb") as f:
    receiver_private_key = serialization.load_pem_private_key(
        f.read(), password=None
    )

with open("sender_public_key.pem", "rb") as f:
    sender_public_key = serialization.load_pem_public_key(f.read())

with open("encrypted_message.bin", "rb") as f:
    encrypted_message = f.read()

with open("signature.bin", "rb") as f:
    signature = f.read()

decrypted_bytes = receiver_private_key.decrypt(
    encrypted_message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

original_message = decrypted_bytes.decode("utf-8")
print("Decrypted Message:", original_message)

choice = input("Do you want to tamper with the message? (y/n): ").strip().lower()

if choice == "y":
    altered_text = input("Enter the new/altered message: ")
    message_to_verify = altered_text.encode("utf-8")
else:
    message_to_verify = decrypted_bytes

try:
    sender_public_key.verify(
        signature,
        message_to_verify,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    print("Signature Verified: Message is authentic and untampered!")

except InvalidSignature:
    print("SECURITY ALERT: Signature Verification Failed!")`,
];

const practical4Codes = [
`# PRACTICAL 4: SQL INJECTION AND PREVENTION

import sqlite3

conn = sqlite3.connect("students.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    username TEXT,
    password TEXT
)
""")

cursor.execute(
    "SELECT * FROM users WHERE username=?",
    ("admin",)
)

if cursor.fetchone() is None:
    cursor.execute(
        "INSERT INTO users VALUES (?, ?)",
        ("admin", "admin_password")
    )
    conn.commit()

username = input("Enter username: ")
password = input("Enter password: ")

query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
cursor.execute(query)

result = cursor.fetchone()
print(result)

if result:
    print("Login successful!")
else:
    print("Invalid credentials!")

conn.close()`,

`# PRACTICAL 4: PASSWORD HASHING USING BCRYPT

import sqlite3
import bcrypt

conn = sqlite3.connect("secure_users.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    username TEXT,
    password BLOB
)
""")

conn.commit()

username = input("Enter username: ")
raw_password = input("Enter password: ")

hashed_password = bcrypt.hashpw(
    raw_password.encode(),
    bcrypt.gensalt()
)

cursor.execute(
    "INSERT INTO users VALUES (?, ?)",
    (username, hashed_password)
)

conn.commit()

login_user = input("Username to login: ")
login_pwd = input("Password to login: ")

cursor.execute(
    "SELECT password FROM users WHERE username = ?",
    (login_user,)
)

data = cursor.fetchone()
print("Stored Password Hash:", data)

if data and bcrypt.checkpw(login_pwd.encode(), data[0]):
    print("Login successful!")
else:
    print("Login failed!")

conn.close()`,

`# PRACTICAL 4: ROLE-BASED ACCESS CONTROL

import sqlite3

conn = sqlite3.connect("rbac.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    username TEXT,
    password TEXT,
    role TEXT
)
""")

cursor.execute(
    "INSERT INTO users VALUES ('admin', 'admin_pwd', 'admin')"
)
cursor.execute(
    "INSERT INTO users VALUES ('john', 'john_pwd', 'student')"
)

conn.commit()

username = input("Enter username: ")
password = input("Enter password: ")

cursor.execute(
    "SELECT role FROM users WHERE username = ? AND password = ?",
    (username, password)
)

user = cursor.fetchone()

if user:
    role = user[0]
    print(f"Login successful! Your role is: {role}")

    if role == "admin":
        print("Access granted to view, add, delete and modify records.")
    elif role == "student":
        print("Access granted to view records.")
    else:
        print("Limited access.")
else:
    print("Invalid credentials!")

conn.close()`,

`# PRACTICAL 4: ENCRYPTED DATA STORAGE

from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

data = "Confidential Information"

encrypted_data = cipher.encrypt(data.encode())
print("Encrypted data:", encrypted_data)

decrypted_data = cipher.decrypt(encrypted_data).decode()
print("Decrypted data:", decrypted_data)`,
];

const practical6Codes = [
`# PRACTICAL 6: TIME-LIMITED SECURE FILE ACCESS

from flask import Flask, send_file, request, abort
from datetime import datetime, timedelta
import secrets

app = Flask(__name__)

TOKENS = {}

@app.route("/generate_link")
def generate_link():
    token = secrets.token_urlsafe(16)
    expiry = datetime.now() + timedelta(seconds=30)
    TOKENS[token] = expiry

    return f"""
    Temporary link created. Use it within 30 seconds:<br><br>
    <a href="/download?token={token}">Download Link</a>
    """

@app.route("/download")
def download():
    token = request.args.get("token")

    if token in TOKENS:
        if datetime.now() < TOKENS[token]:
            return send_file("sample.txt", as_attachment=True)
        else:
            return "Link expired. Please generate a new one."

    abort(403)

if __name__ == "__main__":
    app.run(debug=True)`,

`# PRACTICAL 6: CLIENT-SIDE ENCRYPTED CLOUD BACKUP

from cryptography.fernet import Fernet
import os
import shutil

os.makedirs("cloud_backup", exist_ok=True)

key = Fernet.generate_key()
fernet = Fernet(key)

with open("aes.key", "wb") as kf:
    kf.write(key)

def encrypt_file(file_path):
    with open(file_path, "rb") as f:
        data = f.read()

    encrypted_data = fernet.encrypt(data)

    encrypted_file_path = "enc_" + os.path.basename(file_path)

    with open(encrypted_file_path, "wb") as ef:
        ef.write(encrypted_data)

    shutil.copy(
        encrypted_file_path,
        os.path.join("cloud_backup", encrypted_file_path)
    )

    print(f"Encrypted and uploaded: {encrypted_file_path}")

if __name__ == "__main__":
    input_file = "sample_file.txt"

    if not os.path.exists(input_file):
        with open(input_file, "w") as f:
            f.write("Confidential Cloud Backup File")

    encrypt_file(input_file)`,

`# PRACTICAL 6: INTRUSION DETECTION SYSTEM FOR CLOUD LOGS

import json
from datetime import datetime

blacklisted_ips = ["192.168.1.10", "10.0.0.5"]

with open("access_logs.json") as f:
    logs = json.load(f)

failed_attempts = {}

print("\\nIntrusion Detection Log Analysis:\\n")

for entry in logs:
    user = entry["user"]
    ip = entry["ip"]
    time = datetime.strptime(
        entry["timestamp"], "%Y-%m-%d %H:%M:%S"
    )
    status = entry["status"]

    if ip in blacklisted_ips:
        print(f"ALERT: Access from blacklisted IP {ip} by user '{user}'")

    if not (8 <= time.hour <= 18):
        print(f"Off-hour login attempt by '{user}' at {time.strftime('%H:%M')}")

    if status == "failed":
        failed_attempts[user] = failed_attempts.get(user, 0) + 1

        if failed_attempts[user] >= 2:
            print(f"User '{user}' has {failed_attempts[user]} failed login attempts!")

print("\\nLog scan completed.\\n")`,

`# PRACTICAL 6: INVISIBLE WATERMARKING

import hashlib
import os
import shutil

os.makedirs("cloud_upload", exist_ok=True)

def watermark_text(file_path, user_id):
    with open(file_path, "r") as f:
        content = f.read()

    watermark = (
        f"\\n<!--USER-ID: "
        f"{hashlib.sha256(user_id.encode()).hexdigest()}-->"
    )

    watermarked_file = "wm_" + os.path.basename(file_path)

    with open(watermarked_file, "w") as f:
        f.write(content + watermark)

    cloud_path = os.path.join("cloud_upload", watermarked_file)
    shutil.copy(watermarked_file, cloud_path)

    print(f"File watermarked and uploaded to: {cloud_path}")

if __name__ == "__main__":
    input_file = "sample_file.txt"

    if not os.path.exists(input_file):
        with open(input_file, "w") as f:
            f.write("This is confidential content for cloud storage.")

    watermark_text(input_file, user_id="user123")`,
];

const practical7Codes = [
`# PRACTICAL 7: AES ENCRYPTION FOR IoT SENSOR DATA

from Crypto.Cipher import AES
import base64

key = b"ThisIsA16ByteKey"

cipher = AES.new(key, AES.MODE_EAX)

sensor_data = "Temperature: 28C"

ciphertext, tag = cipher.encrypt_and_digest(sensor_data.encode())
nonce = cipher.nonce

print("Encrypted Data:", base64.b64encode(ciphertext).decode())

cipher_dec = AES.new(key, AES.MODE_EAX, nonce=nonce)

decrypted_data = cipher_dec.decrypt(ciphertext).decode()

print("Decrypted Data:", decrypted_data)`,

`# PRACTICAL 7: HMAC FOR DATA INTEGRITY

import hmac
import hashlib

secret_key = b"iot_secret_key"

message = b"Humidity: 70%"

hmac_digest = hmac.new(
    secret_key,
    message,
    hashlib.sha256
).hexdigest()

print("Message:", message.decode())
print("Generated HMAC:", hmac_digest)

received_hmac = hmac.new(
    secret_key,
    message,
    hashlib.sha256
).hexdigest()

if hmac.compare_digest(hmac_digest, received_hmac):
    print("Message is authentic")
else:
    print("Message tampered!")`,

`# PRACTICAL 7: MQTT COMMUNICATION WITH TLS SECURITY

import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("iot/device1")

def on_message(client, userdata, msg):
    print("Received:", msg.topic, msg.payload.decode())

client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message

client.tls_set()

client.connect("test.mosquitto.org", 8883, 60)

client.loop_start()

client.publish("iot/device1", "Secure Temperature Data: 25C")`,

`# PRACTICAL 7: PACKET SNIFFING IN IoT TRAFFIC

from scapy.all import sniff

def packet_callback(packet):
    if packet.haslayer("IP"):
        src = packet["IP"].src
        dst = packet["IP"].dst

        print(f"[IP Packet] {src} -> {dst}")

    if packet.haslayer("Raw"):
        payload = packet["Raw"].load
        print("Payload:", payload)

print("Sniffing IoT traffic... Press Ctrl+C to stop")

sniff(prn=packet_callback, count=10)`,
];

const practical8Codes = [
`# PRACTICAL 8: TOY HASH COLLISION DEMONSTRATION

def toy_hash(b: bytes) -> int:
    return sum(b) % 256

def make_base_certs():
    cert1_txt = \`-----BEGIN CERTIFICATE-----
Subject: CN=Alice Example
Issuer: Test CA
PublicKey: AAAAB3NzaC1yc2EAAAADAQABAAABAQCu
-----END CERTIFICATE-----
\`

    cert2_txt = \`-----BEGIN CERTIFICATE-----
Subject: CN=Bob Example
Issuer: Test CA
PublicKey: AAAAB3NzaC1yc2EAAAADAQABAAABAQCu
-----END CERTIFICATE-----
\`

    return cert1_txt.encode("utf-8"), cert2_txt.encode("utf-8")

def pad_to_match(hash_target, current_bytes, prefix=b""):
    cur = (sum(current_bytes) + sum(prefix)) % 256
    needed = (hash_target - cur) % 256

    if needed == 0:
        return b""

    return bytes([needed])

def main():
    cert1, cert2 = make_base_certs()

    h1 = toy_hash(cert1)
    h2 = toy_hash(cert2)

    print("Initial toy hashes:")
    print("cert1 hash:", h1)
    print("cert2 hash:", h2)

    prefix = b"\\n#PAD:"
    padding = pad_to_match(h1, cert2, prefix)

    cert2_padded = cert2 + prefix + padding

    print("\\nAfter padding cert2:")
    print("cert1 length:", len(cert1), "hash:", toy_hash(cert1))
    print("cert2 length:", len(cert2_padded), "hash:", toy_hash(cert2_padded))

    print("Are bytes identical?:", cert1 == cert2_padded)
    print("Do they collide under toy_hash?:", toy_hash(cert1) == toy_hash(cert2_padded))

    with open("cert1_demo.pem", "wb") as f:
        f.write(cert1)

    with open("cert2_demo_padded.pem", "wb") as f:
        f.write(cert2_padded)

    print("Files created successfully!")
    print("Files differ, but toy_hash is the same.")

if __name__ == "__main__":
    main()`,

`# PRACTICAL 8: SHA-256 HASH AND AVALANCHE EFFECT

import hashlib

message = b"Hello Security Students"

hash_digest = hashlib.sha256(message).hexdigest()

print("SHA-256 Hash:", hash_digest)

message2 = b"hello Security Students"

print(
    "Changed message hash:",
    hashlib.sha256(message2).hexdigest()
)`,

`# PRACTICAL 8: MAC / HMAC EXAMPLE

import hmac
import hashlib

secret_key = b"shared_secret"

message = b"Important Transaction: $500"

mac = hmac.new(
    secret_key,
    message,
    hashlib.sha256
).hexdigest()

print("Message:", message.decode())
print("HMAC-SHA256:", mac)`,

`# PRACTICAL 8: ANOTHER HMAC EXAMPLE

import hmac
import hashlib

key = b"super_secret_key"

msg = b"Authenticate this message"

hmac_digest = hmac.new(
    key,
    msg,
    hashlib.sha256
).hexdigest()

print("HMAC:", hmac_digest)`,
];

function App() {
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState("");

  const togglePractical = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const copyCode = async (code, name) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(name);
      setTimeout(() => setCopied(""), 2000);
    } catch (error) {
      alert("Unable to copy. Please copy the code manually.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Google classroom link</h1>
        <p>
          FYBIO
          <br />
          NEUROLOGY
        </p>
      </header>

      <main className="container">
        <h2>student list</h2>

        {practicals.map((practical) => (
          <div className="practical-card" key={practical.id}>
            <div
              className="practical-header"
              onClick={() => togglePractical(practical.id)}
            >
              <h3>{practical.title}</h3>
              <span>{expanded === practical.id ? "−" : "+"}</span>
            </div>

            {expanded === practical.id && (
              <div className="topics">
                {practical.topics.map((topic, index) => {
                  let code = `# ${topic}\\n\\n# Code will be added here.`;

                  if (practical.id === 1) code = practical1Codes[index];
                  if (practical.id === 2) code = practical2Codes[index];
                  if (practical.id === 3) code = practical3Codes[index];
                  if (practical.id === 4) code = practical4Codes[index];
                  if (practical.id === 6) code = practical6Codes[index];
                  if (practical.id === 7) code = practical7Codes[index];
                  if (practical.id === 8) code = practical8Codes[index];

                  const buttonName = `${practical.id}-${index}`;

                  return (
                    <div className="topic-card" key={index}>
                      <h4>
                        {index + 1}. {topic}
                      </h4>

                      <button className="copy-btn" onClick={() => copyCode(code, buttonName)}>
                        {copied === buttonName ? "Copied!" : "Copy Code"}
                      </button>

                      <pre>
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </main>

      <footer>
        <p>CIS Practical Code Library</p>
      </footer>
    </div>
  );
}

export default App;