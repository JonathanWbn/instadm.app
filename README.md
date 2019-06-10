# Direct Messaging for Instagram (web app)

This is a web app which allows one to send and receive instagram direct messages.
You can check it out here: [instadm.app](https://instadm.app)

### Motivation

I like to draft and send messages in my browser. I have always been a big fan of [whatsapp's web client](https://web.whatsapp.com/). I couldn't find anything similar for Instagram, so I decided to build it myself.

### Stack

This is a monorepo which I deploy whith zeit's amazing [now product](https://zeit.co/now).

The backend is a serverless Node API written with [express](https://github.com/expressjs/express). I'm using [passport](http://www.passportjs.org/) for authentication and [instagram-api-client](https://github.com/dilame/instagram-private-api) to access instagram's API.

The frontend is a [Vue.js](https://github.com/vuejs/vue) app, which I server-side-render with [Nuxt.js](https://nuxtjs.org/).

### Future

I'm planning to actively maintain this project and make some gradual improvements. You can check the progress and vision [on my trello board](https://trello.com/b/VfwJqnI1/instagram-dm-web-app). I'm also open for ideas, issues and pull requests.
