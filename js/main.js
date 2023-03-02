const loadData = async () => {
  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  getAllData(data.data.tools);
};
const getAllData = (data) => {
  data.forEach((element) => {
    console.log(element);
  });
};

loadData();
