# Suraj Kumar – Personal Portfolio

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-1D4ED8?style=for-the-badge&logo=icloud&logoColor=white)](https://imagekit.io/)

🚀 **Live Demo:** [infosuraj.com](https://infosuraj.com)

A dynamic portfolio showcasing **Full Stack Development**, **UI/UX Design**, **Motion Graphics**, and **Affiliate Marketing** projects by me, **Suraj Kumar**.  
Built with **Docker, Node.js/Express, MongoDB, React.js, ImageKit**, and integrated with **Mailchimp** for email marketing.  
Explore innovative web solutions, engaging user experiences, and impactful branding work — all crafted to drive results.

---

## 🔹 Features
- Full Stack Development with **Node.js + Express.js**
- **React.js** frontend for fast, interactive UI
- **MongoDB** backend for scalable data management
- **ImageKit** for image optimization & DRM
- **Mailchimp** integration for email campaigns
- **Admin panel** for portfolio content management
- **Dockerized** for deployment & scalability
- Fully responsive design for all devices
- SEO-friendly structure & optimized performance

---

## 📌 Tech Stack
**Frontend:** React.js, HTML5, CSS3, JavaScript (ES6)  
**Backend:** Node.js, Express.js, MongoDB  
**Email & Marketing:** SMTP, Mailchimp API  
**DevOps & Deployment:** Docker, Nginx  
**Media & Optimization:** ImageKit  
**Version Control:** Git & GitHub

---

## 📂 Project Structure
```

backend/
├── assets/                # Static backend assets (images, files, etc.)
├── models/                # MongoDB Mongoose models
├── routes/                # Express.js API routes
├── utils/                 # Utility functions/helpers
├── .dockerignore          # Docker ignore file for backend
├── .env                   # Backend environment variables (not committed)
├── .gitignore             # Git ignore file
├── Dockerfile             # Backend Docker build file
├── package.json           # Backend dependencies & scripts
├── server.js              # Backend entry point

frontend/
├── public/                 # Public static files for React
├── src/                    # React components, pages, styles, logic
├── build/                  # Production build output
├── .env                    # Frontend environment variables (not committed)
├── package.json            # Frontend dependencies & scripts

````

---

## 🛠 Environment Variables

This project uses environment variables for API keys and configuration.  
**Never commit `.env` files** — they are ignored by `.gitignore`.  
Use `.env.example` as a safe template.

### Backend `.env.example`
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio
PORT=5000

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=465

ADMIN_EMAIL=admin@example.com

MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_SERVER_PREFIX=usX
MAILCHIMP_LIST_ID=your-list-id

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-hashed-password

IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint
````

### Frontend `.env.example`

```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_IMAGEKIT_PUBLIC_API_KEY=your-imagekit-public-key
```

**Setup:**

```bash
# Backend
cp .env.example .env

# Frontend
cd client
cp .env.example .env
```

---

## 🚀 Getting Started

```bash
# Clone this repository
git clone https://github.com/YOUR-USERNAME/infosuraj-portfolio.git

# Navigate to the project directory
cd infosuraj-portfolio

# Install dependencies for frontend & backend
cd frontend && npm install
cd ../backend && npm install

# Start Docker containers
docker-compose up --build
```

---

## 📞 Contact Me

📧 **Email:** [info.msurajkumarr@gmail.com](mailto:info.msurajkumarr@gmail.com)
🌐 **Website:** [infosuraj.com](https://infosuraj.com)
💼 **LinkedIn:** [linkedin.com/in/msurajkumar](https://linkedin.com/in/msurajkumar)

---

⭐ **If you like this project, give it a star on GitHub!**

```

---

This README is **ready for public GitHub upload** — safe for open-sourcing, easy to read for devs, and SEO-friendly for discovery.  

I can also make you a **GitHub repo one-line description** that perfectly matches this README so your repo looks complete when listed in search.
```
