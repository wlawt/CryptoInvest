from API_KEYS import API_KEYS
from Exchange import Exchange
import requests
import hashlib
import time
import hmac

"""
Bittrex and Binance should only be responsible for making the request, withdrawing,
depositing, and trading.
Everything else should be handled by CryptoArbitrage.py
Similar methods/variables should go in Exchange.py, which other stuff extends.
"""

class Bittrex(Exchange):
    def __init__(self):
        super().__init__()
        
        self.API_KEY = API_KEYS["BITTREX_API_KEY"]
        self.SECRET = API_KEYS["BITTREX_SECRET"]
        self.BASE_URL = "https://api.bittrex.com/api/v1.1/"
        
        self.lst = self._make_request()
        print(self.lst)

    def _make_request(self):
        lst = []
        r = requests.get(self.BASE_URL + "/public/getcurrencies").json()
        
        for item in r['result']:
            if item["CurrencyLong"] in self.coins.keys() or item["Currency"] in self.coins.values():
                lst.append(item)
        return lst
    
    def get_coin_price(self, coin):
        coin = Exchange.get_coin_price(self, coin)
        
        r = requests.get(self.BASE_URL + "/public/getticker?market=USD-" + coin).json()
        return r['result']['Last']
    
    def get_deposit_address(self, coin):
        Exchange.get_deposit_address(self, coin)
        
        url = (self.BASE_URL + "account/getdepositaddress?apikey=" + 
               self.API_KEY + "&currency=" + coin 
               + "&nonce=" + str(time.time()))
        
        sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()

        
        headers = {'apisign':sign}
        r = requests.get(url, headers=headers).json()
        return r['result']["Address"]      
    
    def buy_coin(self, coin, amount, rate):
        
        url = (self.BASE_URL + "market/buylimit?apikey=" +self.API_KEY
               + "&market=USDT-" + coin + "&quantity=" + str(amount) + 
               "&rate=" + str(rate) + "&nonce=" + str(time.time()))
        
        sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()
        
        headers = {'apisign': sign}
        r = requests.get(url, headers=headers).json()
        
        return r["result"]["uuid"]
        
    def sell_coin(self, coin, amount, rate):
        url = (self.BASE_URL + "market/selllimit?apikey=" +self.API_KEY
               + "&market=USDT-" + coin + "&quantity=" + str(amount) + 
               "&rate=" + str(rate) + "&nonce=" + str(time.time()))
        
        sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()
        
        headers = {'apisign': sign}
        r = requests.get(url, headers=headers).json()
        
        return r["result"]["uuid"]
    
    def get_all_open_orders(self, market=None):
            if not market:
                url = (self.BASE_URL + "market/getopenorders?&apikey=" +self.API_KEY +
                       "&nonce=" + str(time.time()))
            else:
                url = (self.BASE_URL + "market/getopenorders?&apikey=" +self.API_KEY
                       + "&market=" + market + "&nonce=" + str(time.time()))
            
            sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()
            
            headers = {"apisign":sign}
            
            r = requests.get(url, headers=headers).json()
        
            return r["result"]
    
    def cancel_all_open_orders(self, orders):
        if not orders:
            return True
        
        for order in orders:
            url = (self.BASE_URL + "market/cancel?apikey=" + self.API_KEY + 
                   "&uuid=" + order["OrderUuid"] + "&nonce=" + str(time.time()))
            sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()
            
            headers = {"apisign":sign}
            
            r = requests.get(url, headers=headers).json()
        
        return r['success'] == True
        
    def check_deposit(self, uuid):
        pass
    
    def withdraw(self, coin, quantity, address, paymentid=None):
        if not all([coin, quantity, address]):
            raise Exception
        
        url = (self.BASE_URL + "account/withdraw?apikey=" + self.API_KEY + 
               "&currency=" + coin + "&quantity=" + quantity + "&address=" + address
               + "&nonce=" + str(time.time()))
        sign = hmac.new(bytes(self.SECRET,encoding='utf-8'),bytes
                        (url,encoding='utf-8'),hashlib.sha512).hexdigest()
        headers = {"apisign":sign}
        r = requests.get(url, headers=headers).json()
        return r
        
if __name__ == "__main__":
    b = Bittrex()
    print(b.withdraw("BTC", "", "blah"))