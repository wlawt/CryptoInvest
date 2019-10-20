from pywallet import wallet

def generate_btc_wallet():
    w = wallet.create_wallet()
    address = w['address']
    seed = w['seed']
    private_key = w['private_key']
    public_key = w['public_key']
    
    return {"address":address, "seed":seed, "private_key":private_key, "public_key":public_key}    
print(generate_btc_wallet())