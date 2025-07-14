var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id);

if (!id) {
  alert("No ID Param given");
}

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=${id}:${id}`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    renderQuotes(data);
  });

function renderQuotes(json) {
  var websiteTitle = "";
  json.table.rows[0].c.forEach((line, idx) => {
    if (!line) {
      return;
    }
    // first four are dedicated to metadata
    if (idx < 4) {
      switch (idx) {
        case 0:
          websiteTitle += line.v + " by ";
          break;
        case 1:
          websiteTitle += line.v;
          break;
        case 2:
          document.title = websiteTitle;
          setFavicon(line.v);
          break;
        case 3:
          break;
      }
      return;
    }
    
    // skip nulls that could be at the end
    if (line.v) document.getElementById("quotes").innerHTML += renderQuote(line.v);
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