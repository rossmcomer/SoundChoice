const router = require('express').Router()
import { Request, Response } from 'express';
import { prisma } from '../util/db';
const { tokenExtractor } = require('../util/middleware')

// POST new questionnaire into questionnaires table
router.post('/', tokenExtractor, async (req: Request, res: Response) => {
    const { userId, bookingId, answers } = req.body;
  
    if (!userId || !bookingId || !answers) {
      return res.status(400).json({ error: 'Missing userId, bookingId, or answers' });
    }
  
    try {
      const questionnaire = await prisma.questionnaire.create({
        data: {
          userId,
          bookingId,
          answers,
        },
      });
  
      return res.status(201).json(questionnaire);
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      return res.status(500).json({ error: 'Failed to create questionnaire' });
    }
});

// PATCH existing questionnaire answers
router.patch('/', tokenExtractor, async (req: Request, res: Response) => {
    const { userId, bookingId, answers } = req.body;
  
    if (!userId || !bookingId || !answers) {
      return res.status(400).json({ error: 'Missing userId, bookingId, or answers' });
    }
  
    try {
        const questionnaire = await prisma.questionnaire.findFirst({
          where: { userId, bookingId },
        });
    
        if (!questionnaire) {
          return res.status(404).json({ error: 'Questionnaire not found for that user and booking' });
        }
    
        await prisma.questionnaire.update({
          where: { id: questionnaire.id }, // assumes id is a unique field
          data: { answers },
        });
    
        return res.status(200).json({ message: 'Questionnaire updated' });
      } catch (error) {
        console.error('Error updating questionnaire:', error);
        return res.status(500).json({ error: 'Failed to update questionnaire' });
      }
});

module.exports = router;