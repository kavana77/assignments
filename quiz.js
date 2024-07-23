const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', (req, res) => {
    const { title, questions } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send(err);
        }

        db.query('INSERT INTO quizzes (title) VALUES (?)', [title], (err, result) => {
            if (err) {
                return db.rollback(() => res.status(500).send(err));
            }

            const quizId = result.insertId;

            questions.forEach((question, index) => {
                db.query('INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)', [quizId, question.text], (err, result) => {
                    if (err) {
                        return db.rollback(() => res.status(500).send(err));
                    }

                    const questionId = result.insertId;

                    question.options.forEach((option) => {
                        db.query('INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)', [questionId, option.text, option.is_correct], (err) => {
                            if (err) {
                                return db.rollback(() => res.status(500).send(err));
                            }

                            if (index === questions.length - 1) {
                                db.commit((err) => {
                                    if (err) {
                                        return db.rollback(() => res.status(500).send(err));
                                    }
                                    res.status(200).send({ message: 'Quiz created successfully' });
                                });
                            }
                        });
                    });
                });
            });
        });
    });
});

router.post('/submit', (req, res) => {
    const { userId, answers } = req.body;

    let errorOccurred = false;

    answers.forEach(answer => {
        db.query('INSERT INTO answers (user_id, question_id, option_id) VALUES (?, ?, ?)', [userId, answer.question_id, answer.option_id], (err) => {
            if (err) {
                errorOccurred = true;
                console.error('Error inserting answer:', err);
            }
        });
    });

    if (errorOccurred) {
        res.status(500).send('An error occurred while saving the answers.');
    } else {
        res.status(200).send('Answers submitted successfully.');
    }
});






module.exports = router;
