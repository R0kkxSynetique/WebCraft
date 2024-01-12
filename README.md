#

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/R0kkxSynetique/WebCraft">
    <img src="https://simpleicons.org/icons/minecraft.svg" alt="Logo" width="80" height="80" style="filter:invert(1);background:none">
  </a>

<h3 align="center">WebCraft</h3>

  <p align="center">
    Web application based on minecraft crafting
    <br />
    <a href="https://github.com/R0kkxSynetique/WebCraft"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/R0kkxSynetique/WebCraft/issues">Report Bug</a>
    ·
    <a href="https://github.com/R0kkxSynetique/WebCraft/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

You are a pro of minecraft and know every recipe by heart? We'll see that! Try to craft the items without any help to prove your skills!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- [X] Access the crafting table
- [X] Click and drop items on the crafting table
- [X] Craft predefined items when the recipe is correct
- [X] Store crafted items in the inventory
- [X] Items can be used to craft other items
- [X] Items can be discarded
- [X] Stacking items and splitting stacks
- [X] Generate a random items
- [ ] Tools can be used to generate items
- [ ] Tools can be crafted
- [ ] Can process items (smelting, etc...)
- [ ] Display the list of all the achievments (items crafted)
- [ ] Achievments can be unlocked
- [X] Can register player name on save
- [X] Player can have multiple local saves
- [X] All items are existing based on [PrismarineJS 1.8 data][PrismarineJS-url] 
- [X] All receipes are existing based on [PrismarineJS 1.8 data][PrismarineJS-url]
- [X] All sprites are existing

### Built With

[![Next][Next.js]][Next-url]
[![Node][Node.Js]][Node-url]
[![Python][Python]][Python-url]
[![FastAPI][FastAPI]][FastAPI-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This readme will lead you to a thorough understanding of the project and ensure that you have the capability to run it successfully, particularly if you intend to contribute.

### Prerequisites

To successfully execute the project, ensure the following prerequisites are met. The listed versions have been tested and verified, though alternative versions may function but are not assured.

- nodeJS 19.4.0
- npm 8.14.0
- python 3.10.4
- pip 22.0.4

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/R0kkxSynetique/WebCraft.git
    ```

2. Install NPM packages

    ```sh
    npm install
    ```

3. Install python packages

    ```sh
    pip install -r requirements.txt
    ```

4. Copy the .env.example files to .env and fill them with your own values. Don't forget, there are 2 .env files to fill. You can find more information about the .env files in the [wiki Environnement variables page](https://github.com/R0kkxSynetique/WebCraft/wiki/Environnement-variables)

    ```sh
    cp .env.example .env
    cp ./webcraft-ui/.env.example ./webcraft-ui/.env
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/R0kkxSynetique/WebCraft.svg?style=for-the-badge
[contributors-url]: https://github.com/R0kkxSynetique/WebCraft/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/R0kkxSynetique/WebCraft.svg?style=for-the-badge
[forks-url]: https://github.com/R0kkxSynetique/WebCraft/network/members
[stars-shield]: https://img.shields.io/github/stars/R0kkxSynetique/WebCraft.svg?style=for-the-badge
[stars-url]: https://github.com/R0kkxSynetique/WebCraft/stargazers
[issues-shield]: https://img.shields.io/github/issues/R0kkxSynetique/WebCraft.svg?style=for-the-badge
[issues-url]: https://github.com/R0kkxSynetique/WebCraft/issues
[license-shield]: https://img.shields.io/github/license/R0kkxSynetique/WebCraft.svg?style=for-the-badge
[license-url]: https://github.com/R0kkxSynetique/WebCraft/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs
[Next-url]: https://nextjs.org/
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=node.js
[Node-url]: https://nodejs.org/en/
[PrismarineJS-url]:https://github.com/PrismarineJS/minecraft-data/tree/master/data/pc/1.8
[Python]: https://img.shields.io/badge/python-000000?style=for-the-badge&logo=python
[Python-url]: https://www.python.org/
[FastAPI]: https://img.shields.io/badge/FastAPI-000000?style=for-the-badge&logo=fastapi
[FastAPI-url]: https://fastapi.tiangolo.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=mongodb
[MongoDB-url]: https://www.mongodb.com/
[Docker]: https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=docker
[Docker-url]: https://www.docker.com/
