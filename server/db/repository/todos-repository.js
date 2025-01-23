// Le repository est un fichier dédier a l'interaction avec la base de données
// Il contient plusieurs fonctions pour: Créer, récuperer, modifier, et supprimer des documents de la BDD

import { TodosModel } from "../schemas/todos.js";

// On a besoin: titre, description, 
export async function createTodo({ titre, description }) {
    // Création d'une instance de la todo
    const newTodo = new TodosModel({
        titre,
        description,
        date: new Date()
    });

    // Enregistrement de la todo dans la BDD
    const todoInDB = await newTodo.save();

    // Retourner la todoCréée
    return todoInDB
}

// Définition/Déclaration d'un fonction
export async function recupererToutesTodos() {
    // Utiliser mogoose et TodoModel pour récuperer toutes les todos
    const listeTaches = await TodosModel.find();
    // Retourner les todos récuperer
    return listeTaches;
}

export async function mettreAjourTodos(id, data) {
    // Utiliser mongoose et le TodoModel pour mettre a jour la todos avec l'identifiant donnée
    const todoMisAjour = await TodosModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true })
    // Retouner la todos mis a jour
    return todoMisAjour;
}

export async function supprimerTodos(id) {
    console.log(`Tentative de suppression du todo avec l'ID: ${id}`);
    const result = await TodosModel.deleteOne({ _id: id });
    console.log(`Résultat de la suppression:`, result);
    return result;
}

