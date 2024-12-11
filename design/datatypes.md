## User

### Properties:

- **__id_**: `ObjectId`  _(mongo unique identifier)_
- **_Username_**: `String` _(no spaces)_
- **_Password_**: `String` _(hashed)_
- **_Email_**: `String` _(email format)_
- **_Deleted_**: `Boolean`
- **_Info_**: `Record`
  - **_Biography_**: `String` _(limited to 512 characters)_
  - **_Gender_**: `String` _(limited to 'male', 'female' and 'other')_
  - **_Birthdate_**: `Date`
  - **_Country_**: `ObjectID` _(references 'country')_ 
  - **_Photos_**: `String[]` _(url to firebase image)_

### Example:
```json
{
    "_id": "51823ba3421324234",
    "username": "el_atla",
    "email": "atla@tlas.online",
    "password": "12345678",
    "deleted": false,
    "info": {
        "bio": "insert bio",
        "full_name": "Atlina garcia",
        "gender": "male",
        "birthdate": "Date(18-08-2004)",
        "country": "Venezuela",
        "photos": [
            "https://is.zobj.net/image-server/v1/images?r=gYzSI8o-5BkyuE3rfiUbjlO7pVEZ7mXOSR8_nAL7nqyBa8TDqTG78W-JAeNfF1zbGX8uDf-d6oxuy9AUd1atyEOp7wGz5CAx2eHa7lYmukuwxUnHoYxazo3MAayebFTB12tPi85-9L3iOwZ5qX2qYn9hPJaWodjPNT2CjvBSCXt8mETRR9kLLZL7O3GZbOjjkKtoIcnw37rWAaicgyAMkdaex4kgrjSctoeXlA"
        ]
    }
}
```
## Country

### Properties
  _Note: This data will not be created by user_
  - **__id_**: `ObjectId` _(mongo unique identifier)_
  - **_Name_**: `String`: _(limited to 128 characters)_

### Example
```json
{
    "_id": "0983247508bac293434",
    "name": "Venezuela"
}
```

## Chat

### Properties:
  - **__id_**: `ObjectId`  _(mongo unique identifier)_
  - **_Users_**: `ObjectId[]` _(references 'user')_
  - **_Last Message_**: `ObjectId` _(references 'message')_

### Example:
```json
{
    "_id": "148273649871262343242343",
    "users": [
        "51823ba34213248236856784", 
        "492837465976539028374658"
    ],
    "last_message": "9523490769823ab123473423"
}
```

## Like

### Properties

  - **__id_**: `ObjectId`  _(mongo unique identifier)_
  - **_User_**: `ObjectId` _(references 'user')_ 
  - **_Target_**: `ObjectId` _(references 'user')_ 

### Example

```json
{
    "_id": "373264872364acbe23479824",
    "user": "51823ba3421324234",
    "target": "492837465928374658"
}
```

## Message

### Properties:

- **__id_**: `ObjectId` _(mongo unique identifier)_
- **_Type_**: `String` _(limits to 'text' or 'image')_
- **_Content_**: `String` _(limited to 512 characters, in case of type 'image' contains image url)_
- **_Chat_**: `ObjectId` _(references 'chat')_
- **_Author_**: `ObjectId` _(references 'user')_
- **_Datetime Sent_**: `Date`

### Example (text):
```json
{
    "_id": "9523490769823ab1234734123",
    "chat": "9283647598bac023754d2",
    "datetime_sent": "Date(07-12-2024-03:43:54)", // Need formatting
    "author": "51823ba3421324234",
    "type": "text",
    "content": "Message!"
}
```

### Example (image):
```json
{
    "_id": "9523490769823ab1234734123",
    "chat": "9283647598bac023754d2",
    "type": "image",
    "datetime_sent": "Date(07-12-2024-03:44:04)", // Need formatting
    "author": "51823ba3421324234",
    "content": "https://is.zobj.net/image-server/v1/images?r=gYzSI8o-5BkyuE3rfiUbjlO7pVEZ7mXOSR8_nAL7nqyBa8TDqTG78W-JAeNfF1zbGX8uDf-d6oxuy9AUd1atyEOp7wGz5CAx2eHa7lYmukuwxUnHoYxazo3MAayebFTB12tPi85-9L3iOwZ5qX2qYn9hPJaWodjPNT2CjvBSCXt8mETRR9kLLZL7O3GZbOjjkKtoIcnw37rWAaicgyAMkdaex4kgrjSctoeXlA"
}
```