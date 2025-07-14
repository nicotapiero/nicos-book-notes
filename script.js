var sheetId = "1W1i6eAOJaa8pl6EQ55CCbwUaRVFEms0Xh-Q3DenELlQ";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const REVERSE_IMAGES = true;

console.log(id);

var url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=A:D`;

fetch(url)
  .then((response) => response.text())
  .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
  .then((data) => {
    renderCoversAndItems(data);
  });

function renderCoversAndItems(json) {
  document.getElementById("initLoading").outerHTML = "";

  console.log(json);
  
  if (REVERSE_IMAGES) {
    json.table.rows.reverse();
  }
  
  
  json.table.rows.forEach((row, idx) => {
    let [title, author, coverImage, finishedObject] = row.c;

    title = title.v;
    author = author.v;
    coverImage = coverImage.v;

    console.log(title, author, coverImage, finishedObject, idx);

    // idx%4 is to keep the titles aligned in each of the 3 columns displayed
    document.getElementById(`column${(idx % 4) + 1}`).innerHTML += renderBook(
      title,
      author,
      coverImage,
      REVERSE_IMAGES ? json.table.rows.length - idx - 1 : idx,
      finishedObject.v // get bool val
    );

    document.getElementById(`listView`).innerHTML += renderListItem(
      title,
      author,
      coverImage,
      REVERSE_IMAGES ? json.table.rows.length - idx - 1 : idx,
    );
  });
}

function renderBook(title, author, coverImage, id, finished) {
  var html = `
  <div class="container2 centerImage">
  <a href="./book?id=${id + 1}">
        <img `;
  if (!finished) {
    html += 'class="grayImage" ';
  } 
  html += `alt="${title} by ${author}"
          src="${coverImage}"
        />
    </a></div><br/>`;
  
  console.log(html)
  return html;
}

function renderListItem(title, author, coverImage, id) {
  var html = `<a href="./book?id=${id + 1}">
  <img class="tinyImage"
          alt="(img) "
          src="${coverImage}"
        />
  ${title} by ${author}
    </a><br/>`;
  return html;
}

// Toggle between a list view and a cover view
function toggleViews() {
  if (document.getElementById("listView").hidden) {
    document.getElementById("listView").hidden = false;
    document.getElementById("books").hidden = true;

    document.getElementById("viewTogglebuttonImage").src =
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/325/books_1f4da.png";
  } else {
    document.getElementById("listView").hidden = true;
    document.getElementById("books").hidden = false;

    document.getElementById("viewTogglebuttonImage").src =
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/325/scroll_1f4dc.png";
  }
}
