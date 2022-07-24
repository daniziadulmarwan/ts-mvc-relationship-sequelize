(() => {
  "use strict";

  feather.replace({ "aria-hidden": "true" });

  function barChart(value) {
    let options = {
      series: [value],
      chart: {
        height: 300,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Students"],
    };

    const chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();
  }

  function genderChart(value) {
    let man = value.filter((v) => v.gender === "man");
    let woman = value.filter((v) => v.gender === "woman");
    let options = {
      series: [man.length, woman.length],
      chart: {
        type: "pie",
        height: 300,
      },
      labels: ["Laki-laki", "Perempuan"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(
      document.querySelector("#genderChart"),
      options
    );
    chart.render();
  }

  async function getChartData(url) {
    const response = await axios.get(url);
    const student = await response.data.data;
    barChart(student.length);
    genderChart(student);
  }

  getChartData("http://localhost:4000/dashboard/chart");
})();
