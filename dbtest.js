const db = require('./models')


// POST user favorites - CREATE receive the word and save it to the favorites database


// // create some pokemon with async/await syntax
// async function createFave() {
//     try {
//         const newFave = await db.favorite.create({ word: 'sloth'})
//         console.log('the new word is:', newFave)
//         const foundWord = await db.favorite.findOne({
//             where: {
//                 word: 'sloth',
        
//             }
//         })
//         console.log('the found word is:', foundWord)
//     }catch (err) {
//         console.log(err)
//     }
// }

// createFave()


const db = require('./models')

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  articleId: 1
})
.then(comment => {
  console.log(comment.get())
})


const createComment = async () => {
  try {
    const newComment = await db.comment.create({
      name: 'Ada Lovelace',
      content: 'So excited for this!',
      articleId: 2
    })
    console.log(newComment)
  } catch (err) {
    console.log(err)
  }
}

createComment()
