import os
import requests
from urllib.parse import quote
from dotenv import load_dotenv
import urllib3

# Disable SSL warning

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

class Helper:
    """Helper class for images and map url"""

    def __init__(self):
        self.pexel_api_key = os.getenv("PEXELS_API_KEY")

    def search_images(self, query:str, num_results:int = 1) -> list:
        if not (self.pexel_api_key):
            return [f"https://source.unsplash.com/800x600/?{quote(query)}"]

        try:
            url = "https://api.pexels.com/v1/search"
            headers = {
                'Authorization' : self.pexel_api_key.strip()
            }
            params = {
                'query':query,
                'per_page':num_results,
                'orientation':'landscape'
            }

            response = requests.get(url, headers=headers, params=params, timeout=10, verify=False)

            if(response.status_code == 200):
                results = response.json()
                images = []

                for photo in results.get('photos',[]):

                    image_url = photo.get('src', {}).get('large','')
                    if image_url:
                        images.append(image_url)

                if images:
                    print(f"Found the image for : {query}")
                    return images
                
                else:
                    print(f"No pexel image found, using unsplash for :{query}")
                    return [f"https://source.unsplash.com/800x600/?{quote(query)}"]
                
            else:
                print(f"Pexel API error {response.status_code}, using unsplash")
                return [f"https://source.unsplash.com/800x600/?{quote(query)}"]
            
        except Exception as e:
            print(f"Pexel error : {e}, using Unsplash now")
            return [f"https://source.unsplash.com/800x600/?{quote(query)}"]
        
    def get_maps_link(self, place_name:str, city:str = "") -> str:
        query = f"{place_name},{city}".strip(",")
        encoded_query = quote(query)

        return f"https://www.google.com/maps/search/?api=1&query={encoded_query}"