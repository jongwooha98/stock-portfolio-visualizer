# Stock Portfolio Visualizer

## Introduction

One of the mobile apps I use the most in everyday life is [Toss](https://toss.im/en). The app itself can take care of almost all aspects of finance in South Korea including investing. Thanks to its clean and easy-to-use UI/UX, I use the app invest in Korean stock market. However, it's lacking features on how users can visualize their portfolios.

So, I made this to satisfy my need: visualizing stock portfolio. 

## Demo

[Check it out!](https://stock-app-71e53.web.app/)

<img width="400" alt="stock-portfolio-app-login" src="https://user-images.githubusercontent.com/18746327/130993995-7b5d17ba-1819-4968-9c76-ec6afb305844.png">
<img width="400" alt="stock-portfolio-app-main" src="https://user-images.githubusercontent.com/18746327/130996338-0258eb01-c39e-4217-ade3-f0df11e94406.png">

https://user-images.githubusercontent.com/18746327/130787279-99ec7748-370d-46d2-914b-6efa7578eb43.mp4


## Made with

The app is built with a bunch of React components, hooks, and more!

- [React](https://reactjs.org/)
- JavaScript
- [SASS](https://sass-lang.com/)


### Stock Information

Reat-time stock quote and company information are fetched from Finnhub RESTful API, and TradingView widget is added for stock chart

- [Finnhub](https://finnhub.io/docs/api/)
- [TradingView](https://www.tradingview.com/widget/)

### Database

CRUD operations using Firebase Cloud Firestore to store and retrieve user input data and stock information (+ hosting on Firebase)

- [Cloud Firestore](https://firebase.google.com/docs/firestore)

### Visuals

standardized design components with Material UI and created a pie chart using ChartJS for visualization of stock holdings

- [Material UI](https://material-ui.com/)
- [Chart.js](https://www.chartjs.org/docs/latest/)



