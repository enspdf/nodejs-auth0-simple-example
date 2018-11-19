require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const userInViews = require("./middleware/userInViews");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");

const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback",
    state: true
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
});

const sessionConfig = {
    secret: process.env.SECRET_SESSION || "V94MNO7exJT8M_0aEpVSQutYF08XpmAaIqAdt2RMPFc8RPCZt",
    cookie: {},
    resave: false,
    saveUninitialized: true
}

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

if (process.env.NODE_ENV === "production") {
    sessionConfig.cookie.secure = true;
}

passport.use(strategy);

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(userInViews());
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", usersRouter);

passport.serializeUser((user, done) => {
    done(null, done);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.listen(3000, () => console.log(`App is running on localhost:3000`));