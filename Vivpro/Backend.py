import json
import pandas as pd
from collections import OrderedDict

def load_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def escape_slashes(value):
    """
    Ensures that slashes in the string are escaped properly.
    """
    if isinstance(value, str):
        return value.replace("/", "\\/")  # Replace `/` with `\/` to preserve the backslash
    return value

def normalize_data(json_data):
    normalized_data = []
    key_order = list(json_data.keys())  # Store original key order

    for i in range(len(json_data['id'])):
        normalized_item = OrderedDict()  # Use OrderedDict instead of dict
        
        # Assign the index based on the iteration
        normalized_item['index'] = i  # This will give you the index based on the loop

        for key in key_order:  # Use the stored key order
            # Apply escape_slashes to title field or any field that contains slashes
            if key == 'title':  
                normalized_item[key] = escape_slashes(json_data[key][str(i)])
            else:
                normalized_item[key] = json_data[key][str(i)]

        # Appending a new column called ratings so in future when the user gives rating it will be stored
        # I have kept the default value as 0 so that the user sees no ratings initially
        normalized_item['rating'] = 0
        normalized_data.append(normalized_item)
    
    # Append 'rating' to key_order if it does not exist
    if 'rating' not in key_order:
        key_order.append('rating')
    
    # Ensure the DataFrame uses the updated key order including 'index'
    df = pd.DataFrame(normalized_data, columns=['index'] + key_order)  # Include 'index' in the columns
    # Store the key order as an attribute of the DataFrame to maintain the order
    df.attrs['key_order'] = key_order
    return df

if __name__ == '__main__':
    json_data = load_json('playlist[76][36][48][6].json')
    normalized_df = normalize_data(json_data)
    print(normalized_df)
