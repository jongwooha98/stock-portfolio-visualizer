


# Stock portfolio app

One of the mobile apps I use the most in everyday life is [Toss](https://toss.im/en). The app itself can take care of almost all aspects of finance in South Korea including investing. Thanks to its clean and easy-to-use UI/UX, I use the app invest in Korean stock market.


요즘 많이 사용하는 앱 중 하나가 Viva Republica (Toss)다. 그 중 Toss Securities의 깔끔하고 간편한 UI/UX 때문에 국내주식은 토스를 주로 이용하고 있다. 하지만 내 포트폴리오의 가치와 개별주식의 비중을 한눈에 보기 쉬웠으면 좋겠다는 아쉬움이있다.

그래서 내 포트폴리오를 visualize 할 수 있는 웹 애플리케이션을 React JS 로 만들어 보았다.

개인적으로 미국 주식에 큰 관심이 있기 때문에 미국 주식을 기반으로 기능을 구현했다. Finnhub RESTful API 를 사용해 실시간 주식시세와 그 회사 정보를 가져오고 사용자가 입력한 주식 수 와 같은 정보들을 Firebase의 Cloud Firestore 데이터베이스에 CRUD 할 수 있다. 또한, 보유종목의 주식 차트를 볼 수 있게 TradingView 차트를 넣었다.

https://user-images.githubusercontent.com/18746327/130787279-99ec7748-370d-46d2-914b-6efa7578eb43.mp4

### Made with

- [React](https://reactjs.org/)
- JavaScript
- [SASS](https://sass-lang.com/)


### Stock Information

[Finnhub](https://finnhub.io/docs/api/)
[TradingView](https://www.tradingview.com/widget/)

### Database

[Cloud Firestore](https://firebase.google.com/docs/firestore)

### Visuals

- [Material UI](https://material-ui.com/)
- [Chart.js](https://www.chartjs.org/docs/latest/)
