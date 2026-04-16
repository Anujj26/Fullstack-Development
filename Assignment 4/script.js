const hospitals = [
  {
    name: "Central General",
    occupancy: 88,
    departments: {
      Trauma: { wait: 42, arrivals: [16, 18, 14, 19], admissions: [8, 9, 7, 10], severity: [7, 16, 23, 11] },
      Cardiac: { wait: 31, arrivals: [11, 12, 10, 13], admissions: [6, 7, 6, 8], severity: [4, 10, 17, 15] },
      Pediatrics: { wait: 22, arrivals: [9, 10, 8, 11], admissions: [3, 4, 3, 5], severity: [2, 8, 15, 13] },
      Neurology: { wait: 37, arrivals: [8, 9, 7, 10], admissions: [5, 5, 4, 6], severity: [5, 7, 13, 11] }
    }
  },
  {
    name: "Riverside Medical",
    occupancy: 81,
    departments: {
      Trauma: { wait: 35, arrivals: [14, 15, 13, 16], admissions: [7, 8, 6, 8], severity: [5, 13, 20, 12] },
      Cardiac: { wait: 28, arrivals: [9, 11, 10, 12], admissions: [4, 6, 5, 6], severity: [3, 8, 14, 12] },
      Pediatrics: { wait: 18, arrivals: [10, 9, 8, 10], admissions: [3, 3, 2, 4], severity: [2, 7, 13, 11] },
      Neurology: { wait: 33, arrivals: [7, 8, 8, 9], admissions: [4, 5, 4, 5], severity: [4, 7, 12, 10] }
    }
  },
  {
    name: "MetroCare South",
    occupancy: 92,
    departments: {
      Trauma: { wait: 48, arrivals: [17, 18, 16, 21], admissions: [9, 10, 9, 11], severity: [8, 15, 24, 13] },
      Cardiac: { wait: 36, arrivals: [10, 11, 12, 14], admissions: [5, 6, 6, 8], severity: [4, 9, 15, 14] },
      Pediatrics: { wait: 26, arrivals: [8, 9, 9, 10], admissions: [2, 3, 3, 4], severity: [2, 6, 12, 10] },
      Neurology: { wait: 39, arrivals: [8, 9, 10, 11], admissions: [4, 5, 5, 6], severity: [5, 8, 13, 12] }
    }
  }
];

const severityLabels = ["Resuscitation", "Emergent", "Urgent", "Less Urgent"];
const timeLabelsByRange = {
  6: ["Last 90m", "Last 60m", "Last 30m", "Now"],
  12: ["6h ago", "4h ago", "2h ago", "Now"],
  18: ["18h ago", "12h ago", "6h ago", "Now"],
  24: ["Yesterday", "12h ago", "6h ago", "Now"]
};

const state = {
  hospital: "all",
  range: 24,
  departments: new Set(Object.keys(hospitals[0].departments))
};

const chartTheme = {
  font: { family: "'Space Grotesk', sans-serif" },
  color: "#526274",
  plugins: {
    legend: {
      labels: { usePointStyle: true, padding: 16 }
    }
  },
  scales: {
    x: {
      ticks: { color: "#526274" },
      grid: { color: "rgba(19, 34, 56, 0.06)" }
    },
    y: {
      ticks: { color: "#526274" },
      grid: { color: "rgba(19, 34, 56, 0.06)" }
    }
  }
};

let arrivalsChart;
let severityChart;
let waitChart;
let occupancyChart;

const hospitalSelect = document.getElementById("hospitalSelect");
const timeRange = document.getElementById("timeRange");
const timeRangeValue = document.getElementById("timeRangeValue");
const departmentFilters = document.getElementById("departmentFilters");
const statsGrid = document.getElementById("statsGrid");
const feedList = document.getElementById("feedList");
const refreshButton = document.getElementById("refreshButton");
const lastUpdated = document.getElementById("lastUpdated");
const alertTitle = document.getElementById("alertTitle");
const alertCopy = document.getElementById("alertCopy");

function populateControls() {
  hospitals.forEach((hospital) => {
    const option = document.createElement("option");
    option.value = hospital.name;
    option.textContent = hospital.name;
    hospitalSelect.appendChild(option);
  });

  Object.keys(hospitals[0].departments).forEach((department) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip active";
    button.textContent = department;
    button.dataset.department = department;
    button.addEventListener("click", () => toggleDepartment(department, button));
    departmentFilters.appendChild(button);
  });
}

function toggleDepartment(department, button) {
  if (state.departments.has(department) && state.departments.size === 1) {
    return;
  }

  if (state.departments.has(department)) {
    state.departments.delete(department);
    button.classList.remove("active");
  } else {
    state.departments.add(department);
    button.classList.add("active");
  }

  renderDashboard();
}

function getSelectedHospitals() {
  return state.hospital === "all"
    ? hospitals
    : hospitals.filter((hospital) => hospital.name === state.hospital);
}

function aggregateData() {
  const selectedHospitals = getSelectedHospitals();
  const departments = [...state.departments];

  const arrivalsSeries = [0, 0, 0, 0];
  const admissionsSeries = [0, 0, 0, 0];
  const severitySeries = [0, 0, 0, 0];
  const waitByDepartment = [];
  const occupancyByHospital = [];
  const feed = [];

  let totalPatients = 0;
  let totalAdmissions = 0;
  let totalWait = 0;
  let waitCount = 0;

  selectedHospitals.forEach((hospital) => {
    occupancyByHospital.push({
      name: hospital.name,
      value: hospital.occupancy
    });

    departments.forEach((department) => {
      const record = hospital.departments[department];
      if (!record) {
        return;
      }

      record.arrivals.forEach((value, index) => {
        arrivalsSeries[index] += value;
        totalPatients += value;
      });

      record.admissions.forEach((value, index) => {
        admissionsSeries[index] += value;
        totalAdmissions += value;
      });

      record.severity.forEach((value, index) => {
        severitySeries[index] += value;
      });

      totalWait += record.wait;
      waitCount += 1;

      waitByDepartment.push({
        label: `${department} - ${hospital.name.split(" ")[0]}`,
        value: record.wait
      });

      const pressureScore = Math.round(record.wait * 1.4 + hospital.occupancy * 0.9 + record.severity[0] * 4);
      feed.push({
        hospital: hospital.name,
        department,
        wait: record.wait,
        occupancy: hospital.occupancy,
        pressureScore
      });
    });
  });

  const avgWait = waitCount ? Math.round(totalWait / waitCount) : 0;
  const admissionRate = totalPatients ? Math.round((totalAdmissions / totalPatients) * 100) : 0;
  const criticalShare = totalPatients ? Math.round(((severitySeries[0] + severitySeries[1]) / severitySeries.reduce((sum, value) => sum + value, 0)) * 100) : 0;
  const avgOccupancy = occupancyByHospital.length ? Math.round(occupancyByHospital.reduce((sum, item) => sum + item.value, 0) / occupancyByHospital.length) : 0;

  feed.sort((a, b) => b.pressureScore - a.pressureScore);
  waitByDepartment.sort((a, b) => b.value - a.value);

  return {
    arrivalsSeries,
    admissionsSeries,
    severitySeries,
    waitByDepartment,
    occupancyByHospital,
    feed: feed.slice(0, 4),
    metrics: {
      totalPatients,
      avgWait,
      admissionRate,
      criticalShare,
      avgOccupancy
    }
  };
}

function renderStats(metrics) {
  const statCards = [
    {
      label: "Patients in range",
      value: metrics.totalPatients,
      meta: "Tracked across selected emergency units"
    },
    {
      label: "Average wait time",
      value: `${metrics.avgWait} min`,
      meta: "Door-to-provider median estimate"
    },
    {
      label: "Admission conversion",
      value: `${metrics.admissionRate}%`,
      meta: "Share moved from ED to inpatient beds"
    },
    {
      label: "Critical severity load",
      value: `${metrics.criticalShare}%`,
      meta: `Average occupancy ${metrics.avgOccupancy}%`
    }
  ];

  statsGrid.innerHTML = statCards.map((card) => `
    <article class="stat-card">
      <p class="stat-label">${card.label}</p>
      <p class="stat-value">${card.value}</p>
      <p class="stat-meta">${card.meta}</p>
    </article>
  `).join("");
}

function renderFeed(feed) {
  feedList.innerHTML = feed.map((item, index) => {
    const tagClass = item.pressureScore > 120 ? "tag-critical" : "tag-watch";
    const tagText = item.pressureScore > 120 ? "Critical" : "Watch";

    return `
      <article class="feed-item">
        <div class="feed-rank">${index + 1}</div>
        <div>
          <h4>${item.department} at ${item.hospital}</h4>
          <p>${item.wait} min wait, occupancy ${item.occupancy}%, pressure score ${item.pressureScore}</p>
        </div>
        <span class="feed-tag ${tagClass}">${tagText}</span>
      </article>
    `;
  }).join("");
}

function renderAlert(feed) {
  const topItem = feed[0];
  if (!topItem) {
    alertTitle.textContent = "No departments selected";
    alertCopy.textContent = "Turn on at least one department filter to restore operational insight.";
    return;
  }

  alertTitle.textContent = `${topItem.department} needs immediate throughput attention`;
  alertCopy.textContent = `${topItem.hospital} is showing a ${topItem.wait}-minute wait with ${topItem.occupancy}% bed occupancy. Consider redirecting incoming cases or staffing surge coverage.`;
}

function createCharts() {
  arrivalsChart = new Chart(document.getElementById("arrivalsChart"), {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Arrivals",
          data: [],
          borderColor: "#d85f3f",
          backgroundColor: "rgba(216, 95, 63, 0.16)",
          pointBackgroundColor: "#d85f3f",
          tension: 0.35,
          fill: true
        },
        {
          label: "Admissions",
          data: [],
          borderColor: "#0d8f8f",
          backgroundColor: "rgba(13, 143, 143, 0.14)",
          pointBackgroundColor: "#0d8f8f",
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      ...chartTheme
    }
  });

  severityChart = new Chart(document.getElementById("severityChart"), {
    type: "doughnut",
    data: {
      labels: severityLabels,
      datasets: [{
        data: [],
        backgroundColor: ["#cf3f4b", "#d85f3f", "#c6952d", "#0d8f8f"],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 18,
            color: "#526274",
            font: { family: "'Space Grotesk', sans-serif" }
          }
        }
      }
    }
  });

  waitChart = new Chart(document.getElementById("waitChart"), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Wait time (minutes)",
        data: [],
        borderRadius: 12,
        backgroundColor: ["#cf3f4b", "#d85f3f", "#c6952d", "#0d8f8f", "#6ba5a5", "#e4a574", "#d97478", "#7da9cc"]
      }]
    },
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      ...chartTheme,
      plugins: {
        legend: { display: false }
      }
    }
  });

  occupancyChart = new Chart(document.getElementById("occupancyChart"), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{
        label: "Bed occupancy %",
        data: [],
        borderRadius: 14,
        backgroundColor: []
      }]
    },
    options: {
      maintainAspectRatio: false,
      ...chartTheme,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function updateCharts(data) {
  arrivalsChart.data.labels = timeLabelsByRange[state.range];
  arrivalsChart.data.datasets[0].data = data.arrivalsSeries;
  arrivalsChart.data.datasets[1].data = data.admissionsSeries;
  arrivalsChart.update();

  severityChart.data.datasets[0].data = data.severitySeries;
  severityChart.update();

  waitChart.data.labels = data.waitByDepartment.map((item) => item.label);
  waitChart.data.datasets[0].data = data.waitByDepartment.map((item) => item.value);
  waitChart.update();

  occupancyChart.data.labels = data.occupancyByHospital.map((item) => item.name);
  occupancyChart.data.datasets[0].data = data.occupancyByHospital.map((item) => item.value);
  occupancyChart.data.datasets[0].backgroundColor = data.occupancyByHospital.map((item) => item.value >= 85 ? "#cf3f4b" : "#0d8f8f");
  occupancyChart.update();
}

function renderDashboard() {
  const data = aggregateData();
  renderStats(data.metrics);
  renderFeed(data.feed);
  renderAlert(data.feed);
  updateCharts(data);
  lastUpdated.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function simulateRefresh() {
  hospitals.forEach((hospital) => {
    hospital.occupancy = Math.max(72, Math.min(97, hospital.occupancy + randomShift(4)));

    Object.values(hospital.departments).forEach((department) => {
      department.wait = Math.max(12, Math.min(55, department.wait + randomShift(6)));
      department.arrivals = department.arrivals.map((value) => Math.max(5, value + randomShift(3)));
      department.admissions = department.admissions.map((value) => Math.max(2, value + randomShift(2)));
      department.severity = department.severity.map((value, index) => Math.max(index === 0 ? 1 : 3, value + randomShift(2)));
    });
  });

  renderDashboard();
}

function randomShift(maxStep) {
  return Math.floor(Math.random() * (maxStep * 2 + 1)) - maxStep;
}

hospitalSelect.addEventListener("change", (event) => {
  state.hospital = event.target.value;
  renderDashboard();
});

timeRange.addEventListener("input", (event) => {
  state.range = Number(event.target.value);
  timeRangeValue.textContent = `${state.range}h`;
  renderDashboard();
});

refreshButton.addEventListener("click", simulateRefresh);

populateControls();
createCharts();
renderDashboard();
