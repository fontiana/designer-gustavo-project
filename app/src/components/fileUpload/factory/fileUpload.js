(function () {
    'use strict';

    angular
        .module('baseApp.fileUpload')
        .factory('fileUpload', fileUpload)

    fileUpload.$inject = ['appSettings', 'Upload'];

    function fileUpload(appSettings, Upload) {

        return {
            loadFile: loadFile,
            loadMultipleFiles: loadMultipleFiles
        }

        function loadFile(file) {
            console.log(file);
            // Upload.upload({
            //     url: appSettings.configuracao.caminhoImages,
            //     data: { file: file }
            // }).then(function (resp) {
            //     console.log('Successo ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            // }, function (resp) {
            //     console.log('Error status: ' + resp.status);
            // }, function (evt) {
            //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            // });
        }

        function loadMultipleFiles(files) {
            console.log(files);
        }
    }

} ());