var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get("id");

// console.log(id);

// if (!id) {
//   alert("No ID Param given");
// }

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range='work bench'!A:A`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    console.log('hi', data)
    renderQuotes(data);
  });

function renderQuotes(json) {
  var websiteTitle = "";
  json.table.rows.forEach((line, idx) => {
    if (!line) {
      return;
    }
    
    // skip nulls that could be at the end
    if (line.c[0].v) document.getElementById("quotes").innerHTML += renderQuote(line.c[0].v);
  });
}

function renderQuote(text) {
  var html = '<p class="verticalLine">';
  let lines = text.split("\n");

  lines.forEach((line) => {
    html += line + '<br/><span class="brmedium"/>';
  });

  html += '</p><span class="brlarge"/>';
  return html;
}

function setFavicon(imageLink) {
  // Taken from https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = imageLink;
}