<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card>
            <v-card-title class="text-h5">Scripture Topics</v-card-title>
            <v-card-text>
              <div v-if="topics.length === 0">
                <p>You haven't created any topics yet.</p>
              </div>
              <v-list v-else>
                <v-list-item
                  v-for="(topic, index) in topics"
                  :key="index"
                >
                  <v-list-item-title class="text-body-1">{{ topic }}</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2">
                    {{ getTopicScriptureCount(topic) }} Scriptures
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Topics",
    data() {
      return {
        topics: [],
        topicsData: {},
      };
    },
    mounted() {
      this.loadTopics();
      this.loadTopicsData();
    },
    methods: {
      loadTopics() {
        this.topics = JSON.parse(localStorage.getItem("topics")) || [];
      },
      loadTopicsData() {
        this.topicsData = JSON.parse(localStorage.getItem("topicsData")) || {};
      },
      getTopicScriptureCount(topic) {
        return this.topicsData[topic] ? this.topicsData[topic].length : 0;      },    },  };  </script>