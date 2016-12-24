var spawn = require('child_process').spawn;

var command;

switch(process.platform) {
    case 'darwin':
        command = 'open';
        break;
    case 'win32':
        command = 'explorer.exe';
        break;
    case 'linux':
        command = 'xdg-open';
        break;
    default:
        throw new Error('Unsupported platform: ' + process.platform);
}

function open(url, callback) {
    var child = spawn(command, [url]);
    var errorText = "";
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        errorText += data;
    });
    child.stderr.on('end', function () {
        if (errorText.length > 0) {
            var error = new Error(errorText);
            if (callback) {
                callback(error);
            } else {
                throw error;
            }
        } else if (callback) {
            callback(error);
        }
    });
}

export default open
