<template>
  <div class="bg-gray-200">
    <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-10">
      <div
        class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
      >
        <div
          v-for="meme in memes"
          :key="meme"
          class="rounded-2xl shadow-lg overflow-hidden bg-white"
        >
          <div class="flex-shrink-0">
            <a :href="meme.info.data" target="_blank">
              <img class="h-80 w-full object-cover" :src="meme.image" alt="" />
            </a>
          </div>
          <div
            class="flex-1 bg-white flex flex-col justify-between items-start p-6"
          >
            <div class="flex-1 w-full">
              <div class="flex justify-between items-start">
                <div class="flex flex-col items-start">
                  <p class="text-2xl font-semibold text-gray-900">
                    {{ meme.info.title }}
                    <!-- {{ meme.index }} -->
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ meme.id }}.museum.testnet
                  </p>
                </div>
                <p class="text-xs text-gray-500 w-20">
                  {{
                    format(
                      new Date(
                        fromUnixTime(
                          parseInt(meme.info.created_at.substring(0, 10))
                        )
                      ),
                      "MMM do yyyy"
                    )
                  }}
                </p>
              </div>
              <div
                class="mt-12 text-sm flex justify-between text-md text-base text-gray-500"
              >
                <p>
                  Donations <br />
                  <span class="font-bold text-black text-md">
                    {{ meme.info.total_donations / 1e24 }} Ⓝ</span
                  >
                </p>
                <p>
                  Category <br /><span class="font-bold text-black text-md">{{
                    meme.info.category
                  }}</span>
                </p>
                <p>
                  Score<br /><span class="font-bold text-black text-md">{{
                    meme.info.vote_score
                  }}</span>
                </p>
              </div>
            </div>
            <div class="mt-6 flex w-full justify-between items-start"></div>
            <div class="flex flex-col items-start w-full">
              <div
                class="w-full bg-indigo-100 rounded-2xl p-5 px-5 flex justify-between text-sm"
              >
                <div class="flex justify-between items-center">
                  <p>Vote</p>
                  <button
                    class="p-1 px-4"
                    @click.prevent="vote({ index: meme.index, value: 1 })"
                  >
                    <ThumbUpIcon class="h-5 w-5 text-indigo-500" />
                  </button>
                  <button
                    class=""
                    @click.prevent="vote({ index: meme.index, value: -1 })"
                  >
                    <ThumbDownIcon class="h-5 w-5 text-indigo-500" />
                  </button>
                </div>
                <button
                  class="border border-black p-2 rounded-full"
                  @click.prevent="donate({ index: meme.index, amount: '1' })"
                >
                  Donate 1 Ⓝ
                </button>
              </div>

              <div
                class="flex w-full justify-between my-2 mb-4 border-t-2 mt-16"
              >
                <h2 class="text-xl text-black mt-4">Comments:</h2>
              </div>
              <CommentForm :addComment="addComment" :index="meme.index" />
              <ul
                v-for="comment in meme.comments"
                :key="comment"
                class="flex flex-col items-start p-2 px-4 bg-gray-100 w-full mt-4 rounded-md"
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
                      "MMM do yyyy"
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
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/vue/solid";
export default {
  components: {
    CommentForm,
    ThumbUpIcon,
    ThumbDownIcon,
  },
  props: {
    memes: {
      type: Array,
      required: true,
    },
    addComment: {
      type: Function,
      required: true,
    },
    donate: {
      type: Function,
      required: true,
    },
    vote: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return { format, fromUnixTime };
  },
};
</script>

<style lang="postcss"></style>
