var express          = require( 'express' )
  , app              = express()
  , bodyParser       = require( 'body-parser' );

var oauth_google = require('./routes/koneksi-google');
var oauth_facebook = require('./routes/koneksi-facebook');
// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public'));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));
app.use(koneksi_google);
app.use(koneksi_facebook);

app.listen(4000, ()=>
{
    console.log("Server Aktiv");
});

