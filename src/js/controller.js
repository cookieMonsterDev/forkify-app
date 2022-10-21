import { getSingleRecipe } from './requests/resquests'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const sth = async () => {
  const a = await getSingleRecipe('5ed6604591c37cdc054bc886')

  console.log(a)
}


sth()
