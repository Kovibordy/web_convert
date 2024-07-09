document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData();
    var fileInput = document.getElementById('audioFile');
    formData.append('audioFile', fileInput.files[0]);

    // Добавление выбранных форматов в formData
    var formatOptions = document.querySelectorAll('input[name="format"]:checked');
    var formats = [];
    formatOptions.forEach(function(option) {
        formats.push(option.value);
    });
    formData.append('formats', formats.join(','));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://your-server-url/upload', true);

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            document.getElementById('uploadProgress').value = percentComplete;
        }
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Файл успешно загружен и обработан.');
            var response = JSON.parse(xhr.responseText);
            if (response.txt) {
                document.getElementById('previewText').value = response.txt;
            } else {
                document.getElementById('previewText').value = 'Предварительный просмотр доступен только для TXT формата.';
            }
        } else {
            alert('Произошла ошибка при загрузке файла.');
        }
    };

    xhr.send(formData);
});

document.getElementById('openEditor').addEventListener('click', function() {
    // Открытие текстового редактора с результатом
    window.location.href = 'http://your-text-editor-url';
});
