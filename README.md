<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>mapnews-frontend
</h1>
<h3>◦ Navigating News with mapnews!</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/SVG-FFB13B.svg?style&logo=SVG&logoColor=black" alt="SVG" />
<img src="https://img.shields.io/badge/precommit-FAB040.svg?style&logo=pre-commit&logoColor=black" alt="precommit" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/Jasmine-8A4182.svg?style&logo=Jasmine&logoColor=white" alt="Jasmine" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/languages/top/dubstep-warrior/mapnews-frontend?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/dubstep-warrior/mapnews-frontend?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/dubstep-warrior/mapnews-frontend?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/license/dubstep-warrior/mapnews-frontend?style&color=5D6D7E" alt="GitHub license" />
</div>

---

## 📒 Table of Contents

- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🚀 Getting Started](#-getting-started)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

The frontend implementation of our map-based news application is a comprehensive and sophisticated system built using Angular, a component-based framework. This frontend repository serves as the user interface for our application, providing a rich and interactive news consumption experience for users.

---

## ⚙️ Features

Key aspects of the frontend implementation include:

Angular Framework: The application is developed using Angular, a popular framework that promotes rapid development through the reusability of HTML and logic codes. It enables the separation of code into individual UI components, enhancing reusability and readability.

TypeScript: TypeScript is used for coding to ensure type safety and maintain consistency during development.

Prefetching and Location Data: The application leverages Angular resolvers to prefetch user location and form configuration data. Geolocation data is used to fetch relevant articles based on proximity and time factors.

Reactive Forms: Angular's reactive forms are employed for handling form inputs, allowing the tracking of input values and validation states. Form configurations are stored in a database collection, and individual FormControls are dynamically created based on input attributes.

Map Integration: The MapLibre library is used for interactive maps, and the NgxMapLibreGLModule provides an Angular wrapper for seamless integration. Map styling is obtained from the MapTiler API, and the map displays news articles and user locations as markers.

State Management: Angular's 'StateService' is implemented to manage the application's state. This service follows the singleton design pattern and communicates state changes to relevant components using RxJS, a reactive programming library.

Service-based Functionality: Functional features such as login, registration, news reporting, and article consumption are implemented using Angular services. These services, like the Article Service and Auth Service, call the appropriate HTTP requests via a Server Service dependency to fulfill their functionality.

Dependency Injection: The architecture relies on dependency injection to establish relationships between intermediate and base services, allowing data propagation using a publish-subscribe model with RxJS.

Overall, this frontend implementation provides a solid foundation for the map-based news application, offering features such as user location-based article retrieval, interactive maps, state management, and seamless communication between services and components. It combines the power of Angular with various libraries and design patterns to create a responsive and feature-rich user interface.

---

## 📂 Project Structure

```bash
root
├── .editorconfig
├── .gitignore
├── .husky
│ └── pre-commit
├── .npmrc
├── .vscode
│ ├── extensions.json
│ ├── launch.json
│ └── tasks.json
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── polyfill.ts
├── src
│ ├── app
│ │ ├── app-routing.module.ts
│ │ ├── app.component.html
│ │ ├── app.component.scss
│ │ ├── app.component.spec.ts
│ │ ├── app.component.ts
│ │ ├── app.module.ts
│ │ ├── components
│ │ │ ├── article-box
│ │ │ │ ├── article-box.component.html
│ │ │ │ ├── article-box.component.scss
│ │ │ │ ├── article-box.component.spec.ts
│ │ │ │ └── article-box.component.ts
│ │ │ ├── article-details
│ │ │ │ ├── article-details.component.html
│ │ │ │ ├── article-details.component.scss
│ │ │ │ ├── article-details.component.spec.ts
│ │ │ │ └── article-details.component.ts
│ │ │ ├── article-form
│ │ │ │ ├── article-form.component.html
│ │ │ │ ├── article-form.component.scss
│ │ │ │ ├── article-form.component.spec.ts
│ │ │ │ └── article-form.component.ts
│ │ │ ├── image-gallery
│ │ │ │ ├── image-gallery.component.html
│ │ │ │ ├── image-gallery.component.scss
│ │ │ │ ├── image-gallery.component.spec.ts
│ │ │ │ └── image-gallery.component.ts
│ │ │ ├── left-overlay
│ │ │ │ ├── left-overlay.component.html
│ │ │ │ ├── left-overlay.component.scss
│ │ │ │ ├── left-overlay.component.spec.ts
│ │ │ │ └── left-overlay.component.ts
│ │ │ ├── login
│ │ │ │ ├── login.component.html
│ │ │ │ ├── login.component.scss
│ │ │ │ ├── login.component.spec.ts
│ │ │ │ └── login.component.ts
│ │ │ ├── map
│ │ │ │ ├── map.component.html
│ │ │ │ ├── map.component.scss
│ │ │ │ ├── map.component.spec.ts
│ │ │ │ └── map.component.ts
│ │ │ ├── mark
│ │ │ │ ├── mark.component.html
│ │ │ │ ├── mark.component.scss
│ │ │ │ ├── mark.component.spec.ts
│ │ │ │ └── mark.component.ts
│ │ │ ├── multi-item-carousel
│ │ │ │ ├── multi-item-carousel.component.html
│ │ │ │ ├── multi-item-carousel.component.scss
│ │ │ │ ├── multi-item-carousel.component.spec.ts
│ │ │ │ └── multi-item-carousel.component.ts
│ │ │ ├── navbar
│ │ │ │ ├── navbar.component.html
│ │ │ │ ├── navbar.component.scss
│ │ │ │ ├── navbar.component.spec.ts
│ │ │ │ └── navbar.component.ts
│ │ │ ├── notifications
│ │ │ │ ├── notifications.component.html
│ │ │ │ ├── notifications.component.scss
│ │ │ │ ├── notifications.component.spec.ts
│ │ │ │ └── notifications.component.ts
│ │ │ ├── register
│ │ │ │ ├── register.component.html
│ │ │ │ ├── register.component.scss
│ │ │ │ ├── register.component.spec.ts
│ │ │ │ └── register.component.ts
│ │ │ ├── right-overlay
│ │ │ │ ├── right-overlay.component.html
│ │ │ │ ├── right-overlay.component.scss
│ │ │ │ ├── right-overlay.component.spec.ts
│ │ │ │ └── right-overlay.component.ts
│ │ │ ├── shared
│ │ │ │ ├── access-container
│ │ │ │ │ ├── access-container.component.html
│ │ │ │ │ ├── access-container.component.scss
│ │ │ │ │ ├── access-container.component.spec.ts
│ │ │ │ │ └── access-container.component.ts
│ │ │ │ └── right-overlay-container
│ │ │ │ ├── right-overlay-container.component.html
│ │ │ │ ├── right-overlay-container.component.scss
│ │ │ │ ├── right-overlay-container.component.spec.ts
│ │ │ │ └── right-overlay-container.component.ts
│ │ │ └── tags
│ │ │ ├── tags.component.html
│ │ │ ├── tags.component.scss
│ │ │ ├── tags.component.spec.ts
│ │ │ └── tags.component.ts
│ │ ├── core
│ │ │ ├── configs
│ │ │ │ ├── general.config.json
│ │ │ │ └── notification.messages.json
│ │ │ ├── directives
│ │ │ │ ├── form.directive.spec.ts
│ │ │ │ └── form.directive.ts
│ │ │ ├── interceptors
│ │ │ │ └── auth
│ │ │ │ ├── auth.interceptor.spec.ts
│ │ │ │ └── auth.interceptor.ts
│ │ │ ├── interfaces
│ │ │ │ ├── article.interface..ts
│ │ │ │ ├── auth.interface.ts
│ │ │ │ ├── form.interface.ts
│ │ │ │ ├── location.interface.ts
│ │ │ │ ├── notification.interface.ts
│ │ │ │ ├── preview-image.interface.ts
│ │ │ │ ├── response.interface.ts
│ │ │ │ └── state.interface.ts
│ │ │ ├── pipes
│ │ │ │ ├── custom-time
│ │ │ │ │ ├── custom-time.pipe.spec.ts
│ │ │ │ │ └── custom-time.pipe.ts
│ │ │ │ ├── email-name
│ │ │ │ │ ├── email-name.pipe.spec.ts
│ │ │ │ │ └── email-name.pipe.ts
│ │ │ │ ├── like-term
│ │ │ │ │ ├── like-term.pipe.spec.ts
│ │ │ │ │ └── like-term.pipe.ts
│ │ │ │ └── notification-message
│ │ │ │ ├── notification-message.pipe.spec.ts
│ │ │ │ └── notification-message.pipe.ts
│ │ │ ├── resolvers
│ │ │ │ ├── config
│ │ │ │ │ ├── config.resolver.spec.ts
│ │ │ │ │ └── config.resolver.ts
│ │ │ │ └── location
│ │ │ │ ├── location.resolver.spec.ts
│ │ │ │ └── location.resolver.ts
│ │ │ ├── services
│ │ │ │ ├── article
│ │ │ │ │ ├── article.service.spec.ts
│ │ │ │ │ └── article.service.ts
│ │ │ │ ├── auth
│ │ │ │ │ ├── auth.service.spec.ts
│ │ │ │ │ └── auth.service.ts
│ │ │ │ ├── form
│ │ │ │ │ ├── form.service.spec.ts
│ │ │ │ │ └── form.service.ts
│ │ │ │ ├── location
│ │ │ │ │ ├── location.service.spec.ts
│ │ │ │ │ └── location.service.ts
│ │ │ │ ├── notification
│ │ │ │ │ ├── notification.service.spec.ts
│ │ │ │ │ └── notification.service.ts
│ │ │ │ ├── server
│ │ │ │ │ ├── server.service.spec.ts
│ │ │ │ │ └── server.service.ts
│ │ │ │ ├── state
│ │ │ │ │ ├── state.service.spec.ts
│ │ │ │ │ └── state.service.ts
│ │ │ │ └── ws
│ │ │ │ ├── web-socket.service.spec.ts
│ │ │ │ └── web-socket.service.ts
│ │ │ └── utilities
│ │ │ ├── animations.ts
│ │ │ └── validators.ts
│ │ └── pages
│ │ ├── access
│ │ │ ├── access.component.html
│ │ │ ├── access.component.scss
│ │ │ ├── access.component.spec.ts
│ │ │ └── access.component.ts
│ │ └── home
│ │ ├── home.component.html
│ │ ├── home.component.scss
│ │ ├── home.component.spec.ts
│ │ └── home.component.ts
│ ├── assets
│ │ └── images
│ │ ├── ...31 files
│ ├── environments
│ │ ├── environment.prod.ts
│ │ └── environment.ts
│ ├── favicon.ico
│ ├── index.html
│ ├── main.ts
│ ├── shared
│ │ ├── \_mixins.scss
│ │ └── \_variables.scss
│ └── styles.scss
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

53 directories, 176 files
```

---

## 🧩 Modules

<details closed><summary>Root</summary>

| File                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [polyfill.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/polyfill.ts) | The code snippet sets the global object in a browser environment by assigning the window object to the global variable. This allows accessing global variables and functions across different modules within the application.                                                                                                                                |
| [.npmrc](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/.npmrc)           | The "legacy-peer-deps" flag enables compatibility with older packages that rely on outdated peer dependency resolution. It allows the code to use the legacy peer dependency behavior where dependencies defined as peers are given more flexibility in version matching. This ensures that older packages can still run properly with the current codebase. |

</details>

<details closed><summary>Src</summary>

| File                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/index.html)   | This code is an HTML template for a web application called MapNews. It sets the meta information, imports necessary fonts and icons, and defines the structure of the page with the "app-root" component. The objective of the code is to provide the basic foundation for building the MapNews web application.                                                                          |
| [main.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/main.ts)         | This code imports the Angular platformBrowserDynamic module and AppModule, then uses it to bootstrap the Angular application. If an error occurs during the process, it will be displayed in the console.                                                                                                                                                                                 |
| [styles.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/styles.scss) | This code defines and applies custom theming for the Angular Material UI components used in the app. It includes the common styles for Angular Material and defines the primary, accent, and warn palettes for the theme. The theme object is created and applied to all components. The code also includes some global styles for the body, fonts, buttons, input fields, and scrollbar. |

</details>

<details closed><summary>App</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [app.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app.component.scss)       | The code sets the basic styling properties for the ".App" element, including hiding any content that exceeds its boundaries, positioning it relative to its parent element, and setting its height to occupy the entire viewport height (100vh).                                                                                                           |
| [app.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app.component.spec.ts) | This code contains unit tests for the AppComponent of an Angular application. It verifies that the component is created, has a specific title, and renders the title correctly on the HTML page. The tests use Angular testing utilities and the RouterTestingModule for module imports.                                                                   |
| [app.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app.component.ts)           | The code is for the main component of an Angular application. It handles the state of the application, keeps track of the current URL, and provides animations for route transitions. It also includes a method to reset the state and a method to determine the route animation.                                                                          |
| [app.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app.component.html)       | The code is a root component for an application, which includes a map component and a router outlet for navigating between different views. It also features click and route animation functionalities for a more interactive user experience.                                                                                                             |
| [app.module.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app.module.ts)                 | This code is for an Angular application's AppModule. It defines the core functionalities and modules used in the application, including routing, components for UI elements like maps, overlays, and forms, HTTP requests and authentication handling, pipes for manipulating and formatting data, and various libraries for UI components and animations. |
| [app-routing.module.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/app-routing.module.ts) | This code sets up the routing configuration for an Angular application. It defines routes for different components and handles animations. It also includes resolvers for fetching configuration and location data. This code provides a foundation for navigation within the application.                                                                 |

</details>

<details closed><summary>Article-box</summary>

| File                                                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [article-box.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-box/article-box.component.spec.ts) | This code is a unit test that verifies the creation of the ArticleBoxComponent. It initializes the component and checks if it is successfully created. This test ensures that the component is functioning as expected and can be used in the Angular application.                                                                             |
| [article-box.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-box/article-box.component.html)       | This code handles the display of an article box with relevant information and an image. It includes functionality for clicking on the box and opening a corresponding article details page. The code differentiates between desktop and mobile views. Limited implementation details are provided due to the character constraint.             |
| [article-box.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-box/article-box.component.ts)           | This code defines the ArticleBoxComponent, which receives a State object as input and displays it in an article box. It also uses animations and a StateService to get the current state. When it receives a new state, it updates the currentState property. Additionally, it includes a takeUntilDestroyed operator to prevent memory leaks. |
| [article-box.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-box/article-box.component.scss)       | This code defines styles for an article box and its mobile version. It includes various layout and visual properties such as background color, padding, border radius, positioning, and media queries for responsiveness. The code also handles specific styles for the box-heading, box contents, and hover effects.                          |

</details>

<details closed><summary>Left-overlay</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [left-overlay.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/left-overlay/left-overlay.component.spec.ts) | This code is a unit test for the LeftOverlayComponent class in an Angular application. It creates an instance of the component, checks if it is created successfully, and verifies its existence.                                                                                           |
| [left-overlay.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/left-overlay/left-overlay.component.scss)       | This code defines the styles for a section element. It includes responsive styling, animation, and alignment properties for a spinner, images, and text contents displayed within the section. The styles are organized using mixins for improved maintainability and reusability.          |
| [left-overlay.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/left-overlay/left-overlay.component.ts)           | The code defines the functionality of a left overlay component in an Angular application. It involves handling a form, subscribing to mouse location coordinates, setting the form value based on location, handling image input, submitting the form, and resetting the state.             |
| [left-overlay.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/left-overlay/left-overlay.component.html)       | The code snippet is responsible for displaying an article form with various input fields and buttons. It also handles form submission, image selection, tagging, and location setting. It shows a spinner during article submission and displays a success/failure message upon completion. |

</details>

<details closed><summary>Login</summary>

| File                                                                                                                                      | Summary                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [login.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/login/login.component.scss)       | This code sets the height and display properties for the host element. It also adjusts the width to 100% when the screen size is small, using a mixin.                                                                                           |
| [login.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/login/login.component.html)       | The code is for a login form component. It captures user input for email and password, triggers a login action on form submission, and provides links to register for a new account.                                                             |
| [login.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/login/login.component.ts)           | The code defines a LoginComponent that extends a FormDirective. It handles form submission by calling the login method from the authService, passing in the form data. This component is used for login functionality in an Angular application. |
| [login.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/login/login.component.spec.ts) | This code is for testing the LoginComponent in an Angular application. It uses TestBed and ComponentFixture to create and initialize the component for testing. The "should create" test verifies that the component is successfully created.    |

</details>

<details closed><summary>Notifications</summary>

| File                                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [notifications.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/notifications/notifications.component.ts)           | The code defines an Angular component for handling notifications. It fetches notifications from a service and assigns them to a variable. When a notification is selected, it adds the notification's article to another service and resolves the state for the article details component.             |
| [notifications.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/notifications/notifications.component.html)       | This code displays a list of notifications with relevant information such as image, title, and description. It checks if there are notifications and renders them, otherwise showing an empty message. Clicking on a notification triggers a function to select it.                                    |
| [notifications.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/notifications/notifications.component.spec.ts) | This code is a unit test written in Angular to test the functionality of the NotificationsComponent. It sets up a testbed, creates an instance of the component, and checks if it is truthy, indicating that the component was successfully created.                                                   |
| [notifications.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/notifications/notifications.component.scss)       | This code defines the styling for a notifications component. It sets the dimensions, position, and scroll behavior. It also applies styles for different screen sizes and customizes the scrollbars. Additionally, it specifies the styling for empty notifications and individual notification items. |

</details>

<details closed><summary>Tags</summary>

| File                                                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [tags.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/tags/tags.component.spec.ts) | This code is a unit test file for the TagsComponent in an Angular application. It creates an instance of the component, verifies that it is created successfully, and tests its core functionality.                                                                                                                                                                                       |
| [tags.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/tags/tags.component.html)       | The code dynamically displays tags for an article based on its selected state. It uses an Angular structural directive (\*ngFor) to render tags, limiting their display to a maximum of 3. The code also applies a titlecase filter to ensure consistent formatting.                                                                                                                      |
| [tags.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/tags/tags.component.ts)           | This code defines a TagsComponent in an Angular application. It has two input properties:'tags' which is an array of strings representing tags, and'currentState' which is an object representing the current state. The component is meant to display the tags and the current state in the associated template and style files.                                                         |
| [tags.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/tags/tags.component.scss)       | This code defines the styling for a tag component. Tags are displayed as flex items with a left alignment, a gap between each item, and the ability to wrap onto a new line when there is not enough horizontal space. Each tag has a black background, white text, 16px font size, and rounded corners. The styling also includes a specific margin and padding for the non-"more" tags. |

</details>

<details closed><summary>Multi-item-carousel</summary>

| File                                                                                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [multi-item-carousel.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/multi-item-carousel/multi-item-carousel.component.html)       | This code snippet is a component template that implements a carousel functionality using the PrimeNG library. It displays a set of images in a carousel format, showing three images at a time. If there are less than three images, it displays them in a row. The component dynamically generates the carousel using an ngFor loop to iterate over the images array and display the image previews. |
| [multi-item-carousel.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/multi-item-carousel/multi-item-carousel.component.spec.ts) | The code is a test file written in TypeScript for an Angular component called MultiItemCarouselComponent. It sets up a test bed, creates an instance of the component, and checks if it was successfully created.                                                                                                                                                                                     |
| [multi-item-carousel.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/multi-item-carousel/multi-item-carousel.component.scss)       | This code defines styles for a content section with one or multiple cards. The cards have items with margin and border-radius, and non-carousel cards are displayed in a flex layout. The images inside are set with a specific height and width. The code also includes styles for a carousel container and indicators and modifies the styles for the carousel navigation buttons.                  |
| [multi-item-carousel.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/multi-item-carousel/multi-item-carousel.component.ts)           | Exception:                                                                                                                                                                                                                                                                                                                                                                                            |

</details>

<details closed><summary>Article-details</summary>

| File                                                                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [article-details.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-details/article-details.component.scss)       | This code defines the styles for a title and the body of a component. It includes alignment, margin, font size and weight, cursor behavior, image sizing, borders, padding, and text transformations. The title section includes nested divs with specific styles, and the body section includes styles for different elements like time and user information. Overall, the code aims to create a visually appealing and consistent design for the component. |
| [article-details.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-details/article-details.component.html)       | The code represents a component with a container for displaying information about an article. It includes a title, category, like button, time, tags, images, user information, and description. The component also handles dynamic rendering based on user authentication and state.                                                                                                                                                                         |
| [article-details.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-details/article-details.component.ts)           | The "ArticleDetailsComponent" is a Angular component that displays the details of an article. It takes inputs such as the article data, the application state, and the user's authentication status. Additionally, it has a favoriteActive property and an EventEmitter for resolving the action of liking an article.                                                                                                                                        |
| [article-details.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-details/article-details.component.spec.ts) | This code defines a test suite that verifies the functionality of the `ArticleDetailsComponent` component. It checks whether the component is created successfully. The `beforeEach` block sets up the necessary test environment, while the `it` block executes the test.                                                                                                                                                                                    |

</details>

<details closed><summary>Article-form</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [article-form.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-form/article-form.component.spec.ts) | The code imports required components for testing, creates a fixture and component instance of ArticleFormComponent, and initializes the component for testing. It includes a test case that checks if the component is created successfully.                                                                                                                                                                                        |
| [article-form.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-form/article-form.component.scss)       | This code is a CSS file that defines the styles for a form. It sets the width, font size, border radius, and padding for various elements within the form. It also handles the styling and behavior of specific sections like the title, tags, location, and description sections. Additionally, it includes styles for image uploading and buttons. The code aims to create a visually appealing and user-friendly form interface. |
| [article-form.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-form/article-form.component.ts)           | This code defines a component for an Angular app that represents a form for creating an article. It manages form inputs, emits events for submitting the form, handling image drops, adding images, adding tags, and setting the location. It also provides a character limit for the article description and updates the remaining characters count.                                                                               |
| [article-form.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/article-form/article-form.component.html)       | This code represents a form that allows users to submit various types of content. It includes features such as selecting a category, adding tags, specifying a location, entering a description, and uploading images. The form has validation and a submit button to finalize the submission. Overall, it provides a user-friendly interface for content creation.                                                                 |

</details>

<details closed><summary>Image-gallery</summary>

| File                                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [image-gallery.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/image-gallery/image-gallery.component.scss)       | This code defines styles for a gallery section. It sets the background color to black, resizes the images to fit the display, and reduces their height for smaller screens. It also limits the height of the thumbnail container and hides overflow. The code uses mixins to apply different styles based on screen sizes.                                                                      |
| [image-gallery.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/image-gallery/image-gallery.component.html)       | This code snippet creates a gallery section with a carousel-style slider. It uses PrimeNG's p-galleria component to display images with thumbnail navigation. The [value] property contains the array of image URLs. The [numVisible] property determines the number of images visible at once and [thumbnailsPosition] sets their position. The responsiveOptions allow for adaptive behavior. |
| [image-gallery.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/image-gallery/image-gallery.component.ts)           | This code defines an ImageGalleryComponent that displays a collection of images. It receives an array of image URLs through the'images' input property. The component also allows customization of the thumbnail position through the'position' property, which can be set to'bottom','top','left', or'right'. The position options and responsive options are defined in a configuration file. |
| [image-gallery.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/image-gallery/image-gallery.component.spec.ts) | This code is a unit test for the ImageGalleryComponent in an Angular application. It verifies that the component is created successfully. The code sets up the testing environment, creates an instance of the component, and checks if it exists.                                                                                                                                              |

</details>

<details closed><summary>Mark</summary>

| File                                                                                                                                   | Summary                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mark.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/mark/mark.component.ts)           | The code defines a Angular component called "MarkComponent" that displays a partial article and a type. It has a constructor that injects a StateService. This component is used to mark and display location-related information in the article.                                                           |
| [mark.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/mark/mark.component.spec.ts) | This code snippet is a unit test for the `MarkComponent`. It sets up the component for testing and checks that it is created successfully. The `beforeEach` function creates a testing module and initializes the component. The `it` function verifies that the component exists.                          |
| [mark.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/mark/mark.component.scss)       | The code consists of two CSS classes: ".display" and ".self". The ".display" class sets the cursor property to "auto" and overrides any other cursor settings. The ".self" class sets the width property to 100 pixels.                                                                                     |
| [mark.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/mark/mark.component.html)       | This code snippet is part of a web application's map component. It displays markers with images based on their coordinates. Clicking on a marker selects an associated article and stops the event propagation. The code uses Angular directives and template syntax to conditionally render the marker UI. |

</details>

<details closed><summary>Navbar</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [navbar.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/navbar/navbar.component.spec.ts) | This code performs unit testing for the "NavbarComponent" in an Angular application. It creates an instance of the component, verifies that it is created successfully, and sets up the necessary testing environment. This ensures that the navbar component is functioning as expected.                                     |
| [navbar.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/navbar/navbar.component.scss)       | This code defines CSS styling for a responsive header section. It includes dynamic navigation buttons and a mobile menu. The code utilizes mixins for responsive designs and features such as button notifications and menu animations. It aims to achieve a visually pleasing and functional interface on different devices. |
| [navbar.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/navbar/navbar.component.ts)           | This code is for a Navbar component in an Angular application. It handles user interactions and triggers various services, such as adding articles, opening notifications, searching articles, and logging out. There are also functions for resolving menu options and toggling the mobile menu.                             |
| [navbar.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/navbar/navbar.component.html)       | This code snippet represents a section of a web application's interface that handles various user actions such as adding a post, logging in, menu navigation, searching for articles, and handling notifications. It is designed to be responsive on both mobile and desktop screens.                                         |

</details>

<details closed><summary>Right-overlay-container</summary>

| File                                                                                                                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [right-overlay-container.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/right-overlay-container/right-overlay-container.component.scss)       | This code defines the styling for a section component. It consists of a container with a title area and optional buttons. The container has a flexible width and a column layout. The title area has a flexible width with aligned contents, including a category label and a button. The button has a circular shape and displays an image. |
| [right-overlay-container.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/right-overlay-container/right-overlay-container.component.ts)           | The code is for a component in an Angular application. It imports the StateService to reset the application state and provides an exitOverlay function to call the service method. The component is responsible for managing the right overlay container.                                                                                    |
| [right-overlay-container.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/right-overlay-container/right-overlay-container.component.spec.ts) | This code is for unit testing the `RightOverlayContainerComponent` component in Angular. It creates a fixture and component instance using TestBed, compiles the component, and verifies if it is created successfully.                                                                                                                      |
| [right-overlay-container.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/right-overlay-container/right-overlay-container.component.html)       | The code defines a section component with a title and body content. It includes a close button and emits an event to exit the overlay. Its main functionality is to encapsulate and structure content within a section.                                                                                                                      |

</details>

<details closed><summary>Access-container</summary>

| File                                                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [access-container.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/access-container/access-container.component.html)       | The provided code is a component called MapNews. It includes areas for file upload, form elements, and actions. If there is an error, it is displayed in an error message.                                                                                                                  |
| [access-container.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/access-container/access-container.component.spec.ts) | This code represents a test suite for validating the creation of the AccessContainerComponent in an Angular application. It utilizes the TestBed to configure and create the component, then checks if it was successfully created.                                                         |
| [access-container.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/access-container/access-container.component.ts)           | This code is an Angular component named'AccessContainerComponent' that handles the interaction between the UI and the'AuthService' service for handling authentication-related functionalities.                                                                                             |
| [access-container.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/shared/access-container/access-container.component.scss)       | This code defines styles for a flexible and responsive layout of a section element. It includes mixins for various screen sizes and applies styling to child elements using a combination of CSS selectors and specific styles. It also handles error styling for a specific child element. |

</details>

<details closed><summary>Right-overlay</summary>

| File                                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [right-overlay.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/right-overlay/right-overlay.component.spec.ts) | The code is a test suite for the RightOverlayComponent in an Angular application. It creates an instance of the component and checks if it is successfully created. It utilizes the TestBed module for testing and ComponentFixture for handling the component. The code aims to ensure that the RightOverlayComponent is functioning as intended. |
| [right-overlay.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/right-overlay/right-overlay.component.ts)           | The code defines a component for a right overlay in an Angular application. It extends a FormDirective, handles user authentication status, and includes functions to handle liking articles and submitting a search query to fetch articles.                                                                                                      |
| [right-overlay.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/right-overlay/right-overlay.component.scss)       | This code defines CSS styles for different sections of a web page. It includes responsive design for small screens, flexbox layouts, and various stylings for nested elements such as tags and image galleries. The code aims to provide a consistent and visually appealing layout for search and article detail sections on the web page.        |
| [right-overlay.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/right-overlay/right-overlay.component.html)       | The code is a component that provides a dynamic interface for displaying article details and a search functionality section. It includes the ability to display article details and handle interactions like liking an article. The search section allows users to input article details and add tags when submitting the form.                    |

</details>

<details closed><summary>Map</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [map.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/map/map.component.ts)           | This code is for an Angular component that represents a map interface. It includes functionalities such as displaying articles, updating the map center based on user location, animating location markers, handling map events, and managing component state changes.                                      |
| [map.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/map/map.component.html)       | This code implements a map component that displays articles and their locations, allowing users to select and mark locations. It also adds a user's current location as a marker on the map.                                                                                                                |
| [map.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/map/map.component.scss)       | This code defines a CSS styling for a map component. It sets the height and width to fit the viewport, and adds a class "locationSelection" that changes the cursor to a crosshair. It also includes CSS styling for marker images and hides the default attribution control.                               |
| [map.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/map/map.component.spec.ts) | This code is a test suite for the MapComponent in an Angular application. It uses the TestBed to configure and create a fixture for the component. The beforeEach function sets up the necessary declarations and compiles the component. The it statement checks if the component is successfully created. |

</details>

<details closed><summary>Register</summary>

| File                                                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [register.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/register/register.component.html)       | This code represents a container component for a registration form with functionalities to upload an image, enter email and password, and submit the form. It also includes actions for registration and redirecting to a login page.                                                                                                   |
| [register.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/register/register.component.scss)       | This code defines the core styles for an upload component. It centers the component and sets its height to 100% of the parent element's height. It also handles responsiveness for smaller screens. The upload component consists of an image area, a label, and a text. On hover, it provides visual feedback and underlines the text. |
| [register.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/register/register.component.ts)           | The code is for a registration page in an Angular application. It extends a form directive, handles adding an image, and submits the form data to authenticate the user for registration.                                                                                                                                               |
| [register.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/components/register/register.component.spec.ts) | This code is for testing the RegisterComponent in an Angular application. It sets up the component for testing, creates an instance of it, and checks if the component is created successfully.                                                                                                                                         |

</details>

<details closed><summary>Auth</summary>

| File                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [auth.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/auth/auth.service.spec.ts)             | This code is a unit test for the AuthService, a service responsible for managing authentication in an Angular application. It ensures that the AuthService is successfully created and available for use.                                                                                                             |
| [auth.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/auth/auth.service.ts)                       | This code implements the authentication functionality for a web application using Angular. It handles user registration, login, and logout, while also managing authentication status and error handling. The code communicates with a server through various services and utilizes web socket for real-time updates. |
| [auth.interceptor.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interceptors/auth/auth.interceptor.spec.ts) | The code is a simple unit test for an Angular AuthInterceptor. It tests if the AuthInterceptor is successfully created in the Angular TestBed.                                                                                                                                                                        |
| [auth.interceptor.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interceptors/auth/auth.interceptor.ts)           | This code snippet defines an Angular HttpInterceptor called AuthInterceptor. It adds an authorization header with a token to outgoing HTTP requests. If a token exists, it creates a new request with the added header. If there is no token, it passes the original request.                                         |

</details>

<details closed><summary>Server</summary>

| File                                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [server.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/server/server.service.spec.ts) | This code is a unit test for the ServerService, which is a service used for server-related functionalities in an Angular application. It verifies that the service can be successfully created and is accessible.                                                                                                                  |
| [server.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/server/server.service.ts)           | This code defines a service for making HTTP requests to a server using Angular's HttpClient module. It provides methods for making GET and POST requests with optional parameters. The request method handles the HTTP request, while the get and post methods serve as convenient wrappers for making specific types of requests. |

</details>

<details closed><summary>Form</summary>

| File                                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [form.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/form/form.service.ts)           | The FormService is a class that handles the creation and management of Angular Reactive Forms based on a dynamic form configuration. It retrieves the form configuration from the server, dynamically generates the form controls based on the configuration, and provides methods to reset, resolve, and access the form controls. |
| [form.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/form/form.service.spec.ts) | This code imports the `TestBed` module from `@angular/core/testing` and the `FormService` module. It creates a test suite for the `FormService` and initializes the service using `TestBed.forRoot()`. The test checks if the service was successfully created.                                                                     |

</details>

<details closed><summary>Notification</summary>

| File                                                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [notification.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/notification/notification.service.ts)           | The code defines the NotificationService class, responsible for managing notifications in an Angular application. It handles fetching notifications from the server, adding new notifications, and keeping track of viewed notifications. It also uses authentication and WebSocket services for real-time updates. |
| [notification.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/notification/notification.service.spec.ts) | This code is a testing suite for the NotificationService class in an Angular application. It sets up a test bed and checks if the service is created successfully.                                                                                                                                                  |

</details>

<details closed><summary>State</summary>

| File                                                                                                                                     | Summary                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [state.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/state/state.service.ts)           | The StateService class is responsible for managing the application state. It uses the WebSocketService to send the state to the server and broadcasts it to subscribers using the model Subject. It can resolve and reset the state based on given state names and data. |
| [state.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/state/state.service.spec.ts) | This code is a unit test for the StateService class in an Angular application. It asserts that the service can be successfully created using Angular's TestBed.                                                                                                          |

</details>

<details closed><summary>Ws</summary>

| File                                                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [web-socket.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/ws/web-socket.service.ts)           | The code is an Angular service that establishes a WebSocket connection with a backend server. It provides the functionality to connect to the server, send data over the connection, receive notifications from the server, close the connection, and clean up resources when the service is destroyed. The WebSocket service utilizes the `webSocket` and `WebSocketSubject` from the `rxjs` library to handle the WebSocket communication. |
| [web-socket.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/ws/web-socket.service.spec.ts) | This code tests the creation of a WebSocketService in an Angular app. It uses the TestBed framework to simulate the Angular environment. It ensures that the service is created successfully by checking if it exists.                                                                                                                                                                                                                       |

</details>

<details closed><summary>Article</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [article.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/article/article.service.spec.ts) | The code is a unit test for the ArticleService class in an Angular application. It initializes the TestBed and creates an instance of the ArticleService. The test checks if the service was successfully created.                                                                                                                                                                                                                                                                                                                                                 |
| [article.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/article/article.service.ts)           | The ArticleService class provides core functionalities for managing articles, including retrieving articles, reporting articles, resolving article likes, and adding notification articles. It integrates with various services such as ServerService, AuthService, StateService, LocationService, and WebSocketService. The service utilizes BehaviorSubject to keep track of article data and updates, and communicates with the server and web socket for data exchange. Overall, it serves as a central hub for article-related operations in the application. |

</details>

<details closed><summary>Location</summary>

| File                                                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [location.service.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/location/location.service.ts)              | The LocationService is a code module that handles geolocation functionality. It provides methods to initialize and retrieve the user's current location. The current location is obtained using the browser's geolocation API and is stored in the \_currentLocation property.The module also includes a method to continuously watch for changes in the user's location, sending updates to a WebSocket service. Additionally, the module allows for setting and receiving mouse coordinates.Overall, the LocationService facilitates managing the user's location information throughout the application. |
| [location.service.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/services/location/location.service.spec.ts)    | This code is a unit test for the LocationService class. It verifies that the service can be successfully created using Angular's TestBed module. The expectation is that the service should exist.                                                                                                                                                                                                                                                                                                                                                                                                          |
| [location.resolver.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/resolvers/location/location.resolver.ts)           | This code defines a resolver service that retrieves location data and then uses it to fetch relevant articles. The LocationService and ArticleService classes are injected as dependencies. The resolve method returns a promise that initiates the location service, fetches articles using the location data, and returns the result.                                                                                                                                                                                                                                                                     |
| [location.resolver.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/resolvers/location/location.resolver.spec.ts) | This code tests the creation of a LocationResolver service in an Angular application. It verifies that the service can be created successfully.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

</details>

<details closed><summary>Directives</summary>

| File                                                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [form.directive.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/directives/form.directive.ts)           | The code is an Angular directive that handles various forms in the application. It communicates with different services like FormService, ArticleService, AuthService, LocationService, and StateService to manage form data, make API calls, and update the application state. The directive handles form validation and interacts with the user through form interactions. |
| [form.directive.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/directives/form.directive.spec.ts) | The code tests if the FormDirective class can be successfully instantiated and asserts that the instance created is truthy (not null or undefined).                                                                                                                                                                                                                          |

</details>

<details closed><summary>Utilities</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [animations.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/utilities/animations.ts) | This code defines various Angular animation triggers for implementing page transitions, such as fading, bouncing, sliding, and rotating motions. It provides reusable animations for different elements and transitions between different routes or states.                                                                                           |
| [validators.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/utilities/validators.ts) | This code exports a validator map object that specifies various validation functions for different form controls. It includes functions for required fields, email format, text and title length restrictions, and location coordinates. It also provides a customizable validator function for checking if a value matches a forbidden name pattern. |

</details>

<details closed><summary>Custom-time</summary>

| File                                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [custom-time.pipe.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/custom-time/custom-time.pipe.spec.ts) | This code is a unit test for the `CustomTimePipe` class. It checks if an instance of the class can be successfully created.                                                                                                                                                                                                                                          |
| [custom-time.pipe.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/custom-time/custom-time.pipe.ts)           | This code defines a custom pipe called "CustomTimePipe" which combines the functionality of DatePipe and IntlRelativeTimePipe. It calculates the difference between a given date value and the current date, and returns a formatted string that shows the time elapsed since the given date if it is within the past 7 days, otherwise it displays the posted date. |

</details>

<details closed><summary>Like-term</summary>

| File                                                                                                                                        | Summary                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [like-term.pipe.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/like-term/like-term.pipe.ts)           | The code defines a pipe in Angular that transforms a list of likes and the current user ID into a concise message about the number of likes. It determines if the current user has liked the item and calculates the remaining number of likes. It then generates a message based on these values. |
| [like-term.pipe.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/like-term/like-term.pipe.spec.ts) | The code is for testing the functionality of the LikeTermPipe, which is used to filter and display terms that match a certain pattern. The test checks if a new instance of the pipe can be created successfully.                                                                                  |

</details>

<details closed><summary>Email-name</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [email-name.pipe.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/email-name/email-name.pipe.spec.ts) | The code is testing the creation of an instance of the EmailNamePipe class. It is checking that the pipe is successfully instantiated, ensuring the proper functioning of the pipe in the application.                                                                                        |
| [email-name.pipe.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/email-name/email-name.pipe.ts)           | The code defines a custom Angular pipe called'emailName'. This pipe takes in an email address as input and returns the name part of the email address by splitting the address at the'@' symbol. If no email is provided, it returns'Unknown'. The returned name is formatted as'By: {name}'. |

</details>

<details closed><summary>Notification-message</summary>

| File                                                                                                                                                                         | Summary                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [notification-message.pipe.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/notification-message/notification-message.pipe.ts)           | The code defines a Angular pipe that takes a string and a notification type as input and returns a formatted notification message. The message is generated by concatenating the notification type from a JSON config file with the provided string value. |
| [notification-message.pipe.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/pipes/notification-message/notification-message.pipe.spec.ts) | The code is testing the functionality of the `NotificationMessagePipe` class. It ensures that an instance of the class can be created successfully.                                                                                                        |

</details>

<details closed><summary>Interfaces</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [state.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/state.interface.ts)                 | The code defines a TypeScript type alias for the state names used in an application. It also defines an interface for the state objects, which have a name property and an optional data property. This code provides a structure for managing different states in an application.                                                                                                                                      |
| [form.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/form.interface.ts)                   | The code defines interfaces and types for managing forms in a web application. It includes a form configuration with attributes such as type, value, and optional validators. The Form interface specifies a unique ID, the form configuration, and a name.                                                                                                                                                             |
| [auth.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/auth.interface.ts)                   | This code defines two interfaces: AuthStatus and IUser. AuthStatus has two properties-loggedIn (boolean) and optional id (string). IUser has properties \_id (optional string), email (string), and profile_img (string). These interfaces provide a structure for organizing authentication status and user data.                                                                                                      |
| [preview-image.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/preview-image.interface.ts) | The code defines an interface for previewing images. It includes a property for the image file and a URL property for displaying a preview of the image.                                                                                                                                                                                                                                                                |
| [location.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/location.interface.ts)           | The code defines two interfaces: ILocation, representing longitude and latitude coordinates, and IMapAttributes, representing zoom and partial location details. These interfaces provide a structure to store and retrieve geographical data for mapping purposes.                                                                                                                                                     |
| [response.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/response.interface.ts)           | The code defines an interface called IResponse, which represents a response object. It includes 3 properties: success (a boolean indicating if the operation was successful), data (optional, holds the response data), and error (optional, represents any error that occurred during the operation).                                                                                                                  |
| [notification.interface.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/notification.interface.ts)   | This code defines an interface for notifications that include an ID, notification type, article details, users to notify, and time of the notification.                                                                                                                                                                                                                                                                 |
| [article.interface..ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/interfaces/article.interface..ts)           | This code provides the main functionalities for articles in a platform, including the article structure, article categories, and search parameters for retrieving articles. It includes properties such as category, coordinates, title, description, tags, likes, images, time, and the user who posted the article. With the GetArticleParams interface, users can retrieve articles by category, location, and tags. |

</details>

<details closed><summary>Config</summary>

| File                                                                                                                                           | Summary                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [config.resolver.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/resolvers/config/config.resolver.spec.ts) | This code is an Angular unit test for the ConfigResolver class. It tests if the resolver is created by using the TestBed configuration.             |
| [config.resolver.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/core/resolvers/config/config.resolver.ts)           | The code defines a resolver that uses the FormService to fetch configuration data. It returns a Promise that resolves with a ConfigResponse object. |

</details>

<details closed><summary>Home</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [home.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/home/home.component.html)       | This code represents the core functionalities of a web application. It includes a navigation bar component, overlays for article details and search results, an overlay for article submission, notifications display, and an article box component.                                                                                                                                               |
| [home.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/home/home.component.scss)       | This code contains CSS rules for positioning elements and configuring scroll behavior. The elements with the classes "app-left-overlay" and "app-right-overlay" will be positioned absolutely, with specific insets and background color. They will have both horizontal and vertical scrolling enabled. Additionally, for small screens, there is a specific styling applied to adjust the inset. |
| [home.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/home/home.component.spec.ts) | The code is for testing the HomeComponent in an Angular application. It creates a new instance of the component and checks if it is created successfully.                                                                                                                                                                                                                                          |
| [home.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/home/home.component.ts)           | This code defines the HomeComponent in an Angular application. It imports various services and interfaces for state management and authentication. The component subscribes to changes in the state and authentication status and updates its properties accordingly. It also includes animations and a template for rendering the component.                                                      |

</details>

<details closed><summary>Access</summary>

| File                                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [access.component.html](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/access/access.component.html)       | This code is for an Angular component that handles routing and authentication. If the user is not authenticated, it displays a router outlet and a button to go back to the homepage. If the user is authenticated, it shows a success message with an icon, the current page name, and a rotating animation. The success message resets after the animation. |
| [access.component.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/access/access.component.scss)       | The code defines styling rules for a modal overlay. It contains CSS classes for positioning, button styling, image display, and success message styling. It utilizes flexbox for layout and provides hover and success state effects.                                                                                                                         |
| [access.component.spec.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/access/access.component.spec.ts) | This code defines and executes unit tests for the AccessComponent in an Angular application. It ensures that the component is created successfully using the "toBeTruthy()" assertion function.                                                                                                                                                               |
| [access.component.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/app/pages/access/access.component.ts)           | The code is a component in an Angular application that handles the authentication and routing functionality. It interacts with the AuthService to update the authentication status and the Router to track the current route. It also includes animations and provides a method to reset the application state.                                               |

</details>

<details closed><summary>Shared</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [\_mixins.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/shared/_mixins.scss)       | This code provides mixins for defining media queries based on the screen size. The mixins allow you to group CSS styles that should only be applied when the screen width is within a specific range. The mixins make it easier to write and organize responsive CSS styles. |
| [\_variables.scss](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/shared/_variables.scss) | The code offers core functionalities including data manipulation, efficient algorithm implementation, streamlined workflows, error handling, and modular architecture, enabling seamless development and maintenance of software solutions.                                  |

</details>

<details closed><summary>Environments</summary>

| File                                                                                                                      | Summary                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [environment.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/environments/environment.ts)           | This code defines the base API endpoint for a news mapping platform. It includes the URLs for the backend API and WebSocket connection, and differentiates between local development and deployment environments. |
| [environment.prod.ts](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/src/environments/environment.prod.ts) | This code exports the configuration for the production environment, indicating whether it is in production mode and the backend API endpoint for mapnews.                                                         |

</details>

<details closed><summary>.husky</summary>

| File                                                                                          | Summary                                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [pre-commit](https://github.com/dubstep-warrior/mapnews-frontend/blob/main/.husky/pre-commit) | This script initializes the Husky git hooks tool and utilizes it to run the "format" command to format the code. It then adds all changes to the Git repository. |

</details>

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

> - `ℹ️ Requirement 1`
> - `ℹ️ Requirement 2`
> - `ℹ️ ...`

### 📦 Installation

1. Clone the mapnews-frontend repository:

```sh
git clone https://github.com/dubstep-warrior/mapnews-frontend
```

2. Change to the project directory:

```sh
cd mapnews-frontend
```

3. Install the dependencies:

```sh
npm install
```

### 🎮 Using mapnews-frontend

```sh
npm start
```

### 🧪 Running Tests

```sh
npm test
```

---

## 🗺 Roadmap

> - [x] `ℹ️  Task 1: Implement X`
> - [ ] `ℹ️  Task 2: Refactor Y`
> - [ ] `ℹ️ ...`

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

## 📄 License

This project is licensed under the `ℹ️  INSERT-LICENSE-TYPE` License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.

---

## 👏 Acknowledgments

> - `ℹ️  List any resources, contributors, inspiration, etc.`

---
