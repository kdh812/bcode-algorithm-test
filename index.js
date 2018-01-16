var readdir = require('fs-readdir-promise');
var sharp = require('sharp');

function coreAlgorithm(data) {
    var sum_array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    for (var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        // red
        data[i] = brightness;
        // green
        data[i + 1] = brightness;
        // blue
        data[i + 2] = brightness;

        if ((i / 4) % 150 < 50) {
            var y = 0
        } else if ((i / 4) % 150 < 100) {
            var y = 1
        } else {
            var y = 2
        }

        if ((i / 4) / 150 < 50) {
            var x = 0
        } else if ((i / 4) / 150 < 100) {
            var x = 1
        } else {
            var x = 2
        }

        sum_array[x][y] = sum_array[x][y] + brightness
    }

    var new_array = []
    var new_array_01 = []
    var sum = 0
    for (var i = 0; i < sum_array.length; i++) {
        new_array = new_array.concat(sum_array[i])
    }
    for (var i = 0; i < new_array.length; i++) {
        sum = sum + new_array[i]
    }
    var avg = sum / 9
    var s = ''
    for (var i = 0; i < new_array.length; i++) {
        new_array[i] = Math.round((new_array[i] / avg) * 100)
        if (new_array[i] < 100) {
            new_array_01[i] = 1
            s = s + '1'
        } else {
            new_array_01[i] = 0
            s = s + '0'
        }
    }

    return s
}

var cnt = 0
var total = 0

readdir('./images')
    .then(function(files) {
        total = files.length
        console.log('Total images: ' + total)

        var funcs = []

        files.forEach(file => {

            var imageProcessing = function() {
                return new Promise((resolve, reject) => {
                    sharp("./images/" + file)
                        .background({ r: 0, g: 0, b: 0, alpha: 0 })
                        //.resize(150, 150)
                        .resize(250, 250)
                        .extract({ left: 50, top: 50, width: 150, height: 150 })
                        .embed()
                        .raw()
                        .toBuffer((err, data, info) => {
                            ans = file.substring(0, 9)
                            ret = coreAlgorithm(data)

                            if (ans === ret) {
                                cnt++
                                console.log(ret + ' => OK! ' + file)
                            } else {
                                console.log(ret + ' =>     ' + file)
                            }
                            resolve()
                        })

                    /*sharp("./images/"+file)
                    .resize(190, 190)
                    .extract({ left: 20, top: 20, width: 150, height: 150 })
                    .toFile('output.png', (err, info) => {} );*/
                })
            }

            funcs.push(imageProcessing())
        })

        //return Promise.all([funcs[0]])
        return Promise.all(funcs)
    })
    .then(function() {
        console.log('Accuracy: ' + cnt / total * 100)
    })