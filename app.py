from flask import Flask, jsonify, request
import sqlite3

import os

import urllib.request as urllib
import base64
import json
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (Mail, Attachment, FileContent, FileName, FileType, Disposition, ContentId)
import csv

import sendgrid_email_sender
app = Flask(__name__)


import BTC_Address_Generator as BAG




@app.route("/getBTCAddress", methods=["GET"])
def getBTCAddress():
    conn = sqlite3.connect("cab.db")
    c = conn.cursor()
    c.execute(
            '''SELECT address FROM BTCAddresses WHERE user_id=:u_id AND active=:active_status''', {'u_id':1, 'active_status':1}
            )
    res = c.fetchone()
    conn.close()
    if not res:
        address = generateBTCAddress()
    else:
        address = res
    address = address[0]
    return {"address":address}

def generateBTCAddress():
    stuff = BAG.generate_btc_wallet()
    user_address = stuff['address']
    conn = sqlite3.connect('cab.db')
    c = conn.cursor()
    c.execute(
            '''INSERT INTO BTCAddresses VALUES (?, ?, ?, ?, ?, ?)''', (1, user_address, stuff['private_key'], stuff['seed'], stuff['public_key'], 1)
            )
    conn.commit()
    conn.close()
    return user_address


@app.route("/generateNewAddress", methods=["GET"])
def generateNewAddress():
    conn = sqlite3.connect("cab.db")
    c = conn.cursor()
    c.execute(
            '''UPDATE BTCAddresses SET active = ? WHERE user_id = ?''', (0, 1)
            )
    conn.commit()
    conn.close()
    #fire generate new address, fire getBTCAddress, 2 x api calls
    return jsonify({'success': True})

@app.route("/showAllAddresses", methods=["GET"])
def showAllAddresses():
    conn = sqlite3.connect("cab.db")
    c = conn.cursor()
    c.execute(
            '''SELECT address FROM BTCAddresses WHERE user_id=:u_id''', {'u_id':1}
            )
    res = c.fetchall()
    conn.close
    return jsonify(res)

@app.route("/sendEmail", methods=["POST"])
def sendCSVViaEmail():
    d = request.data
    data = d.decode("utf-8")
    idx1 = data.index(":")
    idx2 = data.index("}")
    email = data[idx1+1:idx2]
    response = sendgrid_email_sender.send_email(email)
    
    return jsonify({"status":response})

if __name__ == "__main__":
    if not os.path.exists('cab.db'):
        conn = sqlite3.connect('cab.db')
        c = conn.cursor()
        c.execute(
                '''CREATE TABLE BTCAddresses (user_id, address, private_key, seed, public_key, active)'''
                )
        conn.commit()
        conn.close()
    
    app.run(debug = True)