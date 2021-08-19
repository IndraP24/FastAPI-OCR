function performOCR() {
  var files = document.getElementById("image_file").files;
  var formData = new FormData();
  var endpoint = "/extract_text";
  if (files.length == 1) {
    formData.append("image", files[0])
  }
  else {
    for (var i = 1; i < files.length; i++) {
      formData.append("image" + i.toString(), files[i]);
    }
    endpoint = "/bulk_extract_text";
  }


  $.ajax({
    type: 'POST',
    url: endpoint,
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    success: function(data) {
      if (endpoint == '/extract_text') {
        swal("Converted Text", data.text);
      }
      else {
        swal("Request Received", "Converted files will start showing up at the bottom soon!")
      }

    }
  });
}


function getConvertedFiles(task_id, numFiles) {
  var checker = setInterval(function()) {

  }
}