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




db.comment.create({
  userId: '5',
  comment: 'This is really neat! Thanks for posting.',
  favoriteId: 1
})
.then(comment => {
  console.log(comment.get())
})


const createComment = async () => {
  try {
    const newComment = await db.comment.create({
      userId: '8',
      comment: 'rat thirty',
      favoriteId: 20
    })
    console.log(newComment)
  } catch (err) {
    console.log(err)
  }
}

createComment()


// const readComment = async () => {
//     try {
//       const oneFav = await db.favorite.findOne({
//         where: { id: 2},
//         include: [db.comment]
//       })
//       console.log(oneFav.comments)
//     } catch (err) {
//       console.log(err)
//     }
//   }
  
//   readComment()