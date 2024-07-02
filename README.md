## Web Scrapper

### Project Description:

#### Task:

Build an API that scrapes information from rozetka.com and telemart.ua, saving data in JSON format to a database.

#### Required Information:

- Item title (String, max 256 chars)
- Item subtitle (String, nullable, max 256 chars)
- Item description (String, max 2048 chars)
- Item price (float)
- Item specifications (String, max 2048 chars)
- Item type (String, max 128 chars, e.g., Phone, Computer peripheral)
- Item profile image (String, max 1024 chars)
- Item source (Enum: rozetka/telemart)

#### Technology Stack:

- TypeScript, Express for server-side framework
- MongoDB database.
- React, Styled-components for client-side

### Getting Started

#### Server Setup

1. Navigate to the server directory:

```console
cd server
```

2. Install dependencies:

```console
npm install
```

3.  Create a config.env file:

- Create a config.env file in the root of the server directory.
- Define necessary environment variables such as database connection strings, API keys, etc. Example:

```
DATABASE=database-url
DATABASE_PASSWORD=database-password

DESCRIPTION_MAX_LENGTH=number
SPECIFICATION_MAX_LENGTH=number
TITLE_MAX_LENGTH=number
TYPE_MAX_LENGTH=number
IMAGE_MAX_LENGTH=number
```

4. Start the server:

```console
npm start
```

This will start the server at http://localhost:8000.

#### Client Setup

1. Navigate to the client directory:

```console
cd client
```

2. Install dependencies:

```console
npm install
```

3. Start the client application:

```console
npm start
```

This will start the client application in development mode and open it in your default web browser at http://localhost:3000.

### Api documentation

#### Base URL

All endpoints are relative to the base URL: http://localhost:8000/api/v1/

#### Endpoints

##### Scraping Endpoint

`POST /`
Scrapes product information from the provided URL of Rozetka or Telemart.

###### Request

- URL: `/`
- Method: `POST`
- Body:
- `url` (String, required): The URL of the product page on Rozetka or Telemart.
  Example:

```
{
 "url": "https://rozetka.com.ua/ua/apple-macbook-air-136-m2-256gb-2022-space-gray/p343424014/"
}
```

##### Retrieve Items Endpoints

`GET /`
Retrieves a list of all scraped items.

###### Request

- URL: `/`
- Method: GET

`GET /:id`
Retrieves details of a specific item by its ID.

###### Request

- URL: `/:id`
- Method: GET
- Params: `id` (String, required): The ID of the item to retrieve.
  Example:
  `/6683183a4d5abd8564b96d6d `
