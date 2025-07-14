var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id);

if (!id) {
  alert("No ID Param given");
}

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=Parallels!${id}:${id}`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    renderQuotes(data);
  });

function renderQuotes(json) {
  var websiteTitle = "";
  json.table.rows[0].c.forEach((column, idx) => {
    if (!column) {
      return;
    }
    
    // first column is the title
    if (idx < 1) {
      document.title = column.v;
      return;
    }
    
    // skip nulls that could be at the end
    if (column.v) document.getElementById("excerpts").innerHTML += renderExcerpt(column.v)
  });
}

function renderExcerpt(text) {
  // set each section to its own md-block
  return `<md-block hlinks="§"> ${text} </md-block>`;
}