#Project: Distributed storage system using RLNC and WebRTC
##main technique:
* WebRTC
* RLNC

##main implementation:
The upper part of the figure is the storage model. data is packetized into G segments (packets). Theses G segments are encoded into K coded segments using RLNC with a finite field of size F. Afterwards the coded segments are stored into N nodes evenly. That means Q coded segments are saved in each node. In our design we fixed peers number N equal 10, therefore parameter Q is a variable.
The lower part is the node loss and recovery model. In real world some storage nodes are unavailable due to different reasons. So we abstract this situation, In each round one peer randomly disconnects and the new one immediately replaces the lost one. The remaining 9 peers can be used to fill up the new comer. We call the peer who send own data to the new comer parent peer. In each round the number of parent peers is P and P is also a parameter we can choose as our design. These parent peers are delivering all available packets to the new peer. This new peer will recode all received packets storing only Q packets into the node. Then all peers transfer the saved packets to the collector which can verify the data integrity.
![system model](http://7xorjs.com1.z0.glb.clouddn.com/model.jpg)

##Composition:
This is the composition of our web application includes components and structure. Our design mainly has these 5 components with different functions. Each icon in figure demonstrates the program language or technique which is used to realize the specific function. For example we use HTML5, CSS3 and javascript in Engine page, we use nodejs to realize the functions of server.
* Engine: data distribution and parameters Input 
* Peer: data caching and new peer filling
* New peer: data caching and recoding 
* Collector: data collection and integrity verification 
* Server: signaling and connections control
![application componets](http://7xorjs.com1.z0.glb.clouddn.com/composition.jpg)

### System model animate demo
![picture1](http://7xorjs.com1.z0.glb.clouddn.com/屏幕快照%202015-12-16%20下午12.20.56.png)![picture2](http://7xorjs.com1.z0.glb.clouddn.com/屏幕快照%202015-12-16%20下午12.21.24.png)

## Performance results
### Recovery success probability
![results](http://7xorjs.com1.z0.glb.clouddn.com/performance.jpg) 
Using network coding and WebRTC in the distributed storage system can provide more effi-cient and reliable services. Our application realizes multi-platform communications and the re-sults show us clearly with the same storage cost network coding maintains more data integrity; to make use of traffic (parent number) more useful information can be protected; even for large number of rounds network coding also can achieve robust performance. In a word our work allow the system to trade-off traffic cost and storage cost while maintaining a high reliability over time.

