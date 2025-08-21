import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/User.model";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = await User.create({
          username: profile.username,
          githubId: profile.id,
          email: profile.emails?.[0].value || "",
          accessToken: accessToken  // ✅ store access token
        });
      } else {
        // update token each login in case it changes
        user.accessToken = accessToken;
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err, undefined);
    }
  }
)); // ✅ closed GitHubStrategy + passport.use

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});
