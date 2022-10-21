import axios from 'axios';

const appRequests = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api/v2/recipes',
});

export const getSingleRecipe = async (id) => {
  try {
    const res = await appRequests.get(id);

    if(!res) throw new Error(`Sth 1`)

    return res.data.data
  }
  catch(err) {
    throw new Error(`Sth 2`)
  }
}