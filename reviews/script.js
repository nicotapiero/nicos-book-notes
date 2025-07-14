var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
const urlParams = new URLSearchParams(window.location.search);

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=Reviews/Thoughts!A:B`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    console.log(data);
    renderCoversAndItems(data);
  });

function renderCoversAndItems(json) {
  document.getElementById("initLoading").outerHTML = "";

  json.table.rows.forEach((row, idx) => {
    let [titleObj, reviewObj] = row.c;
    let title = titleObj.v;
    let review = reviewObj.v;

    console.log(title, review);

    if (review) {
      document.getElementById(`excerpts`).innerHTML += renderTitle(
        title,
        review
      );
    }
  });
}

function renderTitle(title, review) {
  return `<details><summary>${title}</summary>
  
   
  


  <md-block>
  ${review}
  </md-block>
  
  </details> 
  <br/>`;
}
