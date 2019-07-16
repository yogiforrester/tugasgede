var express = require('express'),
  app = express.Router(),
  passport = require('passport'),
  util = require('util'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  GoogleStrategy = require('passport-google-oauth2').Strategy;


// Tautan Akses API untuk membuat ID dan rahasia klien:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "905213020922-i804u53k11indj5jgsqnahmdh13gijeq.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET = "2K_KpP1dRxvu4ai7_HD9gCoM";

// Pengaturan sesi paspor.
// Untuk mendukung sesi login yang persisten, Paspor harus bisa
// cerita bersambung pengguna ke dan deserialisasi pengguna keluar dari sesi. Khas,
// ini akan sesederhana menyimpan ID pengguna saat membuat serial, dan menemukan
// pengguna dengan ID saat deserializing. Namun, karena contoh ini tidak
// memiliki database catatan pengguna, profil Google lengkapnya adalah
// serial dan deserialized.

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


// Gunakan GoogleStrategy dalam Passport.
// Strategi dalam Paspor membutuhkan fungsi `verifikasi`, yang menerima
// kredensial (dalam hal ini, accessToken, refreshToken, dan Google
// profil), dan aktifkan panggilan balik dengan objek pengguna.

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,

    //CATATAN :
    // Hati-hati! dan menghindari penggunaan IP Pribadi, jika tidak Anda akan mendapatkan masalah device_id device_name untuk IP Pribadi selama otentikasi
    // Solusinya adalah mengatur melalui google cloud console nama domain yang sepenuhnya memenuhi syarat seperti http: // mydomain: 3000 /
    // lalu edit file lokal Anda / etc / hosts untuk menunjukkan IP pribadi Anda.
    // Juga kedua tombol masuk + panggil balikURL harus berbagi url yang sama, jika tidak dua cookie akan dibuat dan menyebabkan kehilangan sesi Anda
    // jika kamu menggunakannya.

    callbackURL: "http://localhost:3500/auth/google/callback",
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {

    // asynchronous verification, for effect...

    process.nextTick(function () {

      // Untuk menjaga contoh sederhana, profil Google pengguna dikembalikan ke
      // mewakili pengguna yang masuk. Dalam aplikasi tipikal, Anda pasti menginginkannya
      // untuk mengaitkan akun Google dengan catatan pengguna di basis data Anda,
      // dan kembalikan pengguna itu.

      return done(null, profile);
    });
  }
));
app.use(cookieParser());
app.use(session({
  secret: 'Dino Saurus',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', {
    user: req.user
  });
});

app.get('/login', function (req, res) {
  res.render('login', {
    user: req.user
  });
});

// GET /auth/google
// Gunakan passport.authenticate () sebagai rute middleware untuk mengotentikasi
// permintaan. Langkah pertama dalam otentikasi Google akan melibatkan
// mengarahkan pengguna ke google.com. Setelah otorisasi, Google
// akan mengarahkan pengguna kembali ke aplikasi ini di /auth/google/callback

app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'email', 'profile'
  ]
}));

// GET /auth/google/callback
// Gunakan passport.authenticate () sebagai rute middleware untuk mengotentikasi
// permintaan. Jika otentikasi gagal, pengguna akan diarahkan kembali ke
//   halaman masuk. Jika tidak, fungsi fungsi rute utama akan dipanggil,
// yang, dalam contoh ini, akan mengarahkan pengguna ke halaman beranda.

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = app;