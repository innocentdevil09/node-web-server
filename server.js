const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

// Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.path}`;
  console.log(log);
  fs.appendFile('screen.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append screen.log');
    }
  });
  next();
});
// The order of middleware is very important. Notice the above comment line.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
  // res.send('<h1>Hello World!</h1>');
  // res.send({
  //   name: 'Himanshu',
  //   likes: [
  //     'Music', 'Books', 'Training'
  //   ]
  // });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to find page.'
  });
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
