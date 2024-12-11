## Login

```
(POST) /auth/login
```

### Body

- **_Username_**: `String` _(cannot contain spaces)_
- **_Password_**: `String` _(minimum 8 characters, cannot contain spaces)_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/auth/login/`, {
    method: "POST",
    headers: {
        "Content-Type": "Application/json"
    },
    body: JSON.stringify({
        username: "el_atla",
        password: "12345678",
    })
});
```

### Example Response

```json
{
    "success": "Logged in succesfully!",
    "data": {
        "user": {
            "_id": "6754c8fcec7ab896088b710b",
            "username": "el_atla",
            "email": "elatla@tlas.online"
        },
        "token": "..."
    }
}
```

## Register

```
(POST) /auth/register
```

### Body

- **_Username_**: `String` _(cannot contain spaces)_
- **_Password_**: `String` _(minimum 8 characters, cannot contain spaces)_
- **_Email_**: `String` _(email format)_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
        "Content-Type": "Application/json"
    },
    body: JSON.stringify({
        username: "el_atla",
        password: "12345678",
    })
});
```

### Example Response 

```json
{
    "success": "User created successfully!"
}
```

## Create Chat

```
(POST) /messages/chats
```

### Body

**_Target_**: `ObjectId` _(references 'user')_

### Params

_None_

### Example Request
```ts
const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        target: "67560c703f1af4b512279772"
    })
});
```

### Example Response
```json
{
    "success": "Chat created successfully!",
    "data": {
        "chat_id": "67561f39a2fb58994b566dee"
    }
}
```

## Get Chats

```
(GET) /messages/chats
```

### Body

_None_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/auth/register`, {
    headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
    },
});
```

### Example Response 

```json
{
    "success": "Found Chats!",
    "data": [
        {
            "_id": "67561f39a2fb58994b566dee",
            "users": [{ // This array excludes user's self username
                "username": "el_dolar" 
            }],
            "__v": 0,
            "last_message": {
                "datetime_sent": "2024-12-08T23:06:33.117Z",
                "content": "E",
                "author": {
                    "username": "el_atla"
                }
            }
        }
    ]
}
```

## Send Message

```
(POST) /messages/message
```

### Body

   - **_Content_**: `String` _(limits to 512 characters)_ 
   - **_Chat_**: `ObjectId` _(references 'chat')_
   - **_Datetime Sent_**: `string` _(`Date` formatted as `String`, if null defaults to `Date.now()`)_
   - **_Type_**: `String` _(limited to "text" or "image")_

### Params

_None_

### Example Request (text)

```ts
const response = await fetch(`${url}/messages/message`, {
    method: "POST",
    headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
    }
    body: JSON.stringify({
        content: "Test Message",
        chat: "67561f39a2fb58994b566dee",
        datetime_sent: "2024-12-08T23:06:33.117Z",
        type: "text"
    })
});
```

### Example Response (text)

```json
{
    "success": "Message sent successfully!"
}
```
### TODO: Example Request and Response with image

## Get Messages

```
(GET) /messages/chat/:chat_id
```

### Body
   
   _None_

### Params

   - **_Chat ID_**: `ObjectId` _(references 'chat')_

### Example Request

```ts
const response = await fetch(`${url}/messages/chat/${message_id}`, {
    headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${token}`
    }
});
```

### Example Response

```json
{
    "success": "Found Messages!",
    "data": [
        {
            "_id": "67562b11eec80f1b6a6473b5",
            "datetime_sent": "2024-12-08T23:06:33.117Z",
            "content": "Test message",
            "chat": "67561f39a2fb58994b566dee",
            "author": "6754c8fcec7ab896088b710b",
            "type": "text"
        }
    ]
}
```
## Get Match Feed

```
(GET) /api/match/get/:page
```

### Body

_None_

### Params

**_Page_**: `Number` 

### Example Request
```ts
const response = await fetch(`${url}/match/get/${page}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "Application/json"
    },
});
```

### Example Response
```json
{
    "success": "Found Users!",
    "data": {
        "people": [
            {...},
            {...},
            {...}
        ],
        "next": "/api/match/get/2"
    }
}
```


## Like User

```
(POST) /api/match/like
```

### Body

**_Target_**: `ObjectId` _(references 'user')_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/match/like`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "Application/json"
    },
    body: JSON.stringify({
        target: "51823ba3421324234"
    })
});
```

### Example Response

```json
{
    "success": "Like sent successfully!"
}
```

## Get User Info

```
(GET) /api/user/:target
```

### Body

_None_

### Params

**_Target_**: `ObjectId` _(references 'user', leave null for user's own data)_

### Example Request

```ts
const response = await fetch(`${url}/user/${targetId}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "Application/json"
    },
});
```

### Example Response

```json
{
    "_id": "51823ba3421324234",
    "username": "el_atla",
    "info": {
        "full_name": "Atlina garcia",
        "bio": "insert bio",
        "gender": "male",
        "birthdate": "2004-08-18T00:00:00",
        "country": {
            "_id": "9123749127b9187239826234",
            "name": "Venezuela"
        },
        "photos": [
            "https://is.zobj.net/image-server/v1/images?r=gYzSI8o-5BkyuE3rfiUbjlO7pVEZ7mXOSR8_nAL7nqyBa8TDqTG78W-JAeNfF1zbGX8uDf-d6oxuy9AUd1atyEOp7wGz5CAx2eHa7lYmukuwxUnHoYxazo3MAayebFTB12tPi85-9L3iOwZ5qX2qYn9hPJaWodjPNT2CjvBSCXt8mETRR9kLLZL7O3GZbOjjkKtoIcnw37rWAaicgyAMkdaex4kgrjSctoeXlA"
        ]
    }
}
```
 
## Update info

```
(PUT) /api/user/
```

## Body
  - **_Full Name_**: `String` _(limits to 96 characters)_
  - **_Bio_**: `String` _(limits to 512 characters)_
  - **_Gender_**: `String` _(limits to 'male', 'female', and 'other')_
  - **_Birthdate_**: `String` _(`Date` formmated as `String`)_
  - **_Country_**: `ObjectId` _(references 'country')_
  - **_Photos_**: `String[]` _(array of image url(s))_

## Example Request

```ts
const birthdate = new Date('2004-08-18T00:00:00');
const response = await fetch(`${url}/user`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "Application/json"
    },
    body: JSON.stringify({
        full_name: "Atlina Eduarda Garcia Velasques",
        bio: "I'm just a girl",
        gender: "female",
        birthdate: birthdate.toString(),
        country: "9123749127b9187239826234" ,
        photos: [
            "https://is.zobj.net/image-server/v1/images?r=gYzSI8o-5BkyuE3rfiUbjlO7pVEZ7mXOSR8_nAL7nqyBa8TDqTG78W-JAeNfF1zbGX8uDf-d6oxuy9AUd1atyEOp7wGz5CAx2eHa7lYmukuwxUnHoYxazo3MAayebFTB12tPi85-9L3iOwZ5qX2qYn9hPJaWodjPNT2CjvBSCXt8mETRR9kLLZL7O3GZbOjjkKtoIcnw37rWAaicgyAMkdaex4kgrjSctoeXlA"
        ]
    })
});
```

## Example Response

```json
{
    "success": "User info updated successfully!"
}
```