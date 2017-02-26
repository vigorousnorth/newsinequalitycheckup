import requests
from bs4 import BeautifulSoup
import csv

# this code is not at all dry, i'm sorry

def get_gothamist_marinepark_urls():
    print("scraping gothamist marine park")
    urls = ['http://gothamist.com/tags/marinepark/%s'%n for n in range(1,3)]

    articles = []
    for url in urls:
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.find_all("h2", class_="entry-title")

        for r in results:
            title = r.text
            url = r.find("a").get('href')
            new_row = {'title': title, 'url': url}
            articles.append(new_row)

    with open('gothamist_marinepark.csv', 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['title', 'url'])
        writer.writeheader()
        writer.writerows(articles)

def get_gothamist_williamsburg_urls():
    print("scraping gothamist williamsburg")
    urls = ['http://gothamist.com/tags/williamsburg/%s'%n for n in range(1,11)]

    articles = []
    for url in urls:
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.find_all("h2", class_="entry-title")

        for r in results:
            title = r.text
            url = r.find("a").get('href')
            new_row = {'title': title, 'url': url}
            articles.append(new_row)

    with open('gothamist_williamsburg.csv', 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['title', 'url'])
        writer.writeheader()
        writer.writerows(articles)





if __name__ == '__main__':
    get_gothamist_marinepark_urls()
    get_gothamist_williamsburg_urls()
