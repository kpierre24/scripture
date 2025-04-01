<template>
  <v-container>
    <!-- Login/Register Forms -->
    <div v-if="!isAuthenticated">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-tabs v-model="activeTab">
              <v-tab value="login">Login</v-tab>
              <v-tab value="register">Register</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="activeTab">
                <!-- Login Form -->
                <v-window-item value="login">
                  <v-form @submit.prevent="handleLogin">
                    <v-text-field
                      v-model="loginForm.email"
                      label="Email"
                      type="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="loginForm.password"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      type="submit"
                      block
                      class="mt-4"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-window-item>

                <!-- Register Form -->
                <v-window-item value="register">
                  <v-form @submit.prevent="handleRegister">
                    <v-text-field
                      v-model="registerForm.name"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="registerForm.email"
                      label="Email"
                      type="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="registerForm.password"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="registerForm.confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      type="submit"
                      block
                      class="mt-4"
                    >
                      Register
                    </v-btn>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- User Profile -->
    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <!-- Profile Info -->
          <v-card class="mb-4">
            <v-card-title>Profile Information</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-account</v-icon>
                  </template>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
              
              <v-btn
                color="primary"
                variant="outlined"
                block
                class="mt-4"
                @click="showEditProfile = true"
              >
                Edit Profile
              </v-btn>
              
              <v-btn
                color="error"
                variant="outlined"
                block
                class="mt-2"
                @click="handleLogout"
              >
                Logout
              </v-btn>
            </v-card-text>
          </v-card>

          <!-- Statistics -->
          <v-card>
            <v-card-title>Your Activity</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-bookmark-multiple</v-icon>
                  </template>
                  <v-list-item-title>Topics</v-list-item-title>
                  <v-list-item-subtitle>{{ userTopics.length }} topics created</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-notebook</v-icon>
                  </template>
                  <v-list-item-title>Notes</v-list-item-title>
                  <v-list-item-subtitle>{{ userNotes.length }} notes written</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-heart</v-icon>
                  </template>
                  <v-list-item-title>Favorites</v-list-item-title>
                  <v-list-item-subtitle>{{ userFavorites.length }} verses favorited</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <!-- Recent Activity -->
          <v-card>
            <v-card-title>Recent Activity</v-card-title>
            <v-card-text>
              <v-timeline density="comfortable">
                <v-timeline-item
                  v-for="activity in recentActivity"
                  :key="activity.id"
                  :dot-color="activity.color"
                  size="small"
                >
                  <template v-slot:opposite>
                    {{ formatDate(activity.date) }}
                  </template>
                  <div class="text-subtitle-1">{{ activity.title }}</div>
                  <div class="text-body-2">{{ activity.description }}</div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Edit Profile Dialog -->
    <v-dialog v-model="showEditProfile" max-width="500px">
      <v-card>
        <v-card-title>Edit Profile</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateProfile">
            <v-text-field
              v-model="editProfileForm.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="editProfileForm.email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="editProfileForm.currentPassword"
              label="Current Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="editProfileForm.newPassword"
              label="New Password (optional)"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="updateProfile"
          >
            Save Changes
          </v-btn>
          <v-btn
            color="grey"
            variant="text"
            @click="showEditProfile = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter()
    const activeTab = ref('login')
    const isAuthenticated = ref(false)
    const showEditProfile = ref(false)
    const user = ref(null)

    const loginForm = ref({
      email: '',
      password: ''
    })

    const registerForm = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const editProfileForm = ref({
      name: '',
      email: '',
      currentPassword: '',
      newPassword: ''
    })

    const snackbar = ref({
      show: false,
      text: '',
      color: 'success'
    })

    // Mock data - replace with actual data from your stores
    const userTopics = ref([])
    const userNotes = ref([])
    const userFavorites = ref([])
    const recentActivity = ref([
      {
        id: 1,
        date: new Date(),
        title: 'Added new topic',
        description: 'Created "Prayer Promises" topic',
        color: 'primary'
      }
      // Add more activities
    ])

    const showNotification = (text, color = 'success') => {
      snackbar.value = {
        show: true,
        text,
        color
      }
    }

    const handleLogin = async () => {
      try {
        // Implement your login logic here
        isAuthenticated.value = true
        user.value = {
          name: 'John Doe',
          email: loginForm.value.email
        }
        showNotification('Successfully logged in')
        router.push('/profile')
      } catch (error) {
        showNotification('Login failed', 'error')
      }
    }

    const handleRegister = async () => {
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        showNotification('Passwords do not match', 'error')
        return
      }

      try {
        // Implement your registration logic here
        showNotification('Registration successful')
        activeTab.value = 'login'
      } catch (error) {
        showNotification('Registration failed', 'error')
      }
    }

    const handleLogout = () => {
      isAuthenticated.value = false
      user.value = null
      router.push('/login')
    }

    const updateProfile = async () => {
      try {
        // Implement your profile update logic here
        user.value = {
          ...user.value,
          name: editProfileForm.value.name,
          email: editProfileForm.value.email
        }
        showNotification('Profile updated successfully')
        showEditProfile.value = false
      } catch (error) {
        showNotification('Failed to update profile', 'error')
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    return {
      activeTab,
      isAuthenticated,
      showEditProfile,
      user,
      loginForm,
      registerForm,
      editProfileForm,
      snackbar,
      userTopics,
      userNotes,
      userFavorites,
      recentActivity,
      handleLogin,
      handleRegister,
      handleLogout,
      updateProfile,
      formatDate
    }
  }
}
</script> 