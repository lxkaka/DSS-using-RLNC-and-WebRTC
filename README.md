#Project: Distributed storage system using RLNC
##main technique:
* WebRTC
* RLNC

##main implementation:
Source data was stored in distributed nodes,in project we use WebRTC, it menas nodes are peers (browser client). When some peers down(disconnect),we must add new peer in the system. The new peer receive data from other normal peers. And we use RLNC in new comer to recode the data. 

##current work:
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

