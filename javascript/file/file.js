// file api

// blob slice
function blobSlice(blob, start, length) {
  if (blob.slice) {
    return blob.slice(start, length);
  } else if (blob.mozSlice) {
    return blob.mozSlice(start, length);
  } else if (blob.webkitSlice) {
    return blob.webkitSlice(start, length);
  } else {
    throw new Error('unimplemented!');
  }
}

// creat object url
function createObjectUrl(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitUR.createObjectURL(blob);
  } else {
    throw new Error('unimplemented!');
  }
}

var fileslist = document.getElementById('fileslist')
fileslist.addEventListener('change', function (event) {
  var files = event.target.files;
  if (files.length <= 0) {
    return false;
  }
  var file = files[0],
    info = '',
    output = document.getElementById('output'),
    progress = document.getElementById('progress'),
    type = file.type,
    reader = new FileReader()


  // 1.common reader
  // if (/image/.test(type)) {
  //   reader.readAsDataURL(file)
  // } else {
  //   reader.readAsText(file)
  // }


  // 2.blob slice
  // var blob = blobSlice(file, 0, 10);
  // if (blob) {
  //   reader.readAsText(blob);
  // }

  // share with code 1 and 2
  // reader.onerror = function () {
  //   output.innerHTML = 'error'
  // }
  // reader.onload = function () {
  //   var html = ''
  //   if (/image/.test(type)) {
  //     html = '<img src="' + reader.result + '" />'
  //   } else {
  //     html = reader.result
  //   }
  //   output.innerHTML = html
  // }
  // reader.onprogress = function (event) {
  //   reader.abort()
  //   if (event.lengthComputable) {
  //     var info = event.loaded + '/' + event.total
  //     progress.innerHTML = info
  //   }
  // }



 // create object url
 // this url is a handle of the image
  var url = createObjectUrl(file);
  if (url) {
    console.log(url);
    if (/image/.test(type)) {
      output.innerHTML = '<img src="' + url + '">';
    } else {
      output.innerHTML = 'not a image';
    }
  }
})
