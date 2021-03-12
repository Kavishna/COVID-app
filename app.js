const current = document.querySelector(".current");
const updated = document.querySelector("span");
var ctx = document.getElementById("myChart").getContext("2d");

// set current data
const getData = async (url, callback) => {
  const response = await fetch(url);
  const data = await response.json();

  callback(data);
};

getData("https://hpb.health.gov.lk/api/get-current-statistical", (data) => {
  const {
    local_active_cases,
    local_deaths,
    local_new_cases,
    local_new_deaths,
    local_recovered,
    local_total_cases,
    update_date_time,
  } = data.data;

  const covidData = [
    {
      title: "Active Cases",
      count: local_active_cases,
    },
    {
      title: "New Cases",
      count: local_new_cases,
    },
    {
      title: "Recovered",
      count: local_recovered,
    },
    {
      title: "Total Cases",
      count: local_total_cases,
    },
    {
      title: "New Deaths",
      count: local_new_deaths,
    },
    {
      title: "Total Deaths",
      count: local_deaths,
    },
  ];

  updated.innerHTML = setDate(update_date_time);

  setData(covidData, current);

  setChart(covidData);
});

const setData = (array, element) => {
  array.forEach((data) => {
    const info = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    info.classList.add("info");
    h2.innerHTML = data.count;
    p.innerHTML = data.title;
    info.appendChild(h2);
    info.appendChild(p);
    element.appendChild(info);
  });
};

const setDate = (updatedTime) => {
  const updatedHour = new Date(updatedTime).getHours();

  const today = new Date();
  const currentHour = today.getHours();
  console.log(currentHour - updatedHour);
  return `${currentHour - updatedHour} hours`;
};

const setChart = (covidData) => {
  covidData = covidData.filter((data) => {
    if (data.title !== "Total Cases") {
      return data;
    }
  });

  const titles = covidData.map((data) => {
    return data.title;
  });

  const counts = covidData.map((data) => {
    return data.count;
  });

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["AC", "NC", "R", "ND", "TD"],
      datasets: [
        {
          label: "dummy data",
          data: counts,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
};
