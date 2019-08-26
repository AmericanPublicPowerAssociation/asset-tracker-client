export const barChartStyle = {
    options: {
      chart: {
        width: '100%',
        stacked: true,
        stackType:"normal",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '7%',
          columnWidth: '70%',
          endingShape: 'rounded',
        },
      },
      colors: ["#1937f0","#f0cc18","#f02f1a"],
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        textAnchor: 'middle',
        style: {
          colors: undefined,
          fontSize: "15px"
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: -1,
          blur: .8,
          opacity: 0.25
        },
        offsetX: 0,
        offsetY: 30,
        formatter: function (val, opts) {
          return `${val}`
        }
      },
      stroke: {
        width: .8,
        colors: ['#fff'],
        curve: 'smooth',
        lineCap: 'round' // round, butt , square 
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
        crosshairs:{
          show:false
        }
      },
      xaxis: {
        labels: {
          show: false
        },
        lines: {
          show: false,
        },
        axisBorder:{
          show:false
        }
  
      },
      grid: {
        show:false,
        xaxis: {
          lines: {
            show: false,
          }
        },
        yaxis: {
          lines: {
            show: false,
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: false
      },
      theme: {
        palette: "palette7",
        color: "#333333"
      },
      legend: {
        show: true
      },
    }
  }