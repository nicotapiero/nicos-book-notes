var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
const urlParams = new URLSearchParams(window.location.search);

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=Parallels!A:A`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    renderCoversAndItems(data);
  });

function renderCoversAndItems(json) {
  document.getElementById("initLoading").outerHTML = "";

  json.table.rows.forEach((row, idx) => {
    
    let title = row.c[0].v
    
    document.getElementById(`excerpts`).innerHTML += renderTitle(
      title,
      idx + 1 // Google sheets is 1-indexed
    );
  });
}

function renderTitle(title, id) {
  return `<a href="/parallels/excerpts?id=${id}">${title}</a><br/>`;
}
