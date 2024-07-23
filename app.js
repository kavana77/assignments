const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quiz');
const feedbackRoutes = require('./routes/feedback');
const notesRoutes = require('./routes/notes')
const convertData = require('./routes/convert')
const port = 3000
const app = express();
app.use(bodyParser.json());

app.use('/api/quiz', quizRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/notesRoutes',notesRoutes)
app.use('/convertData', convertData)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

