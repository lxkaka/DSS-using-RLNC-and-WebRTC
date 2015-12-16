/**
 * Created by lxkaka on 15/12/11.
 */
var fs = require('fs');

calculate();
console.log('Calculate:');

function calculate(){
    var resultArray = [], j = 0;
    fs.readFile('/Users/lxkaka/Desktop/result1.txt', 'utf8', function(err,data){
        if(err) {
            console.error(err);
        }
        resultArray = data.split(",");
        // delete the last element comma ','
        resultArray.pop();
        for(var i=0;i<resultArray.length;i++){
            if(resultArray[i] === '1'){
                j += 1;
            }
        }
        console.log('1: '+j);
        console.log('Total times: '+resultArray.length);
        console.log('======================================');
        console.log('Retrieve probability = '+(j/resultArray.length));
        console.log('======================================');

    });

}

