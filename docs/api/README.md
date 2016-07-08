---
title: API Reference
---

# Introduction

This is the API documentation for the backend of Isomorphic Messenger project.
It is not a public API nor a RESTful one. This API is specifically made to use
with the corresponding frontend client.

# Messages

This is the main resource of the application. All messages sent to the system
can be accessed by a single `/messages` resource

<aside class="warning">Will be deprecated in v1.6</aside>

## Get all messages

Retrieve all the messages

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

<aside class="warning">Will be deprecated in v1.6</aside>

## Send a message

> HTTP request: `POST /api/messages`

> Request example

```json
{
  "text": "Hello World"
}
```

<aside class="warning">Will be deprecated in v1.6</aside>

### Query parameters

Parameter | Default         | Description
--------- | --------------- | -----------
text      | (empty string)  | Text to be send

### Response

Code | Meaning
---- | -----------
201  | Message is correctly sent
400  | Problem with some arguments
