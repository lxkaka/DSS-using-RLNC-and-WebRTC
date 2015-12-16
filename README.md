#Project: Distributed storage system using RLNC and WebRTC
##main technique:
* WebRTC
* RLNC

##main implementation:
Source data was stored in distributed nodes,in project we use WebRTC, it menas nodes are peers (browser client). When some peers down(disconnect),we must add new peer in the system. The new peer receives data from other normal peers. And we use RLNC in new comer to recode the data. Collector receives the data from surviving peers and new peer, then decode the data to verify the retrieve success or not.

# main work flow:
1.  3 peers system without RLNC  
  there are 3 peers, 1 and 3 work well , 2 fail and generate new peer 4. 1 and 3 can send the data to 4 and send to the collector. New peer 4 also sends the received data to the collector. 
2. 3 peers system with RLNC

		1. Engine(source) opens all peers and collector. Then reads a local file and encode the data to generate coded packets. Engine connects to all peers and sends the packets to peers uniform. 
		2. If one peer disconnects then open a new one, and all peers listen the ‘new id’, when listened, the new comer listen others’ connections and received their coded packets. New peer recodes all this received packets and only stores Q packets then sends these Q packets to collector.
		3.At the same time the normal peers also send the coded packets to collector. Collector collects two kinds of coded packets (original coded and recoded) then decode them.

3. 10 peers storage system with RLNC  

		Engine set parameters. The peers and collector can receive these parameters.
		In each round, one peer disconnects and the new comer replaces the fail one. 
		Server broadcasts the new id to all peers and chooses which parent peers connect to the new peer. The chosen parent peers send their data to the new comer. The new peer receives and recodes, then only store Q. At last each peer send the coded data include the recoded data to the collector.
		Collector receives enough coded packets and decode. Then verify whether the retrieve successfully.
		
4. complete system without RLNC

		Engine can choose using RLNC or using no RLNC to contine the process.
		The data from surviving peers go in the new peer with random order. Only store the first Q segments.
5. Loop test

		At start point of the process engine sends the source data to collector(collector has a different id to receive source data). In each round if retrieve fail, collector sends 'end' sign to server, if retrieve successfully collector sends 'nextRound' sign to server. 
		Server listen 'end' or round count == max round then this test over, close peers and collector then start next test.

### System model animate demo
![picture1](http://7xorjs.com1.z0.glb.clouddn.com/屏幕快照%202015-12-16%20下午12.20.56.png)![picture2](http://7xorjs.com1.z0.glb.clouddn.com/屏幕快照%202015-12-16%20下午12.21.24.png)


