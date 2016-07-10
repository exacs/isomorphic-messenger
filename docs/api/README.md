---
title: API Reference
---

# Introduction

This is the API documentation for the backend of Isomorphic Messenger project.
It is not a public API nor a RESTful one. This API is specifically made to use
with the corresponding frontend client.

# Chats

This is the main resource of the application. All messages sent to the system
are grouped by chats.

## Get all messages of a chat

Use this to get all the messages of a given chat.

> HTTP request: `GET /api/chats/:chat_id/messages`

> Response

```json
[
  {
    "text": "Some text"
  },
  {
    "text": "Some other text"
  }
]
```

### Path parameters

Parameter | Default         | Description
--------- | --------------- | -----------
chat_id   | (required)      | Chat ID

## Write a message in a chat

Use this to write a message in a chat


> HTTP request: `POST /api/chats/:chat_id/messages`

> Request example

```json
{
  "text": "Hello World"
}
```

<aside class="warning">Will be deprecated in v1.6</aside>

### Path parameters

Parameter | Default         | Description
--------- | --------------- | -----------
chat_id   | (required)      | Chat ID

### Query parameters

Parameter | Default         | Description
--------- | --------------- | -----------
text      | (empty string)  | Text to be send

### Response

Code | Meaning
---- | -----------
201  | Message is correctly sent
400  | Problem with some arguments


# Messages

This is the main resource of the application. All messages sent to the system
can be accessed by a single `/messages` resource

<aside class="warning">Deprecated.</aside>

## Get all messages

Retrieve all the messages

<aside class="warning">Deprecated. Use <code>/api/chats/1/messages</code> instead</aside>

> HTTP request: `GET /api/messages`

> Response

```json
[
  {
    "text": "Some text"
  },
  {
    "text": "Some other text"
  }
]
```

## Send a message

<aside class="warning">Deprecated. Use <code>/api/chats/1/messages</code> instead</aside>

> HTTP request: `POST /api/messages`

> Request example

```json
{
  "text": "Hello World"
}
```

### Query parameters

Parameter | Default         | Description
--------- | --------------- | -----------
text      | (empty string)  | Text to be send

### Response

Code | Meaning
---- | -----------
201  | Message is correctly sent
400  | Problem with some arguments
