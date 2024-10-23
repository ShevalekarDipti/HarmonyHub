import json
import pandas as pd

def load_json(file_path):
    # Load JSON data from the specified file path
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


# The titles such as 24\/7 were not getting normalized correctly because the / was interpreted as an escape character
# To resolve that issue, replace / with \/ so that the real string is considered and not interpreted as an escape character
def avoid_slash(value):
    if isinstance(value, str):
        # isinstance(): This is a Python function that checks if a given object is an instance of a given type
        return value.replace("/", "\\/") 
    return value

def normalize_data(json_data):
    #empty dict- used to store the normalized data
    normalized_data = []
    
    # converting the keys in the json_data i.e the json file to a list 
    key_order = list(json_data.keys())

    # looping through the id to track the data and normalize it
    for i in range(len(json_data['id'])):
        normalized_item = {}
        #additional line to add the index column this is based on loop

        #normalize_row['id']=i+1
        normalized_item['index'] = i

        for key in key_order:
            # additional measure is taken to avoid the slashes even if in any other column than title
            if key == 'title':  
                normalized_item[key] = avoid_slash(json_data[key][str(i)])
            else:
                normalized_item[key] = json_data[key][str(i)]

        # Appending a new column called rating so that when the user gives a rating, it will be stored
        # The default value is set to 0, so the user initially sees no ratings
        normalized_item['rating'] = 0
        normalized_data.append(normalized_item)
    
    # Adding the  'rating' column  to keys if it does not exist
    if 'rating' not in key_order:
        key_order.append('rating')
    
    df = pd.DataFrame(normalized_data, columns=['index'] + key_order)  # Including the index in the columns 
    
    df.attrs['key_order'] = key_order
    return df

if __name__ == '__main__':
    
    json_data = load_json('playlist[76][36][48][6].json')
    
  
    normalized_df = normalize_data(json_data)
    
    # Printing the DataFrame to check the output
   # print(normalized_df)
