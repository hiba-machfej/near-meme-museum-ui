<template>
  <div class="bg-gray-200">
    <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-10">
      <div
        class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
      >
        <div
          v-for="meme in memeList"
          :key="meme"
          class="rounded-lg shadow-lg overflow-hidden bg-white"
        >
          <div class="flex-shrink-0">
            <img class="h-80 w-full object-cover" :src="meme.memeImg" alt="" />
          </div>
          <div
            class="flex-1 bg-white p-6 flex flex-col justify-between items-start"
          >
            <div class="flex-1 w-full">
              <a :href="meme.info.data" target="_blank" class="block mt-2">
                <div class="flex justify-between items-center">
                  <p class="text-xl font-semibold text-gray-900">
                    {{ meme.info.title }} {{ meme.index }}
                  </p>
                  <p class="text-xs text-gray-500 w-20">
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
                  class="mt-3 text-md flex flex-col items-start text-md text-base text-gray-500"
                >
                  <p>Donations : {{ meme.info.total_donations }}</p>

                  <p>Score: {{ meme.info.vote_score }}</p>
                  <p>Category: {{ meme.info.category }}</p>
                </div>
              </a>
            </div>
            <div class="mt-6 flex w-full justify-between items-start">
              <p class="text-md font-bold text-indigo-600">
                {{ meme.memeOwner }}.testnet
              </p>
            </div>
            <div class="mt-10 flex flex-col items-start w-full">
              <h2 class="text-2xl text-black">Comments:</h2>
              <CommentForm :addComment="addComment" :index="meme.index" />
              <ul
                v-for="comment in meme.comments"
                :key="comment"
                class="flex flex-col items-start p-2 px-4 bg-gray-100 w-full mt-4 rounded-md shadow-md ju-start"
              >
                <li class="text-sm font-medium text-gray-900">
                  {{ comment.author }}
                </li>
                <li class="text-xs text-gray-500">
                  {{
                    format(
                      new Date(
                        fromUnixTime(
                          parseInt(comment.created_at.substring(0, 10))
                        )
                      ),
                      "MMM do yyyy hh:mm"
                    )
                  }}
                </li>
                <li class="mt-4 text-base font-medium text-gray-900">
                  {{ comment.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, fromUnixTime } from "date-fns";
import CommentForm from "@/components/CommentForm";
export default {
  components: {
    CommentForm,
  },
  props: {
    memeList: {
      type: Array,
      required: true,
    },
    addComment: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return { format, fromUnixTime };
  },
};
</script>

<style></style>
