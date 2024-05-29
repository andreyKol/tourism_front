type ILabels = {
  [key: string]: string;
};

type IWalletsTime = {
  [key: string]: number;
};

export const WalletsTime: IWalletsTime = {
  'RUB': 1,
  'BTC': 30,
  'ETH': 10,
  'BNB': 1,
  'TRX': 1,
  'MATIC': 1,
  'USDT': 10,
  'USDTTRC': 1,
  'USDTBSC': 1,
  'USDTPOLY': 1,
  'TON': 5,
  'BTCBBSC': 1,
  'SHIBBSC': 1,
  'USDCTRC': 1,
  'USDCERC': 10,
  'ETHBSC': 1,
  'DAIERC': 10,
  'BUSDBSC': 1,
  'XMR': 20,
  'SOL': 5,
  'LTC': 20,
  'DOGE': 15,
  'DASH': 15,
  'BCH': 15,
};

export const COLORS: ILabels = {
  'RUB': '#64728B',
  'USDT': '#26a17b',
  'USDTTRC': '#26a17b',
  'USDTBSC': '#26a17b',
  'USDTERC': '#26a17b',
  'USDTPOLY': '#26a17b',
  'BTC': '#f7931a',
  'BTCBBSC': '#f7931a',
  'ETH': '#DFE5EC',
  'ETHBSC': '#DFE5EC',
  'BNB': '#f0b90b',
  'TRX': '#eb0029',
  'BCH': '#0ac18e',
  'SHIBBSC': '#eb0029',
  'LTC': '#345d9d',
  'SOL': '#bb42f1',
  'XMR': '#f26822',
  'DASH': '#008de4',
  'DOGE': '#ba9f33',
  'MATIC': '#8247e5',
  'BUSDBSC': '#f0b90b',
  'TON': '#0088cc',
};
