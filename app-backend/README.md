<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>mapnews-backend
</h1>
<h3>◦ Backend application of the MapNews system</h3>

<img src="https://img.shields.io/github/languages/top/dubstep-warrior/mapnews-backend?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/dubstep-warrior/mapnews-backend?style&color=5D6D7E" alt="GitHub code size in bytes" /> 
</div>

---

## 📒 Table of Contents

- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🗺 Roadmap](#-roadmap)

---

## 📍 Overview

The MapNews Backend project is a Node.js application that serves as the backend for a mapping and news application. It provides a RESTful API with functionalities for user authentication, article creation and retrieval, user notifications, and configuration management. The project leverages popular libraries and frameworks like Express.js, Mongoose, WebSocket, and Redis to handle database operations, real-time communication, caching, and task management. With its modular architecture and well-defined interfaces, the project enables easy scalability and extensibility, allowing developers to build robust mapping and news applications with efficient backend functionalities.

---

## ⚙️ Features

| Feature                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **⚙️ Architecture**    | The system follows a client-server architecture with a Node.js backend and a MongoDB database. It uses Express.js for the server implementation and Mongoose for MongoDB operations. The WebSocket server handles real-time communication with clients. The system adopts a monolithic architecture where all components are tightly coupled. There are separate controller classes for different entities like articles, authentication, configuration, and notifications. Controllers and services handle the business logic, and external libraries like ImageKit and Redis are integrated for image upload and caching. |
| **📖 Documentation**   | The quality and comprehensiveness of documentation cannot be determined from the codebase alone. However, comments in the code are relevant, providing explanations for the purpose and functionality of different sections. JSDoc-style comments are used in some files to document interfaces and types. The README file is available and provides basic information about installing and running the application.                                                                                                                                                                                                        |
| **🔗 Dependencies**    | The system relies on several dependencies listed in the package.json file, including Express.js, Mongoose, ImageKit, Redis, JWT, Multer, and others. These libraries provide essential features for building and running the application.                                                                                                                                                                                                                                                                                                                                                                                   |
| **🧩 Modularity**      | The codebase is reasonably modular in terms of controllers, services, and utilities. Each controller is responsible for separate functionality and follows the Single Responsibility Principle. Services encapsulate specific business functionalities and can be easily replaced or extended. The utils folder contains common decorators, interfaces, and resolver functions used by different components. However, further modular improvements could be made, such as separating concerns into different modules or microservices for better scalability and isolation.                                                 |
| **✔️ Testing**         | The codebase does not include dedicated testing files or test frameworks. It lacks automated unit tests and integration tests. Implementing testing strategies and tools like Jest, Mocha, or Supertest could significantly enhance code quality and maintainability. The lack of tests may increase the risk of regression bugs and hinder collaboration during development.                                                                                                                                                                                                                                               |
| **⚡️ Performance**    | Performance characteristics cannot be assessed from the codebase alone. However, potential areas for performance optimizations include caching, leveraging Redis for frequent retrievals, using HTTP/2 or WebSockets for efficient data transfer, and implementing database indexing for faster queries. Performance profiling and load testing would be necessary to identify bottlenecks and fine-tune the system.                                                                                                                                                                                                        |
| **🔐 Security**        | The codebase incorporates several security measures. JSON Web Tokens (JWT) are used for user authentication and protection of routes through decorators. Passwords are hashed before storing them in the database, reducing the risk of credential exposure. The system enforces secure practices like input validation and sanitization to prevent common security vulnerabilities. However, a more thorough security assessment and additional measures like input/output validation, rate limiting, and comprehensive error handling would further improve the system's security.                                        |
| **🔀 Version Control** | The codebase has a git repository hosted on GitHub. It utilizes branches for different features or bug fixes, and commits are reasonably well-structured. The repository includes a pre-commit hook that ensures code formatting and enforces linting rules before commits are made, helping                                                                                                                                                                                                                                                                                                                                |

---

## 📂 Project Structure

```bash
root
├── .dockerignore
├── .gitignore
├── .husky
│ └── pre-commit
├── Dockerfile
├── Procfile
├── README.md
├── docker-compose.yml
├── notification
│ ├── Dockerfile
│ ├── config
│ │ └── cron.config.json
│ ├── package-lock.json
│ ├── package.json
│ └── src
│ ├── aggregations
│ │ ├── activity.aggregation.js
│ │ └── interest.aggregation.js
│ └── index.js
├── package-lock.json
├── package.json
├── src
│ ├── application.ts
│ ├── clients
│ │ ├── imagekit.client.ts
│ │ └── redis.client.ts
│ ├── config
│ │ └── mongo-server.errors.json
│ ├── controllers
│ │ ├── article.controller.ts
│ │ ├── auth.controller.ts
│ │ ├── config.controller.ts
│ │ ├── index.ts
│ │ └── notification.controller.ts
│ ├── models
│ │ ├── Article.ts
│ │ ├── Config.ts
│ │ ├── Notification.ts
│ │ └── User.ts
│ ├── server.ts
│ ├── services
│ │ ├── ArticleService.ts
│ │ ├── AuthService.ts
│ │ ├── ConfigService.ts
│ │ └── NotificationService.ts
│ ├── utils
│ │ ├── decorators
│ │ │ ├── authentication.decorator.ts
│ │ │ ├── cache.decorator.ts
│ │ │ ├── controller.decorator.ts
│ │ │ └── handlers.decorator.ts
│ │ ├── interfaces
│ │ │ ├── action.interface.ts
│ │ │ ├── article.interface.ts
│ │ │ ├── auth.interface.ts
│ │ │ ├── form.interface.ts
│ │ │ ├── http.interface.ts
│ │ │ ├── jwtpayload.interface.ts
│ │ │ ├── location.interface.ts
│ │ │ ├── notification.interface.ts
│ │ │ ├── resolver-options.interface.ts
│ │ │ └── user.interface.ts
│ │ ├── metadata.keys.ts
│ │ └── resolvers
│ │ ├── article-filter.resolver.ts
│ │ └── bypass-resolver.ts
│ └── websockets
│ └── index.ts
└── tsconfig.json

16 directories, 53 files
```

---

## 🧩 Modules

<details closed><summary>Root</summary>

| File                                                                                  | Summary                                                                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Dockerfile](https://github.com/dubstep-warrior/mapnews-backend/blob/main/Dockerfile) | This code sets up a Node.js environment, installs dependencies, builds the app, and then starts the server on port 8000. |
| [Procfile](https://github.com/dubstep-warrior/mapnews-backend/blob/main/Procfile)     | This code runs a web server using Node.js and starts the server by executing the file "dist/server.js".                  |

</details>

<details closed><summary>Src</summary>

| File                                                                                              | Summary                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [server.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/server.ts)           | This code is responsible for establishing a connection to MongoDB, creating an HTTP server, and initializing a WebSocket server. It also sets up the application to listen for incoming requests on a specified port.                                                                          |
| [application.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/application.ts) | The code is a class that creates an application using Express.js. It sets up various middleware such as bodyParser and multer for handling HTTP requests, enables CORS for cross-origin requests, allows for image uploading, and registers routes and handlers defined by controller classes. |

</details>

<details closed><summary>Services</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ArticleService.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/services/ArticleService.ts)           | The code is for an ArticleService that provides functionalities to create, resolve article likes, resolve articles, and resolve article search. It uses Mongoose and Express libraries for database operations and handles image uploads using ImageKitClient. It also utilizes decorators and resolver options for filtering and caching.   |
| [ConfigService.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/services/ConfigService.ts)             | This code defines a ConfigService class that fetches config data from a database. The getConfig method returns a Promise that resolves to an array of config objects (based on the IForm interface). If an error occurs, it is logged and thrown.                                                                                            |
| [NotificationService.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/services/NotificationService.ts) | This code defines a NotificationService class with a getAll method that retrieves notifications from a database. It utilizes caching using a decorator and populates related article data. The method returns a processed list of notifications with additional article coordinates.                                                         |
| [AuthService.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/services/AuthService.ts)                 | The code defines an AuthService class with two main methods:'createUser' for creating a new user with validation and hashing functionality, and'userLogin' for authenticating a user with password comparison. The code also includes the use of JWT for token generation and a client for uploading user profile images to a cloud service. |

</details>

<details closed><summary>Controllers</summary>

| File                                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [auth.controller.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/controllers/auth.controller.ts)                 | This code defines an Auth class that handles user registration and login routes. It imports the authService module, sets up the routes with decorators, and handles errors by catching and returning appropriate responses.                                                                                                                                                                                                                   |
| [article.controller.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/controllers/article.controller.ts)           | This code represents a Tech Lead's implementation of an Article controller. It handles functions related to resolving, creating, and liking articles. It utilizes decorators for authentication and routing. The resolveArticles function resolves articles based on different endpoints, while the createArticle function creates a new article and publishes it to Redis. Lastly, the resolveArticleLikes function handles liking articles. |
| [index.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/controllers/index.ts)                                     | This code exports multiple controller functions from separate files for articles, authentication, configuration, and notifications. These controllers are combined into an array called "controllers" for easy access and integration into the application.                                                                                                                                                                                   |
| [config.controller.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/controllers/config.controller.ts)             | The code is a part of a controller that handles a GET request to fetch a configuration. It imports a ConfigService to retrieve the configuration data, and the controller responds with the fetched data in the response. It handles error cases such as when no configuration is found or when an internal server error occurs.                                                                                                              |
| [notification.controller.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/controllers/notification.controller.ts) | This code defines a controller for handling notifications in an API. It has a route for retrieving all notifications, which requires authentication. It uses the NotificationService to fetch the notifications and returns the result in JSON format. Handles error cases as well.                                                                                                                                                           |

</details>

<details closed><summary>Utils</summary>

| File                                                                                                        | Summary                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [metadata.keys.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/metadata.keys.ts) | This code defines two metadata keys "base_path" and "routers" used for configuration purposes in routing applications. |

</details>

<details closed><summary>Decorators</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [controller.decorator.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/decorators/controller.decorator.ts)         | This code exports a function named `Controller` that is used as a TypeScript decorator. It attaches metadata to a target class by storing a dynamic base path for API routing. The base path is determined by concatenating "/api/v1" with a passed `basePath` parameter.                                                                                                                                                                                                                                                |
| [handlers.decorator.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/decorators/handlers.decorator.ts)             | This code exports decorators for "GET" and "POST" HTTP methods, which can be used to define routes for a router.                                                                                                                                                                                                                                                                                                                                                                                                         |
| [authentication.decorator.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/decorators/authentication.decorator.ts) | This code is an authorization decorator that verifies JSON Web Tokens (JWT) for protected routes. It extracts the token from the request headers, decodes it using a JWT secret code, and then checks if the token is valid. If the token is valid, it attaches the user attribute to the request body. Otherwise, if the route is whitelisted, the code bypasses the token validation and allows access. The decorator can be applied to any function/method within a class to enforce authentication before execution. |
| [cache.decorator.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/decorators/cache.decorator.ts)                   | The code defines a caching decorator that retrieves data from a Redis cache. If the data is found, it's returned; if not, the original function is called, and the data is stored in Redis before it's returned. If bypass conditions are met, the cache is bypassed.                                                                                                                                                                                                                                                    |

</details>

<details closed><summary>Interfaces</summary>

| File                                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [resolver-options.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/resolver-options.interface.ts) | This code defines a resolver options interface for querying articles based on various parameters such as id, distance, location, tags, and category using mongoose.                                                                                                                                           |
| [form.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/form.interface.ts)                         | The code defines TypeScript interfaces for a dynamic form object, including form attributes and configuration. The form object includes properties such as \_id, form configurations, and name for different form types ("addArticle", "login", "register", "search").                                        |
| [action.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/action.interface.ts)                     | This code defines the structure of an Action object, used to track user interactions. It includes properties like ID, user ID, action, category, tags, time, and optionally, location.                                                                                                                        |
| [jwtpayload.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/jwtpayload.interface.ts)             | This code defines an interface `JwtPayload` that extends another interface `JwtPL` from the `jsonwebtoken` library. It adds two properties `_id` and `email`. This allows us to define the structure of JSON Web Token (JWT) payloads used for authentication in a TypeScript project.                        |
| [user.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/user.interface.ts)                         | The code defines an interface for a user with properties like id, email, password, profile image, and usage details. It uses the ObjectId class from the "mongoose" library for managing ids.                                                                                                                 |
| [auth.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/auth.interface.ts)                         | The code defines an interface IAuth that comprises two properties: "token" (a string) and "user" (of type IUser, which refers to another interface).                                                                                                                                                          |
| [location.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/location.interface.ts)                 | This code defines an interface called "ILocation" that specifies the structure of geographical locations. It has properties for the type of location (e.g., "Point", "Polygon"), and an array of coordinates (latitude and longitude) to represent the location accurately.                                   |
| [article.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/article.interface.ts)                   | This code defines the core functionalities for an article in a news application. It includes properties for category, location, unique ID, title, description, images, tags, time, and posted by. It also defines an interface for a processed article that includes coordinates.                             |
| [http.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/http.interface.ts)                         | This code provides a definition for a custom `MulterRequest` interface to extend the `express.Request` interface.It adds optional `file` and `files` properties for handling file uploads.                                                                                                                    |
| [notification.interface.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/interfaces/notification.interface.ts)         | This code defines interfaces and types for notifications. It includes the ID, type, article, timestamp, and users associated with a notification. It also defines interfaces for the full notification with the complete article details and the full processed notification with the processed article data. |

</details>

<details closed><summary>Resolvers</summary>

| File                                                                                                                                      | Summary                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bypass-resolver.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/resolvers/bypass-resolver.ts)                 | This code is a bypass function that allows the Tech Lead to determine if certain articles need to be resolved or not based on a key-value pair. It checks if the data includes specific paths and returns true or false depending on the key. |
| [article-filter.resolver.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/utils/resolvers/article-filter.resolver.ts) | This code defines filter functions for various paths in a resolver. It creates filters based on location, time, tags, and categories, and returns the appropriate filter based on the given path and options.                                 |

</details>

<details closed><summary>Clients</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [redis.client.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/clients/redis.client.ts)       | This code sets up a connection to a Redis server using the provided REDIS_URL. It creates a Redis client and duplicates it to create separate publisher and subscriber clients. It handles connection events and logs any errors that occur. |
| [imagekit.client.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/clients/imagekit.client.ts) | The code imports the ImageKit library and creates a client object with provided public key, private key, and URL endpoint. This client can be used to perform various operations with the ImageKit service.                                  |

</details>

<details closed><summary>Models</summary>

| File                                                                                                       | Summary                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Notification.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/models/Notification.ts) | This code defines the schema for a notification using Mongoose, a MongoDB object modeling tool. It includes fields such as article, type, time, and users. The schema is then used to create a model called "Notification" which can be used to interact with the MongoDB database. |
| [Article.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/models/Article.ts)           | This code defines a Mongoose schema and model for an article. The schema includes properties like title, tags, category, description, location, images, time, posted_by, and likes. It also sets up a geospatial index for location coordinates.                                    |
| [User.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/models/User.ts)                 | This code defines a user schema using Mongoose and exports a user model. It includes fields for email, password, profile image, and usage. The schema enforces unique email, required email and password, and provides a lowercase and trimmed email field.                         |
| [Config.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/models/Config.ts)             | This code defines a mongoose schema and model for a collection called "form". It includes properties such as "form" and "name", enforcing required fields. This model can be used to handle CRUD operations on form data in MongoDB.                                                |

</details>

<details closed><summary>Websockets</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [index.ts](https://github.com/dubstep-warrior/mapnews-backend/blob/main/src/websockets/index.ts) | This code sets up a WebSocket server to handle connections and communication with clients. It verifies JWT tokens for authentication and subscribes to Redis channels. It receives and sends messages between clients, stores data in Redis, and handles disconnections. |

</details>

---

## 🗺 Roadmap

> - [ ] `ℹ️  Task 1: Clean up codebase`
> - [ ] `ℹ️  Task 2: Implement Unit testing`
> - [ ] `ℹ️  Task 3: Implement deployment on cloud platform`

---
