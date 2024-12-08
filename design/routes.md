## Login

```
(GET) /auth/login
```

### Body

- **_Username_**: `String` _(cannot contain spaces)_
- **_Password_**: `String` _(minimum 8 characters, cannot contain spaces)_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/auth/login/`, {
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
(GET) /auth/register
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
<!--  
## Get User

```
(GET) /api/user/
```

### Body

_None_

### Params

_None_

### Example Request

```ts
const response = await fetch(`${url}/user/`, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "Application/json"
    },
});
```

### Example Response

```json
{

}
```
  -->