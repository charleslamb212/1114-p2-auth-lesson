const db = require('./models')


// POST user favorites - CREATE receive the word and save it to the favorites database


// create some pokemon with async/await syntax
async function createFave() {
    try {
        const newFave = await db.favorite.create({ word: 'sloth'})
        console.log('the new word is:', newFave)
        const foundWord = await db.favorite.findOne({
            where: {
                word: 'sloth',
        
            }
        })
        console.log('the found word is:', foundWord)
    }catch (err) {
        console.log(err)
    }
}

createFave()
