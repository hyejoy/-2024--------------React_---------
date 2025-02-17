// https://jsfiddle.net/59e78rs4/

console.time('column');
Highcharts.chart('container', {
  chart: {
    type: 'column',
  },
  xAxis: {
    categories: ['FY24 상', 'FY24 하', 'FY24 전체'], // X축 라벨을 사용자 지정
    title: {
      text: null, // X축 제목 없애기 (필요 시 변경 가능)
    },
  },
  yAxis: {
    tickInterval: 5000, // 5000 단위로 끊기
    max: 30000, // 최대값 30,000으로 설정
    title: {
      text: '데이터 값', // Y축 제목 (필요에 따라 변경 가능)
    },
    labels: {
      formatter: function () {
        return this.value.toLocaleString();
      },
    },
  },
  plotOptions: {
    column: {
      grouping: false, // 막대 겹치기
      borderWidth: 0,
    },
  },
  title: {
    text: 'Highcharts drawing Test',
  },

  subtitle: {
    text: 'Using the Boost module',
  },

  tooltip: {
    valueDecimals: 2,
  },

  series: [
    {
      name: 'AOP',
      data: [7082, 2728, 9810],
      color: 'rgba(104, 163, 220, 0.5)', // 연한 파란색 (30% 불투명)
      pointPadding: 0.0,
      dataLabels: {
        enabled: true, // 데이터 값 표시
        inside: true, // **막대 안쪽에 값 표시**
        align: 'center',
        verticalAlign: 'middle',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#fff', // 흰색 글씨 (배경색 대비)
        },
      },
    },
    {
      name: '9월',
      data: [6898, 6140, 13038],
      color: 'rgba(0,0,255)', // 진한 파란색
      pointPadding: 0.3,
      dataLabels: {
        enabled: true, // 데이터 값 표시
        inside: false, // **막대 바깥쪽에 값 표시**
        align: 'center',
        verticalAlign: 'bottom',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000', // 검은색 글씨
        },
      },
    },
  ],
});
console.timeEnd('column');
