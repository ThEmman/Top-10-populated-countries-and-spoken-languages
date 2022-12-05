export default class Graph {
  constructor(dataObject = {}) {
    this.container = document.getElementsByClassName("graph")[0];
    this.myChart = document.createElement("canvas");
    this.myChart.id = "graphContainer";
    this.container.innerHTML = "";
    this.container.append(this.myChart);

    this.data = dataObject;

    this.xAxis = [];
    this.yAxis = [];

    if (this.data.type == "population") {
      for (let item of this.data.arr) {
        this.xAxis.push(item.country);
        this.yAxis.push(item.population);
      }
    } else if (this.data.type == "language") {
      for (let item of this.data.arr) {
        this.xAxis.push(item.language);
        this.yAxis.push(item.count);
      }
    }
  }

  graphIt() {
    const ctx = this.myChart;
    const xAxis = this.xAxis;
    const yAxis = this.yAxis;
    function graph(type) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: xAxis,
          datasets: [
            {
              axis: "y",
              label: type,
              data: yAxis,
              borderWidth: 1,
              backgroundColor: "#f5a94c",
              barThickness: 30,
              maxBarLength: 2,
              fontFamily: "Inter",
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 20,
                },
              },
            },
          },
        },
      });
    }
    if (this.data.type == "population") {
      graph(this.data.type);
    } else if (this.data.type == "language") {
      graph("places spoken");
    }
  }
}
