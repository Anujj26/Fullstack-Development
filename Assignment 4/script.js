const productLabels = ["Orange", "Apple", "Mango", "Pineapple", "Mixed Fruit"];
const categoryLabels = ["Fruit Juice", "Smoothies", "Detox Drinks"];
const dailyLabels = getLast7DaysLabels();

const pricingMap = {
  Orange: 120,
  Apple: 110,
  Mango: 140,
  Pineapple: 130,
  "Mixed Fruit": 150
};

const dashboardState = {
  dailySales: [],
  productSales: [],
  categoryDistribution: [],
  totalRevenue: 0,
  bestSeller: ""
};

let salesLineChart;
let productBarChart;
let categoryPieChart;

document.addEventListener("DOMContentLoaded", () => {
  generateDashboardData();
  initializeCharts();
  updateDashboardUI();

  const refreshBtn = document.getElementById("refreshBtn");
  refreshBtn.addEventListener("click", handleRefresh);
});

function getLast7DaysLabels() {
  const labels = [];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(
      date.toLocaleDateString("en-IN", {
        weekday: "short"
      })
    );
  }

  return labels;
}

function generateRandomArray(length, min, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateDashboardData() {
  dashboardState.dailySales = generateRandomArray(7, 900, 2600);
  dashboardState.productSales = generateRandomArray(productLabels.length, 18, 95);
  dashboardState.categoryDistribution = generateRandomArray(categoryLabels.length, 10, 45);

  dashboardState.totalRevenue = calculateRevenue(
    dashboardState.dailySales,
    dashboardState.productSales
  );

  const bestSellerIndex = dashboardState.productSales.indexOf(Math.max(...dashboardState.productSales));
  dashboardState.bestSeller = productLabels[bestSellerIndex];
}

function calculateRevenue(dailySales, productSales) {
  const dailyRevenue = dailySales.reduce((sum, value) => sum + value, 0);
  const productRevenue = productSales.reduce((sum, units, index) => {
    return sum + units * pricingMap[productLabels[index]];
  }, 0);

  return dailyRevenue + productRevenue;
}

function initializeCharts() {
  salesLineChart = new Chart(document.getElementById("salesLineChart"), {
    type: "line",
    data: {
      labels: dailyLabels,
      datasets: [
        {
          label: "Daily Sales (₹)",
          data: dashboardState.dailySales,
          fill: true,
          tension: 0.42,
          borderWidth: 3,
          borderColor: "#de6d11",
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#de6d11",
          backgroundColor: createLineGradient("salesLineChart")
        }
      ]
    },
    options: getCommonChartOptions({
      yTitle: "Revenue (₹)"
    })
  });

  productBarChart = new Chart(document.getElementById("productBarChart"), {
    type: "bar",
    data: {
      labels: productLabels,
      datasets: [
        {
          label: "Units Sold",
          data: dashboardState.productSales,
          borderRadius: 12,
          backgroundColor: ["#f28c28", "#f49c47", "#f6ad66", "#f8bd85", "#f9cea4"]
        }
      ]
    },
    options: getCommonChartOptions({
      yTitle: "Units"
    })
  });

  categoryPieChart = new Chart(document.getElementById("categoryPieChart"), {
    type: "pie",
    data: {
      labels: categoryLabels,
      datasets: [
        {
          data: dashboardState.categoryDistribution,
          backgroundColor: ["#f28c28", "#f6ad66", "#f9cea4"],
          hoverOffset: 14,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 18,
            color: "#6b7280",
            font: {
              family: "Outfit"
            }
          }
        }
      },
      animation: {
        duration: 900,
        easing: "easeOutQuart"
      }
    }
  });
}

function getCommonChartOptions({ yTitle }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.92)",
        titleFont: {
          family: "Outfit"
        },
        bodyFont: {
          family: "Outfit"
        },
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Outfit"
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(107, 114, 128, 0.12)"
        },
        title: {
          display: true,
          text: yTitle,
          color: "#6b7280",
          font: {
            family: "Outfit",
            weight: "600"
          }
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Outfit"
          }
        }
      }
    },
    animation: {
      duration: 900,
      easing: "easeOutQuart"
    }
  };
}

function createLineGradient(canvasId) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, 320);

  gradient.addColorStop(0, "rgba(242, 140, 40, 0.28)");
  gradient.addColorStop(1, "rgba(242, 140, 40, 0.02)");

  return gradient;
}

function updateDashboardUI() {
  document.getElementById("totalRevenue").textContent = formatCurrency(dashboardState.totalRevenue);
  document.getElementById("bestSellingJuice").textContent = `${dashboardState.bestSeller} Juice`;
  document.getElementById("sidebarBestSeller").textContent = `${dashboardState.bestSeller} Juice`;

  const bestSellerIndex = productLabels.indexOf(dashboardState.bestSeller);
  const unitCount = dashboardState.productSales[bestSellerIndex];
  document.getElementById("bestSellerUnits").textContent = `${unitCount} units sold`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function updateCharts() {
  salesLineChart.data.datasets[0].data = dashboardState.dailySales;
  salesLineChart.update();

  productBarChart.data.datasets[0].data = dashboardState.productSales;
  productBarChart.update();

  categoryPieChart.data.datasets[0].data = dashboardState.categoryDistribution;
  categoryPieChart.update();
}

function handleRefresh() {
  const refreshBtn = document.getElementById("refreshBtn");
  refreshBtn.classList.add("is-refreshing");

  generateDashboardData();
  updateDashboardUI();
  updateCharts();

  window.setTimeout(() => {
    refreshBtn.classList.remove("is-refreshing");
  }, 650);
}
