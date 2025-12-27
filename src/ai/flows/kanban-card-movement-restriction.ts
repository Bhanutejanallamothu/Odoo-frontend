'use server';
/**
 * @fileOverview This file defines a Genkit flow to restrict Kanban card movement based on user role and team membership.
 *
 * - checkCardMovementPermission - A function that checks if a user has permission to move a card.
 * - CheckCardMovementInput - The input type for the checkCardMovementPermission function.
 * - CheckCardMovementOutput - The return type for the checkCardMovementPermission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckCardMovementInputSchema = z.object({
  userId: z.string().describe('The Firebase UID of the user attempting to move the card.'),
  teamId: z.string().describe('The ID of the team associated with the card.'),
  userRole: z.enum(['admin', 'manager', 'technician', 'employee']).describe('The role of the user.'),
});
export type CheckCardMovementInput = z.infer<typeof CheckCardMovementInputSchema>;

const CheckCardMovementOutputSchema = z.object({
  hasPermission: z
    .boolean()
    .describe(
      'Whether the user has permission to move the card based on their role and team membership.'
    ),
});
export type CheckCardMovementOutput = z.infer<typeof CheckCardMovementOutputSchema>;

export async function checkCardMovementPermission(
  input: CheckCardMovementInput
): Promise<CheckCardMovementOutput> {
  return checkCardMovementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkCardMovementPrompt',
  input: {schema: CheckCardMovementInputSchema},
  output: {schema: CheckCardMovementOutputSchema},
  prompt: `You are an access control expert determining if a user has permission to move a Kanban card.

A user with the role of '{{{userRole}}}' and ID '{{{userId}}}' is attempting to move a card associated with team '{{{teamId}}}'.

Determine if the user has permission to move the card based on the following rules:

*   Admins and managers always have permission.
*   Technicians only have permission if they are members of the team associated with the card.
*   Employees never have permission.

Return true if the user has permission, and false otherwise.

Ensure that the output is a valid JSON object that conforms to the output schema.
`,
});

const checkCardMovementFlow = ai.defineFlow(
  {
    name: 'checkCardMovementFlow',
    inputSchema: CheckCardMovementInputSchema,
    outputSchema: CheckCardMovementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
