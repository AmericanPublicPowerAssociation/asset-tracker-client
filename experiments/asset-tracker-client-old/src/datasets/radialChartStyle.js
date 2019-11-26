export const radialStyle ={
  plotOptions: {
    radialBar: {
      dataLabels: {
        showOn: "always",
        name: {
          show: true,
          color: "#888",
          fontSize: "20px"
        },
        value: {
          color: "#111",
          fontSize: "30px",
          show: true,
          formatter: function (val) {
            return val
          }
        },
        total:{
          show: true,
          label: 'Total',
          formatter: function (w) {
            return w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)
          }
        }
      }
    }
  },
  stroke:{
    lineCap: 'round', // round, butt , square 
  },
  fill:{
    type: 'solid'
  },
  colors: ["#1937f0","#f0cc18","#f02f1a"],
  legend: {
    show: true,
    showForSingleSeries: false,
    fontFamily: 'Roboto, Arial',
    floating: false,
    position: "right",
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '18px',
    textAnchor: 'start',
    offsetY: 50,
    offsetX: 0,
    labels: {
      colors: "#333333",
    },
    itemMargin: {
      horizontal: 20,
      vertical: 10
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    },
    formatter: function(seriesName, opts) {
      return [seriesName+" ("+ opts.w.globals.series[opts.seriesIndex]+")"]
    },
    markers: {
      width: 36,
      height: 30,
      radius: 5,
      offsetY: "8px",
      offsetX: 0,
      strokeColor: "#1937f0"
    }
  },
  markers:{
    colors: ["#1937f0","#f0cc18","#f02f1a"]
  },
  responsive: [{
    breakpoint: 680,
    options: {
      chart: {
        width: '100%',
        height: '580px'
      },
      plotOptions:{
      radialBar: {
         width: '50%'
        }
      },
      title: {
        align:"center"
      },
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }]
}

export const radialSemiCircle = {
  plotOptions: {
    radialBar: {
      startAngle: -120,
      endAngle: 120,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        shadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
        }
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: 60,
          color: "#333333"
        },
        value: {
          offsetY: 0,
          fontSize: '40px',
          fontFamily: "Roboto",
          formatter: function (val) {
            return val+"%";
          }
        }
      }
    }
  },
  colors: ["#1937f0","#f0cc18","#f02f1a"],
  responsive: [{
    breakpoint: 1200,
    options: {

      title: {
        align:"center"
      },
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }]
}