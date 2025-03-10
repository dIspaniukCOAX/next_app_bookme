interface ChartRenderer {
  renderBarChart(data: number[], labels: string[]): void;
  renderPieChart(data: number[], labels: string[]): void;
}

class ThirdPartyChartLibrary {
  public drawBarChart(chartData: any, chartLabels: any): void {
    console.log(`Third-Party Library: Drawing bar chart with data: ${chartData} and labels: ${chartLabels}`);
  }

  public drawPieChart(chartData: any, chartLabels: any): void {
    console.log(`Third-Party Library: Drawing pie chart with data: ${chartData} and labels: ${chartLabels}`);
  }
}

class ChartRendererAdapter implements ChartRenderer {
  private thirdPartyChartLibrary: ThirdPartyChartLibrary;

  constructor(thirdPartyChartLibrary: ThirdPartyChartLibrary) {
    this.thirdPartyChartLibrary = thirdPartyChartLibrary;
  }

  public renderBarChart(data: number[], labels: string[]): void {
    this.thirdPartyChartLibrary.drawBarChart(data, labels);
  }

  public renderPieChart(data: number[], labels: string[]): void {
    this.thirdPartyChartLibrary.drawPieChart(data, labels);
  }
}

function appMain() {
  const thirdPartyChartLibrary = new ThirdPartyChartLibrary();

  const chartRenderer = new ChartRendererAdapter(thirdPartyChartLibrary);

  chartRenderer.renderBarChart([10, 20, 30], ["January", "February", "March"]);
  chartRenderer.renderPieChart([40, 60], ["Apple", "Banana"]);
}

appMain();
