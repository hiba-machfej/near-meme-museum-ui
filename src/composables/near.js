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
  const err = ref(null);

  onMounted(async () => {
    // when the component first mounts it get the memes from the blockchain

    try {
      const memeIds = await getMemes();

      memes.value = (
        await Promise.all(
          memeIds.map(async (id) => {
            const info = await getMeme(id);
            const comments = await getMemeComments(id);

            return {
              id,
              info,
              comments,
              // The coming data has a 9gag link, so to display the 9gag image in the website we are splitting the 9gag link to retrieve the meme's ID. We can display the image by adding the ID to the following url: http://img-9gag-fun.9cache.com/photo/ID_460s.jpg
              image: `https://img-9gag-fun.9cache.com/photo/${
                info.data.split("https://9gag.com/gag/")[1]
              }_460s.jpg`,
            };
          })
        )
      ).reverse();
    } catch (e) {
      err.value = e;
      console.log(err.value);
    }
  });

  // create a function that allows adding a message to the blockchain
  const handleAddMeme = async ({ meme, title, data, category }) => {
    addMeme({ meme, title, data, category });
  };

  const handleAddComment = async ({ memeId, text }) => {
    await addComment({ memeId, text });
  };

  const handleDonate = async ({ memeId, amount }) => {
    await donate({ memeId, amount });
  };

  const handleVote = async ({ memeId, value }) => {
    await vote({ memeId, value });
  };

  return {
    memes,
    addMeme: handleAddMeme,
    addComment: handleAddComment,
    donate: handleDonate,
    vote: handleVote,
  };
};
