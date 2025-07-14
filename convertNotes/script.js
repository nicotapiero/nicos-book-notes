
function test() {
  console.log('hi')
}

document.getElementById('inputTextArea').addEventListener("input", (event) => {
  
  
  let splits = event.data.split('### Page ').map((split, i) => {
    
    if (i === 0) {
      return ""
    }
  
    console.log(split, i)
    
    let lines = split.split('\n')
    
    lines.splice(0, 1) // drop title stuff
    lines.splice(lines.length -1, 1) // drop empty string at the end
    lines[0] = lines[0].substring(1) // cut leading *
    
    console.log(lines)
    
    let finalLine = lines[lines.length -1] 
    
    console.log(lines[lines.length -1], finalLine)
    
    lines[lines.length -1] = finalLine.substring(0, finalLine.length-1)// trim final
    
    console.log(lines[lines.length -1])
    
      
    return lines.join('\nCONTINUTEDDDDDD')
  })
  
  // splits.splice(0, 1)
  
  splits[splits.length -1] = splits[splits.length -1].substring(splits[splits.length -1].length - "_Generated at: 2025-03-04-09-36-43_".length)
  
  
  console.log(splits)
  
  
  document.getElementById('outputTextArea').value = splits.join('\n')
  
//   let preview = document.createElement("md-block");
//   preview.textContent = event.text;
  
//   document.body.appendChild(preview)
  
  document.getElementById('markdownPreview').mdContent = event.data
});



