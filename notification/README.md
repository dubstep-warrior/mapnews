<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>mapnews-notification
</h1>
<h3>◦ Notification service for the MapNews system</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" /> 
<img src="https://img.shields.io/badge/Redis-DC382D.svg?style&logo=Redis&logoColor=white" alt="Redis" /> 

<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style&logo=MongoDB&logoColor=white" alt="MongoDB" />   
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
 
</div>

---

## 📒 Table of Contents

- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview) 
- [📂 Project Structure](#-project-structure)
- [🧩 Modules](#-modules) 
- [🗺 Roadmap](#-roadmap) 
---

## 📍 Overview

Notification service for the Mapnews project that performs cron jobs for updating activity/location/usage metrics, as well as manages the notification pipeline for broadcasting.

---
 
## 📂 Project Structure

```bash
root  
├── Dockerfile
├── README.md
├── config
│   └── cron.config.json
├── package-lock.json
├── package.json
└── src
    ├── aggregations
    │   ├── activity.aggregation.js
    │   └── interest.aggregation.js
    └── index.js
 

3 directories, 8 files
```

---

## 🧩 Modules

<details closed><summary>Root</summary>

| File                                                                                  | Summary                                                                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Dockerfile](https://github.com/dubstep-warrior/mapnews-backend/blob/main/Dockerfile) | This code sets up a Node.js environment, installs dependencies, builds the app, and then starts the server on port 8000. | 

</details>

<details closed><summary>Src</summary>

| File                                                                                  | Summary                                                                                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
|[index.js](https://github.com/dubstep-warrior/mapnews-backend/blob/main/notification/src/index.js) | This code is responsible for handling emergency and general subscriptions by publishing notifications to interested users. It also includes cron jobs for updating user metrics and locations. Redis and MongoDB are used for data storage and retrieval.            | 

</details> 
 

<details closed><summary>Aggregations</summary>

| File                                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [interest.aggregation.js](https://github.com/dubstep-warrior/mapnews-backend/blob/main/notification/src/aggregations/interest.aggregation.js) | This code defines the InterestAggregation function which takes an article as input and returns a MongoDB aggregation pipeline. The pipeline evaluates the usage history of articles to determine if they are suitable based on certain threshold values for combined category and tags usage. The pipeline eventually projects the \_id field of the suitable articles as strings. |
| [activity.aggregation.js](https://github.com/dubstep-warrior/mapnews-backend/blob/main/notification/src/aggregations/activity.aggregation.js) | This code performs an activity aggregation based on an article's location and tags. It calculates the distance from the article's location to nearby activities, filters based on time, groups tags, calculates their count and averages, matches tags of the article, and finally returns a result based on the comparison of the matched tags to the average.                    |

</details>

--- 

## 🗺 Roadmap

> - [x] `ℹ️  Task 1: Refactor index.js` 

--- 
