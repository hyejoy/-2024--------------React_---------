Highcharts.chart('container', {
  chart: {
    type: 'area', // 기본 차트 유형 설정
    zoomType: 'x', // X축 줌 활성화
  },
  title: {
    text: '라벨별 확률',
  },
  xAxis: {
    type: 'datetime', // 시간 기반 X축
    title: {text: null},
  },
  yAxis: {
    title: {
      text: '확률 값',
    },
    min: 0,
    max: 1,
  },
  tooltip: {
    shared: true,
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
  },
  plotOptions: {
    area: {
      stacking: null, // 개별적으로 배치 (덮어쓰지 않음)
      marker: {enabled: false},
    },
    line: {
      marker: {enabled: false},
    },
  },
  series: [
    {
      name: '스팀 부족',
      type: 'area',
      data: [
        [1704787200000, 0.05],
        [1704790800000, 0.07],
        [1704794400000, 0.02],
        [1704798000000, 0.01],
        [1704801600000, 0.04],
        [1704805200000, 0.06],
        [1704808800000, 0.03],
        [1704812400000, 0.02],
        [1704816000000, 0.05],
        [1704819600000, 0.04],
        [1704823200000, 0.07],
        [1704826800000, 0.05],
        [1704830400000, 0.03],
        [1704834000000, 0.02],
        [1704837600000, 0.06],
        [1704841200000, 0.07],
        [1704844800000, 0.03],
        [1704848400000, 0.02],
        [1704852000000, 0.05],
        [1704855600000, 0.04],
        [1704859200000, 0.07],
        [1704862800000, 0.05],
        [1704866400000, 0.03],
        [1704870000000, 0.02],
        [1704873600000, 0.06],
      ],
      color: 'red',
      fillOpacity: 0.3, // 옅은 빨간색 배경
      zIndex: 9999,
    },
    {
      name: '스팀 적정',
      type: 'area',
      data: [
        [1704787200000, 0.95],
        [1704790800000, 0.93],
        [1704794400000, 0.98],
        [1704798000000, 0.97],
        [1704801600000, 0.92],
        [1704805200000, 0.96],
        [1704808800000, 0.94],
        [1704812400000, 0.97],
        [1704816000000, 0.95],
        [1704819600000, 0.92],
        [1704823200000, 0.96],
        [1704826800000, 0.94],
        [1704830400000, 0.97],
        [1704834000000, 0.95],
        [1704837600000, 0.92],
        [1704841200000, 0.96],
        [1704844800000, 0.94],
        [1704848400000, 0.97],
        [1704852000000, 0.95],
        [1704855600000, 0.92],
        [1704859200000, 0.96],
        [1704862800000, 0.94],
        [1704866400000, 0.97],
        [1704870000000, 0.95],
        [1704873600000, 0.92],
      ],
      color: 'green',
      fillOpacity: 0.2, // 옅은 초록색 배경
      zIndex: 1,
    },
    {
      name: '스팀 과다',
      type: 'area',
      data: [
        [1704787200000, 1],
        [1704790800000, 1],
        [1704794400000, 1],
        [1704798000000, 1],
        [1704801600000, 1],
        [1704805200000, 1],
        [1704808800000, 1],
        [1704812400000, 1],
        [1704816000000, 1],
        [1704819600000, 1],
        [1704823200000, 1],
        [1704826800000, 1],
        [1704830400000, 1],
        [1704834000000, 1],
        [1704837600000, 1],
        [1704841200000, 1],
        [1704844800000, 1],
        [1704848400000, 1],
        [1704852000000, 1],
        [1704855600000, 1],
        [1704859200000, 1],
        [1704862800000, 1],
        [1704866400000, 1],
        [1704870000000, 1],
        [1704873600000, 1],
      ],
      lineWidth: 2,
      color: 'blue',
      fillOpacity: 0.1, // 옅은 파란색 (불투명도 낮춤)
      enableMouseTracking: false, // 툴팁에서 제외
      zIndex: -1, // **배경으로 이동**
    },
  ],
});
