//covid data section
const current = document.querySelector(".current");
//time section
const updated = document.querySelector("em");

//chart canvas
var ctx = document.getElementById("myChart").getContext("2d");

//date
const date = document.querySelector(".date");

//loader
const loader = document.querySelector(".preloader");

window.addEventListener("load", (fadeout) => {
  loader.classList.add("remove");
});

//fetch data
const getData = async (url, callback) => {
  const response = await fetch(url);
  const data = await response.json();

  callback(data);
};

//set fetched data
getData("https://hpb.health.gov.lk/api/get-current-statistical", (data) => {
  //getting usefull data from returned object
  const {
    local_active_cases,
    local_deaths,
    local_new_cases,
    local_new_deaths,
    local_recovered,
    local_total_cases,
    update_date_time,
  } = data.data;

  console.log(update_date_time);

  //   store data to array
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

  //set updated time on display section
  updated.innerHTML = setTime(update_date_time);

  //set covid status
  setData(covidData, current);

  //set chart
  setChart();
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

const setTime = (updatedTime) => {
  const updatedHour = new Date(updatedTime).getHours();
  const today = new Date();
  const currentHour = today.getHours();

  //setting mins if updated time less than hour
  if (currentHour - updatedHour === 0) {
    const updatedMin = new Date(updatedTime).getMinutes();
    const currentMin = today.getMinutes();

    return `${currentMin - updatedMin} mins`;
  }
  return `${currentHour - updatedHour} hours`;
};

//setup chartjs
const setChart = () => {
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["AC", "NC", "R", "ND", "TD"],
      datasets: [
        {
          label: "dummy data",
          data: [200, 600, 2000, 300, 800],
          backgroundColor: ["rgba(230, 147, 104,1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
};

const setDate = () => {
  const today = new Date();

  date.innerHTML = today.toDateString();
};

setDate();
