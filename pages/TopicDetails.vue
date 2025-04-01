<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h5">
            {{ topic }}
          </v-card-title>
          <v-card-text>
            <div v-if="topicScriptures.length === 0">
              <p>No scriptures have been added to this topic yet.</p>
            </div>
            <v-list v-else>
              <template v-for="(scripture, index) in topicScriptures" :key="index">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-list-item-action start>
                      <v-btn icon @click="removeFromTopic(scripture)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                  <v-list-item-title class="text-body-1">
                    <div v-if="scripture.isRange">
                      <div v-for="(verse, verseIndex) in scripture.verses" :key="verseIndex">
                        <p class="text-body-1">
                          <span class="font-weight-bold">{{ verse.verse }}.</span> {{ verse.text }}
                        </p>
                      </div>
                    </div>
                    <div v-else>
                      {{ scripture.text }}
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-body-2">
                    <div v-if="!scripture.isRange">
                      {{ scripture.reference }}
                    </div>
                    <div v-else>
                      {{ scripture.reference }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLocalStorage } from "@/composables/useLocalStorage";
import { ref, onMounted } from "vue";

export default {
  name: "TopicDetails",
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { topicsData } = useLocalStorage();
    const topicScriptures = ref([]);

    const loadTopicScriptures = () => {
      topicScriptures.value = topicsData.value[props.topic] || [];
    };

    const removeFromTopic = (scripture) => {
      topicsData.value[props.topic] = topicsData.value[props.topic].filter(
        (s) => s.reference !== scripture.reference
      );
      localStorage.setItem("topicsData", JSON.stringify(topicsData.value));
      loadTopicScriptures();
    };

    onMounted(() => {
      loadTopicScriptures();
    });

    return {
      topicScriptures,
      removeFromTopic,
    };
  },
};
</script>
