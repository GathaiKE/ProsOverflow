import { Request, Response } from "express";
import mssql from "mssql";
import { sqlConfig } from "../configuration/config";
import { v4 as uuid } from "uuid";
import { ExtdQuestReq, Question } from "../interfaces/questions";
import { Tag } from "../interfaces/questions";

//Post Question

export const postQuestion = async (req: ExtdQuestReq, res: Response) => {
  try {
    const question_id = uuid();
    const upvotes = 0;
    const downvotes = 0;
    const { title, body, tags } = req.body;
    const pool = mssql.connect(sqlConfig);
    await (await pool)
      .request()
      .input("question_id", question_id)
      .input("title", title)
      .input("body", body)
      .input("user_id", req.payload?.user_id[0])
      .input("upvotes", upvotes)
      .input("downvotes", downvotes)
      .execute("postQuestion");

    const updatedTags = await Promise.all(tags.map(async (tag) => {
      let tag_id = null;
      const existingTag: Tag[] = await (
        await (await pool)
          .request()
          .input("tag", tag.tag)
          .execute("getTagByName")
      ).recordset;

      if (existingTag.length === 0) {
        tag_id = uuid();
        await (await pool)
          .request()
          .input("tag_id", tag_id)
          .input("tag", tag.tag)
          .execute("addTag");
      } else {
        tag_id = existingTag[0].tag_id;
      }

      await (await pool)
        .request()
        .input("question_id", question_id)
        .input("tag_id", tag_id)
        .execute("addQuestionTag");

      return {
        tag_id,
        tag: tag.tag
      };
    }));

    return res.status(201).json({ message: "Question added successfully!"});
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};


//Get All questions

export const getAllQuestions = async (req: Request<{pageNumber:string}>, res: Response) => {
    try {
      const pageSize=10
      const {pageNumber} =req.params
    const pool = await mssql.connect(sqlConfig);
    const questions: Question[] = (await pool.request().input('pageSize',pageSize).input('pageNumber',pageNumber).execute("gechattyQuestions")).recordset;

    if (questions.length === 0) {
        return res.status(404).json({ message: "No questions available" });
    }

    const result: Question[] = []

    for (const question of questions) {
        const { tag_id, tag, ...rest } = question;

        let formattedQuestion: Question = result.find(
        (q) => q.title === question.title && q.body === question.body
        ) as Question;

        if (!formattedQuestion) {
        formattedQuestion = {
            ...rest,
            tags: [],
        };
        result.push(formattedQuestion);
        }

        if (tag_id && tag) {
        formattedQuestion.tags.push({ tag_id, tag });
        }
    }

    return res.status(200).json(result);
    } catch (error: any) {
    return res.status(500).json(error.message);
    }
};

//Get Single Question

export const getSingleQuestion = async(req: Request<{ question_id: string }>, res: Response) => {
    try {
        let {question_id}=req.params
    const pool = await mssql.connect(sqlConfig);
    const questions: Question[] = (await pool.request().input("question_id", question_id).execute("getSingleQuestion")).recordset;

    if (questions.length === 0) {
        return res.status(404).json({ message: "Question doesn't exist" });
    }

    const result: Question[] = []

    for (const question of questions) {
        const { tag_id, tag, ...rest } = question;

        let formattedQuestion: Question = result.find(
        (q) => q.title === question.title && q.body === question.body
        ) as Question;

        if (!formattedQuestion) {
        formattedQuestion = {
            ...rest,
            tags: [],
        };
        result.push(formattedQuestion);
        }

        if (tag_id && tag) {
        formattedQuestion.tags.push({ tag_id, tag });
        }
    }

    return res.status(200).json(result);
    } catch (error: any) {
    return res.status(500).json(error.message);
    }
};

// update Question

export const updateQuestion = async (req: ExtdQuestReq, res: Response) => {
    try {
    const { title, body, tags } = req.body;
    const { question_id } = req.params;
    const pool = mssql.connect(sqlConfig);
    let question: Question[] = (
        await (await pool)
        .request()
        .input("question_id", question_id)
        .execute("getQ4Update")
    ).recordset;

    if (!question[0]) {
        return res.status(404).json({ message: "Question not found" });
    } else {
        (await pool)
        .request()
        .input("question_id", question_id)
        .input("title", title)
        .input("body", body)
        .execute("updateQuestion");

        return res.status(200).json({ message: "Update Successful😎!" });
    }
    } catch (error: any) {
    return res.status(500).json(error.message);
    }
};

//Delete question

export const deleteQuestion = async (req: ExtdQuestReq, res: Response) => {
  try {
    const { question_id } = req.params;
    const pool = mssql.connect(sqlConfig);

    let question: Question[] = (
      await (await pool)
        .request()
        .input("question_id", question_id)
        .execute("getSingleQuestion")
    ).recordset;

    if (!question[0]) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    (await pool)
      .request()
      .input("question_id", question_id)
      .execute("deleteQuestion");

    return res.status(200).json({ message: "Deleted!" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
