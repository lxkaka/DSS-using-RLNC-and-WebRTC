/**
 * Created by lxkaka on 15/10/2.
 */
var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/'});
var io = require('socket.io').listen(8000);
var fs = require('fs');
var i= 0,j= 0,peerNumber = 10, round = 10,nextSign,peerSign;
var parentNumber, roundControl = round + 11, loopTest = 1,demoShow = 2;
var failArray = [], successArray = [];

io.sockets.on('connection',function(socket) {
    i += 1;
    console.log(i);
    //console.log(socket.id);
    console.log('length'+io.sockets.sockets.length);
    if (i===peerNumber+demoShow) {
        //broadcast start sign to all connected clients
        io.sockets.emit('start','go');
        //broadcast peer sign to all peers
        peerSign = Math.ceil(Math.random()*peerNumber);
        io.sockets.emit('choice', peerSign);
    }
    //if(i===peerNumber+2){
    //    //new peer join then broadcast new id to all peers
    //    io.sockets.emit('newid',i+100);
    //}
    if(i>peerNumber+demoShow){
        //new peer join then broadcast new id to all peers
        io.sockets.emit('newid',i+100);
        console.log('new id '+(i+100));
        chooseParent();
    }

    //    io.sockets.emit('choice',Math.ceil(Math.random()*3));
    //    io.sockets.emit('nextRound','true');
    //}

    socket.on('parentNumber',function(number){
        parentNumber = number;
    });

    socket.on('nextRound',function(sign){
        if (sign === 'true') {
            nextSign = true;
            console.log(nextSign);
            if (i<=roundControl){
                // broadcast to all except the current sender
                peerSign = Math.ceil(Math.random()*peerNumber);
                socket.broadcast.emit('choice', peerSign);
                //socket.broadcast.emit('newid',i+101);
            }
            else if(i>roundControl){
                successArray.push(1);
                writeResult('/Users/lxkaka/Desktop/result1.txt',1);
                i = loopTest;  // loop test i = 1;  not loop test i = 0;
                io.sockets.emit('close','true');
            }
        }
    });

    socket.on('disconnect', function(){
        console.log('peer disconnected');
        //console.log(io.sockets.sockets.length);
    });

    socket.on('peerid', function (id) {
        console.log(id);
        // broadcast to all the connected clients except the sender
        socket.broadcast.emit('newid', id);
    });

    socket.on('end',function(sign){
        if(sign === 'true'){
            failArray.push(0);
            writeResult('/Users/lxkaka/Desktop/result1.txt',0);
            console.log('end');
            i = loopTest;    // loop test i = 1;  not loop test i = 0;
            io.sockets.emit('close','true');
        }

    });

    socket.on('closeConfirm',function(){
        j += 1;
        console.log(j);
        if(j >= 10){
            //setTimeout(emitOpen,800);
            io.sockets.emit('open','true');
            j = 0;
        }
    });

    socket.on('calculate',function(){
        console.log('0 '+failArray.length);
        console.log('1 '+successArray.length);
        writeResult('/Users/lxkaka/Desktop/result.txt',successArray.length/(failArray.length+successArray.length));
        console.log('Retrieve probability = ' + (successArray.length/(failArray.length+successArray.length)));

    });

});

function emitOpen(){
    io.sockets.emit('open','true');

}


function chooseParent(){
    var parentArray = [1,2,3,4,5,6,7,8,9,10];
    //delete the disconnected peer
    parentArray.splice(peerSign-1,1);
    for(var j=0;j<parentNumber;j++){
        choice = Math.floor(Math.random()*parentArray.length);
        io.sockets.emit('parentChoose',parentArray[choice]);
        //delete the chosen peer, prevent duplicated choose
        parentArray.splice(choice,1);

    }
}

function writeResult(path,data){
    fs.open(path ,'a+', function(err,fd){
        fs.write(fd,data+',');
        fs.close(fd);
    });
}









