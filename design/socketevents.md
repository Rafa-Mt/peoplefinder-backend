# Triggered by user

## `join`

_Joins socket room_

### Params

  - **_Room_**: `ObjectId` _(references 'chat')_

### Example call
```ts
const chat = await getChat();
socketClient.emit('join', chat._id);
```

## `join-self`

_Joins self socket room for notifications_

### Example call

```ts
const self = await getUserInfo();
socketClient.emit('join-self', self._id);
```

# Triggered by server

## `message`

_When a message is sent to user_

### Params

  - **_Content_**: `String`
  - **_Type_**: `String` _('text' or 'image')_
  - **_Author_**: `String` _(Author's username)_
  - **_Chat_**: `ObjectId` _(References 'chat')_

### Example usage
```ts
socketClient.on('message', (content, type, author, chat) => {
    chats[chat].messages.push(content)
    toast(`${type} message recieved from ${chats[chat].user}`)
    // "text message recieved from {user}" 
    // or "image message recieved from {user}"
})
```

## `match`

### Params

  - **_From_**: `String` _(sender's username)_

### Example Usage
```ts
socketClient.on('match', (from) => {
    openDialog(`Matched with ${from}`)
})
```