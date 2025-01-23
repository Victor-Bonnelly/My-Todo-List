
import { TodosModel } from "../schemas/todos.js";

 
export async function createTodo({ titre, description }) {

    const newTodo = new TodosModel({
        titre,
        description,
        date: new Date()
    });

  
    const todoInDB = await newTodo.save();


    return todoInDB
}


export async function recupererToutesTodos() {
  
    const listeTaches = await TodosModel.find();
 
    return listeTaches;
}

export async function mettreAjourTodos(id, data) {
  
    const todoMisAjour = await TodosModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true })
  
    return todoMisAjour;
}

export async function supprimerTodos(id) {
    console.log(`Tentative de suppression du todo avec l'ID: ${id}`);
    const result = await TodosModel.deleteOne({ _id: id });
    console.log(`Résultat de la suppression:`, result);
    return result;
}

