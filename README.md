<div align="center">
<h1 align="center">
<img src="https://cdn.iconscout.com/icon/free/png-256/free-map-and-location-2569358-2148268.png" width="100" />
<br>MapNews
</h1>
<h3>◦ Mapnews: Navigating Global Stories</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/precommit-FAB040.svg?style&logo=pre-commit&logoColor=black" alt="precommit" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/Redis-DC382D.svg?style&logo=Redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />

<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style&logo=MongoDB&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style&logo=Docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />

  
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style&logo=css3&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="CSS3" />
<img src="https://img.shields.io/badge/Jasmine-8A4182.svg?style&logo=Jasmine&logoColor=white" alt="Jasmine" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" /> 
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />  
</p>

<img src="https://img.shields.io/github/languages/top/dubstep-warrior/mapnews?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/dubstep-warrior/mapnews?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/dubstep-warrior/mapnews?style&color=5D6D7E" alt="GitHub commit activity" />
</div>

---


## 📒 Table of Contents

- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)   
- [🚀 Getting Started](#-getting-started) 
- [🤝 Contributing](#-contributing) 

---

## 📍 Overview

Mapnews is a comprehensive and sophisticated map-based news system built using Angular for the frontend and Express for the backend. The system is a docker swarm consisting of the backend, frontend, and notification services. The swarm configuration features horizontal scaling in our backend in order to meet high concurrency requirements for this application, where we implement load balancing between the websocket server replicas.  

In-depth feature and implementation details are discussed in the README.md of their respective sub-directories

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

> - `ℹ️ Docker CLI` 

### 📦 Setup

1. Clone the mapnews repository:

```sh
git clone https://github.com/dubstep-warrior/mapnews
```

2. Change to the project directory:

```sh
cd mapnews
```

3. Initialize a docker swarm

```sh
docker swarm init
``` 

4. Deploy the docker swarm (Ensure environement variables are replaced with appropiate values)

```sh
docker stack deploy --compose-file docker-compose.yml mapnews
``` 

5. Access the web application from [localhost:3000](http://localhost:3000/).
---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).

```sh
git checkout -b new-feature-branch
```

4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.

```sh
git commit -m 'Implemented new feature.'
```

6. Push your changes to your forked repository on GitHub using the following command

```sh
git push origin new-feature-branch
```

7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
   The project maintainers will review your changes and provide feedback or merge them into the main branch.

---