const router = require('express').Router()
import { Request, Response } from 'express';
import { prisma } from '../util/db';
const { tokenExtractor } = require('../util/middleware')

// POST new questionnaire into questionnaires table
router.post('/', tokenExtractor, async (req: Request, res: Response) => {
    const { userId, bookingId, answers, type } = req.body;
  
    if (!userId || !bookingId || !answers) {
      return res.status(400).json({ error: 'Missing userId, bookingId, or answers' });
    }
  
    try {
      const questionnaire = await prisma.questionnaire.create({
        data: {
          userId,
          bookingId,
          answers,
          type,
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
      const updated = await prisma.questionnaire.updateOne({
        where: { userId, bookingId },
        data: { answers },
      });
  
      if (updated.count === 0) {
        return res.status(404).json({ error: 'Questionnaire not found for that user and booking' });
      }
  
      return res.status(200).json({ message: 'Questionnaire updated' });
    } catch (error) {
      console.error('Error updating questionnaire:', error);
      return res.status(500).json({ error: 'Failed to update questionnaire' });
    }
});

// GET questionnaires for a booking
router.get('/', tokenExtractor, async (req: Request, res: Response) => {
    const { userId, bookingId } = req.body;
  
    if (!userId || !bookingId) {
      return res.status(400).json({ error: 'Missing userId or bookingId in query params' });
    }
  
    try {
      const questionnaire = await prisma.questionnaire.findFirst({
        where: {
          userId: String(userId),
          bookingId: String(bookingId),
        },
      });
  
      if (!questionnaire) {
        return res.status(404).json({ error: 'Questionnaire not found' });
      }
  
      return res.status(200).json(questionnaire);
    } catch (error) {
      console.error('Error fetching questionnaire:', error);
      return res.status(500).json({ error: 'Failed to fetch questionnaire' });
    }
  });

module.exports = router;