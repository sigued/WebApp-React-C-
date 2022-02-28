# PIP APP

## About The Project

PIP-App is a web application tool that was designed for geotechnicians to help them perform their tasks more easily. It allows them to make queries containing specific data to obtain all the associated information in a pdf file. It also allows the managers to add new correlations in order to request them in the future.
<https://presses-polytechnique.azurewebsites.net>

## Built With

- [React.js](https://reactjs.org/)
- [Redux.js](https://redux.js.org/)
- [React Material UI](https://mui.com/)

## Getting Started

Here is an explanation of how to run the project locally

### Prerequisites

_You can skip these steps if you already have **NodeJs** and **NPM** installed on your machine._

1. Download [NodeJs and NPM](https://nodejs.org/en/download/)
2. Choose the recommended version for Windows 32-bit or 64-bit (Most Windows nowadays are 64-bit)
3. Click on the downloaded file to start the installation process
4. After done, open Command Prompt and run the below commands to verify if **NodeJs** and **NPM** are installed correctly on your machine

   ```sh
   node -v
   ```

   ```sh
   npm -v
   ```

### Installation

1. Open **Git** console to clone the repo

   ```sh
   git clone https://your_username@dev.azure.com/your_username/PIP/_git/pip-ui
   ```

2. Go to **/pip-ui** folder and Install **NPM** packages

   ```sh
   cd pip-ui
   npm install
   ```

3. Launch the project

   ```sh
   npm start
   ```

## Development Guide

### Open Workspace

1. Go to pip-ui folder
2. Open the project through the **pip-app.code-workspace** file with **VSCode**
3. If you don't have **VSCode**, it is highly recommended to download it
4. Accept and download all the suggested plug-ins
5. Enjoy coding

### Prerequisites to start

Want to contribute? Great!

You must know some programming skills before starting:

- HTML
- CSS
- JavaScript
- TypeScript
- JSX/TSX
- JSON Format
- React
  - Functionnal programming
  - Components Concepts
  - State
  - Props
  - ...
- Redux
  - Store
  - Slice
  - Hooks
    - UseEffect
    - UseState
    - UseSelector
    - UseDispatch
    - UseHistory
    - UseLocation
    - ...
  - ...
- React Material UI
- HTTP Requests using fetch method
- Asynchronus methods
- Basic Git commands

### Contribution

#### Project structure

- The **common** folder contains all components and methods that are using for the entire application.
- The **feature** folder contains folders for each feature or functionality of the application.
  - The components folder contains the content of the new feature in **tsx** format.
  - The state folder contains the types and the slice of the feature. You have to learn **Redux** concepts to understand the utility of the slice file.
- The images folder contains the logo and the cover photo.
- The **routes** folder contains the files that manage the routing of the application.
- The **state** folder contains the store of the application. You have to learn **Redux** concepts to understand the utility of the store file.
- The **translations** folder contains the files that manage the languages used by the application.

#### Layout structure

Image 1: Application layout for a large screen more than 900 pixels wide
![Getting Started](./src/images/appLargeLayout.png)

- The layout page is separated into three rows:

  - header bar
  - main content (sideMenu, left and right)
  - footer

- The main content is separated into three columns:
  - sideMenu
  - left
  - right

The logic behind this layout is that we display the main content in the _left_ framework.
If we want to display more details about an element that exists in this _left_ framework, we display them in the _right_ framework.
If the page content doesn't need this kind of logic, you can simply merge the _left_ and the _right_ frameworks.

Image 2: Application layout for a small screen less than 900 pixels wide
![Getting Started](./src/images/appSmallLayout.png)

- The layout page is separated into three rows:

  - header bar
  - main content (sideMenu, main)
  - footer

- The main content is separated into two columns:
  - sideMenu
  - main

The logic behind this layout is that we display the main content in the _main_ framework and we replace the _right_ framework with a _Dialog_ that will pop up in the middle of the page because there is no space in small screens.

You can check the layout.ts file in the **src/common/styles/** folder to understand better the layout structure.

#### Routes structure

Example of a route:
Image 3: A link that describes the different types of paths
![Getting Started](./src/images/route.png)

The path underlined in red represents the main route of the page which is the _left_ framework.
The path underlined in green represents the side route of the page which is the _right_ frameworkd or the _dialog_.
In case that the _left_ and the _right_ frameworks are merged, the side route become useless.

#### Application Theme

Go to the **src/common/styles/themes.ts** if you want to add or change some attributes of the current theme.

#### How to add a new page to the application?

1. Add a new folder in the features folder with the name of the new page that you want to create.
2. Add all new components that you need in a new folder called components.
3. If the new feature needs a slice, create a state folder to add the slice file.
4. Go to **routes/routePaths.ts** to add the new path of your new page.
5. If you want to display the new content in the _left_ frameworkd or in the _main_ framework:
   - Go to **routes/Routes.tsx** to add the new component content that you have created in step number two.
6. If you want to display the new content in the _right_ framework.
   - Go to **routes/SideRoutes.tsx** to add the new component content that you have created in step number two.

## Contact

- **Name:** Bassam Ajam
  - [LinkedIn](https://www.linkedin.com/in/bassam-ajam/)
  - bassam.ajam95@gmail.com
