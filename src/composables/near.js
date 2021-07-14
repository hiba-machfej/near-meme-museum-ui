import { ref, onMounted } from "vue";
import {
  getMemes,
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

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain
    const memeIds = await getMemes();

    memes.value = await Promise.all(
      memeIds.map(async (id) => {
        const info = await getMeme(id);
        const comments = await getMemeComments(id);

        return {
          id,
          info,
          comments,
          image: `https://img-9gag-fun.9cache.com/photo/${
            info.data.split("https://9gag.com/gag/")[1]
          }_460s.jpg`,
        };
      })
    );
  });

  // create a function that allows adding a message to the blockchain
  const handleAddMeme = async ({ meme, title, data, category }) => {
    addMeme({ meme, title, data, category });
  };

  const handleAddComment = async ({ index, text }) => {
    const meme = memes.value[index].id;
    await addComment({ text, meme });
  };

  const handleDonate = async ({ index, amount }) => {
    const meme = memes.value[index].id;
    await donate({ meme, amount });
  };

  const handleVote = async ({ index, value }) => {
    const meme = memes.value[index].id;
    await vote({ meme, value });
  };

  return {
    memes,
    addMeme: handleAddMeme,
    addComment: handleAddComment,
    donate: handleDonate,
    vote: handleVote,
  };
};
