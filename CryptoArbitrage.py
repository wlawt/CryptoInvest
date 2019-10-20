import os
import API_KEYS

class InvalidAPIKey(Exception):
    def __init__(self):
        pass
    
    def __str__(self):
        return "The API Key you have entered is invalid."

class CryptoArbitrage:
    def __init__(self):
        pass
        
    def compare_price(self, coinA, coinB):
        pass
    
    def get_lowest_cost_coin(coinList):
        pass
    
    def get_transaction_speed(coinList):
        pass
        
    

c = CryptoArbitrage()
c.get_price("abc")

        