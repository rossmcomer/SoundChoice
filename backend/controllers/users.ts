const router = require('express').Router()
import { Request, Response } from 'express';
import { User } from '../types/prisma';
import { prisma } from '../util/db';
import bcryptjs from 'bcryptjs';

router.post('/create-account', async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, name, password } = req.body;

        try {
          // Check if email already exists
          const existingUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
      
          if (existingUser) {
            return res.status(409).json({ error: 'Email is already in use' }); // Notify user of conflict
          }
    
        // Hash the password before saving
        const hashedPassword = await bcryptjs.hash(password, 10);
    
        // Create a new user
        const newUser: User = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
        });
    
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
      }
});

module.exports = router