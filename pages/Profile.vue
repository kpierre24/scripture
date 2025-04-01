<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card v-if="isLoggedIn">
            <v-card-title class="text-h5">
              Welcome, {{ profile.name || username }}!
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="profile.name"
                  label="Name"
                  outlined
                  class="mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="profile.location"
                  label="Location"
                  outlined
                  class="mb-4"
                ></v-text-field>
                <v-textarea
                  v-model="profile.bio"
                  label="Bio"
                  outlined
                  auto-grow
                  rows="1"
                  class="mb-4"
                ></v-textarea>
                <v-select
                  v-model="profile.fontSize"
                  :items="fontSizes"
                  label="Font Size"
                  outlined
                  class="mb-4"
                ></v-select>
                <v-select
                  v-model="profile.theme"
                  :items="themes"
                  label="Theme"
                  outlined
                  class="mb-4"
                ></v-select>
                <v-select
                  v-model="profile.backgroundImage"
                  :items="backgrounds"
                  label="Background Image"
                  outlined
                  class="mb-4"
                ></v-select>
              </v-form>
              <v-btn color="primary" @click="saveProfile">Save Profile</v-btn>
              <p class="mt-4">Here are your favorite scriptures:</p>
              <div v-if="favorites.length === 0">
                <p>You haven't added any favorite scriptures yet.</p>
              </div>
              <v-list v-else>
                <v-list-item v-for="(favorite, index) in favorites" :key="index">
                  <template v-slot:prepend>
                    <v-list-item-action start>
                      <v-btn icon @click="removeFromFavorites(favorite)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                  <v-list-item-title class="text-body-1" :style="{ fontSize: profile.fontSize }">{{ favorite.text }}</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2" :style="{ fontSize: profile.fontSize }">{{ favorite.reference }}</v-list-item-subtitle>
                  <div v-if="notes[favorite.reference]">
                    <p class="text-body-1 font-weight-bold" :style="{ fontSize: profile.fontSize }">My Note:</p>
                    <p class="text-body-1" :style="{ fontSize: profile.fontSize }">{{ notes[favorite.reference] }}</p>
                  </div>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title class="text-h5">Login</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="loginUsername"
                label="Username"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="loginPassword"
                label="Password"
                type="password"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="login">Login</v-btn>
              <v-btn text @click="showSignup = true">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-if="showSignup">
            <v-card-title class="text-h5">Sign Up</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="signupUsername"
                label="Username"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="signupPassword"
                label="Password"
                type="password"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="signup">Sign Up</v-btn>
              <v-btn text @click="showSignup = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { backgrounds } from "../const scriptures = [.js";
  
  export default {
    name: "Profile",
    data() {
      return {
        isLoggedIn: false,
        username: "",
        loginUsername: "",
        loginPassword: "",
        signupUsername: "",
        signupPassword: "",
        showSignup: false,
        favorites: [],
        notes: {},
        profile: {
          name: "",
          location: "",
          bio: "",
          fontSize: "1rem",
          theme: "light",
          backgroundImage: "https://source.unsplash.com/1600x900/?church,light",
        },
        fontSizes: ["0.8rem", "1rem", "1.2rem", "1.4rem"],
        themes: ["light", "dark"],
        backgrounds: backgrounds,
      };
    },
    mounted() {
      this.checkLoginStatus();
      this.loadFavorites();
      this.loadNotes();
      this.loadProfile();
    },
    methods: {
      checkLoginStatus() {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          this.isLoggedIn = true;
          this.username = storedUsername;
        }
      },
      login() {
        const storedPassword = localStorage.getItem(this.loginUsername);
        if (storedPassword && storedPassword === this.loginPassword) {
          this.isLoggedIn = true;
          this.username = this.loginUsername;
          localStorage.setItem("username", this.loginUsername);
          this.loginUsername = "";
          this.loginPassword = "";
          this.loadProfile();
        } else {
          alert("Invalid username or password.");
        }
      },
      logout() {
        this.isLoggedIn = false;
        this.username = "";
        localStorage.removeItem("username");
      },
      signup() {
        if (localStorage.getItem(this.signupUsername)) {
          alert("Username already exists.");
        } else {
          localStorage.setItem(this.signupUsername, this.signupPassword);
          alert("Account created successfully.");
          this.showSignup = false;
          this.signupUsername = "";
          this.signupPassword = "";
        }
      },
      loadFavorites() {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          this.favorites = JSON.parse(storedFavorites);
        }
      },
      loadNotes() {
        this.notes = JSON.parse(localStorage.getItem("notes")) || {};
      },
      loadProfile() {
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
          this.profile = JSON.parse(storedProfile);
        }
      },
      saveProfile() {
        localStorage.setItem("profile", JSON.stringify(this.profile));
        this.applyTheme();
      },
      removeFromFavorites(favorite) {
        this.favorites = this.favorites.filter(
          (fav) => fav.reference !== favorite.reference
        );
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      },
      applyTheme() {
        const theme = this.profile.theme;
        const body = document.body;
        if (theme === "dark") {
          body.classList.add("dark-theme");
        } else {
          body.classList.remove("dark-theme");
        }
      },
    },
  };
  </script>
  
  <style>
  body.dark-theme {
    background-color: #333;
    color: #fff;
  }
  </style>
  