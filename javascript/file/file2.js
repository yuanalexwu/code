// file drag and ajax


var fileslist = document.getElementById('fileslist')
fileslist.addEventListener('drop', function (event) {
  console.log(event);
  if (event.dataTransfer.files.length <= 0) {
    return false;
  }
  var output = document.getElementById('output'),
    files = event.dataTransfer.files,
    file = files[0];
  output.innerHTML = file.name + "/" + file.size + "/" + file.type;
  var data = new FormData();
  data.append("file", file);
  console.log(data.keys());
  // send ajax
  var xhr = new XMLHttpRequest();
  var url = "";
  xhr.open("post", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(data);
})
