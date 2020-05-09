// Filename: backend/quiz.jsw (web modules need to have a .jsw extension)

import wixData from 'wix-data';

export function fetchQuiz(id) {
  return wixData
      .query("Questions")
      .include("quiz")
      .eq("quiz", id)
      .find()
      .then((results) => {
        console.log('Quiz loaded with ' + results.items.length + " questions")
        return results
      })
      .catch((err) => {
        console.log('failed to get here')
        throw err
      });
}

export function getQuiz(id) {
  return wixData.query("Quizzes")
      .eq("id", id)
      .find()
      .then((results) => {
        if(results.items.length > 0) {
          return results.items[0];
        } else {
          console.log("No quiz found")
          throw Error("No quiz found")
        }
      })
      .catch((err) => {
        throw err
      });
}