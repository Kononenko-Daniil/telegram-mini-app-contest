# Client-side documentation

Client-side project represents a **Vite + Reac**t application.

## Main features

In this section I would describe you the most intersting (from my point of view) parts of this application.

### Lottie animations

In order to run special animations *(like Telegram "Duck" stickers)* I've used `lottie-web` **npm package**. It provides a simple `<Lottie />` component which render animation according to your options. All used in my application **Lottie** animations are presented in *src/assets* folder (**JSON** files).

### Accesing to Telegram data

In my application I've used `@twa-dev/sdk` **npm package**, which was created by [Telegram MIni apps developer community](https://github.com/twa-dev). It provides a perfect `WebApp` object, which gives you access to all features, described in [Official documentation](https://core.telegram.org/bots/webapps).

### Fetching data

In order to provide good developer experience all `fetches` are stored in `api` folder (**index.js** exports `API` object, which provides access to any available request). 