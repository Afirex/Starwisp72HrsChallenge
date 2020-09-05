const express = require('express');
// const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
  host: '127.0.0.1',
  user: 'USER_DB_NAME_ROOT',
  password: 'YOUR_DB_PASSWORD',
  database: 'test'
});
conn.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});
const qry = "select * from " + 'user_id';

conn.query(qry, function (err, rows, fields) {
  if (err) throw err;
  // console.log(rows); console.log(rows.length);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/university', function (req, res) {
  const srch = "select * from uni_details";
  conn.query(srch, function (err, rows, f) {
    if (err) { throw err; }
    else {
      // console.log(rows);
      res.json(rows);
    }
  });
});
app.post('/update', function (req, res) {
  // console.log("inside sever" + req.body.uid + req.body.data.uni_name);
  const uid = req.body.uid;
  const uniname = req.body.data.uni_name;
  const registrationdate = req.body.data.Registration_date;
  const expiry = req.body.data.Expiry_date;
  const studs = req.body.data.no_of_students;
  const email = req.body.data.email;
  const weburl = req.body.data.web_url;
  const contact = req.body.data.contact_no;

  var qry = "UPDATE uni_details SET ";
  var flag = 0;
  if (uniname != '') { qry += " uni_name='" + uniname + "'"; flag = 1; }
  if (registrationdate != '') { if (flag === 1) { qry += " ," } qry += " Registration_date=" + registrationdate; flag = 1; }
  if (expiry != '') { if (flag === 1) { qry += " ," } qry += " Expiry_date=" + expiry; flag = 1 }
  if (studs != '') { if (flag === 1) { qry += " ," } qry += " no_of_students=" + studs; flag = 1; }
  if (email != '') { if (flag === 1) { qry += "," } qry += " email='" + email + "'"; flag = 1; }
  if (weburl != '') { if (flag === 1) { qry += "," } qry += " web_url='" + weburl + "'"; flag = 1; }
  if (contact != '') { if (flag === 1) { qry += "," } qry += " contact_no='" + contact + "'"; flag = 1; }
  qry += " where uid=" + uid;
  //console.log("query: " + qry);

  conn.query(qry, function (err, rows, fields) {
    if (err) { throw err; }
    else {
      //console.log(rows);
      if (rows.length > 0) {
        found = 'found'; console.log(rows.length);
        res.json({ msg: "Updated value" });
      }
      else {
        res.json({ msg: "Updated valueF" });
      }
    }
  });

});

app.post("/add", function (req, res) {
  //console.log(req.body.adddata);
  const data = req.body.adddata;
  const uniname = data.uni_name;
  const registrationdate = data.Registration_date;
  const expiry = data.Expiry_date;
  const img = data.imgurl;
  const studs = data.no_of_students;
  const email = data.email;
  const weburl = data.web_url;
  const contact = data.contact_no;

  var qry = "INSERT INTO uni_details";
  var cols = '(';
  var flag = 0;
  var vals = "";
  if (uniname != '') { cols += 'uni_name'; vals += "'" + uniname + "'"; flag = 1; }
  if (registrationdate != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + registrationdate + "'"; cols += 'Registration_date'; flag = 1; }
  if (expiry != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + expiry + "'"; cols += 'Expiry_date'; flag = 1; }
  if (img != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + img + "'"; cols += "imgurl"; flag = 1; }
  if (studs != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + studs + "'"; cols += "no_of_students"; flag = 1; }
  if (email != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + email + "'"; cols += "email"; flag = 1; }
  if (weburl != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + weburl + "'"; cols += "web_url"; flag = 1; }
  if (contact != '') { if (flag === 1) { cols += ","; vals += ","; } vals += "'" + contact + "'"; cols += "contact_no"; flag = 1; }

  var cole = ')';
  cols += cole;

  var values = " VALUES" + "(" + vals + ")";
  qry += cols + values;
  // console.log(qry);
  conn.query(qry, function (err, rows, fields) {
    if (err) { throw err; }
    else {
      //console.log(rows);
      let found = 'saved';
      res.json({ msg: found });
    }
  });
});
var loggedin = false;
app.get("/save", function (req, res) {
  //console.log(loggedin);
  res.json({ msg: loggedin });
});
app.post("/logout", function (req, res) {
  loggedin = false;
});
app.post('/save', function (req, res) {
  const srch = "select * from user_id where userid = '" + req.body.userid + "' and password='" + req.body.password + "'";
  let found = 'notfound';
  conn.query(srch, function (err, rows, fields) {
    if (err) { throw err; }
    else {
      // console.log(rows);
      if (rows.length > 0) {
        found = 'found'; //console.log(rows.length);
        res.json({ msg: found });
        loggedin = true; //console.log("server" + loggedin);
      }
      else {
        res.json({ msg: found });
      }
    }
  });
});

app.post('/delete', function (req, res) {
  // console.log(req.body);
  const del = "DELETE FROM uni_details WHERE uid=" + req.body.uid;
  let found = 'notfound';
  conn.query(del, function (err, rows, fields) {
    if (err) { throw err; }
    else {
      res.send("done");
    }
  });
});

// conn.query("insert into user_id values('kell','8520')", function (err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

app.listen(port, function (req, res) {
  console.log(port);
});
