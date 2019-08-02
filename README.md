# Direct Messaging for Instagram (web app)

This is a web app which allows one to send and receive instagram direct messages.
You can check it out here: [instadm.app](https://instadm.app)

### Disclaimer

Instagram does not provide a public API to send and receive direct messages. I'm using [instagram-api-client](https://github.com/dilame/instagram-private-api) to get around this limitation. Following the [EULA of instagram-api-client](https://github.com/dilame/instagram-private-api#end-user-license-agreement-eula), **I don't intend to make this app accesible for everyone to use. I'm limiting the app to only allow logging in with my personal account.**

### Motivation

I like to draft and send messages in my browser. I have always been a big fan of [whatsapp's web client](https://web.whatsapp.com/). I couldn't find anything similar for Instagram, so I decided to build it myself. I also wanted to play around with some new technologies (Vue.js and Nuxt.js) and concepts (serverless).

### Stack

This is a monorepo which I deploy whith zeit's amazing [Now product](https://zeit.co/now).

The backend is a serverless Node API written with [express](https://github.com/expressjs/express). I'm using [passport](http://www.passportjs.org/) for authentication and [instagram-api-client](https://github.com/dilame/instagram-private-api) to access instagram's API.

The frontend is a [Vue.js](https://github.com/vuejs/vue) app, which is server-side-rendered with [Nuxt.js](https://nuxtjs.org/).

### Future

As this app can only be used by myself, I will maintain and add features whenever I feel like it ([see trello board](https://trello.com/b/VfwJqnI1/instadmapp)). Realistically I will use this project mostly to play around with [Vue.js](https://github.com/vuejs/vue) and [Nuxt.js](https://nuxtjs.org/).

### Contribute

In order to develop this app you're going to need the [Now CLI](https://github.com/zeit/now-cli).

Then, you can just run `now dev` and play around on `http://localhost:3000/`
