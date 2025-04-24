import requests
from bs4 import BeautifulSoup

def main():
    html = requests.get('https://www.777723.xyz').text
    soup = BeautifulSoup(html, 'html.parser')
    value = soup.find('m', style="font-size: 2.8rem;color: red;").text.strip()
    
    requests.post(
        f'https://api.telegram.org/bot{os.environ['BOT_TOKEN']}/sendMessage',
        data={'chat_id': os.environ['CHAT_ID'], 'text': value}
    )

if __name__ == '__main__':
    main()
