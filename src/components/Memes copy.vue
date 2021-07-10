<template>
  <div class="bg-gray-200">
    <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-10">
      <div class="lg:col-span-2">
        <ul
          class="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0"
        >
          <li v-for="meme in memeList" :key="meme.info.title">
            <div class="bg-white my-6 shadow-lg rounded-lg">
              <div
                class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0"
              >
                <div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-3">
                  <img
                    class="object-cover rounded-l-lg"
                    :src="meme.memeImg"
                    alt=""
                  />
                </div>
                <div
                  class="aspect-w-2 aspect-h-2 sm:aspect-w-8 sm:aspect-h-4 col-start-2 col-span-2 m-10"
                >
                  <div class="">
                    <div
                      class="font-medium mt-4 flex justify-between items-center mt-10"
                    >
                      <h1 class="text-4xl">
                        {{ meme.info.title }}
                      </h1>

                      <p class="text-md text-gray-500">
                        {{
                          format(
                            new Date(
                              fromUnixTime(
                                parseInt(meme.info.created_at.substring(0, 10))
                              )
                            ),
                            "MMM do yyyy hh:mm"
                          )
                        }}
                      </p>
                    </div>
                    <div
                      class="text-lg text-gray-500 mt-10 flex flex-row justify-between"
                    >
                      <!-- <p class="text-indigo-600">
                        {{ meme.info.created_at }}
                      </p> -->
                      <p>Owner: {{ meme.memeOwner }}.testnet</p>
                    </div>
                    <div
                      class="text-lg text-gray-500 mt-4 flex flex-row justify-between"
                    >
                      <p>Donations : {{ meme.info.total_donations }}</p>
                      <p>Score: {{ meme.info.vote_score }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-start">
              <h2 class="text-2xl text-black">Comments:</h2>
              <ul v-for="comment in meme.comments" :key="comment" class="flex">
                <li>Comment text: {{ comment.text }}</li>
                <li>Comment author : {{ comment.author }}</li>
                <li>Created at: {{ comment.created_at }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div v-for="meme in memeList" :key="meme" l>
    <p>Title : {{ meme.info.title }}</p>
    <p>Donations : {{ meme.info.total_donations }}</p>
    <p>Category: {{ meme.info.category }}</p>
    <p>Created at: {{ meme.info.created_at }}</p>
    <p>Score: {{ meme.info.vote_score }}</p>
    <p>Owner: {{ meme.memeOwner }}.testnet</p>

    <ul v-for="comment in meme.comments" :key="comment">
      <li>Comment text: {{ comment.text }}</li>
      <li>Comment author : {{ comment.author }}</li>
      <li>Created at: {{ comment.created_at }}</li>
    </ul>
    <a :href="meme.info.data" target="_blank">
      <img :src="meme.memeImg" />
    </a>
  </div> -->
</template>

<script>
import { format, fromUnixTime } from "date-fns";
export default {
  props: {
    memeList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { format, fromUnixTime };
  },
};
</script>

<style></style>
