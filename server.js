const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const app = express();

var sslOptions = {
  key: fs.readFileSync('certs/dumbkey.key', 'utf8'),
  cert: fs.readFileSync('certs/dumbcert.crt', 'utf8'),
  passphrase: 'fabricio'
};

app.use(cors());

app.get('/', function (req, res) {
    res.send('hello world')
});

app.use('/base/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/frontend/build'));
app.use('/guest/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/guest_ui/build'));
app.use('/monitoring/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/monitoring_ui/build'));
app.use('/msp/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/msp_ui/build'));
app.use('/maintenance/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/maintenance_ui/build'));
app.use('/reporting/2.4.0/45-fb6443', express.static('/opt/aruba/central/apps/reporting_ui/build'));

const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(443, () => console.log('Server started on port 443!'));