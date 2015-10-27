/**
 * Created by lxkaka on 15/10/2.
 */
var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/'});
var io = require('socket.io').listen(8000);
var i= 0, peerNumber = 3, nextSign;
io.sockets.on('connection',function(socket) {
    i += 1;
    console.log(i);
    //console.log(socket.id);
    console.log('length'+io.sockets.sockets.length);
    if (i===peerNumber+1) {
        //broadcast start sign to all connected clients
        io.sockets.emit('start','go');
        //broadcast new id to all peers
        io.sockets.emit('choice', Math.ceil(Math.random()*3));
    }
    //if(i===peerNumber+2){
    //    //new peer join then broadcast new id to all peers
    //    io.sockets.emit('newid',i+100);
    //}
    if(i>peerNumber+1){
        //new peer join then broadcast new id to all peers
        io.sockets.emit('newid',i+100);
    }

    //    io.sockets.emit('choice',Math.ceil(Math.random()*3));
    //    io.sockets.emit('nextRound','true');
    //}

    socket.on('nextRound',function(sign){
        if (sign === 'true') {
            nextSign = true;
            console.log(nextSign);
            if (i<6){
                // broadcast to all except the current sender
                socket.broadcast.emit('choice', Math.ceil(Math.random()*3));
                //socket.broadcast.emit('newid',i+101);
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



});



//else if (i>=3){
//    socket.on('peerid',function(id){
//        console.log(id);
//        // send to all the connected clients
//        io.sockets.emit('newid',id);
//    });




/*var http = require('http'),
    io = require('socket.io'),
    fs = require('fs');

// 虽然我们这里使用了同步的方法，那会阻塞 Node 的事件循环，但是这是合理的，因为 readFileSync() 在程序周期中只执行一次，而且更重要的是，同步方法能够避免异步方法所带来的“与 SocketIO 之间额外同步的问题”。当 HTML 文件读取完毕，而且服务器准备好之后，如此按照顺序去执行就能让客户端马上得到 HTML 内容。
var sockFile = fs.readFileSync('Peer1.html');

// Socket 服务器还是构建于 HTTP 服务器之上，因此先调用 http.createServer()
server = http.createServer();
server.on('request', function(req, res){
    // 一般 HTTP 输出的格式
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(sockFile);
});

server.listen(8000);

var socket = io.listen(server); // 交由 Socket.io 接管

// Socket.io 真正的连接事件
socket.on('connection', function(client){
    console.log('Client connected');
    client.emit('message',{hello:'the peer!'}); // 向客户端发送文本
    client.on('message',function(data){
        console.log(data);
    });
});  */


