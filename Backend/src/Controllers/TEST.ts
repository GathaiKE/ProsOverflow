// GET ALL TAGS 
// const pool=mssql.connect(sqlConfig)
// let TAGS: tag[]= (await (await pool).request().execute('getTags')).recordset

// key : tag_id
// value : actual tag
// question_id

// CHECK IF QUESTION ID FOR EACH TAGS MATCHES WITH THE ADDED TAGS

// IF THE QUESTION ID MATCHES PUSH THE TAG TO THE TAG PROPERTY OF THE RESPECTIVE QUESTION BASED ON THE ID

/* PSEUDO CODE */

/*
TAGS = [
    {tag_id, tag},
    {tag_id, tag},
    {tag_id, tag},
    {tag_id, tag},
    {tag_id, tag}
]
*/

// GET ALL QUESTIONS 
// const pool=mssql.connect(sqlConfig)
// let QUESTIONS: question[]= (await (await pool).request().execute('getTQuestions')).recordset

