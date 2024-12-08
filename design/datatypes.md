## User

### Properties:

- **__id_**: `ObjectId`  _(mongo unique identifier)_
- **_Username_**: `String` _(no spaces)_
- **_Password_**: `String` _(hashed)_
- **_Email_**: `String` _(email format)_
- **_Deleted_**: `Boolean` 

### Example:
```json
{
    "_id": "51823ba3421324234",
    "username": "el_atla",
    "email": "atla@tlas.online",
    "password": "12345678",
    "deleted": false
}
```
## Chat

### Properties:
- **__id_**: `ObjectId`  _(mongo unique identifier)_
- **_Users_**: `ObjectId[]`

### Example:
```json
{
    "_id": "14827364987126",
    "users": ["51823ba3421324234", "492837465928374658"]
}
```

## Message

### Properties:

- **__id_**: `ObjectId` _(mongo unique identifier)_
- **_Content_**: `String` _(limited to 512 characters)_
- **_Chat_**: `ObjectId`

```json
{
    "_id": "9523490769823ab1234734123",
    "content": "Test Message!",
    "chat": "9283647598bac023754d2"
}
```
