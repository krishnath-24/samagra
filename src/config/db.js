import Dexie from 'dexie'


export const initializeStore = () => {

    const db = new Dexie('Samagra')

    db.version(1).stores(
        {
            comments: "++id, title",
            photos: "++id, title",
            todos: "++id, title",
            posts: "++id, title"
        })

    db.open().catch(error => {
        console.log("error while opening idb", error)
    })

    return db
}