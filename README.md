# Laravel/Vue 2 Starter (Frontend)
This template is designed for a quick start of a new Laravel/Vue project.

The starter is decoupled into two parts:

-  [Backend Laravel API](https://github.com/slava-arapov/starter-laravel-vue-backend/)
-  [Frontend Vue.js SPA](https://github.com/slava-arapov/starter-laravel-vue-frontend/) (you are here)

## Features and Dependencies
* Vue 2, Vue Router 3, Vuex 3, ESLint, Vue CLI 3
* Vue Components with TypeScript declarations
* Vuetify 2
* VeeValidate 3
* Material Design Icons — [SVG custom import](https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons-js-svg)
* User Authentication and Authorization using Laravel Sanctum 
* Login, Register, Email Verification and Password Reset using Laravel Fortify
* Administration Dashboard
* Basic User Update and avatar upload
* Auth, Guest, Admin Middleware
* Pagination
* Dark/Light/System Theme Switch

## System Requirements
* Node.js >= 8.9 (v10+ recommended)

## Project Setup
1. Clone the repository
   ``` bash
   git clone https://github.com/slava-arapov/starter-laravel-vue-frontend.git
   cd starter-laravel-vue-frontend
   ```
   
2. Copy your .env file for local development or production
   ``` bash
   cp .env.local.example .env.local
   cp .env.production.local.example .env.production.local
   ```
   
3. Edit your .env file. Make sure your API URL added
   ``` dotenv
   VUE_APP_API_URL=http://localhost # for local development, Laravel Sail default
   VUE_APP_API_URL=https://api.yourappname.com # for production build
   ```

4. Install dependencies
   ``` shell
   npm install
   ```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Credits
This starter is designed using the instructions at https://laravelvuespa.com. I highly recommend to check out this resource and to support [@garethredfern](https://github.com/garethredfern).

## License
This starter is open-sourced software licensed under the [MIT license](LICENSE).
