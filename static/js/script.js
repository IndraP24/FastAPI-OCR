function performOCR() {
  var files = document.getElementById("image_file").files
  var formData = new FormData();
  var endpoint = "/extract_text";
  if (files.length == 1) {
    formData.append("image", files[0])
  }
  else {
    for (var i = 0; i < files.length; i++) {
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
        swal("Request Received", "Converted files will start showing up at the bottom soon!");
        getConvertedFiles(data.task_id, data.num_files);
      }
    }
  });
}


function getConvertedFiles(taskID, numFiles) {
  var checker = setInterval(function() {
    $.ajax({
        type: 'GET',
        url: '/bulk_output/' + taskID,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
          wrapper = document.getElementById("bulk_result")
          for (var key in data.output) {
            var element = document.createElement("button");
            element.setAttribute("class", "btn btn-primary")
            element.setAttribute("info", data.output[key])
            element.setAttribute("id", key)
            element.setAttribute("onclick", "displayText(this.id)")
            element.innerHTML = key
            wrapper.appendChild(element)
          }
          if (Object.keys(data.output).length == numFiles) {
            stopChecker()
          }
        }
    });
  }, 3000);

  function stopChecker() {
    clearInterval(checker)
  }
}

function displayText(id) {
  swal("Converted Text", document.getElementById(id).getAttribute("info"))
}