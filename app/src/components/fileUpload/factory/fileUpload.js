(function () {
    'use strict';

    angular
        .module('baseApp.fileUpload')
        .factory('fileUpload', fileUpload)

    fileUpload.$inject = ['appSettings', 'Upload'];

    function fileUpload(appSettings, Upload) {

        return {
            loadFile: loadFile,
            loadMultipleFiles: loadMultipleFiles,
            loadFilePromise: loadFilePromise
        }

        function loadFile(file) {
            Upload.upload({
                url: appSettings.comunicacao.urlBackend + "upload",
                data: { file: file }
            }).then(function (resp) {
                console.log('Successo ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            });
        }

        function loadMultipleFiles(files) {
            console.log("Não implementado");
            console.log(files);
        }

        function loadFilePromise(file) {
            return Upload.upload({
                url: appSettings.comunicacao.urlBackend + "upload",
                data: { file: file }
            });
        }
    }

} ());