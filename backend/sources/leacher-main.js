// ---------------------------------------

if (require.main === module)
	throw (new Error ());

// ---------------------------------------

var configuration = require ("./configuration");
var queue = require ("./queue-lib");
var transcript = require ("./transcript") (module, configuration.mainTranscriptLevel);

// ---------------------------------------

function _main () {
	
	if (process.argv.length != 2) {
		transcript.traceError ("invalid arguments; aborting!");
		process.exit (1);
		return;
	}
	
	var _rabbit = queue.createConnector (configuration.rabbit);
	_rabbit.on ("ready",
			function () {
				var _consumer = _rabbit.createConsumer (null, null, null, configuration.itemExchange);
				_consumer.on ("consume",
						function (_message, _headers, _acknowledge) {
							if (_headers.contentType != "application/json")
								transcript.traceError ("received invalid item content type: `%s`; ignoring!", _headers.contentType);
							else
								transcript.traceOutput ("%s [%s]", _message.title, _message.url);
							_acknowledge ();
						});
			});
}

module.exports.main = _main;

// ---------------------------------------
