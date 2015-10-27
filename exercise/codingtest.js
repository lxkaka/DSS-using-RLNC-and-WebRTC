/**
 * Created by lxkaka on 15/10/23.
 */
var kodo = require('./kodo.js');
test();
function test(){
    var dataIn = 'lxkaka,hahhaha', dataOut;

    var symbols = 8, symbolSize = 200;

    encoder_factory = new kodo.encoder_factory(symbols,symbolSize);
    encoder = encoder_factory.build();

    decoder_factory = new kodo.decoder_factory(symbols,symbolSize);
    decoder = decoder_factory.build();

    encoder.set_const_symbols(dataIn);
    var packetsNumber = 0;
    while(!decoder.is_complete())
    {
        packet = encoder.write_payload();
        packetsNumber += 1;
        console.log(packet);
        decoder.read_payload(packet);
    }
    dataOut = decoder.copy_from_symbols();
    console.log(dataOut);
    if (dataOut == dataIn){
        console('decode correct')
    }

}
