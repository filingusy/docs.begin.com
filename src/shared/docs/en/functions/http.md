## Overview

Begin apps are composed of many (relatively) small, fast cloud functions – including one for every HTTP route. Say hello to Begin HTTP Functions!


## Getting started

In a Begin app, each unique route is serviced by its own HTTP Function. (We define a route as a tuple of HTTP method and path, e.g. `POST /api/submit`) 

By default, every Begin app starts with a single HTTP Function: `GET /`.

HTTP Functions are dependency-free, with a minimal but powerful low-level API that we'll explore in the [HTTP handler](#http-handler) section.

Each HTTP Function is assigned a folder in your project under `src/http/` (i.e. `src/http/post-api-submit/`, and `src/http/get-index/`).

Within your project, each HTTP Function can contain and utilize an arbitrary quantity of modules, packages, shared code, and other files (so long as the total uncompressed size of that Function's folder is ≤5MB, which helps keep your app super fast).


## HTTP handler

Let's look at an example of an HTTP Function:

```javascript
// src/http/get-*/index.js
let body = `
<!doctype html>
<html lang=en>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`

exports.handler = async function http(request) {
  return {
    type: 'text/html; charset=utf8',
    body
  }
}
```


## HTTP handler API

### Requests

The async `handler` function invoked by a client request receives a `request` object containing the following parameters:

- `body` - **Object**
 - Request body, including an object containing any `application/x-www-form-urlencoded` form variables
- `path` - **String**
 - Absolute path of the request
- `method` - **String**
 - One of `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
- `params` - **Object**
 - Any URL params, if defined in your function's path (i.e. `foo` in `get /:foo/bar`)
- `query` - **Object**
 - Any query params, if present
- `headers` - **Object**
 - All client request headers

Here's an example of an incoming `request` object, being handled by the HTTP Function `GET /:greeting`:

```javascript
// Client requested https://begin.com/hello-world?testing=123
{ method: 'get',
  path: '/hello-world',
  headers: {
    host: 'begin.com',
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    dnt: '1',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    Cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8'
  },
  query: { testing: '123' },
  body: {},
  params: { greeting: 'hello-world' } }
```


### Responses

Responses are returned by your `handler` function in an object, and support the following parameters:

- `status` - **Number**
  - Sets the HTTP status code
  - (Alternately, you can use `code`)
- `type` - **String**
  - Sets the `Content-Type` response header
- `body` - **String**
  - Sets the response body
- `location` - **String**
  - Sets the Location response header
  - (Combine with `status: 302` to redirect)
- `cookie` - **String**
  - Sets the `Set-Cookie` response header
  - (For cookies, you may just want to rely on Begin's [session helper](#http-function-helpers))
- `cors` - **Boolean**
  - Sets the various appropriate `CORS` response headers


Here's a simple example response for an API endpoint:

```javascript
// Responding to a successful POST
{
  status: 201,
  type: 'application/json; charset=utf8',
  body: JSON.stringify({ ok: true }),
  cors: true
}
```

---


## HTTP Function helpers

Coming soon!