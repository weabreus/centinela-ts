<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/weabreus/centinela-ts">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 239 145"
        fill="none"
        width="200px"
        height="200px"
      >
        <g id="Logo-Brand" filter="url(#filter0_d_1_13)">
          <g id="Group">
            <path
              id="Vector"
              d="M98.38 91.93V105.89L4 64.82V62.96L98.38 21.75V35.57L30.46 63.75L98.38 91.93Z"
              fill="#163455"
            />
            <path
              id="Vector_2"
              d="M140.5 35.71V21.75L234.88 62.82V64.68L140.5 105.89V92.07L208.42 63.89L140.5 35.71Z"
              fill="#1A3B6A"
            />
          </g>
          <path
            id="Vector_3"
            d="M56.06 56.06C56.06 25.1 81.16 0 112.12 0C143.08 0 168.18 25.1 168.18 56.06C168.18 87.02 112.12 136.5 112.12 136.5C112.12 136.5 56.06 87.02 56.06 56.06Z"
            fill="#25497D"
          />
          <path
            id="Vector_4"
            d="M112.12 0C143.08 0 168.18 25.1 168.18 56.06C168.18 87.02 112.12 136.5 112.12 136.5"
            fill="#163455"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_13"
            x="0"
            y="0"
            width="238.88"
            height="144.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_13"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
  </a>

<h3 align="center">Centinela Access Control</h3>

  <p align="center">
    Web Application to manege access control to living complexes as a SaaS. The application manages all entities related to a living complex and uses the data to generate useful insights for the complex administrators.
    <br />
    <a href="https://github.com/weabreus/centinela-ts"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://centinela-three.vercel.app/">View the development website</a>
    ·
    <a href="https://github.com/weabreus/centinela-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/weabreus/centinela-ts/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About Centinela</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://centinela-three.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- [![Firebase][Firebase]][firebase-url]
- [![Typescript][typescript]][typescript-url]
- [![Tailwind][tailwind]][tailwind-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you want to run Centinela locally in your machine you'll need to follow the next steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

- Firebase Configuration (Auth/Firestore)
    1. Create a Firebase app.
    2. Create a .env file in the root directory and include your Firebase Key in the following variable:
        ```sh
        REACT_APP_FIREBASE_AUTH={Your Firebase Key}
        ```
    3. Update the file located at ./src/firestore/FirestoreConfig.tsx with the information provided by Firebase.

- Create users in Firebase Auth and create a users collection in Firestore with the following structure for each user document:
```sh
  {
    address: string,
    areacode: string,
    country: string,
    email: string,
    minicipality: string,
    name: string,
    organization: string,
    phone: string,
    title: string,
    complex: uid,
    photo: uri,
    role: string,
    social: string
  }
```

Notes:
1. The role options are: superadmin, admin, and staff.
2. The complex uid should be for the complex the user is configured. The user will only be able to see information from it's assigned complex unless the role is superadmin.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/weabreus/centinela-ts.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the installation with
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Functionality to keep record of visits to the living complex.
- [ ] Design useful reports from the collected visit data.
- [ ] Develop functionality to control the mechanical doors through the application.
  - [x] Develop software to control the door motors using a Raspberry PI.
  - [ ] Develop a REST API for the Raspberry PI to control the Raspberry through the web application.
  - [ ] Develop UI to control doors through the web app using the Raspberry's REST API.
- [ ] Integrate the web application with a virtual phone to allow management of access to living complexes remotely.
- [ ] Integrate with AirBnB API to allow registration of authorized visitors automatically.

See the [open issues](https://github.com/weabreus/centinela-ts/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Wellington Abreu - [@WAS_DR](https://twitter.com/WAS_DR) - wellington.abreu@gmail.com

Project Link: [https://github.com/weabreus/centinela-ts](https://github.com/weabreus/centinela-ts)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/weabreus/centinela-ts.svg?style=for-the-badge
[contributors-url]: https://github.com/weabreus/centinela-ts/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/weabreus/centinela-ts.svg?style=for-the-badge
[forks-url]: https://github.com/weabreus/centinela-ts/network/members
[stars-shield]: https://img.shields.io/github/stars/weabreus/centinela-ts.svg?style=for-the-badge
[stars-url]: https://github.com/weabreus/centinela-ts/stargazers
[issues-shield]: https://img.shields.io/github/issues/weabreus/centinela-ts.svg?style=for-the-badge
[issues-url]: https://github.com/weabreus/centinela-ts/issues
[license-shield]: https://img.shields.io/github/license/weabreus/centinela-ts.svg?style=for-the-badge
[license-url]: https://github.com/weabreus/centinela-ts/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/wellingtonabreu
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript&logoColor=61DAFB
[typescript-url]: https://www.typescriptlang.org/
[tailwind]: https://img.shields.io/badge/Tailwind-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[tailwind-url]: https://tailwindcss.com/
[Firebase]: https://img.shields.io/badge/Firebase-20232A?style=for-the-badge&logo=firebase&logoColor=61DAFB
[firebase-url]: https://firebase.google.com/
