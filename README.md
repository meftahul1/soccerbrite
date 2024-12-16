<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/meftahul1/soccerbrite/">
    <img src="https://raw.githubusercontent.com/meftahul1/soccerbrite/refs/heads/frontend/client/public/sb.jpg" alt="Logo" width="240" height="160">
  </a>

<h3 align="center">SoccerBrite</h3>

  <p align="center">
    A platform designed for soccer enthusiasts to create and host soccer events through our site
    <br />
    <a href="">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
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
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/meftahul1/soccerbrite/)

Soccerbrite is a dynamic platform designed to bring soccer enthusiasts together in a space where they can easily create, host, and discover soccer events. Whether you're a seasoned player, an avid fan, or just starting to explore the game, Soccerbrite is here to help you connect with others who share your passion for soccer.

**Our mission** is to build a thriving community of players, fans, and organizers who can come together to grow their love for the sport. Through Soccerbrite, users can not only find or host local games and tournaments, but also build relationships with fellow soccer lovers, exchange tips, and stay engaged in the vibrant world of soccer.

Soccerbrite is also dedicated to spreading the joy of soccer to newcomers, providing resources and opportunities for those who are just beginning their soccer journey. Whether you're looking to join your first match or looking for more advanced competition, Soccerbrite is the place to start, share, and expand your soccer experience.

### Key Features
#### Event Creation & Hosting:
- Easily create and host soccer events such as casual games, or pick-up matches.
- Customize your event by selecting the date, time, location, and other details to match the needs of your participants.
- Invite friends or open the event to the community, making it easier for people to connect with each other.

#### Location-Based Event Discovery:
- Use **Google Maps API** to find nearby soccer events and venues, ensuring players can quickly discover opportunities to play within their local area.
- Interactive maps allow users to visualize event locations and plan their participation around geography and convenience.

#### Weather & Field Conditions Integration:
- Integrated with a **Weather API**, Soccerbrite provides real-time weather forecasts for event locations to help participants prepare for upcoming games.
- Get detailed weather updates, such as temperature, precipitation chances, and wind conditions, ensuring that players are well-informed before heading to the field.
- Optional notifications alert participants if weather conditions change drastically, allowing them to reschedule or adjust their plans accordingly.

#### Geocoding for Event Accuracy:
- The **Geocoding API** enhances the precision of event location details, ensuring that the addresses provided for events are accurate.
- Soccerbrite automatically converts addresses into geolocation coordinates, improving the accuracy of the map and ensuring participants can easily find event venues without confusion.

#### Community Building & Social Interaction:
- Create profiles, follow other users, and engage in soccer-related discussions.
- Share event results, photos, and highlights to keep the community connected and engaged.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![TailwindCSS][TailwindCSS-badge]][TailwindCSS-url]
* [![Flask][Flask-badge]][Flask-url]
* [![MongoDB][MongoDB-badge]][MongoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)  
- **Python**: [Download here](https://www.python.org/downloads/)  
- **npm** (comes with Node.js) or **yarn**  
- **pip** (comes with Python) or **pipenv**

### Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/meftahul1/soccerbrite/
   cd soccerbrite
   ```

2. **Set Up the Next.js Frontend**
- Navigate to the frontend directory:
   ```sh
   cd client
   ```
- Install the packages
   ```sh
   npm install
   ```
- Create a `.env.local` file to configure environment variables for Next.js:
  ```sh
  GOOGLE_ID = "your_google_id"
  GOOGLE_SECRET =  "your_google_secret"
  
  NEXTAUTH_SECRET = "your_sha_secret"
  NEXTAUTH_URL = "http://localhost:3000"
  ```
- Start the dev server
  ```sh
  npm run dev
  ```
The frontend should now be running at [http://localhost:3000](http://localhost:3000)
   
3. **Set Up the Flask Backend**
- Navigate to the frontend directory:
   ```sh
   cd ../server
   ```
- Create a virtual environment:
  ```bash
  python -m venv venv
  ```
- Activate the virtual environment:
  - Windows:
    ```bash
    venv\Scripts\activate
    ```
  - macOS/Linux:
  ```bash
  source venv/bin/activate
  ```
- Install dependencies
   ```sh
   pip install -r requirements.txt
   ```
- Create a `.env` file to configure environment variables for Flask:
  ```sh
  DATABASE_URI = "your_db_uri"
  ```
- Start the flask server
  ```sh
  python run.py
  ```
The backend should now be running at [http://localhost:5000](http://localhost:5000)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: https://media.discordapp.net/attachments/1293348473269129307/1308538323656114307/image.png?ex=673e4ec7&is=673cfd47&hm=7ce68a0f74297c2726f6aeb83895d61210d8c3e705f260fbe87e2435c18e9c26&=&format=webp&quality=lossless&width=1390&height=662
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TailwindCSS-badge]: https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Flask-badge]: https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[MongoDB-badge]: https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
