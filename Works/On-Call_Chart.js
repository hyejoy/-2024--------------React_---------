Highcharts.chart('container', {
  chart: {
    zoomType: 'xy', // 줌 가능하도록 설정 (선택사항)
  },
  title: {
    text: 'FE1 Gr. On-Call 売上 実績表',
  },
  xAxis: [
    {
      categories: [
        'FY24_4月',
        'FY24_5月',
        'FY24_6月',
        'FY24_7月',
        'FY24_8月',
        'FY24_9月',
        'FY24_10月',
        'FY24_11月',
        'FY24_12月',
        'FY24_1月',
        'FY24_2月',
        'FY24_3月',
      ],
      crosshair: true,
    },
  ],
  yAxis: [
    {
      // Primary Y Axis (매출액)
      labels: {
        format: '{value:,0f}', // 천 단위 콤마 표시
        style: {
          color: 'black',
        },
      },
      title: {
        text: '売上高(Kwon)',
        style: {
          color: 'black',
        },
      },
    },
    {
      // Secondary Y Axis (누적 비율)
      title: {
        text: '売上進捗率',
        style: {
          color: 'red',
        },
      },
      labels: {
        format: '{value}%',
        style: {
          color: 'red',
        },
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: '実売上額(Kwon)',
      type: 'column',
      data: [
        127400, 203835, 239888, 325610, 397241, 500000, 600000, 750000, 900000,
        1100000, 1200000, 1293973,
      ],
      color: 'green',
    },
    {
      name: '売上(Kwon)',
      type: 'column',
      data: [
        127400, 76435, 36053, 85722, 71631, 95000, 120000, 150000, 180000,
        210000, 250000, 300000,
      ],
      color: 'blue',
    },
    {
      name: '売上進捗率',
      type: 'line',
      yAxis: 1,
      data: [
        16.2, 25.9, 30.4, 41.3, 50.4, 58.1, 65.8, 73.4, 81.1, 88.8, 96.5, 104.1,
      ],
      color: 'red',
      marker: {
        enabled: true,
        symbol: 'circle',
        radius: 5,
      },
    },
    {
      name: '파란선',
      type: 'line',
      yAxis: 1,
      data: [
        8.2, 16.5, 24.7, 33.0, 41.2, 49.6, 58.0, 66.4, 74.7, 83.1, 91.5, 100,
      ],
      color: 'blue',
      lineWidth: 2, // 두께 설정
      //   dashStyle: 'ShortDash', // 점선 스타일 적용
      marker: {
        enabled: false, // 심볼 제거 (직선만 표시)
      },
    },
  ],
});
