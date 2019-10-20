from API_KEYS import API_KEYS
from Exchange import Exchange
import requests
import hashlib
import time
import hmac
import base64

class OKEX(Exchange):
    def __init__(self):
        super().__init__()
        
        self.API_KEY = API_KEYS['OKEX_API_KEY']
        self.SECRET = API_KEYS['OKEX_SECRET']
        self.BASE_URL = "https://www.okex.com/"
    
    def get_coin_price(self, coin):
        url = self.BASE_URL+ "api/spot/v3/instruments/" + coin + "-USDT/ticker"
        r = requests.get(url).json()
        return r['last']


    def signature(self, timestamp, method, request_path, body, secret_key):
        if not body:
            body = ""
        
        message = str(timestamp) + str.upper(method) + request_path + str(body)
        
        mac = hmac.new(bytes(secret_key, encoding="utf-8"), 
                       bytes(message, encoding="utf-8"), digestmod='sha256')
        d = mac.digest()
        return base64.b64encode(d)


    def get_deposit_address(self, coin):
        
        times = self._get_timestamp()
        method = "GET"
        path = 'api/account/v3/currencies'
        body = ""
        
        sign = self.signature(times, method, path, body, self.SECRET)
    
        headers = {
                    "CONTENT_TYPE": "application/json", 
                    "OK-ACCESS-KEY": self.API_KEY,
                    "OK-ACCESS-SIGN": sign,
                    "OK-ACCESS-TIMESTAMP": times, 
                    "OK-ACCESS-PASSPHRASE": "ENGHACKS"
                }
        
        url = self.BASE_URL + path
        
        r = requests.get(url, headers=headers).json()
        return r
    

    
    def _get_timestamp(self):
        url = self.BASE_URL + "api/general/v3/time"
        r = requests.get(url).json()
        return r['epoch']
    
if __name__ == "__main__":
    o = OKEX()
    print(o.get_deposit_address("BTC"))