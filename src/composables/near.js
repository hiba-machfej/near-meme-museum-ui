import { ref, onMounted, reactive } from "vue";
import {
  getMemeList,
  addMeme,
  getMeme,
  getMemeComments,
  addComment,
  donate,
  vote,
} from "../services/near";

export const useMemes = () => {
  // memes starts as an empty array
  const memes = ref([]);
  const memeList = ref([]);

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain
    memes.value = await getMemeList();

    // then for each single meme it gets the info and comments
    await memes.value.forEach(async (meme, index) => {
      const result = reactive({
        info: {},
        comments: {},
        memeName: "",
        memeImg: "",
        index: index,
      });

      result.info = await getMeme(meme);
      result.comments = await getMemeComments(meme);

      // it takes the 9gag link and extract the image
      result.memeImg =
        "https://img-9gag-fun.9cache.com/photo/" +
        result.info.data.split("https://9gag.com/gag/")[1] +
        "_460s.jpg";

      // it pushes the results objects to a memeList
      await memeList.value.push(result);

      // sort the memes according the index coming from the mems because the getMeme function brings them back randomly
      memeList.value = memeList.value.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
      // a for loop to match the accountId of the mems with the memeList
      for (let i = 0; i < memeList.value.length; i++) {
        memeList.value[i].memeName = memes.value[i];
      }
      //sorting the memes according to the latest in the blockchain
      memeList.value = memeList.value.sort((a, b) =>
        a.index > b.index ? -1 : b.index > a.index ? 1 : 0
      );
    });
  });

  // create a function that allows adding a message to the blockchain
  const handleAddMeme = async ({ meme, title, data, category }) => {
    addMeme({ meme, title, data, category });
  };

  const handleAddComment = async ({ index, text }) => {
    const meme = memes.value[index];
    await addComment({ text, meme });
  };

  const handleDonate = async ({ index, amount }) => {
    const meme = memes.value[index];
    await donate({ meme, amount });
  };

  const handleVote = async ({ index, value }) => {
    const meme = memes.value[index];
    await vote({ meme, value });
  };

  return {
    memeList,
    addMeme: handleAddMeme,
    addComment: handleAddComment,
    donate: handleDonate,
    vote: handleVote,
  };
};
