const cards = document.querySelectorAll(".card");
const CardsImages = document.querySelectorAll(".card .back img");


const images = [
  "imgs/1.png",
  "imgs/2.png",
  "imgs/3.png",
  "imgs/4.png",
  "imgs/5.png",
  "imgs/6.png",
  "imgs/7.png",
  "imgs/8.png",
  "imgs/9.png",
  "imgs/10.png",
  "imgs/11.png",
  "imgs/12.png",
  "imgs/13.png",
  "imgs/14.png",
  "imgs/15.png",
  "imgs/16.png",
  "imgs/17.png",
  "imgs/18.png",
  "imgs/19.png",
  "imgs/20.png",
];

function FlipCard(arr) {
  let times = 0;

  arr.forEach((item) =>
      item.addEventListener("click", function ()
      {
        
      if (item.classList.contains("flipped") !== true) {
        item.classList.add("flipped");
        times++;
      }
      
      else
      {
        item.classList.remove("flipped");
        times--;
      }

          if (times === 2)
          {
             
          
              if (checkCards(CardsImages))
              {
                
             arr.forEach(function (item) {
               setTimeout(function () {
                 if (item.classList.contains("flipped")) {
                     item.classList.add("done");
                     
                     times = 0;
                    }
                    for (let i = 0; i < arr.length; i++)
                    {
                        if (arr[i].classList.contains("done"))
                        {
                            CardsImages[i].classList.add("image-filter");
                        }
                    }
                }, 1000);
            });
            
            setTimeout(function ()
            {
                      console.log(checkWin(arr));
                        if (checkWin(arr) === 20) {
                          alert("تهانينا لقد فزت");
                        }
                  },2000)
                
            
        }
              
        
        else
        {
          arr.forEach(function (item) {
              setTimeout(function ()
              {
                  if (!item.classList.contains("done"))
                  {
                      item.classList.remove("flipped");
                      times = 0;
                }
            
            }, 1000);
          });
              }
              
              
          
          }
          

    })
  );
}

function SetRandomImage(ArrayOfCards, imgs) {
  let mixedArray = GetMixedImageArray(ArrayOfCards.length, imgs);

  for (let i = 0; i < ArrayOfCards.length; i++) {
    ArrayOfCards[i].setAttribute("src", mixedArray[i]);
  }
}


function checkCards(TheCardsImags)
{
    let flippedCards = [];
    let trueFlipped = [];
   
          
          for (let i = 0; i < TheCardsImags.length; i++) {
            if (
              cards[i].classList.contains("flipped") &&
              !cards[i].classList.contains("done")
            ) {
              flippedCards[i] = TheCardsImags[i].getAttribute("src");
            }
        }
        
            
    trueFlipped = flippedCards.filter((item) => item !== "");
    console.log(trueFlipped);

    if (trueFlipped[0] === trueFlipped[1]) {
      return true;
    } 
    

   

    
   


}

function ShowCards(arr)
{
   
  
        setTimeout(function ()
        {
            arr.forEach(function (item)
            {
                item.classList.add("flipped");
                item.classList.add("not-active");
            })
        }, 2000);
        
        setTimeout(function ()
        {
            arr.forEach(function (item) {
              item.classList.remove("flipped");
              item.classList.remove("not-active");
            });
        },4000)




}

function checkWin(arr){
    let count = 0;
    
    for (let i = 0; i < arr.length;i++)
    {
        if (arr[i].classList.contains("done")) {
          ++count;
        }
   }
    
    return count;
    
}



// start the game

function StartGame()
{
    ShowCards(cards);
  FlipCard(cards);
  SetRandomImage(CardsImages, images);
}

window.addEventListener("load", function () {
  StartGame();
});

/*
for random placing image 
1-function to get random images from the images array and return an array with half width
2- function to concat the returned array
3- function to get this array then change images to random places
*/

function GetRandomImageSource(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function GetMixedImageArray(lengthOfCards, ImageArray) {
  let arr = [];
  let randomItem = "";
  let copiedImages = [...ImageArray];
  let i = 0;
  let j = 0;
  let concatedArray = [];
  let mixed = [];

  while (i < lengthOfCards / 2) {
    randomItem = GetRandomImageSource(copiedImages);

    while (randomItem !== null) {
      arr[i] = randomItem;
      copiedImages[copiedImages.indexOf(randomItem)] = null;
      i++;
      break;
    }
  }

  concatedArray = arr.concat(arr);

  while (j < lengthOfCards) {
    randomItem = GetRandomImageSource(concatedArray);
    while (randomItem !== null) {
      mixed[j] = randomItem;
      concatedArray[concatedArray.indexOf(randomItem)] = null;
      j++;
      break;
    }
  }

  return mixed;
}

