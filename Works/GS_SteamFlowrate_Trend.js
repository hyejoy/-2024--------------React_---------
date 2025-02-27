//https://jsfiddle.net/59e78rs4/
Highcharts.chart('container', {
  chart: {
    type: 'line', // 꺾은선 그래프
    zoomType: 'x',
    plotBackgroundColor: 'rgba(0, 255, 0, 0.1)', // 연한 초록색 배경 (스팀 적정)
  },
  title: {
    text: 'Steam Flowrate Trend',
  },
  xAxis: {
    type: 'datetime', // 시간 형식 X축
    plotBands: [
      // 특정 구간 배경색 지정 (트렌드 변화 영역)
      {
        from: Date.UTC(2024, 3, 20, 10, 0), // 4/20 10:00
        to: Date.UTC(2024, 3, 20, 11, 0), // 4/20 11:00
        color: 'rgba(255, 0, 0, 0.2)', // 빨간색 (Steam 부족)
      },
      {
        from: Date.UTC(2024, 3, 20, 16, 0),
        to: Date.UTC(2024, 3, 20, 17, 0),
        color: 'rgba(255, 0, 0, 0.2)', // 빨간색 (Steam 부족)
      },
      {
        from: Date.UTC(2024, 3, 20, 21, 0),
        to: Date.UTC(2024, 3, 20, 22, 0),
        color: 'rgba(0, 128, 255, 0.2)', // 파란색 (Steam 과다)
      },
    ],
  },
  yAxis: {
    title: {
      text: 'Flowrate (K)',
    },
    labels: {
      format: '{value}K', // Y축 라벨을 "K" 단위로 표현
    },
  },
  tooltip: {
    shared: true,
    xDateFormat: '%m/%d %H:%M',
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: 'Steam Flowrate',
      data: [
        [Date.UTC(2024, 3, 20, 9, 0), 23.0],
        [Date.UTC(2024, 3, 20, 10, 0), 24.0],
        [Date.UTC(2024, 3, 20, 11, 0), 25.5],
        [Date.UTC(2024, 3, 20, 12, 0), 25.0],
        [Date.UTC(2024, 3, 20, 14, 0), 26.5],
        [Date.UTC(2024, 3, 20, 16, 0), 27.8],
        [Date.UTC(2024, 3, 20, 17, 0), 26.3],
        [Date.UTC(2024, 3, 20, 18, 0), 26.0],
        [Date.UTC(2024, 3, 20, 19, 0), 26.4],
        [Date.UTC(2024, 3, 20, 21, 0), 25.5],
        [Date.UTC(2024, 3, 20, 22, 0), 26.2],
        [Date.UTC(2024, 3, 20, 23, 0), 25.0],
      ],
      color: 'green', // 선표시
      lineWidth: 2,
      marker: {
        enabled: true,
        radius: 3,
      },
    },
  ],
});
