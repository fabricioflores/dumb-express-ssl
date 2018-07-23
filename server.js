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

// update according path and version
app.use('/base/2.4.3/116-683e72/', express.static('/opt/aruba/central/apps/frontend/build'));
app.use('/base_ui', express.static('/opt/aruba/central/apps/frontend/build'));
app.use('/2.4.3/116-683e72/guest', express.static('/opt/aruba/central/apps/guest_ui/build'));
app.use('/monitoring/2.4.3/116-683e72', express.static('/opt/aruba/central/apps/monitoring_ui/build'));
app.use('/2.4.3/116-683e72/msp', express.static('/opt/aruba/central/apps/msp_ui/build'));
app.use('/maintenance/2.4.3/116-683e72', express.static('/opt/aruba/central/apps/maintenance_ui/build'));
app.use('/reports/2.4.3/116-683e72', express.static('/opt/aruba/central/apps/reporting_ui/build'));
app.use('/2.4.3/116-683e72/configuration', express.static('/opt/aruba/central/apps/frontend_config/build'));

const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(443, () => console.log('Server started on port 443!'));

