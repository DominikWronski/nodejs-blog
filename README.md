# NodeBlog
NodeBlog is a NodeJS CMS made for practice.

## Technology Stack

**Frontend:**

- [Vue](https://vuejs.org/) 
- [Vuetify](https://vuetifyjs.com/en/)
- [Vuex](https://vuex.vuejs.org/)


**Backend:**

- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

## Screenshots

## Installation

**Frontend**
```bash
cd nodejs-blog-frontend
npm install
npm run serve
```

**Backend**
```bash
cd nodejs-blog-backend
npm install
npm run dev
```

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## To do

- [ ] Better comment editing
- [ ] Comments component errors
- [ ] Handle errors on frontend
- [ ] Using better code practices
- [X] Edit post method
- [ ] Render amount of posts
- [X] Post comments
- [ ] Remember password login option
- [ ] Logout when jwt token is expired
- [ ] isAdmin middleware
- [X] EditPost.vue check if user is not owner of post or admin
- [ ] Log server-side errors
- [X] Use headers instead of body
- [ ] Check if its not spam/ validate if field is not null
- [ ] Anti-spam, click cooldown frontend/backend
- [ ] Limit spamming backend https://www.npmjs.com/package/express-rate-limit
- [ ] Tests