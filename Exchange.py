class Exchange:
    def __init__(self):
        self.coins = {"Bitcoin":"BTC", "Ethereum":"ETH", "Litecoin":"LTC",
                      "Ripple":"XRP", "Stellar":"XLM"}
    
    def validation_check(self, coin):
        if coin not in self.coins.keys() and coin not in self.coins.values():
            raise Exchange.InvalidCoinError
    
    def get_coin_price(self, coin):
        self.validation_check(coin)
        
        if coin in self.coins.items():
            coin = self.coins[coin]
        return coin
    def get_deposit_address(self, coin):
        self.validation_check(coin)
        
        if coin in self.coins.items():
            coin = self.coins[coin]
        
    class InvalidCoinError(Exception):
        def __init__(self):
            pass
        
        def __str__(self):
            return "Invalid Coin Provided. Please enter a valid coin."